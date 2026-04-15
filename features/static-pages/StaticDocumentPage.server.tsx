import Link from 'next/link';
import type { ReactNode } from 'react';

interface StaticNavItem {
  id: string;
  label: string;
}

interface StaticDocumentPageProps {
  kicker: string;
  title: string;
  subtitle?: string;
  meta?: string;
  contentsLabel: string;
  navItems: StaticNavItem[];
  homeLabel: string;
  children: ReactNode;
}

export function StaticDocumentPage({
  kicker,
  title,
  subtitle,
  meta,
  contentsLabel,
  navItems,
  homeLabel,
  children,
}: StaticDocumentPageProps) {
  const activeId = navItems[0]?.id;

  return (
    <div className="themed-page min-h-screen pb-10">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <section className="themed-static-hero mb-6 p-6 md:p-8">
          <div className="themed-kicker mb-3">{kicker}</div>
          <Link className="themed-inline-action mb-3 inline-block text-sm" href="/">
            &larr; {homeLabel}
          </Link>
          <h1 className="themed-heading mb-3 text-3xl md:text-4xl">{title}</h1>
          {subtitle && <p className="max-w-3xl text-sm leading-7 themed-meta md:text-base">{subtitle}</p>}
          {meta && <p className="themed-meta text-sm leading-7">{meta}</p>}
        </section>

        <div className="flex flex-col gap-8 md:flex-row">
          <aside className="hidden w-64 flex-shrink-0 md:block">
            <div className="themed-static-sidebar sticky top-20 p-4">
              <div className="themed-kicker mb-4 px-2">{contentsLabel}</div>
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    className={`themed-static-nav block w-full px-3 py-2 text-left text-sm ${item.id === activeId ? 'themed-static-nav-active' : ''}`}
                    href={`#${item.id}`}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              <div className="mt-6 border-t border-border pt-4">
                <Link className="themed-inline-action flex items-center gap-1 px-2 text-sm" href="/">
                  &larr; {homeLabel}
                </Link>
              </div>
            </div>
          </aside>

          <main className="themed-static-main min-h-[500px] flex-1 p-6 md:p-10">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

export function StaticSection({
  id,
  title,
  children,
  accent = false,
}: {
  id: string;
  title: string;
  children: ReactNode;
  accent?: boolean;
}) {
  return (
    <section id={id} className={accent ? 'themed-static-section mb-12' : 'themed-static-section mb-10'}>
      <h2 className={accent
        ? 'themed-static-section-title mb-4 flex items-center gap-2 pb-3 text-2xl font-bold'
        : 'themed-static-section-title mb-4 pb-3 text-xl font-bold md:text-2xl'}
      >
        {accent && <span className="text-[hsl(var(--brand))]">#</span>}
        {title}
      </h2>
      <div className="space-y-4 text-sm leading-relaxed text-foreground md:text-base">
        {children}
      </div>
    </section>
  );
}

export function CodeBlock({ children, label }: { children: ReactNode; label?: string }) {
  return (
    <div className="themed-codeblock my-4">
      {label && <div className="themed-codeblock-label px-3 py-1 text-xs font-bold">{label}</div>}
      <pre className="overflow-x-auto whitespace-pre p-3 font-mono text-sm text-foreground">
        {children}
      </pre>
    </div>
  );
}

export function KeyTag({ children }: { children: ReactNode }) {
  return (
    <span className="themed-code-inline mx-1 inline-block px-1.5 py-0.5 font-mono text-xs">
      {children}
    </span>
  );
}
