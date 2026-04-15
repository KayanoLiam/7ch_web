import Link from 'next/link';
import type { Metadata } from 'next';

import { changelogData } from '../../data/changelog';
import { tServer } from '../../lib/i18n/dictionaries';
import { getServerLocale } from '../../lib/i18n/server';
import { buildStaticPageMetadata } from '../../lib/seo/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return buildStaticPageMetadata({
    title: tServer('page.changelog.title', locale),
    description: tServer('page.changelog.metaDescription', locale),
    path: '/changelog',
    locale,
  });
}

export default async function ChangelogPage() {
  const locale = await getServerLocale();

  return (
    <div className="themed-page min-h-screen pb-10">
      <div className="mx-auto max-w-4xl px-4 py-6">
        <section className="themed-static-hero mb-6 p-6">
          <div className="mb-3">
            <Link className="themed-inline-action text-sm" href="/">
              &larr; {tServer('common.backHome', locale)}
            </Link>
          </div>
          <h1 className="themed-heading text-3xl">{tServer('page.changelog.title', locale)}</h1>
        </section>
        <div className="space-y-4">
          {changelogData.map((entry) => (
            <article key={`${entry.date}-${entry.title}`} className="themed-card themed-card-featured p-5">
              <div className="themed-meta mb-2 text-xs">{entry.date}</div>
              <h2 className="themed-heading-sm mb-3 text-lg">{entry.title}</h2>
              <ul className="list-disc space-y-1 pl-5 text-sm text-foreground">
                {entry.changes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
