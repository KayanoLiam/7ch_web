import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface QAProps {
  onBack: () => void;
}

const Section: React.FC<{ id: string; title: string; children: React.ReactNode }> = ({ id, title, children }) => (
  <section id={id} className="mb-10 scroll-mt-20">
    <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
      {title}
    </h3>
    <div className="text-gray-700 leading-relaxed space-y-4 text-sm md:text-base">
      {children}
    </div>
  </section>
);

export const QA: React.FC<QAProps> = ({ onBack }) => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('access');

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = [
    { id: 'access', label: '1. 访问问题' },
    { id: 'anonymity', label: '2. 关于匿名' },
    { id: 'identity', label: '3. 身份区分' },
    { id: 'privacy', label: '4. 隐私信任' },
    { id: 'opensource', label: '5. 开源与过滤' },
    { id: 'deletion', label: '6. 删帖政策' },
    { id: 'report', label: '7. 举报投诉' },
    { id: 'legal', label: '8. 法律风险' },
  ];

  return (
    <div className="bg-[#f0f0f0] min-h-screen pb-10">
      {/* Header Banner */}
      <div className="bg-[#006064] text-white py-10 px-4 mb-6 shadow-sm">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Q&A / 常见问题</h1>
          <p className="opacity-90">Questions & Answers</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-8">
        {/* Sidebar Nav (Desktop) */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-20 bg-white rounded shadow-sm border border-gray-200 p-4">
            <div className="font-bold text-gray-900 mb-4 px-2">目录</div>
            <nav className="space-y-1">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                    activeSection === item.id 
                      ? 'bg-gray-100 text-black font-bold border-l-4 border-[#2da0b3]' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="mt-6 pt-4 border-t border-gray-100">
              <button onClick={onBack} className="text-sm text-[#0056b3] hover:underline flex items-center gap-1 px-2">
                &larr; 返回首页
              </button>
            </div>
          </div>
        </aside>

        {/* Mobile Nav / Back */}
        <div className="md:hidden mb-4">
          <button onClick={onBack} className="text-[#0056b3] hover:underline font-bold">
            &larr; 返回首页
          </button>
        </div>

        {/* Main Content */}
        <main className="flex-1 bg-white p-6 md:p-10 rounded shadow-sm border border-gray-200 min-h-[500px]">
          
          <Section id="access" title="Q: 为什么在中国大陆无法直接访问？">
            <p>
              <strong>A:</strong> 本站前端托管于 Vercel 的全球边缘网络。
            </p>
            <p>
              由于中国大陆地区的网络环境特殊，Vercel 的节点通常处于被阻断状态。这是一个面向全球互联网的匿名实验项目，如果您看到了这里，说明您已经具备了访问自由互联网的基础能力。
            </p>
          </Section>

          <Section id="anonymity" title="Q: 这里的“匿名”是真的吗？">
            <p>
              <strong>A:</strong> 是的。
            </p>
            <p>
              本站移除了所有传统的账号注册与登录系统。此时此刻，你就是无名氏 (NoName)。我们不要求、也不存储您的手机号、邮箱或社交账号。
            </p>
          </Section>

          <Section id="identity" title="Q: 既然不登录，怎么区分“我是我”？">
            <p>
              <strong>A:</strong> 我们利用客户端指纹（LocalStorage）与网络特征（IP Hash）来计算您当日的临时身份 ID。
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="text-sm text-yellow-800">
                <strong>注意：</strong> 清除浏览器缓存、开启无痕模式或更换网络环境，都会导致您的 ID 发生变化。在 7ch，身份是流动的。
              </p>
            </div>
          </Section>

          <Section id="privacy" title="Q: 我凭什么相信你们不窃取隐私？">
            <p>
              <strong>A:</strong> Don&apos;t Trust, Verify. (不要轻信，去验证)
            </p>
            <p>
              本项目的前端代码是完全开源的。任何人都可以审查我们的 GitHub 仓库，确保其中没有任何窃取数据的后门逻辑。
              <br />
              <span className="text-sm text-gray-500">（注：开源版本代码与线上运行版本完全一致，唯一的区别仅在于后端的 API 地址配置。）</span>
            </p>
          </Section>

          <Section id="opensource" title="Q: 既然是开源的，为什么我看不到屏蔽词列表？">
            <p>
              <strong>A:</strong> 这是一个安全策略。
            </p>
            <p>
              为了防止垃圾广告发送者（Spammers）针对性地分析并绕过过滤系统，我们的屏蔽关键词库（NG Words）作为服务器环境变量存储，不包含在公开的代码仓库中。除配置数据外，所有的业务逻辑代码均完全透明。
            </p>
          </Section>

          <Section id="deletion" title="Q: 我发错内容了，能删除帖子吗？">
            <p>
              <strong>A:</strong> 不支持自助删除。
            </p>
            <p>
              由于采用了强匿名机制，系统在技术上无法验证“你是该帖子的发布者”，因此不提供删除按钮。
              <br />
              <span className="text-sm text-gray-500">（注：若您的帖子涉及严重违法、人肉搜索或隐私泄露，请通过下方的联系方式申请人工处理。）</span>
            </p>
          </Section>

          <Section id="report" title="Q: 发现违法/侵权内容如何处理？">
            <p>
              <strong>A:</strong> 请发送邮件至 <a href="mailto:Piercekaoru@proton.me" className="text-[#0056b3] hover:underline">Piercekaoru@proton.me</a>。
            </p>
            <p>
              为了您的安全，建议您同样使用匿名邮箱进行联系。请在邮件中注明 Thread ID 和具体的违规理由，管理员会定期处理。
            </p>
          </Section>

          <Section id="legal" title="Q: 在这里发言有法律风险吗？">
            <p>
              <strong>A:</strong> 互联网不是法外之地。
            </p>
            <p>
              虽然本站承诺不建立用户画像，但互联网的基础设施（ISP、电信运营商）依然有迹可循。如果您的言论涉及严重犯罪，执法机构仍可能通过技术手段定位到您。
            </p>
            <p>
              我们不对用户的言论负责，但在法律强制要求下，我们会配合提供仅有的服务器日志信息（如临时 ID 记录）。
            </p>
          </Section>

        </main>
      </div>
    </div>
  );
};