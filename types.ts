// 数据契约：与后端 API 字段保持 camelCase 一致。
// Data contracts: keep camelCase aligned with backend responses.
export interface Board {
  id: string;
  name: string;
  description: string;
}

export interface Post {
  id: number; // 楼层号（1,2,3...）/ Floor number (1,2,3...)
  threadId: string;
  name: string; // 显示名（处理后）/ Display name (processed)
  tripcode?: string; // 绊码显示 / Optional tripcode display
  content: string;
  createdAt: string; // ISO 时间串 / ISO timestamp
  uid: string; // 每日 ID / Daily ID
  isOp: boolean; // 是否楼主 / Is this the thread starter?
}

export type TransportationCovered = 'yes' | 'partial' | 'no';
export type YesNo = 'yes' | 'no';
export type YesNoUnknown = 'yes' | 'no' | 'unknown';
export type JapaneseRequirement = 'n1' | 'n2' | 'n3' | 'simple_conversation' | 'unrestricted';
export type ContactType = 'phone' | 'email' | 'line' | 'wechat' | 'url' | 'other';

export interface JobMeta {
  region: string;
  nearestStation: string;
  hourlyWageMinJpy: number;
  hourlyWageMaxJpy?: number;
  hourlyWageNote?: string;
  monthlyWageMinJpy: number;
  monthlyWageMaxJpy?: number;
  monthlyWageNote?: string;
  transportationCovered: TransportationCovered;
  internationalStudentsAccepted: YesNo;
  noExperienceAccepted: YesNo;
  japaneseRequirement: JapaneseRequirement;
  visaRequirement: string;
  shiftStyle: string;
  housingProvided: YesNo;
  housingSubsidy: string;
  hasChineseStaff: YesNoUnknown;
  businessType: string;
  companySize: string;
  contactType: ContactType;
  contactValue: string;
}

export interface Thread {
  id: string;
  boardId: string;
  title: string;
  postCount: number;
  viewCount: number; // 浏览量 / View count
  updatedAt: string; // 排序依据（被顶时间）/ For sorting (bump)
  createdAt: string;
  jobMeta?: JobMeta;
  opPost: Post; // OP 预览 / Preview of the first post
}  

export interface ThreadDetail extends Thread {
  posts: Post[];
}

// 请求体模型 / Request payloads
export interface CreateThreadRequest {
  boardId: string;
  title: string;
  name?: string;
  email?: string; // sage 判定 / For sage
  content: string;
  jobMeta?: JobMeta;
}

export interface CreatePostRequest {
  threadId: string;
  name?: string;
  email?: string;
  content: string;
}

export interface SubscriptionConvertRequest {
  sourceUrl: string;
  sourceFormat: 'clash';
  targetFormat: 'sing-box';
}

export interface SubscriptionConvertMeta {
  sourceFormat: 'clash';
  targetFormat: 'sing-box';
  elapsedMs: number;
  contentBytes: number;
  nodeCount?: number;
}

export interface SubscriptionConvertResponse {
  content: string;
  warnings: string[];
  meta: SubscriptionConvertMeta;
}

export interface CreateSubscriptionLinkRequest {
  sourceUrl: string;
  sourceFormat: 'clash';
  targetFormat: 'sing-box';
  expiresInSeconds?: number;
}

export interface CreateSubscriptionLinkResponse {
  url: string;
  token: string;
  displayUrl?: string;
  expiresAt?: string;
}

// 分页返回结构 / Pagination response
export interface PaginatedThreads {
  threads: Thread[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface SeoThread {
  id: string;
  boardId: string;
  createdAt: string;
  updatedAt: string;
}

export interface SeoThreadsPage {
  threads: SeoThread[];
  nextCursor?: string;
}

// API 契约 / API contract
export interface I7chAPI {
  getBoards(): Promise<Board[]>;
  getThreads(boardId: string, page?: number): Promise<PaginatedThreads>;
  getThreadContent(threadId: string, afterPostId?: number): Promise<ThreadDetail>;
  createThread(payload: CreateThreadRequest): Promise<string>; // returns threadId
  createPost(payload: CreatePostRequest): Promise<Post>;
  convertSubscription(payload: SubscriptionConvertRequest): Promise<SubscriptionConvertResponse>;
  createSubscriptionLink(payload: CreateSubscriptionLinkRequest): Promise<CreateSubscriptionLinkResponse>;
}
