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