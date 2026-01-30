import { Board, CreatePostRequest, CreateThreadRequest, I7chAPI, Post, Thread, ThreadDetail } from "../types";
import { mockApi } from "./mockService";

class RealService implements I7chAPI {
  constructor(private readonly baseUrl: string) {}

  private async request<T>(path: string, init?: RequestInit): Promise<T> {
    const headers = new Headers(init?.headers);
    if (!headers.has("Content-Type") && init?.body) {
      headers.set("Content-Type", "application/json");
    }

    const res = await fetch(`${this.baseUrl}${path}`, {
      ...init,
      headers,
    });

    if (!res.ok) {
      throw new Error(`Request failed: ${res.status} ${res.statusText}`);
    }

    return res.json() as Promise<T>;
  }

  getBoards(): Promise<Board[]> {
    return this.request<Board[]>("/api/boards");
  }

  getThreads(boardId: string, page: number = 1): Promise<Thread[]> {
    const params = new URLSearchParams({ boardId, page: String(page) });
    return this.request<Thread[]>(`/api/threads?${params.toString()}`);
  }

  getThreadContent(threadId: string, afterPostId?: number): Promise<ThreadDetail> {
    void afterPostId;
    return this.request<ThreadDetail>(`/api/threads/${encodeURIComponent(threadId)}`);
  }

  createThread(payload: CreateThreadRequest): Promise<string> {
    return this.request<string>("/api/threads", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  createPost(payload: CreatePostRequest): Promise<Post> {
    return this.request<Post>("/api/posts", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }
}

const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? "http://localhost:8080";
const useMock = ((import.meta.env.VITE_USE_MOCK as string | undefined) ?? "false") === "true";

export const api: I7chAPI = useMock ? mockApi : new RealService(apiBaseUrl);
