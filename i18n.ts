import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  'zh-CN': {
    translation: {
      "dialog.login.button": "登录/注册",
      "dialog.login.title": "我们尚未也不会提供传统的账号注册与登录系统。",
      "dialog.login.description": "为了您的隐私考虑，我们尚未也不会提供传统的账号注册与登录系统。在 7ch，您就是无名氏 (NoName)。详情查看我们的技术文档。",
      "dialog.login.link_text": "技术文档",
      "dialog.login.close": "关闭",
      // Navigation
      "nav.boards": "板块列表",
      "nav.home": "首页",
      "nav.favorites": "我的收藏",
      "board.catalog": "目录",
      
      // Boards
      "board.all.name": "综合",
      "board.all.desc": "全站帖子聚合",
      "board.news.name": "新闻速报+",
      "board.news.desc": "突发新闻",
      "board.g.name": "技术",
      "board.g.desc": "编程、硬件",
      "board.acg.name": "二次元",
      "board.acg.desc": "动画、漫画、文化",
      "board.vip.name": "VIP",
      "board.vip.desc": "闲聊、杂谈",

      // Thread & Post
      "thread.title": "标题",
      "thread.name": "名字",
      "thread.email": "E-mail",
      "thread.content": "正文",
      "thread.submit": "发送",
      "thread.reply": "回复",
      "thread.new": "发布新帖",
      "thread.return": "返回",
      "meta.anonymous": "无名氏",
      "meta.sage": "sage",
      "meta.loading": "加载中...",
      "meta.id": "ID",
      "meta.hide": "隐藏",
      "meta.show": "显示",
      "meta.hidden_thread": "帖子已隐藏",
      "meta.follow": "关注",
      "meta.following": "已关注",
      "meta.no_favorites": "暂无收藏。去板块里关注一些帖子吧！",
      "error.required": "内容不能为空",
      "lang.zh": "中文",
      "lang.ja": "日本語",
      
      // Footer
      "footer.privacy": "隐私政策",
      "footer.tech": "技术文档",
      "footer.terms": "用户协议",
      "footer.help": "使用须知",
      "footer.QA": "常见问题",

      // Static Pages (使用模板字符串，自动处理换行)
      "page.privacy.title": "隐私政策",
      "page.privacy.content": `本站重视您的隐私。

1. 数据存储：本站演示版目前使用您的浏览器 LocalStorage 存储数据，不会上传至任何服务器。
2. ID生成：每日ID基于您的设备指纹哈希生成，我们不存储您的真实IP地址。
3. 追踪：本站不使用任何第三方 Cookies 进行行为追踪。`,

      "page.tech.title": "技术文档",
      "page.tech.content": `7ch 是一个基于 React 19 + TypeScript + Tailwind CSS 构建的现代 BBS 前端架构。

核心特性：
- Mock Service：在前端完整模拟了后端的业务逻辑（ID计算、Sage机制、Tripcode处理）。
- 国际化：基于 i18next 的完整多语言支持。
- 交互：实现了经典的引用预览（Anchor Tooltip）和键盘友好的操作流。`,

      "page.terms.title": "用户协议",
      "page.terms.content": `欢迎使用 7ch。

1. 请勿发布违反当地法律法规的内容。
2. 禁止发布垃圾广告或恶意刷屏。
3. 本站管理员有权在不通知的情况下删除任何违规内容。
4. 本站为匿名论坛，用户需对自己的言论负责。`,

      "page.help.title": "使用须知",
      "page.help.content": `基本操作指南：

1. 【绊码 Tripcode】：在名字栏输入 "Name#password"，发布后会显示为 "Name ◆Hash"，用于验证身份。
2. 【Sage】：在 E-mail 栏输入 "sage"，回复帖子时不会将帖子顶到列表最前。
3. 【引用】：点击楼层号（如 >>1）可快速插入回复引用。鼠标悬停在蓝色链接上可预览内容。
4. 【ID】：您的 ID 每天重置一次，同一天在同一板块内 ID 相同。`,

      "page.QA.title": "常见问题",
      "page.QA.content": `Q: 为什么在中国大陆无法直接访问？
A: 本站前端托管于 Vercel 的全球边缘网络。由于中国大陆地区的网络环境特殊，Vercel 的节点通常处于被阻断状态。这是一个面向全球互联网的匿名实验项目，如果您看到了这里，说明您已经具备了访问自由互联网的基础能力。

Q: 这里的“匿名”是真的吗？
A: 是的。本站移除了所有传统的账号注册与登录系统。此时此刻，你就是无名氏 (NoName)。我们不要求、也不存储您的手机号、邮箱或社交账号。

Q: 既然不登录，怎么区分“我是我”？
A: 我们利用客户端指纹（LocalStorage）与网络特征（IP Hash）来计算您当日的临时身份 ID。
注意：清除浏览器缓存、开启无痕模式或更换网络环境，都会导致您的 ID 发生变化。在 7ch，身份是流动的。

Q: 我凭什么相信你们不窃取隐私？
A: Don't Trust, Verify. (不要轻信，去验证) 
本项目的前端代码是完全开源的。任何人都可以审查我们的 GitHub 仓库，确保其中没有任何窃取数据的后门逻辑。（注：开源版本代码与线上运行版本完全一致，唯一的区别仅在于后端的 API 地址配置。）

Q: 既然是开源的，为什么我看不到屏蔽词列表？
A: 这是一个安全策略。为了防止垃圾广告发送者（Spammers）针对性地分析并绕过过滤系统，我们的屏蔽关键词库（NG Words）作为服务器环境变量存储，不包含在公开的代码仓库中。除配置数据外，所有的业务逻辑代码均完全透明。

Q: 我发错内容了，能删除帖子吗？
A: 不支持自助删除。由于采用了强匿名机制，系统在技术上无法验证“你是该帖子的发布者”，因此不提供删除按钮。（注：若您的帖子涉及严重违法、人肉搜索或隐私泄露，请通过下方的联系方式申请人工处理。）

Q: 发现违法/侵权内容如何处理？
A: 请发送邮件至 admin-7ch@proton.me。为了您的安全，建议您同样使用匿名邮箱进行联系。请在邮件中注明 Thread ID 和具体的违规理由，管理员会定期处理。

Q: 在这里发言有法律风险吗？
A: 互联网不是法外之地。虽然本站承诺不建立用户画像，但互联网的基础设施（ISP、电信运营商）依然有迹可循。如果您的言论涉及严重犯罪，执法机构仍可能通过技术手段定位到您。我们不对用户的言论负责，但在法律强制要求下，我们会配合提供仅有的服务器日志信息（如临时 ID 记录）。`,

      // Docs Page
      "docs.banner.title": "7ch 技术文档",
      "docs.banner.subtitle": "架构、规范和实现细节",
      "docs.toc.title": "目录",
      "docs.toc.overview": "项目概览",
      "docs.toc.architecture": "架构设计",
      "docs.toc.data-model": "数据模型",
      "docs.toc.features": "核心特性",
      "docs.toc.i18n": "国际化",
      "docs.overview.title": "项目概览",
      "docs.overview.intro": "7ch 是一个基于 React 19、TypeScript 和 Tailwind CSS 构建的现代化单页匿名 BBS 系统。",
      "docs.overview.description": "它旨在使用现代前端技术复制经典文本板（如 2ch/5ch）的核心体验。应用程序完全在浏览器中运行，使用由 LocalStorage 支持的模拟后端服务。",
      "docs.overview.frontend": "前端技术栈",
      "docs.overview.frontend.react": "React 19 (Hooks, StrictMode)",
      "docs.overview.frontend.typescript": "TypeScript (严格类型)",
      "docs.overview.frontend.tailwind": "Tailwind CSS (样式)",
      "docs.overview.frontend.i18n": "i18next (国际化)",
      "docs.overview.concepts": "核心概念",
      "docs.overview.concepts.no-router": "无路由 SPA（基于状态的视图）",
      "docs.overview.concepts.mock-api": "模拟 API 层",
      "docs.overview.concepts.identity": "临时身份（每日 ID）",
      "docs.overview.concepts.persistence": "客户端持久化",
      "docs.architecture.title": "架构设计",
      "docs.architecture.intro": "应用程序遵循标准的 React 组件化架构，但避免使用客户端路由库（如 react-router），以保持类似\"应用体验\"的简单扁平结构。",
      "docs.architecture.view-state": "视图状态机",
      "docs.architecture.view-state.desc": "主要导航由 App.tsx 中的单个状态对象处理：",
      "docs.architecture.view-state.desc2": "此状态决定渲染哪个主组件。像 ThreadView 这样的组件是动态挂载/卸载的，通过 useEffect 钩子触发数据获取。",
      "docs.data-model.title": "数据模型与持久化",
      "docs.data-model.intro": "数据存储在浏览器的 LocalStorage 中，键名为 7ch_db_v1。架构模仿关系数据库结构。",
      "docs.data-model.entities": "实体",
      "docs.data-model.entities.board": "板块：静态定义（ID、名称、描述）。",
      "docs.data-model.entities.thread": "主题：包含元数据（标题、帖子数、更新时间）和 OP（原始发布者）内容预览。",
      "docs.data-model.entities.post": "帖子：与主题 ID 关联的单个条目。",
      "docs.features.title": "核心特性实现",
      "docs.features.daily-id.title": "1. 每日 ID 生成",
      "docs.features.daily-id.intro": "为了在防止垃圾帖的同时提供匿名性，每个用户在每个板块每天会生成一个唯一的 ID。这是通过哈希用户的设备 UUID（存储在 localStorage 中）、当前日期和板块 ID 计算得出的。",
      "docs.features.tripcode.title": "2. 绰号（Capcode）",
      "docs.features.tripcode.intro": "用户可以通过使用绰号来证明自己的身份而无需注册。在名字字段中输入 Name#password 会将其转换为 Name ◆Hash。",
      "docs.features.sage.title": "3. Sage 机制",
      "docs.features.sage.intro": "在传统 BBS 文化中，\"sage\"（下沉）允许用户在不将主题\"顶\"到列表顶部的情况下回复主题。这是在 createPost 服务方法中实现的：",
      "docs.features.anchor.title": "4. 锚点提示",
      "docs.features.anchor.intro": "RichText 组件解析帖子内容中的 >>Number 模式。当悬停时，它会搜索当前主题的帖子列表以查找目标 ID，并使用固定定位渲染浮动提示。",
      "docs.i18n.title": "国际化",
      "docs.i18n.intro": "应用支持英语（内部）、中文（zh-CN）和日文（ja-JP）。",
      "docs.i18n.technology": "我们使用 react-i18next。针对日文本地化特别注意：",
      "docs.i18n.era": "日本纪元日期格式：当激活 ja-JP 时，公历日期（2025）会被转换为日本纪元日期（R7）。",
      "docs.i18n.weekday": "星期几：显示为 (月)、(火) 等。",

      // PrivacyPolicy Page
      "privacy.title": "隐私政策",
      "privacy.contents": "目录",
      "privacy.nav.intro": "1. 引言",
      "privacy.nav.data": "2. 数据收集",
      "privacy.nav.storage": "3. 本地存储",
      "privacy.nav.anonymity": "4. 匿名与 ID",
      "privacy.nav.thirdParty": "5. 第三方服务",
      "privacy.nav.contact": "6. 联系我们",
      "privacy.section.intro": "1. 引言",
      "privacy.intro.text1": "欢迎来到 7ch（\"我们\"、\"我们的\"或\"我们\"）。我们致力于在为匿名交流提供开放平台的同时保护您的隐私。",
      "privacy.intro.text2": "本隐私政策解释了我们在独特的无服务器环境中如何处理信息。与传统 Web 应用程序不同，7ch（在其当前的演示状态下）主要在您的浏览器内使用客户端持久化运行。",
      "privacy.section.data": "2. 我们收集的信息",
      "privacy.data.intro": "我们优先考虑数据最小化。作为客户端应用程序，我们遵循以下原则：",
      "privacy.data.no-personal": "不收集个人身份信息：我们不询问您的真实姓名、电子邮件地址、电话号码或实际地址。",
      "privacy.data.no-account": "无账号注册：没有注册流程。您可以立即匿名地与服务进行交互。",
      "privacy.data.voluntary": "自愿信息：您发布的任何内容（文本、绰号）都是自愿提供的，并向公众公开（在此演示中模拟）。",
      "privacy.section.storage": "3. 本地存储机制",
      "privacy.storage.intro": "此应用程序使用您浏览器的 LocalStorage 技术来运行。",
      "privacy.storage.note-title": "关于此演示版本的重要说明：",
      "privacy.storage.note": "所有\"帖子\"、\"主题\"和\"设置\"都严格存储在您自己的设备内的 LocalStorage 的 7ch_db_v1 键中。不会将任何数据发送到远程服务器。清除浏览器缓存将删除在此会话中创建的所有主题。",
      "privacy.storage.preferences": "我们还在本地存储您的偏好设置，例如：",
      "privacy.storage.lang": "语言设置 (7ch_lang)",
      "privacy.storage.hidden": "隐藏的主题列表 (7ch_hidden_threads)",
      "privacy.storage.followed": "关注的主题列表 (7ch_followed_threads)",
      "privacy.section.anonymity": "4. 匿名与设备指纹",
      "privacy.anonymity.intro": "为了在不要求账号的情况下维护我们板块的完整性并防止垃圾帖，我们使用每日 ID 系统。",
      "privacy.anonymity.how": "如何生成 ID：",
      "privacy.anonymity.desc": "我们生成一个随机 UUID 并将其存储在您的 LocalStorage (7ch_device_uuid) 中。当您发布时，您的显示 ID 是以下内容的加密哈希：",
      "privacy.anonymity.ensures": "这确保了：",
      "privacy.anonymity.ensure1": "您的 ID 每天变化一次（00:00 UTC）。",
      "privacy.anonymity.ensure2": "您的 ID 在不同板块上不同。",
      "privacy.anonymity.ensure3": "我们无法从您的 ID 反向工程您的身份。",
      "privacy.section.thirdParty": "5. 第三方服务",
      "privacy.thirdParty.intro": "虽然我们的应用程序逻辑在本地运行，但我们依赖第三方内容分发网络（CDN）来加载应用程序资源。这些提供商可能会收集基本访问日志（例如 IP 地址）用于安全和性能监控。",
      "privacy.thirdParty.cdn": "esm.sh / unpkg：用于加载 React 和 i18n 库。",
      "privacy.thirdParty.tailwind": "Tailwind CSS CDN：用于为应用程序设置样式。",
      "privacy.thirdParty.no-tracking": "我们不使用 Google Analytics、Facebook Pixel 或任何其他营销跟踪器。",
      "privacy.section.contact": "6. 联系与权利",
      "privacy.contact.intro": "由于我们不在任何服务器上存储您的个人数据，因此我们无法\"删除\"您的账号，因为账号不存在。您对自己的数据拥有完全控制权：",
      "privacy.contact.delete": "要删除所有数据：只需清除浏览器的\"本地存储\"或\"站点数据\"。",
      "privacy.contact.tech": "如果您有关于此架构的技术问题，请参阅技术文档。",

      // Terms Page
      "terms.title": "用户协议",
      "terms.contents": "协议",
      "terms.nav.acceptance": "1. 接受",
      "terms.nav.conduct": "2. 用户行为",
      "terms.nav.content": "3. 内容与责任",
      "terms.nav.moderation": "4. 审核政策",
      "terms.nav.disclaimer": "5. 免责声明",
      "terms.section.acceptance": "1. 接受条款",
      "terms.acceptance.text1": "通过访问和使用 7ch（\"服务\"），您接受并同意受本协议的条款和规定的约束。此外，在使用本服务时，您应遵守适用于此类服务的任何发布的指南或规则。",
      "terms.acceptance.text2": "如果您不同意遵守上述内容，请不要使用本服务。",
      "terms.section.conduct": "2. 用户行为",
      "terms.conduct.intro": "您同意您对通过服务发布、传输或分享的任何内容承担全部责任。您同意不要使用服务来：",
      "terms.conduct.illegal": "非法内容：发布任何违反适用的当地、州、国家或国际法律的内容（例如，儿童剥削、非法贸易）。",
      "terms.conduct.harassment": "骚扰：跟踪、骚扰、威胁或人肉搜索（发布其他人的私人信息）。",
      "terms.conduct.spam": "垃圾信息：发布未经请求或未经授权的广告、促销材料、\"垃圾邮件\"或\"连锁信\"。",
      "terms.conduct.malware": "恶意软件：上传或链接到旨在中断、破坏或限制任何软件或硬件功能的软件病毒或任何其他计算机代码。",
      "terms.section.content": "3. 内容所有权与责任",
      "terms.content.anonymity": "匿名与责任：由于此服务允许匿名发布，您承认您在法律上对自己的言论负责。服务充当您在线分发和发布的被动渠道。",
      "terms.content.no-screening": "无预审：我们本身不会在发布之前查看或批准内容。但是，我们保留（但不承担义务）删除任何违反这些条款的内容的权利。",
      "terms.content.persistence": "数据持久化：此演示版本将数据本地存储在您的浏览器中。我们不对清除浏览器缓存或本地存储导致的任何数据丢失负责。",
      "terms.section.moderation": "4. 审核政策",
      "terms.moderation.intro": "7ch 管理员保留以下权利：",
      "terms.moderation.right1": "随时以任何理由删除任何主题或帖子，有或无通知。",
      "terms.moderation.right2": "通过浏览器指纹或 ID 封禁违反这些条款的用户。",
      "terms.moderation.right3": "指定志愿者管理员管理特定板块。",
      "terms.moderation.note": "此平台上的\"言论自由\"是一个原则，而不是绝对的法律权利。损害社区体验的破坏性行为将被删除。",
      "terms.section.disclaimer": "5. 免责声明",
      "terms.disclaimer.warning": "请仔细阅读",
      "terms.disclaimer.text1": "服务按\"原样\"和\"可用\"提供，不提供任何明示或暗示的保证。",
      "terms.disclaimer.text2": "我们不保证服务将不中断、安全或无错误。您理解并同意，您通过使用服务自行下载或以其他方式获取材料或数据的风险由您自己承担。",

      // Help Page
      "help.banner.title": "使用指南",
      "help.banner.subtitle": "如何有效使用 7ch",
      "help.toc.title": "目录",
      "help.toc.basics": "1. 基础",
      "help.toc.tripcodes": "2. 绰号",
      "help.toc.sage": "3. Sage 功能",
      "help.toc.anchors": "4. 锚点与引用",
      "help.toc.ids": "5. ID 系统",
      "help.section.basics": "1. 基础",
      "help.basics.intro": "7ch 是一个匿名文本板。您无需注册账号即可发布。导航依赖于简单的层次结构：板块包含主题，主题包含帖子。",
      "help.basics.posting": "发布：任何人都可以创建主题（开始讨论）或回复现有主题。",
      "help.basics.anonymity": "匿名：默认情况下，您的名称显示为\"Anonymous\"（或\"名無しさん\"）。",
      "help.section.tripcodes": "2. 绰号（身份）",
      "help.tripcodes.intro": "如果您需要在多个帖子中证明自己的身份而无需注册，请使用绰号。",
      "help.tripcodes.how": "如何使用：",
      "help.tripcodes.how-desc": "在名字字段中，输入：",
      "help.tripcodes.example-desc": "示例：输入 Alice#secret123 将显示为 Alice ◆AbC123x。",
      "help.tripcodes.note": "只有您知道密码（# 之后的部分），但每个人都可以验证结果哈希（◆ 之后的部分）是否相同。",
      "help.section.sage": "3. Sage 功能",
      "help.sage.intro": "默认情况下，回复主题会将其\"顶\"到板块索引的顶部，增加其可见性。",
      "help.sage.how": "如果您想在不顶起主题的情况下回复（例如，进行小更正或避免顶起恶搞主题），请在 E-mail 字段中输入 sage。",
      "help.sage.normal": "普通帖子：主题更新时间更改 -> 移动到顶部。",
      "help.sage.sage-post": "Sage 帖子：主题更新时间不会更改 -> 保持在原位。",
      "help.section.anchors": "4. 锚点与引用",
      "help.anchors.intro": "要回复特定帖子，请使用 >> 符号后跟帖子编号。",
      "help.anchors.input": "输入",
      "help.anchors.result": "结果",
      "help.anchors.hover": "在 7ch 上，悬停在蓝色锚点链接（如 >>15）上将显示该帖子的弹出预览。单击它通常会添加反向链接或跳转到帖子。",
      "help.section.ids": "5. 每日 ID 系统",
      "help.ids.intro": "我们不使用用户名，而是使用 ID 来在一天内识别单个主题中的唯一用户。",
      "help.ids.example": "示例 ID：",
      "help.ids.scope": "范围：您的 ID 对您、特定板块和当前日期是唯一的。",
      "help.ids.reset": "重置：ID 每天在午夜（UTC）更改。",
      "help.ids.privacy": "隐私：这可以防止长期跟踪，同时允许用户识别当天主题中的多个帖子是否来自同一个人。",

      // QA Page
      "qa.title": "Q&A / 常见问题",
      "qa.subtitle": "问题与答案",
      "qa.toc.title": "目录",
      "qa.toc.access": "1. 访问问题",
      "qa.toc.anonymity": "2. 关于匿名",
      "qa.toc.identity": "3. 身份区分",
      "qa.toc.privacy": "4. 隐私信任",
      "qa.toc.opensource": "5. 开源与过滤",
      "qa.toc.deletion": "6. 删帖政策",
      "qa.toc.report": "7. 举报投诉",
      "qa.toc.legal": "8. 法律风险",
      "qa.q1.question": "Q: 为什么在中国大陆无法直接访问？",
      "qa.q1.answer1": "A: 本站前端托管于 Vercel 的全球边缘网络。",
      "qa.q1.answer2": "由于中国大陆地区的网络环境特殊，Vercel 的节点通常处于被阻断状态。这是一个面向全球互联网的匿名实验项目，如果您看到了这里，说明您已经具备了访问自由互联网的基础能力。",
      "qa.q2.question": "Q: 这里的\"匿名\"是真的吗？",
      "qa.q2.answer1": "A: 是的。",
      "qa.q2.answer2": "本站移除了所有传统的账号注册与登录系统。此时此刻，你就是无名氏 (NoName)。我们不要求、也不存储您的手机号、邮箱或社交账号。",
      "qa.q3.question": "Q: 既然不登录，怎么区分\"我是我\"？",
      "qa.q3.answer1": "A: 我们利用客户端指纹（LocalStorage）与网络特征（IP Hash）来计算您当日的临时身份 ID。",
      "qa.q3.note": "注意：",
      "qa.q3.note-text": "清除浏览器缓存、开启无痕模式或更换网络环境，都会导致您的 ID 发生变化。在 7ch，身份是流动的。",
      "qa.q4.question": "Q: 我凭什么相信你们不窃取隐私？",
      "qa.q4.answer1": "A: Don't Trust, Verify. (不要轻信，去验证)",
      "qa.q4.answer2": "本项目的前端代码是完全开源的。任何人都可以审查我们的 GitHub 仓库，确保其中没有任何窃取数据的后门逻辑。（注：开源版本代码与线上运行版本完全一致，唯一的区别仅在于后端的 API 地址配置。）",
      "qa.q5.question": "Q: 既然是开源的，为什么我看不到屏蔽词列表？",
      "qa.q5.answer1": "A: 这是一个安全策略。",
      "qa.q5.answer2": "为了防止垃圾广告发送者（Spammers）针对性地分析并绕过过滤系统，我们的屏蔽关键词库（NG Words）作为服务器环境变量存储，不包含在公开的代码仓库中。除配置数据外，所有的业务逻辑代码均完全透明。",
      "qa.q6.question": "Q: 我发错内容了，能删除帖子吗？",
      "qa.q6.answer1": "A: 不支持自助删除。",
      "qa.q6.answer2": "由于采用了强匿名机制，系统在技术上无法验证\"你是该帖子的发布者\"，因此不提供删除按钮。（注：若您的帖子涉及严重违法、人肉搜索或隐私泄露，请通过下方的联系方式申请人工处理。）",
      "qa.q7.question": "Q: 发现违法/侵权内容如何处理？",
      "qa.q7.answer1": "A: 请发送邮件至",
      "qa.q7.answer2": "为了您的安全，建议您同样使用匿名邮箱进行联系。请在邮件中注明 Thread ID 和具体的违规理由，管理员会定期处理。",
      "qa.q8.question": "Q: 在这里发言有法律风险吗？",
      "qa.q8.answer1": "A: 互联网不是法外之地。",
      "qa.q8.answer2": "虽然本站承诺不建立用户画像，但互联网的基础设施（ISP、电信运营商）依然有迹可循。如果您的言论涉及严重犯罪，执法机构仍可能通过技术手段定位到您。",
      "qa.q8.answer3": "我们不对用户的言论负责，但在法律强制要求下，我们会配合提供仅有的服务器日志信息（如临时 ID 记录）。",
    }
  },
  'ja-JP': {
    translation: {
      "dialog.login.button": "ログイン/登録",
      "dialog.login.title": "当サイトは従来のアカウント登録とログインシステムを提供していませんし、今後も提供しません。",
      "dialog.login.description": "プライバシー保護のため、当サイトは従来のアカウント登録とログインシステムを提供していませんし、今後も提供しません。7chでは、あなたは名無しさん (NoName) です。詳細は技術ドキュメントをご覧ください。",
      "dialog.login.link_text": "技術ドキュメント",
      "dialog.login.close": "閉じる",
      // Navigation
      "nav.boards": "掲示板一覧",
      "nav.home": "ホーム",
      "nav.favorites": "お気に入り",
      "board.catalog": "カタログ",

      // Boards
      "board.all.name": "総合",
      "board.all.desc": "全板スレッド一覧",
      "board.news.name": "ニュース速報+",
      "board.news.desc": "ニュース",
      "board.g.name": "技術",
      "board.g.desc": "プログラミング、ハードウェア",
      "board.acg.name": "二次元",
      "board.acg.desc": "アニメ、マンガ、文化",
      "board.vip.name": "VIP",
      "board.vip.desc": "雑談",

      // Thread & Post
      "thread.title": "タイトル",
      "thread.name": "名前",
      "thread.email": "E-mail",
      "thread.content": "本文",
      "thread.submit": "書き込む",
      "thread.reply": "返信",
      "thread.new": "スレッド作成",
      "thread.return": "戻る",
      "meta.anonymous": "名無しさん",
      "meta.sage": "sage",
      "meta.loading": "読込中...",
      "meta.id": "ID",
      "meta.hide": "非表示",
      "meta.show": "表示",
      "meta.hidden_thread": "非表示のスレッド",
      "meta.follow": "フォロー",
      "meta.following": "フォロー中",
      "meta.no_favorites": "お気に入りはまだありません。",
      "error.required": "本文を入力してください",
      "lang.zh": "中文",
      "lang.ja": "日本語",

      // Footer
      "footer.privacy": "プライバシーポリシー",
      "footer.tech": "技術ドキュメント",
      "footer.terms": "利用規約",
      "footer.help": "使い方",
      "footer.QA": "よくある質問",

      // Static Pages (使用模板字符串)
      "page.privacy.title": "プライバシーポリシー",
      "page.privacy.content": `当サイトはプライバシーを重視しています。

1. データ保存：デモ版はブラウザのLocalStorageを使用し、サーバーには送信されません。
2. ID生成：IDはデバイスのハッシュに基づいて生成され、IPアドレスは保存されません。
3. トラッキング：行動追跡のためのクッキーは使用していません。`,

      "page.tech.title": "技術ドキュメント",
      "page.tech.content": `7chは React 19 + TypeScript + Tailwind CSS で構築されたモダンな掲示板アーキテクチャです。

主な機能：
- Mock Service：バックエンドロジック（ID計算、Sage、トリップ）をフロントエンドで完全シミュレート。
- 国際化：i18nextによる完全な多言語対応。
- UI/UX：アンカーポップアップやレスポンシブデザインを実装。`,

      "page.terms.title": "利用規約",
      "page.terms.content": `7chへようこそ。

1. 法令に違反する投稿は禁止です。
2. スパムや荒らし行為は禁止です。
3. 管理人は予告なくコンテンツを削除する権利を持ちます。
4. 匿名掲示板ですが、投稿内容には責任を持ってください。`,

      "page.help.title": "使い方",
      "page.help.content": `基本ガイド：

1. 【トリップ】：名前に "名前#パスワード" と入力すると、"名前 ◆Hash" と表示されます。
2. 【sage】：E-mail欄に "sage" と入力すると、スレッドが上がりません（下げる）。
3. 【アンカー】：レス番（>>1など）をクリックすると返信できます。リンクにカーソルを合わせるとプレビューが表示されます。
4. 【ID】：IDは毎日リセットされます。同じ板では同じIDになります。`,

      "page.QA.title": "よくある質問",
      "page.QA.content": `Q: 中国大陸から直接アクセスできないのはなぜですか？
A: 本サイトのフロントエンドは Vercel のグローバルエッジネットワークでホスティングされています。中国大陸特有のネットワーク環境により、Vercel のノードは通常ブロックされています。これはグローバルインターネット向けの匿名実験プロジェクトです。ここを見ることができれば、自由なインターネットへのアクセス能力を持っていることになります。

Q: ここでの「匿名」は本当ですか？
A: はい。本サイトは従来のアカウント登録とログインシステムをすべて排除しました。今、あなたは名無しさん (NoName) です。電話番号、メールアドレス、SNSアカウントは要求しませんし、保存もしません。

Q: ログインしないなら、「私が私」であることをどう区別するのですか？
A: クライアントフィンガープリント（LocalStorage）とネットワーク特徴（IP Hash）を使用して、当日の一時的なIDを計算します。
注意：ブラウザキャッシュの消去、シークレットモードの使用、ネットワーク環境の変更により、IDが変更されます。7chでは、アイデンティティは流動的です。

Q: プライバシーを侵害しないと信じる理由は？
A: Don't Trust, Verify. (信じるな、検証せよ) 
本プロジェクトのフロントエンドコードは完全にオープンソースです。誰でもGitHubリポジトリを確認し、データ窃取のバックドアロジックがないことを確認できます。（注：オープンソース版と実行中のバージョンは完全に同一で、唯一の違いはバックエンドAPIアドレスの設定のみです。）

Q: オープンソースなのに、なぜNGワードリストが見えないのですか？
A: これはセキュリティポリシーです。スパマーが分析してフィルタリングを回避することを防ぐため、NGワードリストはサーバー環境変数として保存され、公開リポジトリには含まれません。設定データを除き、すべてのビジネスロジックコードは完全に透明です。

Q: 間違えて投稿しました。削除できますか？
A: 自助削除はサポートしていません。強力な匿名メカニズムを採用しているため、技術的に「あなたが投稿者である」ことを検証できないため、削除ボタンを提供していません。（注：投稿が深刻な違法、人肉検索、プライバシー漏洩に関わる場合は、以下の連絡先で人的処理を申請してください。）

Q: 違法・侵害コンテンツを発見したらどうすればいいですか？
A: admin-7ch@proton.me までメールを送ってください。安全のため、匿名メールでの連絡をお勧めします。メールにスレッドIDと具体的な違反理由を明記してください。管理者が定期的に処理します。

Q: ここで発言しても法的リスクはありませんか？
A: インターネットは法外の地ではありません。本サイトはユーザープロファイリングを行わないことを約束していますが、インターネットインフラ（ISP、通信キャリア）は依然として追跡可能です。発言が深刻な犯罪に関わる場合、法執行機関は技術的手段で特定できる可能性があります。ユーザーの発言に対して責任は負いませんが、法的強制要求がある場合、サーバーログ（一時ID記録など）を提供します。`,

      // Docs Page
      "docs.banner.title": "7ch 技術ドキュメント",
      "docs.banner.subtitle": "アーキテクチャ、仕様、実装の詳細",
      "docs.toc.title": "目次",
      "docs.toc.overview": "プロジェクト概要",
      "docs.toc.architecture": "アーキテクチャ",
      "docs.toc.data-model": "データモデル",
      "docs.toc.features": "主要機能",
      "docs.toc.i18n": "国際化",
      "docs.overview.title": "プロジェクト概要",
      "docs.overview.intro": "7chは、React 19、TypeScript、Tailwind CSSで構築されたモダンなシングルページ匿名掲示板システムです。",
      "docs.overview.description": "モダンなフロントエンド技術を使用して、クラシックなテキストボード（2ch/5chなど）のコアエクスペリエンスを再現することを目的としています。アプリケーションはLocalStorageをバックエンドとするモックサービスを使用して、完全にブラウザ内で動作します。",
      "docs.overview.frontend": "フロントエンドスタック",
      "docs.overview.frontend.react": "React 19 (Hooks, StrictMode)",
      "docs.overview.frontend.typescript": "TypeScript (厳密な型付け)",
      "docs.overview.frontend.tailwind": "Tailwind CSS (スタイリング)",
      "docs.overview.frontend.i18n": "i18next (国際化)",
      "docs.overview.concepts": "主要概念",
      "docs.overview.concepts.no-router": "ルーターなしSPA（ステートベースのビュー）",
      "docs.overview.concepts.mock-api": "モックAPIレイヤー",
      "docs.overview.concepts.identity": "一時的なアイデンティティ（日次ID）",
      "docs.overview.concepts.persistence": "クライアントサイド永続化",
      "docs.architecture.title": "アーキテクチャ",
      "docs.architecture.intro": "アプリケーションは標準的なReactコンポーネントベースのアーキテクチャに従いますが、「アプリのような」エクスペリエンスに典型的なシンプルでフラットな構造を維持するために、クライアントサイドルーティングライブラリ（react-routerなど）の使用を避けています。",
      "docs.architecture.view-state": "ビューステートマシン",
      "docs.architecture.view-state.desc": "メインナビゲーションはApp.tsxの単一のステートオブジェクトによって処理されます：",
      "docs.architecture.view-state.desc2": "このステートが、どのメインコンポーネントをレンダリングするかを決定します。ThreadViewのようなコンポーネントは動的にマウント/アンマウントされ、useEffectフックを介してデータフェッチがトリガーされます。",
      "docs.data-model.title": "データモデルと永続化",
      "docs.data-model.intro": "データはブラウザのLocalStorageにキー名7ch_db_v1で保存されます。スキーマはリレーショナルデータベース構造を模倣しています。",
      "docs.data-model.entities": "エンティティ",
      "docs.data-model.entities.board": "板：静的定義（ID、名前、説明）。",
      "docs.data-model.entities.thread": "スレッド：メタデータ（タイトル、投稿数、更新日時）とOP（最初の投稿者）のコンテンツプレビューを含みます。",
      "docs.data-model.entities.post": "投稿：スレッドIDに関連付けられた個々のエントリ。",
      "docs.features.title": "主要機能の実装",
      "docs.features.daily-id.title": "1. 日次ID生成",
      "docs.features.daily-id.intro": "スパムを防ぎながら匿名性を提供するために、各ユーザーは各板ごとに毎日一意なIDを生成します。これは、ユーザーのデバイスUUID（localStorageに保存）、現在の日付、および板IDをハッシュ化して計算されます。",
      "docs.features.tripcode.title": "2. トリップコード（Capcode）",
      "docs.features.tripcode.intro": "ユーザーは登録なしでトリップコードを使用して身元を証明できます。名前フィールドにName#passwordと入力すると、Name ◆Hashに変換されます。",
      "docs.features.sage.title": "3. Sageメカニズム",
      "docs.features.sage.intro": "従来のBBS文化では、「sage」はユーザーがスレッドをリストのトップに「上げずに」返信することを可能にします。これはcreatePostサービスメソッドで実装されています：",
      "docs.features.anchor.title": "4. アンカーツールチップ",
      "docs.features.anchor.intro": "RichTextコンポーネントは投稿内容の>>Numberパターンを解析します。ホバーすると、現在のスレッドの投稿リストでターゲットIDを検索し、固定配置を使用してフローティングツールチップをレンダリングします。",
      "docs.i18n.title": "国際化",
      "docs.i18n.intro": "アプリは英語（内部）、中国語（zh-CN）、日本語（ja-JP）をサポートしています。",
      "docs.i18n.technology": "react-i18nextを使用しています。日本語ローカライズには特に注意を払っています：",
      "docs.i18n.era": "和暦日付フォーマット：ja-JPが有効な場合、西暦（2025）が和暦（R7）に変換されます。",
      "docs.i18n.weekday": "曜日：(月)、(火)などで表示されます。",

      // PrivacyPolicy Page
      "privacy.title": "プライバシーポリシー",
      "privacy.contents": "目次",
      "privacy.nav.intro": "1. はじめに",
      "privacy.nav.data": "2. データ収集",
      "privacy.nav.storage": "3. ローカルストレージ",
      "privacy.nav.anonymity": "4. 匿名性とID",
      "privacy.nav.thirdParty": "5. 第三者サービス",
      "privacy.nav.contact": "6. お問い合わせ",
      "privacy.section.intro": "1. はじめに",
      "privacy.intro.text1": "7ch（「当社」）へようこそ。当社は、匿名コミュニケーションのオープンプラットフォームを提供しながら、プライバシーを保護することにコミットしています。",
      "privacy.intro.text2": "このプライバシーポリシーは、独自のサーバーレス環境で情報をどのように処理するかを説明します。従来のWebアプリケーションとは異なり、7ch（現在のデモ状態）は主にブラウザ内でクライアントサイド永続化を使用して動作します。",
      "privacy.section.data": "2. 収集する情報",
      "privacy.data.intro": "データの最小化を優先しています。クライアントサイドアプリケーションとして、以下の原則に従います：",
      "privacy.data.no-personal": "個人識別情報なし：本名、メールアドレス、電話番号、または実際の住所は尋ねません。",
      "privacy.data.no-account": "アカウント登録なし：登録プロセスはありません。すぐに匿名でサービスを利用できます。",
      "privacy.data.voluntary": "任意の情報：投稿するコンテンツ（テキスト、トリップコード）は任意で提供され、公開されます（このデモではシミュレートされています）。",
      "privacy.section.storage": "3. ローカルストレージメカニズム",
      "privacy.storage.intro": "このアプリケーションは、ブラウザのLocalStorage技術を使用して動作します。",
      "privacy.storage.note-title": "このデモ版に関する重要な注意：",
      "privacy.storage.note": "すべての「投稿」、「スレッド」、「設定」は、ブラウザのLocalStorageの7ch_db_v1キー内に厳密に保存されます。リモートサーバーにデータは送信されません。ブラウザキャッシュをクリアすると、このセッションで作成されたすべてのスレッドが削除されます。",
      "privacy.storage.preferences": "以下の設定もローカルに保存されます：",
      "privacy.storage.lang": "言語設定 (7ch_lang)",
      "privacy.storage.hidden": "非表示のスレッドリスト (7ch_hidden_threads)",
      "privacy.storage.followed": "フォロー中のスレッドリスト (7ch_followed_threads)",
      "privacy.section.anonymity": "4. 匿名性とデバイスフィンガープリント",
      "privacy.anonymity.intro": "アカウントを要求せずにボードの整合性を維持し、スパムを防ぐために、日次IDシステムを使用しています。",
      "privacy.anonymity.how": "IDの生成方法：",
      "privacy.anonymity.desc": "ランダムなUUIDを生成し、LocalStorage (7ch_device_uuid) に保存します。投稿すると、表示されるIDは以下の暗号化ハッシュになります：",
      "privacy.anonymity.ensures": "これにより：",
      "privacy.anonymity.ensure1": "IDは毎日変更されます（00:00 UTC）。",
      "privacy.anonymity.ensure2": "異なるボードではIDが異なります。",
      "privacy.anonymity.ensure3": "IDから身元を逆推測することはできません。",
      "privacy.section.thirdParty": "5. 第三者サービス",
      "privacy.thirdParty.intro": "アプリケーションロジックはローカルで実行されますが、アプリケーションリソースをロードするために第三者コンテンツ配信ネットワーク（CDN）に依存しています。これらのプロバイダは、セキュリティとパフォーマンス監視のために基本アクセスログ（IPアドレスなど）を収集する場合があります。",
      "privacy.thirdParty.cdn": "esm.sh / unpkg：Reactとi18nライブラリをロードするために使用されます。",
      "privacy.thirdParty.tailwind": "Tailwind CSS CDN：アプリケーションのスタイリングに使用されます。",
      "privacy.thirdParty.no-tracking": "Google Analytics、Facebook Pixel、またはその他のマーケティングトラッカーは使用していません。",
      "privacy.section.contact": "6. お問い合わせと権利",
      "privacy.contact.intro": "個人のデータをサーバーに保存していないため、「アカウント」は存在しないため「削除」することはできません。自分のデータを完全に制御できます：",
      "privacy.contact.delete": "すべてのデータを削除するには：ブラウザの「ローカルストレージ」または「サイトデータ」をクリアしてください。",
      "privacy.contact.tech": "このアーキテクチャに関する技術的な質問がある場合は、技術ドキュメントを参照してください。",

      // Terms Page
      "terms.title": "利用規約",
      "terms.contents": "同意事項",
      "terms.nav.acceptance": "1. 同意",
      "terms.nav.conduct": "2. ユーザーの行動",
      "terms.nav.content": "3. コンテンツと責任",
      "terms.nav.moderation": "4. モデレーションポリシー",
      "terms.nav.disclaimer": "5. 免責事項",
      "terms.section.acceptance": "1. 利用規約の同意",
      "terms.acceptance.text1": "7ch（「サービス」）にアクセスして使用することにより、この契約の条項および規定に拘束されることに同意し、受諾するものとします。さらに、サービスを使用する際、適用されるガイドラインや規則を遵守するものとします。",
      "terms.acceptance.text2": "上記に同意しない場合は、サービスを使用しないでください。",
      "terms.section.conduct": "2. ユーザーの行動",
      "terms.conduct.intro": "サービスを通じて投稿、送信、または共有するコンテンツについて、全責任を負うことに同意します。以下の目的でサービスを使用しないことに同意します：",
      "terms.conduct.illegal": "違法なコンテンツ：適用される現地、州、国、または国際法に違反するコンテンツ（例：児童搾取、違法取引）を投稿する。",
      "terms.conduct.harassment": "ハラスメント：ストーキング、嫌がらせ、脅迫、または人肉検索（他者の個人情報の公開）を行う。",
      "terms.conduct.spam": "スパム：未承諾または無許可の広告、プロモーション素材、「ジャンクメール」、または「チェーンレター」を投稿する。",
      "terms.conduct.malware": "マルウェア：ソフトウェアまたはハードウェアの機能を中断、破壊、または制限するように設計されたソフトウェアウイルスまたはその他のコンピュータコードをアップロードまたはリンクする。",
      "terms.section.content": "3. コンテンツの所有権と責任",
      "terms.content.anonymity": "匿名性と責任：このサービスは匿名投稿を許可しているため、自分の発言について法的責任を負うことを認めます。サービスは、オンライン配信と公開のためのパッシブなチャネルとして機能します。",
      "terms.content.no-screening": "事前チェックなし：投稿前にコンテンツを表示または承認することはありません。ただし、これらの条項に違反するコンテンツを削除する権利を留保します（義務は負いません）。",
      "terms.content.persistence": "データの永続化：このデモ版はデータをブラウザにローカルに保存します。ブラウザキャッシュまたはローカルストレージをクリアすることによるデータの損失については責任を負いません。",
      "terms.section.moderation": "4. モデレーションポリシー",
      "terms.moderation.intro": "7ch管理者は以下の権利を留保します：",
      "terms.moderation.right1": "事前の通知ありまたはなしで、いかなる理由でもスレッドまたは投稿を削除する。",
      "terms.moderation.right2": "これらの条項に違反するユーザーを（ブラウザフィンガープリントまたはIDブロックを通じて）禁止する。",
      "terms.moderation.right3": "特定のボードを管理するためにボランティアモデレーターを指名する。",
      "terms.moderation.note": "このプラットフォームでの「言論の自由」は原則であり、絶対的な法的権利ではありません。コミュニティエクスペリエンスを損なう破壊的な行動は削除されます。",
      "terms.section.disclaimer": "5. 免責事項",
      "terms.disclaimer.warning": "注意深くお読みください",
      "terms.disclaimer.text1": "サービスは「現状のまま」および「利用可能な状態で」提供され、いかなる明示または黙示の保証もありません。",
      "terms.disclaimer.text2": "サービスが中断なし、安全、またはエラーなしであることを保証しません。サービスを使用して、ご自身の裁量と責任で素材またはデータをダウンロードまたは取得することを理解し、同意するものとします。",

      // Help Page
      "help.banner.title": "ユーザーガイド",
      "help.banner.subtitle": "7chを効果的に使用する方法",
      "help.toc.title": "目次",
      "help.toc.basics": "1. 基礎",
      "help.toc.tripcodes": "2. トリップコード",
      "help.toc.sage": "3. Sage機能",
      "help.toc.anchors": "4. アンカーと引用",
      "help.toc.ids": "5. IDシステム",
      "help.section.basics": "1. 基礎",
      "help.basics.intro": "7chは匿名テキストボードです。アカウント登録なしで投稿できます。ナビゲーションはシンプルな階層構造に依存します：ボードにはスレッドが含まれ、スレッドには投稿が含まれます。",
      "help.basics.posting": "投稿：誰でもスレッドを作成（議論を開始）または既存のスレッドに返信できます。",
      "help.basics.anonymity": "匿名：デフォルトでは、名前は「Anonymous」（または「名無しさん」）と表示されます。",
      "help.section.tripcodes": "2. トリップコード（身元）",
      "help.tripcodes.intro": "登録なしで複数の投稿で身元を証明する必要がある場合は、トリップコードを使用してください。",
      "help.tripcodes.how": "使用方法：",
      "help.tripcodes.how-desc": "名前フィールドに、次のように入力します：",
      "help.tripcodes.example-desc": "例：Alice#secret123 と入力すると、Alice ◆AbC123x と表示されます。",
      "help.tripcodes.note": "パスワード（#以降の部分）を知っているのはあなただけですが、結果のハッシュ（◆以降の部分）が同じであることを誰でも検証できます。",
      "help.section.sage": "3. Sage機能",
      "help.sage.intro": "デフォルトでは、スレッドに返信すると、スレッドがボードインデックスのトップに「上がり」、その可視性が高まります。",
      "help.sage.how": "スレッドを上げずに返信したい場合（例：小さな修正や荒らしスレッドを上げないため）、Eメールフィールドに sage と入力してください。",
      "help.sage.normal": "通常の投稿：スレッドの更新時間が変更 -> トップに移動。",
      "help.sage.sage-post": "Sage投稿：スレッドの更新時間は変更されない -> 同じ位置にとどまる。",
      "help.section.anchors": "4. アンカーと引用",
      "help.anchors.intro": "特定の投稿に返信するには、>> 記号の後に投稿番号を入力します。",
      "help.anchors.input": "入力",
      "help.anchors.result": "結果",
      "help.anchors.hover": "7chでは、青いアンカーリンク（>>15 など）にカーソルを合わせると、その投稿のポップアッププレビューが表示されます。クリックすると、通常、逆リンクが追加されるか、投稿にジャンプします。",
      "help.section.ids": "5. 日次IDシステム",
      "help.ids.intro": "ユーザー名の代わりに、1日以内の単一スレッドで一意のユーザーを識別するためにIDを使用します。",
      "help.ids.example": "IDの例：",
      "help.ids.scope": "範囲：IDはあなた、特定のボード、現在の日付に対して一意です。",
      "help.ids.reset": "リセット：IDは毎日真夜中（UTC）に変更されます。",
      "help.ids.privacy": "プライバシー：これにより長期的な追跡が防止されると同時に、ユーザーはその日のスレッド内の複数の投稿が同一人物によるものかどうかを識別できます。",

      // QA Page
      "qa.title": "Q&A / よくある質問",
      "qa.subtitle": "質問と回答",
      "qa.toc.title": "目次",
      "qa.toc.access": "1. アクセスに関する問題",
      "qa.toc.anonymity": "2. 匿名性について",
      "qa.toc.identity": "3. 身元の区別",
      "qa.toc.privacy": "4. プライバシーの信頼",
      "qa.toc.opensource": "5. オープンソースとフィルタリング",
      "qa.toc.deletion": "6. 削除ポリシー",
      "qa.toc.report": "7. 通報",
      "qa.toc.legal": "8. 法的リスク",
      "qa.q1.question": "Q: 中国大陸から直接アクセスできないのはなぜですか？",
      "qa.q1.answer1": "A: 本サイトのフロントエンドは Vercel のグローバルエッジネットワークでホスティングされています。",
      "qa.q1.answer2": "中国大陸特有のネットワーク環境により、Vercel のノードは通常ブロックされています。これはグローバルインターネット向けの匿名実験プロジェクトです。ここを見ることができれば、自由なインターネットへのアクセス能力を持っていることになります。",
      "qa.q2.question": "Q: ここでの「匿名」は本当ですか？",
      "qa.q2.answer1": "A: はい。",
      "qa.q2.answer2": "本サイトは従来のアカウント登録とログインシステムをすべて排除しました。今、あなたは名無しさん (NoName) です。電話番号、メールアドレス、SNSアカウントは要求しませんし、保存もしません。",
      "qa.q3.question": "Q: ログインしないなら、「私が私」であることをどう区別するのですか？",
      "qa.q3.answer1": "A: クライアントフィンガープリント（LocalStorage）とネットワーク特徴（IP Hash）を使用して、当日の一時的なIDを計算します。",
      "qa.q3.note": "注意：",
      "qa.q3.note-text": "ブラウザキャッシュの消去、シークレットモードの使用、ネットワーク環境の変更により、IDが変更されます。7chでは、アイデンティティは流動的です。",
      "qa.q4.question": "Q: プライバシーを侵害しないと信じる理由は？",
      "qa.q4.answer1": "A: Don't Trust, Verify. (信じるな、検証せよ)",
      "qa.q4.answer2": "本プロジェクトのフロントエンドコードは完全にオープンソースです。誰でもGitHubリポジトリを確認し、データ窃取のバックドアロジックがないことを確認できます。（注：オープンソース版と実行中のバージョンは完全に同一で、唯一の違いはバックエンドAPIアドレスの設定のみです。）",
      "qa.q5.question": "Q: オープンソースなのに、なぜNGワードリストが見えないのですか？",
      "qa.q5.answer1": "A: これはセキュリティポリシーです。",
      "qa.q5.answer2": "スパマーが分析してフィルタリングを回避することを防ぐため、NGワードリストはサーバー環境変数として保存され、公開リポジトリには含まれません。設定データを除き、すべてのビジネスロジックコードは完全に透明です。",
      "qa.q6.question": "Q: 間違えて投稿しました。削除できますか？",
      "qa.q6.answer1": "A: 自助削除はサポートしていません。",
      "qa.q6.answer2": "強力な匿名メカニズムを採用しているため、技術的に「あなたが投稿者である」ことを検証できないため、削除ボタンを提供していません。（注：投稿が深刻な違法、人肉検索、プライバシー漏洩に関わる場合は、以下の連絡先で人的処理を申請してください。）",
      "qa.q7.question": "Q: 違法・侵害コンテンツを発見したらどうすればいいですか？",
      "qa.q7.answer1": "A: 次のメールアドレスまでメールを送ってください",
      "qa.q7.answer2": "安全のため、匿名メールでの連絡をお勧めします。メールにスレッドIDと具体的な違反理由を明記してください。管理者が定期的に処理します。",
      "qa.q8.question": "Q: ここで発言しても法的リスクはありませんか？",
      "qa.q8.answer1": "A: インターネットは法外の地ではありません。",
      "qa.q8.answer2": "本サイトはユーザープロファイリングを行わないことを約束していますが、インターネットインフラ（ISP、通信キャリア）は依然として追跡可能です。発言が深刻な犯罪に関わる場合、法執行機関は技術的手段で特定できる可能性があります。",
      "qa.q8.answer3": "ユーザーの発言に対して責任は負いませんが、法的強制要求がある場合、サーバーログ（一時ID記録など）を提供します。",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: typeof window !== 'undefined' ? (localStorage.getItem('7ch_lang') || 'zh-CN') : 'zh-CN', // 修复 SSR 可能的报错
    fallbackLng: 'zh-CN',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;