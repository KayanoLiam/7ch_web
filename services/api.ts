import {
  Board,
  CreateSubscriptionLinkRequest,
  CreateSubscriptionLinkResponse,
  CreatePostRequest,
  CreateThreadRequest,
  I7chAPI,
  PaginatedThreads,
  Post,
  SubscriptionConvertRequest,
  SubscriptionConvertResponse,
  Thread,
  ThreadDetail,
} from "../types";
import { mockApi } from "./mockService";

// 真实 API 实现：集中处理 fetch/JSON/错误与缓存策略。
// Real API implementation: centralizes fetch/JSON/error handling and cache policy.

class RealService implements I7chAPI {
  constructor(private readonly baseUrl: string) { }

  private async request<T>(path: string, init?: RequestInit): Promise<T> {
    // 若携带 body 且未指定 Content-Type，则默认 JSON。
    // If body exists and Content-Type is missing, assume JSON.
    const headers = new Headers(init?.headers);
    if (!headers.has("Content-Type") && init?.body) {
      headers.set("Content-Type", "application/json");
    }

    // 统一禁用缓存，确保列表与实时状态尽量新。
    // Disable cache to keep lists and realtime state fresh.
    const res = await fetch(`${this.baseUrl}${path}`, {
      ...init,
      headers,
      cache: "no-store",
    });

    if (!res.ok) {
      let message = `Request failed: ${res.status} ${res.statusText}`;
      const contentType = res.headers.get("Content-Type") || "";
      if (contentType.toLowerCase().includes("application/json")) {
        try {
          const body = await res.json() as { message?: string };
          if (body.message && body.message.trim().length > 0) {
            message = body.message;
          }
        } catch {
          // Keep fallback message when body is not valid JSON.
        }
      }
      throw new Error(message);
    }

    return res.json() as Promise<T>;
  }

  getBoards(): Promise<Board[]> {
    return this.request<Board[]>("/api/boards");
  }

  getThreads(boardId: string, page: number = 1): Promise<PaginatedThreads> {
    const params = new URLSearchParams({ boardId, page: String(page) });
    return this.request<PaginatedThreads>(`/api/threads?${params.toString()}`);
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

  convertSubscription(payload: SubscriptionConvertRequest): Promise<SubscriptionConvertResponse> {
    return this.request<SubscriptionConvertResponse>("/api/subscription/convert", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  createSubscriptionLink(payload: CreateSubscriptionLinkRequest): Promise<CreateSubscriptionLinkResponse> {
    return this.request<CreateSubscriptionLinkResponse>("/api/subscription/link", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }
}

const envBase = (import.meta.env.VITE_API_BASE_URL as string | undefined);
const defaultBase = "http://localhost:8080";
const isVercel = typeof window !== "undefined" && window.location.hostname.endsWith(".vercel.app");
const vercelFallbackBase = "https://backend-7ch.onrender.com";
// API 基址优先级：显式环境变量 > Vercel 回退 > 本地默认。
// API base priority: env override > Vercel fallback > local default.
export const apiBaseUrl = (envBase && envBase.trim().length > 0 ? envBase : (isVercel ? vercelFallbackBase : defaultBase));
export const useMock = ((import.meta.env.VITE_USE_MOCK as string | undefined) ?? "false") === "true";

// 根据开关选择真实服务或本地 Mock。
// Switch between real service and local mock by flag.
export const api: I7chAPI = useMock ? mockApi : new RealService(apiBaseUrl);
