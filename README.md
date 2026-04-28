# 7ch Frontend

Anonymous textboard frontend for 7ちゃんねる, built with Next.js App Router.

## Overview

7ch is a lightweight anonymous bulletin board inspired by classic textboard workflows. This repository contains the frontend application: board browsing, thread pages, posting forms, local user preferences, static documentation pages, SEO metadata, and same-origin API proxy routes for the Rust backend.

The frontend is currently implemented with Next.js 15 and React 19. A Vite SPA entrypoint still exists in the repository for legacy compatibility, but the default build and Docker image use Next.js.

The primary backend lives in the sibling `backend_7ch/` project and is implemented with Rust and Actix Web. It provides boards, threads, posts, SSE events, SEO thread feeds, health checks, and subscription conversion APIs that are still retained for compatibility.

## Features

- Board index with backend-provided boards plus a static read-only links board.
- Thread lists with pagination, mobile "load more", search query forwarding, reply counts, and view counts.
- Thread detail pages with posts, daily IDs, tripcodes, quote interactions, and JSON-LD metadata.
- Anonymous thread and reply forms backed by same-origin Next route handlers.
- Local-only followed threads / favorites and hidden thread preferences.
- Chinese and Japanese UI dictionaries with localized static page routing.
- Theme modes for light, dark, and system preferences, plus theme variants.
- Server-side metadata, sitemap generation, robots configuration, and dynamic Open Graph image support for threads.
- Realtime notices through a same-origin `/api/events` SSE proxy.
- Service pause and rate-limit handling pages.
- Static pages for docs, help, QA, privacy, terms, changelog, and common external links.
- Legacy redirects for old `read.cgi`-style thread URLs.

## Tech Stack

- **Framework:** Next.js 15 App Router
- **UI:** React 19, TypeScript
- **Styling:** Tailwind CSS, tailwindcss-animate, CSS custom properties
- **Components:** Radix UI primitives, Lucide React icons
- **Content rendering:** react-markdown, remark-gfm, remark-breaks, react-syntax-highlighter
- **Internationalization:** local dictionaries plus i18next/react-i18next for legacy client code
- **Legacy build path:** Vite 6 + React Router 7
- **Backend integration:** Rust / Actix Web API in `../backend_7ch`
- **Deployment:** Vercel or Docker

## Screenshots / Demo

No committed screenshots are currently present in this frontend repository.

Recommended placeholders:

- Home / board index
- Board thread list
- Thread detail page
- Mobile layout
- Dark theme

Known deployed URL referenced in project history: `https://7ch-web.vercel.app`

## Getting Started

### Prerequisites

- Node.js 20 or newer
- npm
- A running backend API for real data, usually `backend_7ch` on port `8080`
- PostgreSQL and required backend environment variables if you run the Rust backend locally

### Installation

```bash
cd 7ch---anonymous-bbs
npm install
cp .env.example .env.local
```

Edit `.env.local` for your local backend:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
BACKEND_API_BASE_URL=http://localhost:8080
REVALIDATE_SECRET=replace-me

