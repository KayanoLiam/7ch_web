import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface HelpProps {
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

const KeyTag: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-block bg-gray-100 border border-gray-300 rounded px-1.5 py-0.5 text-xs font-mono text-gray-800 mx-1">
    {children}
  </span>
);

export const Help: React.FC<HelpProps> = ({ onBack }) => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('basics');

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = [
    { id: 'basics', label: t('help.toc.basics') },
    { id: 'tripcodes', label: t('help.toc.tripcodes') },
    { id: 'sage', label: t('help.toc.sage') },
    { id: 'anchors', label: t('help.toc.anchors') },
    { id: 'ids', label: t('help.toc.ids') },
  ];

  return (
    <div className="bg-[#f0f0f0] min-h-screen pb-10">
      {/* Header Banner */}
      <div className="bg-[#5d4037] text-white py-10 px-4 mb-6 shadow-sm">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{t('help.banner.title')}</h1>
          <p className="opacity-90">{t('help.banner.subtitle')}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-8">
        {/* Sidebar Nav (Desktop) */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-20 bg-white rounded shadow-sm border border-gray-200 p-4">
            <div className="font-bold text-gray-900 mb-4 px-2">{t('help.toc.title')}</div>
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
          
          <Section id="basics" title={t('help.section.basics')}>
            <p>
              {t('help.basics.intro')}
            </p>
            <ul className="list-disc list-inside pl-2 space-y-2 mt-2">
              <li><strong>{t('help.basics.posting')}</strong></li>
              <li><strong>{t('help.basics.anonymity')}</strong></li>
            </ul>
          </Section>

          <Section id="tripcodes" title={t('help.section.tripcodes')}>
            <p>
              {t('help.tripcodes.intro')}
            </p>
            <div className="bg-gray-50 p-4 border border-gray-200 rounded mt-2">
              <h4 className="font-bold text-sm text-gray-700 mb-2">{t('help.tripcodes.how')}</h4>
              <p className="text-sm">
                {t('help.tripcodes.how-desc')} <KeyTag>Name#password</KeyTag>
              </p>
              <p className="text-sm mt-2 text-gray-600">
                {t('help.tripcodes.example-desc')}
              </p>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              {t('help.tripcodes.note')}
            </p>
          </Section>

          <Section id="sage" title={t('help.section.sage')}>
            <p>
              {t('help.sage.intro')}
            </p>
            <p>
              {t('help.sage.how')} <KeyTag>sage</KeyTag>
            </p>
            <ul className="list-disc list-inside pl-2 space-y-1 mt-2 text-sm">
              <li><strong>{t('help.sage.normal')}</strong></li>
              <li><strong>{t('help.sage.sage-post')}</strong></li>
            </ul>
          </Section>

          <Section id="anchors" title={t('help.section.anchors')}>
            <p>
              {t('help.anchors.intro')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div className="p-3 bg-gray-50 border border-gray-200 rounded">
                <span className="font-bold text-xs text-gray-500 block mb-1">{t('help.anchors.input')}</span>
                <code className="text-sm">I agree with &gt;&gt;1 completely.</code>
              </div>
              <div className="p-3 bg-white border border-gray-200 rounded shadow-sm">
                <span className="font-bold text-xs text-gray-500 block mb-1">{t('help.anchors.result')}</span>
                <span className="text-sm">I agree with <span className="text-[#0056b3] hover:underline cursor-pointer">&gt;&gt;1</span> completely.</span>
              </div>
            </div>
            <p className="mt-2">
              {t('help.anchors.hover')}
            </p>
          </Section>

          <Section id="ids" title={t('help.section.ids')}>
            <p>
              {t('help.ids.intro')}
            </p>
            <div className="flex items-center gap-2 mt-2">
               <span className="text-sm font-bold text-gray-600">{t('help.ids.example')}</span>
               <span className="font-mono bg-gray-100 px-2 py-1 rounded">ID:A1b2C3d4</span>
            </div>
            <ul className="list-disc list-inside pl-2 space-y-2 mt-3 text-sm">
              <li><strong>{t('help.ids.scope')}</strong></li>
              <li><strong>{t('help.ids.reset')}</strong></li>
              <li><strong>{t('help.ids.privacy')}</strong></li>
            </ul>
          </Section>

        </main>
      </div>
    </div>
  );
};
