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
    { id: 'basics', label: '1. Basics' },
    { id: 'tripcodes', label: '2. Tripcodes' },
    { id: 'sage', label: '3. Sage Function' },
    { id: 'anchors', label: '4. Anchors & Quotes' },
    { id: 'ids', label: '5. ID System' },
  ];

  return (
    <div className="bg-[#f0f0f0] min-h-screen pb-10">
      {/* Header Banner */}
      <div className="bg-[#5d4037] text-white py-10 px-4 mb-6 shadow-sm">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">User Guide</h1>
          <p className="opacity-90">How to use 7ch effectively</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-8">
        {/* Sidebar Nav (Desktop) */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-20 bg-white rounded shadow-sm border border-gray-200 p-4">
            <div className="font-bold text-gray-900 mb-4 px-2">Table of Contents</div>
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
          
          <Section id="basics" title="1. The Basics">
            <p>
              7ch is an anonymous textboard. You do not need to register an account to post. 
              Navigation relies on a simple hierarchy: <strong>Boards</strong> contain <strong>Threads</strong>, and Threads contain <strong>Posts</strong>.
            </p>
            <ul className="list-disc list-inside pl-2 space-y-2 mt-2">
              <li><strong>Posting:</strong> Anyone can create a thread (Start a discussion) or reply to an existing one.</li>
              <li><strong>Anonymity:</strong> By default, your name is displayed as "Anonymous" (or "名無しさん").</li>
            </ul>
          </Section>

          <Section id="tripcodes" title="2. Tripcodes (Identity)">
            <p>
              If you need to prove your identity across multiple posts without registering, use a <strong>Tripcode</strong>.
            </p>
            <div className="bg-gray-50 p-4 border border-gray-200 rounded mt-2">
              <h4 className="font-bold text-sm text-gray-700 mb-2">How to use:</h4>
              <p className="text-sm">
                In the Name field, enter: <KeyTag>Name#password</KeyTag>
              </p>
              <p className="text-sm mt-2 text-gray-600">
                Example: Entering <code>Alice#secret123</code> will display as <code>Alice ◆AbC123x</code>.
              </p>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Only you know the password (the part after #), but everyone can verify the resulting hash (the part after ◆) is the same.
            </p>
          </Section>

          <Section id="sage" title="3. The 'Sage' Function">
            <p>
              By default, replying to a thread "bumps" it to the top of the board index, increasing its visibility.
            </p>
            <p>
              If you want to reply without bumping the thread (e.g., for a minor correction or to avoid bumping a trolling thread), put <KeyTag>sage</KeyTag> in the <strong>E-mail</strong> field.
            </p>
            <ul className="list-disc list-inside pl-2 space-y-1 mt-2 text-sm">
              <li><strong>Normal Post:</strong> Thread Updated time changes -&gt; Moves to top.</li>
              <li><strong>Sage Post:</strong> Thread Updated time does <em>not</em> change -&gt; Stays in place.</li>
            </ul>
          </Section>

          <Section id="anchors" title="4. Anchors & Quotes">
            <p>
              To reply to a specific post, use the <code>&gt;&gt;</code> symbol followed by the post number.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div className="p-3 bg-gray-50 border border-gray-200 rounded">
                <span className="font-bold text-xs text-gray-500 block mb-1">Input</span>
                <code className="text-sm">I agree with &gt;&gt;1 completely.</code>
              </div>
              <div className="p-3 bg-white border border-gray-200 rounded shadow-sm">
                <span className="font-bold text-xs text-gray-500 block mb-1">Result</span>
                <span className="text-sm">I agree with <span className="text-[#0056b3] hover:underline cursor-pointer">&gt;&gt;1</span> completely.</span>
              </div>
            </div>
            <p className="mt-2">
              On 7ch, hovering over a blue anchor link (like <span className="text-[#0056b3]">&gt;&gt;15</span>) will show a popup preview of that post. Clicking it typically adds a reverse-link or jumps to the post.
            </p>
          </Section>

          <Section id="ids" title="5. Daily ID System">
            <p>
              Instead of usernames, we use <strong>IDs</strong> to track unique users within a single thread for a single day.
            </p>
            <div className="flex items-center gap-2 mt-2">
               <span className="text-sm font-bold text-gray-600">Example ID:</span>
               <span className="font-mono bg-gray-100 px-2 py-1 rounded">ID:A1b2C3d4</span>
            </div>
            <ul className="list-disc list-inside pl-2 space-y-2 mt-3 text-sm">
              <li><strong>Scope:</strong> Your ID is unique to you, the specific board, and the current date.</li>
              <li><strong>Reset:</strong> IDs change every day at midnight (UTC).</li>
              <li><strong>Privacy:</strong> This prevents long-term tracking while allowing users to identify if multiple posts in a thread are from the same person that day.</li>
            </ul>
          </Section>

        </main>
      </div>
    </div>
  );
};