export interface Board {
  id: string;
  name: string;
  description: string;
}

export interface Post {
  id: number; // Floor number (1, 2, 3...)
  threadId: string;
  name: string; // Display name (processed)
  tripcode?: string; // Optional tripcode display
  content: string;
  createdAt: string; // ISO String
  uid: string; // Daily ID based on IP/Device
  isOp: boolean; // Is this the thread starter?
}

export interface Thread {
  id: string;
  boardId: string;
  title: string;
  postCount: number;
  viewCount: number; // New visual field
  updatedAt: string; // For sorting (bump)
  createdAt: string;
  opPost: Post; // Preview of the first post
}  

export interface ThreadDetail extends Thread {
  posts: Post[];
}

// Request Payloads
export interface CreateThreadRequest {
  boardId: string;
  title: string;
  name?: string;
  email?: string; // For sage
  content: string;
}

export interface CreatePostRequest {
  threadId: string;
  name?: string;
  email?: string;
  content: string;
}

// The Contract
export interface I7chAPI {
  getBoards(): Promise<Board[]>;
  getThreads(boardId: string, page?: number): Promise<Thread[]>;
  getThreadContent(threadId: string, afterPostId?: number): Promise<ThreadDetail>;
  createThread(payload: CreateThreadRequest): Promise<string>; // returns threadId
  createPost(payload: CreatePostRequest): Promise<Post>;
}