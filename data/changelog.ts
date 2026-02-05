export interface ChangelogEntry {
  date: string;
  title: string;
  version: string;
  changes: string[];
}

export const changelogData: ChangelogEntry[] = [
  {
    "date": "Feb 4, 2026",
    "title": "Update 2026-02-04",
    "version": "build-20260204",
    "changes": [
      "[Frontend] Integrate changelog update into build process",
      "[Frontend] Update changelog with frontend feature entry",
      "[Frontend] Add changelog feature with page, data, and update script",
      "[Backend] refactor: reorganize code structure and add backup tool"
    ]
  },
  {
    "date": "Feb 3, 2026",
    "title": "Update 2026-02-03",
    "version": "build-20260203",
    "changes": [
      "[Frontend] Update i18n, PrivacyPolicy and Terms",
      "[Frontend] Update i18n and Docs",
      "[Frontend] Update README",
      "[Frontend] Update App.tsx",
      "[Backend] Add README"
    ]
  },
  {
    "date": "Feb 2, 2026",
    "title": "Update 2026-02-02",
    "version": "build-20260202",
    "changes": [
      "[Frontend] feat: 实现混合分页功能",
      "[Backend] feat: implement profanity filter and update configuration",
      "[Backend] feat: API添加分页支持"
    ]
  },
  {
    "date": "Feb 1, 2026",
    "title": "Update 2026-02-01",
    "version": "build-20260201",
    "changes": [
      "[Frontend] 修复移动端登录对话框的JSX结构问题\\n\\n将移动端登录对话框移到正确的JSX位置，修复因结构错误导致的编译问题。",
      "[Frontend] 修复Tailwind CSS类名错误\\n\\n将z-[100]修正为标准的z-50，避免TypeScript编译错误。",
      "[Frontend] 修复移动端登录对话框显示问题\\n\\n增加z-index层级，添加滚动支持，并修复Link组件的点击处理，确保移动端登录对话框能够正确显示。",
      "[Frontend] 修复移动端下拉菜单中登录按钮的问题\\n\\n在移动端下拉菜单中添加了登录对话框的状态管理，使点击登录按钮时能正确显示弹窗。\\n使用独立的showMobileLoginDialog状态来控制移动端登录对话框的显示。",
      "[Frontend] 移动端头部导航优化\\n\\n将移动端的导航元素（登录、板块列表、我的收藏、语言切换）整合到下拉菜单中，\\n解决元素拥挤的问题。桌面端布局保持不变。",
      "[Frontend] 修复链接域名问题\\n\\n将显示的链接域名从 https://7ch.net/ 修正为实际部署域名 https://7ch-web.vercel.app/",
      "[Frontend] 修复帖子概览中的链接问题\\n\\n将假链接（href=\"#\"）替换为真实的路由链接，使帖子链接可以正确导航到对应页面。",
      "[Frontend] 修复QA页面重复的'A:'问题\\n\\n删除了组件中硬编码的<strong>A:</strong>标签，因为翻译文件中已经包含了'A:'，\\n避免了'A: A:'这样的重复显示问题。"
    ]
  },
  {
    "date": "Jan 31, 2026",
    "title": "Update 2026-01-31",
    "version": "build-20260131",
    "changes": [
      "[Frontend] Update App.tsx and index.html",
      "[Frontend] Update vercel.json",
      "[Frontend] Update frontend: modify App.tsx, ThreadDetail.tsx and add vercel.json",
      "[Frontend] Update frontend components",
      "[Frontend] Update frontend: add DonateModal component and dialog UI",
      "[Backend] feat(logging): add env_logger middleware"
    ]
  },
  {
    "date": "Jan 30, 2026",
    "title": "Update 2026-01-30",
    "version": "build-20260130",
    "changes": [
      "[Frontend] feat(i18n): add internationalization for all static pages",
      "[Frontend] docs(qa): update contact email address",
      "[Frontend] feat(ui): implement client-side search for boards and threads",
      "[Frontend] fix(types): include vite/client for ImportMeta env typing",
      "[Frontend] perf(api): disable caching with no-store for fetch",
      "[Frontend] chore(repo): initial frontend import",
      "[Backend] feat(api): add rate limiting middleware",
      "[Backend] fix(api): expand CORS allowed origins for local preview",
      "[Backend] fix(db): schema-qualify queries and generate UUIDs in app",
      "[Backend] feat(api): bind to PORT and allow vercel CORS",
      "[Backend] chore(repo): initial backend import"
    ]
  },
  {
    "date": "Jan 28, 2026",
    "title": "Update 2026-01-28",
    "version": "build-20260128",
    "changes": [
      "[Frontend] Add routing support and static pages (QA, Docs, Privacy, Terms, Help)",
      "[Frontend] Initial commit: Anonymous BBS application"
    ]
  }
];
