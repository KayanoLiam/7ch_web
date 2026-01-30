import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface TermsProps {
  onBack: () => void;
}

const Section: React.FC<{ id: string; title: string; children: React.ReactNode }> = ({ id, title, children }) => (
  <section id={id} className="mb-10 scroll-mt-20">
    <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
      {title}
    </h3>
    <div className="text-gray-700 leading-relaxed space-y-4 text-sm md:text-base">
      {children}
    </div>
  </section>
);

export const Terms: React.FC<TermsProps> = ({ onBack }) => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('acceptance');

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = [
    { id: 'acceptance', label: t('terms.nav.acceptance') },
    { id: 'conduct', label: t('terms.nav.conduct') },
    { id: 'content', label: t('terms.nav.content') },
    { id: 'moderation', label: t('terms.nav.moderation') },
    { id: 'disclaimer', label: t('terms.nav.disclaimer') },
  ];

  return (
    <div className="bg-[#f0f0f0] min-h-screen pb-10">
      {/* Header Banner */}
      <div className="bg-[#37474f] text-white py-10 px-4 mb-6 shadow-sm">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{t('terms.title')}</h1>
          <p className="opacity-90">Effective Date: January 1, 2025</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-8">
        {/* Sidebar Nav (Desktop) */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-20 bg-white rounded shadow-sm border border-gray-200 p-4">
            <div className="font-bold text-gray-900 mb-4 px-2">{t('terms.contents')}</div>
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
                &larr; {t('nav.home')}
              </button>
            </div>
          </div>
        </aside>

        {/* Mobile Nav / Back */}
        <div className="md:hidden mb-4">
          <button onClick={onBack} className="text-[#0056b3] hover:underline font-bold">
            &larr; {t('nav.home')}
          </button>
        </div>

        {/* Main Content */}
        <main className="flex-1 bg-white p-6 md:p-10 rounded shadow-sm border border-gray-200 min-h-[500px]">
          
          <Section id="acceptance" title={t('terms.section.acceptance')}>
            <p>
              {t('terms.acceptance.text1')}
            </p>
            <p>
              {t('terms.acceptance.text2')}
            </p>
          </Section>

          <Section id="conduct" title={t('terms.section.conduct')}>
            <p>
              {t('terms.conduct.intro')}
            </p>
            <ul className="list-disc list-inside pl-2 space-y-2 mt-2 bg-gray-50 p-4 rounded border border-gray-100">
              <li><strong>{t('terms.conduct.illegal')}</strong></li>
              <li><strong>{t('terms.conduct.harassment')}</strong></li>
              <li><strong>{t('terms.conduct.spam')}</strong></li>
              <li><strong>{t('terms.conduct.malware')}</strong></li>
            </ul>
          </Section>

          <Section id="content" title={t('terms.section.content')}>
            <p>
              <strong>{t('terms.content.anonymity')}</strong>
            </p>
            <p>
              <strong>{t('terms.content.no-screening')}</strong>
            </p>
            <p>
              <strong>{t('terms.content.persistence')}</strong>
            </p>
          </Section>

          <Section id="moderation" title={t('terms.section.moderation')}>
            <p>
              {t('terms.moderation.intro')}
            </p>
            <ol className="list-decimal list-inside pl-2 space-y-1 mt-2">
              <li>{t('terms.moderation.right1')}</li>
              <li>{t('terms.moderation.right2')}</li>
              <li>{t('terms.moderation.right3')}</li>
            </ol>
            <p className="mt-2 text-sm text-gray-500 italic">
              {t('terms.moderation.note')}
            </p>
          </Section>

          <Section id="disclaimer" title={t('terms.section.disclaimer')}>
            <p className="uppercase font-bold text-xs text-gray-500 mb-2">{t('terms.disclaimer.warning')}</p>
            <p>
              {t('terms.disclaimer.text1')}
            </p>
            <p>
              {t('terms.disclaimer.text2')}
            </p>
          </Section>

        </main>
      </div>
    </div>
  );
};
