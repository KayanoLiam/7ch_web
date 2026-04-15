import type { Metadata } from 'next';

import { CodeBlock, StaticDocumentPage, StaticSection } from '../../features/static-pages/StaticDocumentPage.server';
import { tServer } from '../../lib/i18n/dictionaries';
import { getServerLocale } from '../../lib/i18n/server';
import { buildStaticPageMetadata } from '../../lib/seo/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return buildStaticPageMetadata({
    title: tServer('page.docs.fullTitle', locale),
    description: tServer('page.docs.metaDescription', locale),
    path: '/docs',
    locale,
  });
}

export default async function DocsPage() {
  const locale = await getServerLocale();
  const t = (key: string) => tServer(key, locale);
  const navItems = [
    { id: 'overview', label: t('docs.toc.overview') },
    { id: 'architecture', label: t('docs.toc.architecture') },
    { id: 'data-model', label: t('docs.toc.data-model') },
    { id: 'features', label: t('docs.toc.features') },
    { id: 'i18n', label: t('docs.toc.i18n') },
  ];

  return (
    <StaticDocumentPage
      kicker={t('footer.tech')}
      title={t('docs.banner.title')}
      subtitle={t('docs.banner.subtitle')}
      contentsLabel={t('docs.toc.title')}
      navItems={navItems}
      homeLabel={t('nav.home')}
    >
      <StaticSection id="overview" title={t('docs.overview.title')} accent>
        <p><strong>7ch</strong> {t('docs.overview.intro')}</p>
        <p>{t('docs.overview.description')}</p>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="themed-metric-card p-4">
            <div className="mb-1 font-bold text-foreground">{t('docs.overview.frontend')}</div>
            <ul className="themed-meta list-inside list-disc text-sm">
              <li>{t('docs.overview.frontend.react')}</li>
              <li>{t('docs.overview.frontend.typescript')}</li>
              <li>{t('docs.overview.frontend.tailwind')}</li>
              <li>{t('docs.overview.frontend.i18n')}</li>
            </ul>
          </div>
          <div className="themed-metric-card p-4">
            <div className="mb-1 font-bold text-foreground">{t('docs.overview.concepts')}</div>
            <ul className="themed-meta list-inside list-disc text-sm">
              <li>{t('docs.overview.concepts.no-router')}</li>
              <li>{t('docs.overview.concepts.mock-api')}</li>
              <li>{t('docs.overview.concepts.identity')}</li>
              <li>{t('docs.overview.concepts.persistence')}</li>
            </ul>
          </div>
        </div>
        <div className="themed-callout-info mt-4 p-4 text-sm">
          {t('docs.overview.transparency')}
        </div>
      </StaticSection>

      <StaticSection id="architecture" title={t('docs.architecture.title')} accent>
        <p>{t('docs.architecture.intro')}</p>
        <h3 className="themed-heading-sm mt-4 text-lg">{t('docs.architecture.view-state')}</h3>
        <p>{t('docs.architecture.view-state.desc')}</p>
        <CodeBlock label={t('docs.architecture.routes.label')}>{`/                       -> Home (Boards)
/board/:boardId         -> Board
/board/:boardId/thread/:threadId -> Thread
/favorites              -> Favorites
/docs | /help | /terms | /privacy | /QA -> Static Pages`}</CodeBlock>
        <p>{t('docs.architecture.view-state.desc2')}</p>
      </StaticSection>

      <StaticSection id="data-model" title={t('docs.data-model.title')} accent>
        <p>{t('docs.data-model.intro')}</p>
        <h3 className="themed-heading-sm mt-4 text-lg">{t('docs.data-model.entities')}</h3>
        <ul className="list-inside list-disc space-y-1 pl-2">
          <li><strong>Board</strong>: {t('docs.data-model.entities.board')}</li>
          <li><strong>Thread</strong>: {t('docs.data-model.entities.thread')}</li>
          <li><strong>Post</strong>: {t('docs.data-model.entities.post')}</li>
        </ul>
        <p className="themed-meta text-sm">{t('docs.data-model.note')}</p>
        <CodeBlock label={t('docs.data-model.codeLabel')}>{`{
  "id": 12,
  "threadId": "<uuid>",
  "name": "Anonymous",
  "tripcode": "◆abcd1234ef",
  "content": "...",
  "createdAt": "2026-02-03T12:00:00Z",
  "uid": "A1b2C3d4",
  "isOp": false
}`}</CodeBlock>
      </StaticSection>

      <StaticSection id="features" title={t('docs.features.title')} accent>
        <h3 className="themed-heading-sm mt-4 text-lg">{t('docs.features.daily-id.title')}</h3>
        <p>{t('docs.features.daily-id.intro')}</p>
        <ul className="list-inside list-disc space-y-1 pl-2">
          <li>{t('docs.features.daily-id.points.input')}</li>
          <li>{t('docs.features.daily-id.points.hash')}</li>
          <li>{t('docs.features.daily-id.points.output')}</li>
        </ul>
        <p>{t('docs.features.daily-id.behavior')}</p>
        <CodeBlock label={t('docs.features.daily-id.codeLabel')}>{`Raw = IP + Date(UTC: YYYY-MM-DD) + BoardId + SecretSalt
Hash = SHA256(Raw)
Encoded = Base64UrlSafeNoPad(Hash)
DailyId = Encoded.substring(0, 8)`}</CodeBlock>
        <p className="themed-meta text-sm">{t('docs.features.daily-id.note')}</p>

        <h3 className="themed-heading-sm mt-6 text-lg">{t('docs.features.tripcode.title')}</h3>
        <p>{t('docs.features.tripcode.intro')}</p>
        <CodeBlock>{`Input: "Name#password"
Name = "Name"
Tripcode = "◆" + hex(SHA256(password + SecretSalt)).slice(0, 10)`}</CodeBlock>

        <h3 className="themed-heading-sm mt-6 text-lg">{t('docs.features.sage.title')}</h3>
        <p>{t('docs.features.sage.intro')}</p>
        <CodeBlock>{`const isSage = email?.toLowerCase().includes('sage');
if (!isSage) {
  thread.updatedAt = now; // bump only when NOT sage
}`}</CodeBlock>

        <h3 className="themed-heading-sm mt-6 text-lg">{t('docs.features.anchor.title')}</h3>
        <p>{t('docs.features.anchor.intro')}</p>

        <h3 className="themed-heading-sm mt-6 text-lg">{t('docs.features.moderation.title')}</h3>
        <p>{t('docs.features.moderation.intro')}</p>
      </StaticSection>

      <StaticSection id="i18n" title={t('docs.i18n.title')} accent>
        <p>{t('docs.i18n.intro')}</p>
        <p>{t('docs.i18n.technology')}</p>
        <ul className="mt-2 list-inside list-disc space-y-1 pl-2">
          <li><strong>{t('docs.i18n.era')}</strong></li>
          <li><strong>{t('docs.i18n.weekday')}</strong></li>
        </ul>
        <CodeBlock label={t('docs.i18n.codeLabel')}>{`if (d.getFullYear() >= 2019) y = 'R' + (d.getFullYear() - 2018); // Reiwa
else if (d.getFullYear() >= 1989) y = 'H' + (d.getFullYear() - 1988); // Heisei`}</CodeBlock>
      </StaticSection>
    </StaticDocumentPage>
  );
}
