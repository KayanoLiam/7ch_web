
# 7ch - Anonymous BBS (Next-Gen Textboard)

这是一个基于 React 19 + TypeScript 的现代匿名讨论区（类 2ch/5ch 风格）的前端项目。
目前的版本使用 `MockService` 和 `LocalStorage` 运行。

**本文档旨在作为后端开发的详细规格说明书。请 AI Agent 或后端开发者严格按照以下规范实现后端逻辑。**

---

## 🛠 技术栈要求 (后端建议)

*   **Language:** Rust (Actix-web) 或 Go (Gin) / Node.js (Hono/Express)
*   **Database:** PostgreSQL (推荐) 或 MySQL
*   **ORM:** SQLx / Gorm / Prisma
*   **Protocol:** RESTful API

---

## 1. 核心业务逻辑 (Business Logic)

后端必须实现以下经典 BBS 特性：

### A. 每日 ID 系统 (Daily ID)
*   **前端表现**: `ID:A1b2C3d4`
*   **生成规则**: 用户不需要注册。ID 是根据用户的 **IP地址**、**当前日期** 和 **所在板块** 计算生成的哈希值。
*   **算法逻辑**:
    ```
    RawString = IP_Address + Date(YYYY-MM-DD) + Board_ID + Server_Secret_Salt
    Daily_ID = Substring(Base64(SHA256(RawString)), 0, 8)
    ```
*   **目的**: 在保护隐私（不存 IP）的前提下，识别同一天内同一板块的发言者。ID 必须在每天 00:00 (UTC 或服务器时区) 自动轮换。

### B. 绊码 (Tripcodes)
*   **前端表现**: 用户在名字栏输入 `Name#password`，显示为 `Name ◆HashValue`。
*   **后端处理**:
    1.  接收 `name` 字段。
    2.  检测是否存在 `#` 分隔符。
    3.  如果存在，将 `#` 之后的部分进行哈希处理（传统为 DES，现代可用 SHA256 截取）。
    4.  数据库中存两个字段：`display_name` (Name) 和 `tripcode` (◆HashValue)。
    5.  **注意**: 密码部分**永远不要**明文存储，也不要返回给前端。

### C. Sage 机制 (下沉)
*   **功能**: 回复帖子通常会将帖子顶到板块列表的最上方（Bump）。如果用户在 Email 栏填入 `sage`，则只回复，不顶贴。
*   **后端逻辑**:
    *   **普通回复**: 插入 Post，更新 Thread 的 `updated_at` 为当前时间，`post_count + 1`。
    *   **Sage 回复**: 插入 Post，**不**更新 Thread 的 `updated_at`，只更新 `post_count + 1`。

### D. 引用 (Anchors)
*   **逻辑**: 前端负责解析 `>>123` 这种文本并渲染为链接。
*   **后端任务**: 只需要原样存储文本内容，无需做特殊处理。

---

## 2. 数据库模型设计 (Database Schema)

应该检查表是否已经创建

推荐使用以下关系模型：

### Table: `boards` (可选，也可以硬编码在配置中)
| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | VARCHAR (PK) | e.g., "news", "vip", "acg" |
| `name` | VARCHAR | 板块名称 |
| `description` | TEXT | 描述 |

### Table: `threads`
| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID (PK) | 唯一标识符 |
| `board_id` | VARCHAR | 关联 Boards |
| `title` | VARCHAR | 标题 |
| `is_closed` | BOOLEAN | 是否锁帖 (Default: false) |
| `view_count` | INT | 浏览量 |
| `post_count` | INT | 帖子总数 (缓存值，用于列表展示) |
| `created_at` | DATETIME | 创建时间 |
| `updated_at` | DATETIME | **核心排序字段** (Bump 机制用) |

### Table: `posts`
| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID (PK) | 内部唯一主键 |
| `thread_id` | UUID (FK) | 关联 Threads |
| `post_number`| INT | **楼层号** (1, 2, 3...)，单个 Thread 内递增 |
| `name` | VARCHAR | 显示名称 (默认为 "Anonymous") |
| `tripcode` | VARCHAR | 绊码 (Nullable) |
| `email` | VARCHAR | 邮箱 (用于 sage 检测) |
| `content` | TEXT | 正文 |
| `uid` | VARCHAR | 计算后的每日 ID |
| `ip_address` | INET | 来源 IP (仅用于后台计算 ID 和封禁，不公开) |
| `is_op` | BOOLEAN | 是否是楼主 (1楼) |
| `created_at` | DATETIME | 发布时间 |

---

## 3. API 接口契约 (API Contract)

所有接口应返回 JSON。

### 1. 获取板块列表
*   **GET** `/api/boards`
*   **Response**: `Board[]`

### 2. 获取帖子列表
*   **GET** `/api/threads?boardId={id}`
*   **Query Params**:
    *   `boardId`: (Required) 板块 ID，如果为 "all" 则返回所有板块。
    *   `page`: (Optional) 分页。
*   **Logic**:
    *   按 `updated_at` **降序**排列 (最新回复在最前)。
    *   必须包含 `opPost` (即该 Thread 的第 1 楼内容) 用于预览。
*   **Response**: `Thread[]` (见 `types.ts`)

### 3. 获取帖子详情
*   **GET** `/api/threads/{threadId}`
*   **Logic**:
    *   返回 Thread 元数据。
    *   返回该 Thread 下的所有 Posts，按 `post_number` **升序**排列。
    *   **Side Effect**: 增加该 Thread 的 `view_count`。
*   **Response**: `ThreadDetail` (Thread + posts array)

### 4. 发布新帖 (Create Thread)
*   **POST** `/api/threads`
*   **Body**:
    ```json
    {
      "boardId": "news",
      "title": "Discussion Title",
      "name": "User#pass",
      "email": "",
      "content": "Body text"
    }
    ```
*   **Transaction**:
    1.  生成 UUID。
    2.  插入 `threads` 表。
    3.  插入 `posts` 表 (作为第 1 楼, `is_op=true`)。
*   **Response**: `threadId` (String)

### 5. 回复帖子 (Reply)
*   **POST** `/api/posts`
*   **Body**:
    ```json
    {
      "threadId": "uuid-string",
      "name": "User",
      "email": "sage", 
      "content": "Replying to >>1"
    }
    ```
*   **Transaction**:
    1.  计算当前 Thread 最大 `post_number` + 1。
    2.  插入 `posts` 表。
    3.  更新 `threads` 表：
        *   `post_count` + 1
        *   **如果 email 不包含 "sage"**: 更新 `updated_at` = NOW()。
        *   **如果 email 包含 "sage"**: 不更新 `updated_at`。
*   **Response**: `Post` 对象

---

## 4. 前端类型定义参考 (Types Reference)

请参考 `types.ts` 确保 JSON 字段名一致。

```typescript
export interface Post {
  id: number; // 注意：前端显示的 ID 是 post_number (楼层号)，不是 UUID
  threadId: string;
  name: string;
  tripcode?: string;
  content: string;
  createdAt: string; // ISO 8601
  uid: string;
  isOp: boolean;
}
```

## 5. 开发指引

1.  **数据库**: 请编写 SQL 迁移脚本 (`.sql`) 初始化上述表结构。
2.  **安全性**: 确保 SQL 注入防护，确保 IP 地址获取逻辑能穿透反向代理 (X-Forwarded-For)。
3.  **CORS**: 允许前端开发端口 (通常 `http://localhost:3000`) 访问 API。