# Legacy SPA compatibility
VITE_API_BASE_URL=http://localhost:8080
VITE_USE_MOCK=false
VITE_FORCE_SERVICE_PAUSED=false
```

### Run Locally

Start the frontend:

```bash
npm run dev
```

`npm run dev` starts the legacy Vite development server on port `3000`. For the current Next.js App Router application, use:

```bash
npm run next:dev
```

The Next app also defaults to port `3000`. If you run both development servers, start one of them on a different port.

Start the Rust backend from the sibling project:

```bash
cd ../backend_7ch
cargo run
```

The backend listens on `0.0.0.0:8080` by default.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the legacy Vite development server. |
| `npm run next:dev` | Start the Next.js development server. |
| `npm run build` | Build the Next.js application. |
| `npm run next:build` | Explicit alias for `next build`. |
| `npm run next:start` | Start the built Next.js app. |
| `npm run vite:build` | Build the legacy Vite SPA. |
| `npm run vite:build:with-changelog` | Regenerate changelog data, then build the Vite SPA. |
| `npm run preview` | Preview the Vite build. |
| `npm run update-changelog` | Update `data/changelog.ts` from Git history. |

## Environment Variables

| Variable | Required | Used by | Description |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Required in production | Next.js | Public site origin used by metadata, canonical URLs, sitemap, and Open Graph output. |
| `BACKEND_API_BASE_URL` | Required in production | Next.js server/runtime | Backend API origin. The value may include or omit a trailing `/api`; the app normalizes it. |
| `REVALIDATE_SECRET` | Required for revalidation webhook | Next.js route handler | Bearer token for `POST /api/revalidate`. |
| `VITE_API_BASE_URL` | Legacy only | Vite SPA | Backend API origin for legacy client-side API calls. |
| `VITE_USE_MOCK` | Legacy only | Vite SPA | Set to `true` to use the LocalStorage mock service. |
| `VITE_FORCE_SERVICE_PAUSED` | Legacy only | Vite SPA | Set to `true` to force service-pause handling in the legacy client. |
| `VITE_DEV_HOST` | Optional | Vite dev server | Override Vite host, for example `0.0.0.0`. |
| `VITE_USE_POLLING` | Optional | Vite dev server | Force file watcher polling. Defaults to polling on mounted volumes. |
| `VITE_POLLING_INTERVAL` | Optional | Vite dev server | Polling interval in milliseconds. |

The repository includes `.env.example`. A workspace-level `.env.example` also exists one directory above and is intended for the Docker Compose setup.

## Project Structure

```text
7ch---anonymous-bbs/
├── app/                         # Next.js App Router pages, metadata, sitemaps, and API route proxies
│   ├── api/                     # Same-origin API routes for events, posts, threads, and revalidation
│   ├── board/                   # Board and thread routes
│   ├── docs/ help/ QA/          # Static information pages
│   └── layout.tsx               # Root layout, providers, header, footer, realtime notices
├── components/                  # Shared React components and UI primitives
├── components/ui/               # Small Radix/shadcn-style UI primitives
├── data/                        # Changelog data and static common links
├── features/                    # Feature-oriented server and client components
├── legacy-pages/                # Legacy page components retained for compatibility
├── lib/                         # API clients, constants, i18n, SEO, routing, and utility code
├── scripts/                     # Maintenance scripts such as changelog generation
├── services/                    # Legacy Vite API client and LocalStorage mock service
├── Dockerfile                   # Production Next.js Docker image
├── middleware.ts                # Locale routing middleware for static pages
├── next.config.mjs              # Next.js config, redirects, and security headers
├── tailwind.config.js           # Tailwind theme configuration
├── vite.config.ts               # Legacy Vite config
└── types.ts                     # Shared frontend/backend TypeScript contracts
```

## API Overview

The Next.js frontend talks to the Rust backend through server-side helpers in `lib/api/server.ts` and through same-origin route handlers under `app/api/`.

### Frontend Route Handlers

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/api/threads?boardId=:boardId&page=:page&q=:query` | Proxy thread list requests to the backend. |
| `POST` | `/api/threads` | Create a thread, then revalidate board caches. |
| `GET` | `/api/threads/:threadId?trackView=false` | Proxy thread detail requests to the backend. |
| `POST` | `/api/posts` | Create a reply, then revalidate thread and board caches. |
| `GET` | `/api/events` | Proxy backend Server-Sent Events as a same-origin event stream. |
| `POST` | `/api/revalidate` | Revalidate cache tags for `thread_created` and `post_created` events. |

`POST /api/revalidate` requires:

```http
Authorization: Bearer <REVALIDATE_SECRET>
Content-Type: application/json
```

Accepted bodies:

```json
{ "event": "thread_created", "boardId": "general" }
```

