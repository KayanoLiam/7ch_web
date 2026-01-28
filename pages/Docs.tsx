import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface DocsProps {
    onBack: () => void;
}

const Section: React.FC<{ id: string; title: string; children: React.ReactNode }> = ({ id, title, children }) => (
    <section id={id} className="mb-12 scroll-mt-20">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200 flex items-center gap-2">
            <span className="text-[#2da0b3]">#</span> {title}
        </h3>
        <div className="text-gray-700 leading-relaxed space-y-4">
            {children}
        </div>
    </section>
);

const CodeBlock: React.FC<{ children: React.ReactNode; label?: string }> = ({ children, label }) => (
    <div className="my-4 rounded border border-gray-200 bg-gray-50 overflow-hidden">
        {label && <div className="bg-gray-100 px-3 py-1 text-xs font-bold text-gray-500 border-b border-gray-200">{label}</div>}
        <pre className="p-3 overflow-x-auto text-sm font-mono text-gray-800 whitespace-pre">
            {children}
        </pre>
    </div>
);

export const Docs: React.FC<DocsProps> = ({ onBack }) => {
    const { t } = useTranslation();
    const [activeSection, setActiveSection] = useState('overview');

    const scrollTo = (id: string) => {
        setActiveSection(id);
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    const navItems = [
        { id: 'overview', label: 'Overview' },
        { id: 'architecture', label: 'Architecture' },
        { id: 'data-model', label: 'Data Model' },
        { id: 'features', label: 'Key Features' },
        { id: 'i18n', label: 'Internationalization' },
    ];

    return (
        <div className="bg-[#f0f0f0] min-h-screen pb-10">
            {/* Header Banner */}
            <div className="bg-[#2da0b3] text-white py-10 px-4 mb-6 shadow-sm">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">7ch Technical Documentation</h1>
                    <p className="opacity-90">Architecture, Specifications, and Implementation Details</p>
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
                                    className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${activeSection === item.id
                                            ? 'bg-[#e0f2f1] text-[#00695c] font-bold'
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

                    <Section id="overview" title="Project Overview">
                        <p>
                            <strong>7ch</strong> is a modern, single-page anonymous bulletin board system (BBS) built with <strong>React 19</strong>, <strong>TypeScript</strong>, and <strong>Tailwind CSS</strong>.
                        </p>
                        <p>
                            It is designed to replicate the core experience of classic textboards (like 2ch/5ch) while using modern frontend technologies. The application runs entirely in the browser using a mock backend service backed by <code>LocalStorage</code>.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                            <div className="p-4 bg-gray-50 border border-gray-200 rounded">
                                <div className="font-bold text-gray-800 mb-1">Frontend Stack</div>
                                <ul className="list-disc list-inside text-sm text-gray-600">
                                    <li>React 19 (Hooks, StrictMode)</li>
                                    <li>TypeScript (Strict typing)</li>
                                    <li>Tailwind CSS (Styling)</li>
                                    <li>i18next (Internationalization)</li>
                                </ul>
                            </div>
                            <div className="p-4 bg-gray-50 border border-gray-200 rounded">
                                <div className="font-bold text-gray-800 mb-1">Key Concepts</div>
                                <ul className="list-disc list-inside text-sm text-gray-600">
                                    <li>No-Router SPA (State-based view)</li>
                                    <li>Mock API Layer</li>
                                    <li>Ephemeral Identity (Daily IDs)</li>
                                    <li>Client-side Persistence</li>
                                </ul>
                            </div>
                        </div>
                    </Section>

                    <Section id="architecture" title="Architecture">
                        <p>
                            The application follows a standard React component-based architecture but avoids client-side routing libraries (like react-router) to maintain a simple, flat structure typical of "app-like" experiences.
                        </p>
                        <h4 className="font-bold text-gray-800 mt-4">View State Machine</h4>
                        <p>
                            The main navigation is handled by a single state object in <code>App.tsx</code>:
                        </p>
                        <CodeBlock label="App.tsx">
                            {`type ViewState = 
  | { type: 'home' }
  | { type: 'favorites' }
  | { type: 'board', boardId: string }
  | { type: 'thread', threadId: string, boardId: string }
  | { type: 'static', pageId: string };`}
                        </CodeBlock>
                        <p>
                            This state determines which main component is rendered. Components like <code>ThreadView</code> are mounted/unmounted dynamically, triggering data fetches via <code>useEffect</code> hooks.
                        </p>
                    </Section>

                    <Section id="data-model" title="Data Model & Persistence">
                        <p>
                            Data is stored in the browser's <code>LocalStorage</code> under the key <code>7ch_db_v1</code>. The schema mimics a relational database structure.
                        </p>
                        <h4 className="font-bold text-gray-800 mt-4">Entities</h4>
                        <ul className="list-disc list-inside pl-2 space-y-1">
                            <li><strong>Board</strong>: Static definition (ID, Name, Description).</li>
                            <li><strong>Thread</strong>: Contains metadata (Title, PostCount, UpdatedAt) and the OP (Original Poster) content preview.</li>
                            <li><strong>Post</strong>: Individual entries associated with a Thread ID.</li>
                        </ul>
                        <CodeBlock label="types.ts">
                            {`interface Thread {
  id: string;
  boardId: string;
  title: string;
  viewCount: number;
  updatedAt: string; // Used for sorting (bump system)
  opPost: Post;
}`}
                        </CodeBlock>
                    </Section>

                    <Section id="features" title="Key Features Implementation">

                        <h4 className="font-bold text-gray-800 mt-4 text-lg">1. Daily ID Generation</h4>
                        <p>
                            To provide anonymity while preventing spam, a unique ID is generated for each user daily per board. This is calculated using a hash of the user's device UUID (stored in localStorage), the current date, and the board ID.
                        </p>
                        <CodeBlock label="services/mockService.ts">
                            {`// Hash(UUID + Date + BoardID)
const generateDailyId = (boardId: string): string => {
  const dateStr = new Date().toISOString().split('T')[0];
  const deviceId = getDeviceId();
  return simpleHash(\`\${deviceId}-\${dateStr}-\${boardId}\`)
    .substring(0, 9);
};`}
                        </CodeBlock>

                        <h4 className="font-bold text-gray-800 mt-6 text-lg">2. Tripcodes (Capcode)</h4>
                        <p>
                            Users can prove their identity without registering by using a Tripcode. Entering <code>Name#password</code> in the name field converts it to <code>Name ◆Hash</code>.
                        </p>
                        <CodeBlock>
                            {`if (displayName.includes('#')) {
  const [namePart, passPart] = displayName.split('#');
  displayName = namePart;
  tripcode = '◆' + simpleHash(passPart);
}`}
                        </CodeBlock>

                        <h4 className="font-bold text-gray-800 mt-6 text-lg">3. Sage Mechanism</h4>
                        <p>
                            In traditional BBS culture, "sage" (lowering) allows a user to reply to a thread without "bumping" it to the top of the list. This is implemented in the <code>createPost</code> service method:
                        </p>
                        <CodeBlock>
                            {`const isSage = payload.email?.toLowerCase().includes('sage');
if (!isSage) {
  thread.updatedAt = now; // Only update time (bump) if NOT sage
}`}
                        </CodeBlock>

                        <h4 className="font-bold text-gray-800 mt-6 text-lg">4. Anchor Tooltips</h4>
                        <p>
                            The <code>RichText</code> component parses post content for the <code>&gt;&gt;Number</code> pattern. When hovered, it searches the current thread's post list for the target ID and renders a floating tooltip using fixed positioning.
                        </p>
                    </Section>

                    <Section id="i18n" title="Internationalization">
                        <p>
                            The app supports <strong>English (internal)</strong>, <strong>Chinese (zh-CN)</strong>, and <strong>Japanese (ja-JP)</strong>.
                        </p>
                        <p>
                            We use <code>react-i18next</code>. Special care is taken for Japanese localization:
                        </p>
                        <ul className="list-disc list-inside pl-2 space-y-1 mt-2">
                            <li><strong>Era Date Format</strong>: When <code>ja-JP</code> is active, Gregorian dates (2025) are converted to Japanese Era dates (R7).</li>
                            <li><strong>Weekdays</strong>: Displayed as (月), (火), etc.</li>
                        </ul>
                        <CodeBlock label="Era Conversion Logic">
                            {`if (d.getFullYear() >= 2019) y = 'R' + (d.getFullYear() - 2018); // Reiwa
else if (d.getFullYear() >= 1989) y = 'H' + (d.getFullYear() - 1988); // Heisei`}
                        </CodeBlock>
                    </Section>

                </main>
            </div>
        </div>
    );
};

export default Docs;