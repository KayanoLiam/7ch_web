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
    { id: 'acceptance', label: '1. Acceptance' },
    { id: 'conduct', label: '2. User Conduct' },
    { id: 'content', label: '3. Content & Liability' },
    { id: 'moderation', label: '4. Moderation' },
    { id: 'disclaimer', label: '5. Disclaimers' },
  ];

  return (
    <div className="bg-[#f0f0f0] min-h-screen pb-10">
      {/* Header Banner */}
      <div className="bg-[#37474f] text-white py-10 px-4 mb-6 shadow-sm">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Terms of Service</h1>
          <p className="opacity-90">Effective Date: January 1, 2025</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-8">
        {/* Sidebar Nav (Desktop) */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-20 bg-white rounded shadow-sm border border-gray-200 p-4">
            <div className="font-bold text-gray-900 mb-4 px-2">Agreement</div>
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
                &larr; Back to App
              </button>
            </div>
          </div>
        </aside>

        {/* Mobile Nav / Back */}
        <div className="md:hidden mb-4">
          <button onClick={onBack} className="text-[#0056b3] hover:underline font-bold">
            &larr; Back to App
          </button>
        </div>

        {/* Main Content */}
        <main className="flex-1 bg-white p-6 md:p-10 rounded shadow-sm border border-gray-200 min-h-[500px]">
          
          <Section id="acceptance" title="1. Acceptance of Terms">
            <p>
              By accessing and using <strong>7ch</strong> ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this Service, you shall be subject to any posted guidelines or rules applicable to such services.
            </p>
            <p>
              If you do not agree to abide by the above, please do not use this Service.
            </p>
          </Section>

          <Section id="conduct" title="2. User Conduct">
            <p>
              You agree that you are solely responsible for any content that you post, transmit, or share via the Service. You agree NOT to use the Service to:
            </p>
            <ul className="list-disc list-inside pl-2 space-y-2 mt-2 bg-gray-50 p-4 rounded border border-gray-100">
              <li><strong>Illegal Content:</strong> Post any content that violates applicable local, state, national, or international laws (e.g., child exploitation, illegal trade).</li>
              <li><strong>Harassment:</strong> Stalk, harass, threaten, or doxx (publish private information about) other individuals.</li>
              <li><strong>Spam:</strong> Post unsolicited or unauthorized advertising, promotional materials, "junk mail," or "chain letters."</li>
              <li><strong>Malware:</strong> Upload or link to software viruses or any other computer code designed to interrupt, destroy, or limit the functionality of any software or hardware.</li>
            </ul>
          </Section>

          <Section id="content" title="3. Content Ownership & Liability">
            <p>
              <strong>Anonymity & Responsibility:</strong> Since this Service allows anonymous posting, you acknowledge that you are legally responsible for your own speech. The Service acts as a passive conduit for your online distribution and publication.
            </p>
            <p>
              <strong>No Pre-screening:</strong> We do not inherently view or approve content before it is posted. However, we reserve the right (but not the obligation) to remove any content that violates these Terms.
            </p>
            <p>
              <strong>Data Persistence:</strong> This demo version stores data locally in your browser. We are not liable for any data loss resulting from clearing your browser cache or local storage.
            </p>
          </Section>

          <Section id="moderation" title="4. Moderation Policy">
            <p>
              The administration of 7ch reserves the right to:
            </p>
            <ol className="list-decimal list-inside pl-2 space-y-1 mt-2">
              <li>Delete any thread or post at any time for any reason, with or without notice.</li>
              <li>Ban users (via browser fingerprinting or ID blocking) who violate these terms.</li>
              <li>Designate volunteer moderators to manage specific boards.</li>
            </ol>
            <p className="mt-2 text-sm text-gray-500 italic">
              "Free speech" on this platform is a principle, not an absolute legal right. Disruptive behavior that damages the community experience will be removed.
            </p>
          </Section>

          <Section id="disclaimer" title="5. Disclaimers">
            <p className="uppercase font-bold text-xs text-gray-500 mb-2">Read Carefully</p>
            <p>
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
            </p>
            <p>
              WE DO NOT GUARANTEE THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE. YOU UNDERSTAND AND AGREE THAT YOU DOWNLOAD OR OTHERWISE OBTAIN MATERIAL OR DATA THROUGH THE USE OF THE SERVICE AT YOUR OWN DISCRETION AND RISK.
            </p>
          </Section>

        </main>
      </div>
    </div>
  );
};