```json
{ "event": "post_created", "boardId": "general", "threadId": "thread-id" }
```

### Backend API Expected by the Frontend

| Method | Path | Notes |
| --- | --- | --- |
| `GET` | `/healthz` | Backend liveness check. |
| `GET` | `/api/boards` | Board list. |
| `GET` | `/api/threads` | Paginated thread list; supports `boardId`, `page`, and `q`. |
| `GET` | `/api/threads/{thread_id}` | Thread detail; supports `trackView`. |
| `POST` | `/api/threads` | Create a thread. |
| `POST` | `/api/posts` | Create a reply. |
| `GET` | `/api/events` | SSE stream. |
| `GET` | `/api/seo/threads` | Cursor-based thread feed used for sitemap generation. |
| `POST` | `/api/subscription/convert` | Retained by backend for compatibility; the frontend page is hidden. |
| `POST` | `/api/subscription/link` | Retained by backend for compatibility; the frontend page is hidden. |
| `GET` | `/api/sub` | Retained by backend for compatibility. |

Data contracts are defined in `types.ts` and use camelCase response fields.

## Deployment

### Vercel

The project can be deployed as a standard Next.js application. Configure at least:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.example
BACKEND_API_BASE_URL=https://your-backend.example
REVALIDATE_SECRET=<strong-random-token>
```

`next.config.mjs` defines security headers and redirects:

- `/test/read.cgi/:boardId/:threadId` -> `/board/:boardId/thread/:threadId`
- `/tools/convert` -> `/`

`vercel.json` also contains security headers, a legacy `/api/:path*` rewrite to the Render backend, and the old `read.cgi` redirect. Keep it aligned with `next.config.mjs` if deployment behavior changes.

### Docker

Build the frontend image:

```bash
docker build \
  --build-arg NEXT_PUBLIC_SITE_URL=http://localhost:3000 \
  --build-arg BACKEND_API_BASE_URL=http://backend:8080 \
  --build-arg REVALIDATE_SECRET=replace-me \
  -t 7ch-frontend .
```

Run it:

```bash
docker run --rm -p 3000:3000 \
  -e NEXT_PUBLIC_SITE_URL=http://localhost:3000 \
  -e BACKEND_API_BASE_URL=http://host.docker.internal:8080 \
  -e REVALIDATE_SECRET=replace-me \
  7ch-frontend
```

From the workspace root, `docker-compose.yml` can build and run both the frontend and `backend_7ch` service:

```bash
cd ..
cp .env.example .env
docker compose up --build
```

The Compose setup expects backend database credentials in the workspace `.env`.

## Testing and Quality

There is no dedicated frontend test suite currently committed. For frontend changes, run at least:

```bash
npm run build
```

For backend contract changes, run the Rust backend tests from `../backend_7ch`:

```bash
cargo test
```

## Roadmap

The codebase suggests these active or likely maintenance areas:

- Continue the migration from legacy Vite SPA code to the Next.js App Router implementation.
- Keep frontend API contracts aligned with the Rust backend.
- Add focused frontend tests for forms, route handlers, preferences, and i18n behavior.
- Add real project screenshots or demo GIFs.
- Improve operational documentation for cache revalidation and production deployment.

## Contributing

Issues and pull requests are welcome. Please keep changes scoped and include the project area touched in your description.

Before opening a PR:

- Run `npm run build` for frontend changes.
- Run `cargo test` in `../backend_7ch` when backend API behavior is affected.
- Include screenshots or screen recordings for visible UI changes.
- Document new environment variables and API contract changes.
- Keep behavior aligned with the Rust backend if you touch legacy API clients or shared types.

The Git history uses Conventional Commit-style messages such as `feat:`, `fix:`, `docs:`, and `chore:`.

## License

Apache License 2.0. See [LICENSE](./LICENSE).

## Author

Maintained by the repository owner.

Contact address referenced by the application QA page: `Piercekaoru@proton.me`.
