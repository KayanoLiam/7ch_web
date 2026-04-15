import Link from 'next/link';

import { tServer } from '../../lib/i18n/dictionaries';
import { getServerLocale } from '../../lib/i18n/server';

interface StaticInfoPageProps {
  title: string;
  subtitle: string;
  sections: Array<{
    title: string;
    body: React.ReactNode;
  }>;
}

export async function StaticInfoPage({ title, subtitle, sections }: StaticInfoPageProps) {
  const locale = await getServerLocale();

  return (
    <div className="themed-page min-h-screen pb-10">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <section className="themed-static-hero mb-6 p-6 md:p-8">
          <div className="mb-3">
            <Link className="themed-inline-action text-sm" href="/">
              &larr; {tServer('common.backHome', locale)}
            </Link>
          </div>
          <h1 className="themed-heading mb-3 text-3xl md:text-4xl">{title}</h1>
          <p className="max-w-3xl text-sm leading-7 themed-meta md:text-base">{subtitle}</p>
        </section>
        <main className="themed-static-main min-h-[500px] p-6 md:p-10">
          <div className="space-y-10">
            {sections.map((section) => (
              <section key={section.title} className="themed-static-section">
                <h2 className="themed-static-section-title mb-4 pb-3 text-xl font-bold md:text-2xl">
                  {section.title}
                </h2>
                <div className="space-y-4 leading-relaxed text-foreground">{section.body}</div>
              </section>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
