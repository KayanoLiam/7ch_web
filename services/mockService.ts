import { I7chAPI, Board, Thread, Post, ThreadDetail, CreateThreadRequest, CreatePostRequest, PaginatedThreads } from '../types';

const STORAGE_KEY = '7ch_db_v1';
const DEVICE_ID_KEY = '7ch_device_uuid';

// Helper: Simple Hash for Tripcodes/IDs
const simpleHash = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36).substring(0, 8).toUpperCase();
};

// Helper: Get or Create Device ID
const getDeviceId = (): string => {
  let uuid = localStorage.getItem(DEVICE_ID_KEY);
  if (!uuid) {
    uuid = crypto.randomUUID();
    localStorage.setItem(DEVICE_ID_KEY, uuid);
  }
  return uuid;
};

// Helper: Generate Daily ID
const generateDailyId = (boardId: string): string => {
  const dateStr = new Date().toISOString().split('T')[0];
  const deviceId = getDeviceId();
  return simpleHash(`${deviceId}-${dateStr}-${boardId}`).substring(0, 9);
};

// Initial Data using i18n keys
const INITIAL_BOARDS: Board[] = [
  { id: 'all', name: 'board.all.name', description: 'board.all.desc' },
  { id: 'news', name: 'board.news.name', description: 'board.news.desc' },
  { id: 'g', name: 'board.g.name', description: 'board.g.desc' },
  { id: 'acg', name: 'board.acg.name', description: 'board.acg.desc' },
  { id: 'vip', name: 'board.vip.name', description: 'board.vip.desc' },
];

interface DBSchema {
  threads: Thread[];
  posts: Record<string, Post[]>; // threadId -> posts
}

export class MockService implements I7chAPI {
  private db: DBSchema;

  constructor() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      this.db = JSON.parse(saved);
    } else {
      this.db = { threads: [], posts: {} };
      this.seedData();
    }
  }

  private save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.db));
  }

  private seedData() {
    // Create a welcome thread
    const threadId = 'welcome-thread-' + Date.now();
    const now = new Date().toISOString();

    const opPost: Post = {
      id: 1,
      threadId,
      name: 'Admin',
      tripcode: '★ADMIN',
      content: 'Welcome to 7ch!\n\nThis is a demo of the new UI.\nFeatures:\n1. Tripcodes: Name#pass\n2. Anchors: >>1\n3. Sage: put "sage" in email',
      createdAt: now,
      uid: 'ADMIN',
      isOp: true
    };

    const thread: Thread = {
      id: threadId,
      boardId: 'news',
      title: '【Official】Welcome to 7ch - The Modern Anonymous BBS ★1',
      postCount: 1,
      viewCount: 1,
      createdAt: now,
      updatedAt: now,
      opPost
    };

    this.db.threads.push(thread);
    this.db.posts[threadId] = [opPost];
    this.save();
  }

  private async delay(ms: number = 200) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // --- API Implementation ---

  async getBoards(): Promise<Board[]> {
    await this.delay();
    return INITIAL_BOARDS;
  }

  async getThreads(boardId: string, page: number = 1): Promise<PaginatedThreads> {
    await this.delay();
    let threads = this.db.threads;

    // If boardId is NOT 'all', filter by board. If 'all', return everything.
    if (boardId !== 'all') {
      threads = threads.filter(t => t.boardId === boardId);
    }

    const sorted = threads.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

    // Pagination
    const pageSize = 50;
    const total = sorted.length;
    const totalPages = Math.ceil(total / pageSize);
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedThreads = sorted.slice(start, end);

    return {
      threads: paginatedThreads,
      total,
      page,
      pageSize,
      totalPages
    };
  }

  async getThreadContent(threadId: string, afterPostId?: number): Promise<ThreadDetail> {
    await this.delay();
    const thread = this.db.threads.find(t => t.id === threadId);
    if (!thread) throw new Error('Thread not found');

    // Real View Count Logic: Increment when actually viewed
    thread.viewCount = (thread.viewCount || 0) + 1;
    this.save();

    const posts = this.db.posts[threadId] || [];
    return { ...thread, posts };
  }

  async createThread(payload: CreateThreadRequest): Promise<string> {
    await this.delay();
    const threadId = crypto.randomUUID();
    const now = new Date().toISOString();

    // Logic: Process Name & Tripcode
    let displayName = payload.name || 'Anonymous';
    let tripcode = undefined;

    if (displayName.includes('#')) {
      const [namePart, passPart] = displayName.split('#');
      displayName = namePart || 'Anonymous';
      if (passPart) {
        tripcode = '◆' + simpleHash(passPart);
      }
    }

    const post: Post = {
      id: 1,
      threadId,
      name: displayName,
      tripcode,
      content: payload.content,
      createdAt: now,
      uid: generateDailyId(payload.boardId),
      isOp: true
    };

    const thread: Thread = {
      id: threadId,
      boardId: payload.boardId,
      title: payload.title,
      postCount: 1,
      viewCount: 0,
      createdAt: now,
      updatedAt: now,
      opPost: post
    };

    this.db.threads.push(thread);
    this.db.posts[threadId] = [post];
    this.save();
    return threadId;
  }

  async createPost(payload: CreatePostRequest): Promise<Post> {
    await this.delay();
    const thread = this.db.threads.find(t => t.id === payload.threadId);
    if (!thread) throw new Error('Thread not found');

    const now = new Date().toISOString();
    const posts = this.db.posts[payload.threadId];
    const newPostId = posts.length + 1;

    // Logic: Name & Tripcode
    let displayName = payload.name || 'Anonymous';
    let tripcode = undefined;

    if (displayName.includes('#')) {
      const [namePart, passPart] = displayName.split('#');
      displayName = namePart || 'Anonymous';
      if (passPart) {
        tripcode = '◆' + simpleHash(passPart);
      }
    }

    // Logic: Sage check
    const isSage = payload.email?.toLowerCase().includes('sage');

    const post: Post = {
      id: newPostId,
      threadId: payload.threadId,
      name: displayName,
      tripcode,
      content: payload.content,
      createdAt: now,
      uid: generateDailyId(thread.boardId),
      isOp: false
    };

    // Update DB
    posts.push(post);
    thread.postCount = posts.length;
    // Removed fake random view counting

    // Logic: Bump only if not sage
    if (!isSage) {
      thread.updatedAt = now;
    }

    this.save();
    return post;
  }
}

export const mockApi = new MockService();
