import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface PrivacyPolicyProps {
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

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('intro');

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = [
    { id: 'intro', label: t('privacy.nav.intro') },
    { id: 'data-collection', label: t('privacy.nav.data') },
    { id: 'storage', label: t('privacy.nav.storage') },
    { id: 'anonymity', label: t('privacy.nav.anonymity') },
    { id: 'third-party', label: t('privacy.nav.thirdParty') },
    { id: 'contact', label: t('privacy.nav.contact') },
  ];

  return (
    <div className="bg-[#f0f0f0] min-h-screen pb-10">
      {/* Header Banner */}
      <div className="bg-[#455a64] text-white py-10 px-4 mb-6 shadow-sm">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{t('privacy.title')}</h1>
          <p className="opacity-90">Last Updated: February 3, 2026</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-8">
        {/* Sidebar Nav (Desktop) */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-20 bg-white rounded shadow-sm border border-gray-200 p-4">
            <div className="font-bold text-gray-900 mb-4 px-2">{t('privacy.contents')}</div>
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
          
          <Section id="intro" title={t('privacy.section.intro')}>
            <p>
              {t('privacy.intro.text1')}
            </p>
            <p>
              {t('privacy.intro.text2')}
            </p>
          </Section>

          <Section id="data-collection" title={t('privacy.section.data')}>
            <p>
              {t('privacy.data.intro')}
            </p>
            <ul className="list-disc list-inside pl-2 space-y-2 mt-2">
              <li><strong>{t('privacy.data.no-personal')}</strong></li>
              <li><strong>{t('privacy.data.no-account')}</strong></li>
              <li><strong>{t('privacy.data.voluntary')}</strong></li>
            </ul>
          </Section>

          <Section id="storage" title={t('privacy.section.storage')}>
            <p>
              {t('privacy.storage.intro')}
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-2 mb-4">
              <p className="font-bold text-yellow-800 text-sm">{t('privacy.storage.note-title')}</p>
              <p className="text-sm text-yellow-800 mt-1">
                {t('privacy.storage.note')}
              </p>
            </div>
            <p>
              {t('privacy.storage.preferences')}
            </p>
            <ul className="list-disc list-inside pl-2 text-sm">
              <li>{t('privacy.storage.lang')}</li>
              <li>{t('privacy.storage.hidden')}</li>
              <li>{t('privacy.storage.followed')}</li>
            </ul>
          </Section>

          <Section id="anonymity" title={t('privacy.section.anonymity')}>
            <p>
              {t('privacy.anonymity.intro')}
            </p>
            <h4 className="font-bold mt-4 mb-2">{t('privacy.anonymity.how')}</h4>
            <p>
              {t('privacy.anonymity.desc')}
            </p>
            <code className="block bg-gray-100 p-2 rounded text-xs font-mono mt-2 mb-2">
              Hash( IP + Date(UTC) + Board_ID + Secret_Salt )
            </code>
            <p>
              {t('privacy.anonymity.ensures')}
            </p>
            <ol className="list-decimal list-inside pl-2 space-y-1 mt-2">
              <li>{t('privacy.anonymity.ensure1')}</li>
              <li>{t('privacy.anonymity.ensure2')}</li>
              <li>{t('privacy.anonymity.ensure3')}</li>
            </ol>
          </Section>

          <Section id="third-party" title={t('privacy.section.thirdParty')}>
            <p>
              {t('privacy.thirdParty.intro')}
            </p>
            <ul className="list-disc list-inside pl-2 space-y-2 mt-2">
              <li><strong>{t('privacy.thirdParty.cdn')}</strong></li>
              <li><strong>{t('privacy.thirdParty.tailwind')}</strong></li>
            </ul>
            <p>
              {t('privacy.thirdParty.no-tracking')}
            </p>
          </Section>

          <Section id="contact" title={t('privacy.section.contact')}>
            <p>
              {t('privacy.contact.intro')}
            </p>
            <p className="mt-2">
              <strong>{t('privacy.contact.delete')}</strong>
            </p>
            <p className="mt-4">
              {t('privacy.contact.tech')}
            </p>
          </Section>

        </main>
      </div>
    </div>
  );
};
