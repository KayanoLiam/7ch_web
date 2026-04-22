# 7ch Frontend

`7ch---anonymous-bbs/` 现在是一个统一的 `Next.js 15 App Router` 前端工程，不再保留 `Vite + React Router` 的双栈运行方式。

前端部署目标仍然是 `Vercel`，主要后端是 `backend_7ch/`，线上通常部署在 `Render`。

## 当前栈

- `Next.js 15`
- `React 19`
- `TypeScript`
- `Tailwind CSS`
- `i18next + react-i18next`
- `Radix UI`

## 目录结构

```text
.
├── app/                    # App Router 路由、layout、route handlers、sitemap
├── features/               # 页面级功能模块
├── components/             # 通用组件与 UI primitives
├── lib/                    # API、SEO、i18n、客户端偏好等基础能力
├── data/                   # changelog、常用链接等静态数据
├── scripts/                # 构建前脚本
├── i18n.ts                 # i18next 初始化
├── index.css               # 全局样式
├── next.config.mjs         # Next 配置
├── vercel.json             # Vercel 重写与安全响应头
└── types.ts                # 前后端契约
```

## 开发命令

```bash
npm install
npm run dev
npm run build
npm run start
```

说明：

- `npm run dev`：启动 `Next.js` 开发服务器。
- `npm run build`：先刷新 `data/changelog.ts`，再执行 `next build`。
- `npm run start`：启动生产构建产物。
- `npm run preview`：等价于 `npm run start`。
- `npm run next:build`：只执行 `next build`，适合在不想改动 changelog 时做纯编译验证。

## 环境变量

使用 `.env.local` 或部署平台环境变量：

```dotenv
NEXT_PUBLIC_SITE_URL=http://localhost:3000
BACKEND_API_BASE_URL=http://localhost:8080
REVALIDATE_SECRET=replace-me
```

规则：

- `NEXT_PUBLIC_SITE_URL`：metadata、canonical、Open Graph、sitemap 使用的站点地址。
- `BACKEND_API_BASE_URL`：Server Components、Route Handlers、SSE 代理、sitemap 拉取后端数据时使用。
- `REVALIDATE_SECRET`：`/api/revalidate` 的鉴权令牌。

生产环境缺失关键变量时，前端会直接 fail fast，不再回退到旧的 Vite 兼容配置。

## 路由与能力

主要页面：

- `/`
- `/board/[boardId]`
- `/board/[boardId]/page/[page]`
- `/board/[boardId]/thread/[threadId]`
- `/board/links`
- `/board/links/thread/[linkId]`
- `/favorites`
- `/docs`
- `/help`
- `/QA`
- `/privacy`
- `/terms`
- `/changelog`
- `/service-paused`
- `/rate-limited`

补充：

- `/tools/convert` 当前保留为重定向入口，直接跳回首页。
- 旧路径 `/test/read.cgi/:boardId/:threadId` 已通过 Next 路由与部署配置统一重定向到新线程地址。

## 数据流

当前前端不再包含旧 SPA 的 `services/api.ts` / `services/mockService.ts` 双实现。

活跃链路是：

1. Server Components 通过 `lib/api/server.ts` 读取后端数据。
2. 客户端发帖与回帖通过 Next 同源 Route Handlers：
   - `app/api/threads/route.ts`
   - `app/api/posts/route.ts`
3. 实时通知通过同源 `app/api/events/route.ts` 代理后端 SSE。
4. 缓存刷新通过 `app/api/revalidate/route.ts` 处理。

## SEO 与部署

当前前端已经把这些能力放到 Next 主链路里：

- 页面级 metadata
- canonical / Open Graph / Twitter card
- `robots.txt`
- 分片 sitemap
- 线程页 JSON-LD
- OG image route

`vercel.json` 仍负责：

- 同源 `/api/*` 转发到后端
- 安全响应头
- 历史路径重定向

## 迁移结果

2026-04-22 起，前端仓库不再保留以下旧链路：

- `Vite` 开发与构建配置
- `React Router` SPA 入口
- `legacy-pages/` 兼容页面
- 本地 `Mock Service`

后续如果要恢复某个隐藏功能，应直接按 `Next.js App Router` 方式实现，而不是重新引入旧 SPA 壳。
