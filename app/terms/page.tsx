import type { Metadata } from 'next';

import { StaticDocumentPage, StaticSection } from '../../features/static-pages/StaticDocumentPage.server';
import { tServer } from '../../lib/i18n/dictionaries';
import { getServerLocale } from '../../lib/i18n/server';
import { buildStaticPageMetadata } from '../../lib/seo/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return buildStaticPageMetadata({
    title: tServer('page.terms.title', locale),
    description: tServer('page.terms.metaDescription', locale),
    path: '/terms',
    locale,
  });
}

export default async function TermsPage() {
  const locale = await getServerLocale();
  const t = (key: string) => tServer(key, locale);
  const navItems = [
    { id: 'acceptance', label: t('terms.nav.acceptance') },
    { id: 'conduct', label: t('terms.nav.conduct') },
    { id: 'content', label: t('terms.nav.content') },
    { id: 'moderation', label: t('terms.nav.moderation') },
    { id: 'disclaimer', label: t('terms.nav.disclaimer') },
  ];

  return (
    <StaticDocumentPage
      kicker={t('footer.terms')}
      title={t('terms.title')}
      meta="Effective Date: February 3, 2026"
      contentsLabel={t('terms.contents')}
      navItems={navItems}
      homeLabel={t('nav.home')}
    >
      <StaticSection id="acceptance" title={t('terms.section.acceptance')}>
        <p>{t('terms.acceptance.text1')}</p>
        <p>{t('terms.acceptance.text2')}</p>
      </StaticSection>

      <StaticSection id="conduct" title={t('terms.section.conduct')}>
        <p>{t('terms.conduct.intro')}</p>
        <ul className="themed-metric-card mt-2 list-inside list-disc space-y-2 p-4 pl-2">
          <li><strong>{t('terms.conduct.illegal')}</strong></li>
          <li><strong>{t('terms.conduct.harassment')}</strong></li>
          <li><strong>{t('terms.conduct.spam')}</strong></li>
          <li><strong>{t('terms.conduct.malware')}</strong></li>
        </ul>
      </StaticSection>

      <StaticSection id="content" title={t('terms.section.content')}>
        <p><strong>{t('terms.content.anonymity')}</strong></p>
        <p><strong>{t('terms.content.no-screening')}</strong></p>
        <p><strong>{t('terms.content.persistence')}</strong></p>
      </StaticSection>

      <StaticSection id="moderation" title={t('terms.section.moderation')}>
        <p>{t('terms.moderation.intro')}</p>
        <ol className="mt-2 list-inside list-decimal space-y-1 pl-2">
          <li>{t('terms.moderation.right1')}</li>
          <li>{t('terms.moderation.right2')}</li>
          <li>{t('terms.moderation.right3')}</li>
        </ol>
        <p className="themed-meta mt-2 text-sm italic">{t('terms.moderation.note')}</p>
      </StaticSection>

      <StaticSection id="disclaimer" title={t('terms.section.disclaimer')}>
        <p className="themed-kicker mb-2 text-xs">{t('terms.disclaimer.warning')}</p>
        <p>{t('terms.disclaimer.text1')}</p>
        <p>{t('terms.disclaimer.text2')}</p>
      </StaticSection>
    </StaticDocumentPage>
  );
}
