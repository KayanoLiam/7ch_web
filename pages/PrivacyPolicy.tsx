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
    { id: 'intro', label: '1. Introduction' },
    { id: 'data-collection', label: '2. Data Collection' },
    { id: 'storage', label: '3. Local Storage' },
    { id: 'anonymity', label: '4. Anonymity & IDs' },
    { id: 'third-party', label: '5. Third-Party Services' },
    { id: 'contact', label: '6. Contact Us' },
  ];

  return (
    <div className="bg-[#f0f0f0] min-h-screen pb-10">
      {/* Header Banner */}
      <div className="bg-[#455a64] text-white py-10 px-4 mb-6 shadow-sm">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Privacy Policy</h1>
          <p className="opacity-90">Last Updated: January 2025</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-8">
        {/* Sidebar Nav (Desktop) */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-20 bg-white rounded shadow-sm border border-gray-200 p-4">
            <div className="font-bold text-gray-900 mb-4 px-2">Contents</div>
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
          
          <Section id="intro" title="1. Introduction">
            <p>
              Welcome to <strong>7ch</strong> ("we," "our," or "us"). We are committed to protecting your privacy while providing an open platform for anonymous communication. 
            </p>
            <p>
              This Privacy Policy explains how we handle information in our unique, serverless environment. Unlike traditional web applications, 7ch (in its current demo state) operates primarily within your browser using <strong>Client-Side Persistence</strong>.
            </p>
          </Section>

          <Section id="data-collection" title="2. Information We Collect">
            <p>
              We prioritize data minimalism. As a client-side application, we adhere to the following principles:
            </p>
            <ul className="list-disc list-inside pl-2 space-y-2 mt-2">
              <li><strong>No Personal Identification:</strong> We do not ask for your real name, email address, phone number, or physical address.</li>
              <li><strong>No Account Registration:</strong> There is no sign-up process. You interact with the service immediately and anonymously.</li>
              <li><strong>Voluntary Information:</strong> Any content (text, tripcodes) you post is provided voluntarily and is visible to the public (simulated in this demo).</li>
            </ul>
          </Section>

          <Section id="storage" title="3. Local Storage Mechanism">
            <p>
              This application uses your browser's <strong>LocalStorage</strong> technology to function.
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-2 mb-4">
              <p className="font-bold text-yellow-800 text-sm">Important Note for this Demo Version:</p>
              <p className="text-sm text-yellow-800 mt-1">
                All "posts," "threads," and "settings" are stored strictly on your own device inside the <code>7ch_db_v1</code> key in LocalStorage. <strong>No data is sent to a remote server.</strong> Clearing your browser cache will delete all threads created in this session.
              </p>
            </div>
            <p>
              We also store your preferences locally, such as:
            </p>
            <ul className="list-disc list-inside pl-2 text-sm">
              <li>Language settings (<code>7ch_lang</code>)</li>
              <li>Hidden threads list (<code>7ch_hidden_threads</code>)</li>
              <li>Followed threads list (<code>7ch_followed_threads</code>)</li>
            </ul>
          </Section>

          <Section id="anonymity" title="4. Anonymity & Device Fingerprinting">
            <p>
              To maintain the integrity of our boards and prevent spam without requiring accounts, we utilize a <strong>Daily ID System</strong>.
            </p>
            <h4 className="font-bold mt-4 mb-2">How IDs are generated:</h4>
            <p>
              We generate a random UUID and store it in your LocalStorage (<code>7ch_device_uuid</code>). When you post, your displayed ID is a cryptographic hash of:
            </p>
            <code className="block bg-gray-100 p-2 rounded text-xs font-mono mt-2 mb-2">
              Hash( Device_UUID + Current_Date + Board_ID )
            </code>
            <p>
              This ensures that:
            </p>
            <ol className="list-decimal list-inside pl-2 space-y-1 mt-2">
              <li>Your ID changes every day (00:00 UTC).</li>
              <li>Your ID is different on different boards.</li>
              <li>We cannot reverse-engineer your identity from your ID.</li>
            </ol>
          </Section>

          <Section id="third-party" title="5. Third-Party Services">
            <p>
              While our application logic runs locally, we rely on third-party Content Delivery Networks (CDNs) to load the application resources. These providers may collect basic access logs (such as IP addresses) for security and performance monitoring.
            </p>
            <ul className="list-disc list-inside pl-2 space-y-2 mt-2">
              <li><strong>esm.sh / unpkg:</strong> Used to load React and i18n libraries.</li>
              <li><strong>Tailwind CSS CDN:</strong> Used for styling the application.</li>
            </ul>
            <p>
              We do not use Google Analytics, Facebook Pixels, or any other marketing trackers.
            </p>
          </Section>

          <Section id="contact" title="6. Contact & Rights">
            <p>
              Since we do not store your personal data on any server, we cannot "delete" your account as one does not exist. You have full control over your data:
            </p>
            <p className="mt-2">
              <strong>To delete all data:</strong> Simply clear your browser's "Local Storage" or "Site Data" for this domain.
            </p>
            <p className="mt-4">
              If you have technical questions regarding this architecture, please refer to the <button onClick={() => window.alert('Please refer to the Technical Documentation page.')} className="text-[#0056b3] hover:underline">Technical Documentation</button>.
            </p>
          </Section>

        </main>
      </div>
    </div>
  );
};