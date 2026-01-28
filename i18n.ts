import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  'zh-CN': {
    translation: {
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
      
      // Footer & Static Pages
      "footer.privacy": "隐私政策",
      "footer.tech": "技术文档",
      "footer.terms": "用户协议",
      "footer.help": "使用须知",
      "page.privacy.title": "隐私政策",
      "page.privacy.content": "本站重视您的隐私。\n\n1. 数据存储：本站演示版目前使用您的浏览器 LocalStorage 存储数据，不会上传至任何服务器。\n2. ID生成：每日ID基于您的设备指纹哈希生成，我们不存储您的真实IP地址。\n3. 追踪：本站不使用任何第三方 Cookies 进行行为追踪。",
      "page.tech.title": "技术文档",
      "page.tech.content": "7ch 是一个基于 React 19 + TypeScript + Tailwind CSS 构建的现代 BBS 前端架构。\n\n核心特性：\n- Mock Service：在前端完整模拟了后端的业务逻辑（ID计算、Sage机制、Tripcode处理）。\n- 国际化：基于 i18next 的完整多语言支持。\n- 交互：实现了经典的引用预览（Anchor Tooltip）和键盘友好的操作流。",
      "page.terms.title": "用户协议",
      "page.terms.content": "欢迎使用 7ch。\n\n1. 请勿发布违反当地法律法规的内容。\n2. 禁止发布垃圾广告或恶意刷屏。\n3. 本站管理员有权在不通知的情况下删除任何违规内容。\n4. 本站为匿名论坛，用户需对自己的言论负责。",
      "page.help.title": "使用须知",
      "page.help.content": "基本操作指南：\n\n1. 【绊码 Tripcode】：在名字栏输入 'Name#password'，发布后会显示为 'Name ◆Hash'，用于验证身份。\n2. 【Sage】：在 E-mail 栏输入 'sage'，回复帖子时不会将帖子顶到列表最前。\n3. 【引用】：点击楼层号（如 >>1）可快速插入回复引用。鼠标悬停在蓝色链接上可预览内容。\n4. 【ID】：您的 ID 每天重置一次，同一天在同一板块内 ID 相同。"
    }
  },
  'ja-JP': {
    translation: {
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

      // Footer & Static Pages
      "footer.privacy": "プライバシーポリシー",
      "footer.tech": "技術ドキュメント",
      "footer.terms": "利用規約",
      "footer.help": "使い方",
      "page.privacy.title": "プライバシーポリシー",
      "page.privacy.content": "当サイトはプライバシーを重視しています。\n\n1. データ保存：デモ版はブラウザのLocalStorageを使用し、サーバーには送信されません。\n2. ID生成：IDはデバイスのハッシュに基づいて生成され、IPアドレスは保存されません。\n3. トラッキング：行動追跡のためのクッキーは使用していません。",
      "page.tech.title": "技術ドキュメント",
      "page.tech.content": "7chは React 19 + TypeScript + Tailwind CSS で構築されたモダンな掲示板アーキテクチャです。\n\n主な機能：\n- Mock Service：バックエンドロジック（ID計算、Sage、トリップ）をフロントエンドで完全シミュレート。\n- 国際化：i18nextによる完全な多言語対応。\n- UI/UX：アンカーポップアップやレスポンシブデザインを実装。",
      "page.terms.title": "利用規約",
      "page.terms.content": "7chへようこそ。\n\n1. 法令に違反する投稿は禁止です。\n2. スパムや荒らし行為は禁止です。\n3. 管理人は予告なくコンテンツを削除する権利を持ちます。\n4. 匿名掲示板ですが、投稿内容には責任を持ってください。",
      "page.help.title": "使い方",
      "page.help.content": "基本ガイド：\n\n1. 【トリップ】：名前に '名前#パスワード' と入力すると、'名前 ◆Hash' と表示されます。\n2. 【sage】：E-mail欄に 'sage' と入力すると、スレッドが上がりません（下げる）。\n3. 【アンカー】：レス番（>>1など）をクリックすると返信できます。リンクにカーソルを合わせるとプレビューが表示されます。\n4. 【ID】：IDは毎日リセットされます。同じ板では同じIDになります。"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('7ch_lang') || 'zh-CN',
    fallbackLng: 'zh-CN',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;