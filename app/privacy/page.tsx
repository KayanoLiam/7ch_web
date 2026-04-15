import type { Metadata } from 'next';

import { StaticDocumentPage, StaticSection } from '../../features/static-pages/StaticDocumentPage.server';
import { tServer } from '../../lib/i18n/dictionaries';
import { getServerLocale } from '../../lib/i18n/server';
import { buildStaticPageMetadata } from '../../lib/seo/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return buildStaticPageMetadata({
    title: tServer('page.privacy.title', locale),
    description: tServer('page.privacy.metaDescription', locale),
    path: '/privacy',
    locale,
  });
}

export default async function PrivacyPage() {
  const locale = await getServerLocale();
  const t = (key: string) => tServer(key, locale);
  const navItems = [
    { id: 'intro', label: t('privacy.nav.intro') },
    { id: 'data-collection', label: t('privacy.nav.data') },
    { id: 'storage', label: t('privacy.nav.storage') },
    { id: 'anonymity', label: t('privacy.nav.anonymity') },
    { id: 'third-party', label: t('privacy.nav.thirdParty') },
    { id: 'contact', label: t('privacy.nav.contact') },
  ];

  return (
    <StaticDocumentPage
      kicker={t('footer.privacy')}
      title={t('privacy.title')}
      meta="Last Updated: February 3, 2026"
      contentsLabel={t('privacy.contents')}
      navItems={navItems}
      homeLabel={t('nav.home')}
    >
      <StaticSection id="intro" title={t('privacy.section.intro')}>
        <p>{t('privacy.intro.text1')}</p>
        <p>{t('privacy.intro.text2')}</p>
      </StaticSection>

      <StaticSection id="data-collection" title={t('privacy.section.data')}>
        <p>{t('privacy.data.intro')}</p>
        <ul className="mt-2 list-inside list-disc space-y-2 pl-2">
          <li><strong>{t('privacy.data.no-personal')}</strong></li>
          <li><strong>{t('privacy.data.no-account')}</strong></li>
          <li><strong>{t('privacy.data.voluntary')}</strong></li>
        </ul>
      </StaticSection>

      <StaticSection id="storage" title={t('privacy.section.storage')}>
        <p>{t('privacy.storage.intro')}</p>
        <div className="themed-callout-warn mb-4 mt-2 p-4">
          <p className="text-sm font-bold">{t('privacy.storage.note-title')}</p>
          <p className="mt-1 text-sm">{t('privacy.storage.note')}</p>
        </div>
        <p>{t('privacy.storage.preferences')}</p>
        <ul className="list-inside list-disc pl-2 text-sm">
          <li>{t('privacy.storage.lang')}</li>
          <li>{t('privacy.storage.hidden')}</li>
          <li>{t('privacy.storage.followed')}</li>
        </ul>
      </StaticSection>

      <StaticSection id="anonymity" title={t('privacy.section.anonymity')}>
        <p>{t('privacy.anonymity.intro')}</p>
        <h3 className="themed-heading-sm mb-2 mt-4 text-lg">{t('privacy.anonymity.how')}</h3>
        <p>{t('privacy.anonymity.desc')}</p>
        <code className="themed-code-inline mb-2 mt-2 block p-2 font-mono text-xs">
          Hash( IP + Date(UTC) + Board_ID + Secret_Salt )
        </code>
        <p>{t('privacy.anonymity.ensures')}</p>
        <ol className="mt-2 list-inside list-decimal space-y-1 pl-2">
          <li>{t('privacy.anonymity.ensure1')}</li>
          <li>{t('privacy.anonymity.ensure2')}</li>
          <li>{t('privacy.anonymity.ensure3')}</li>
        </ol>
      </StaticSection>

      <StaticSection id="third-party" title={t('privacy.section.thirdParty')}>
        <p>{t('privacy.thirdParty.intro')}</p>
        <ul className="mt-2 list-inside list-disc space-y-2 pl-2">
          <li><strong>{t('privacy.thirdParty.cdn')}</strong></li>
          <li><strong>{t('privacy.thirdParty.tailwind')}</strong></li>
        </ul>
        <p>{t('privacy.thirdParty.no-tracking')}</p>
      </StaticSection>

      <StaticSection id="contact" title={t('privacy.section.contact')}>
        <p>{t('privacy.contact.intro')}</p>
        <p className="mt-2"><strong>{t('privacy.contact.delete')}</strong></p>
        <p className="mt-4">{t('privacy.contact.tech')}</p>
      </StaticSection>
    </StaticDocumentPage>
  );
}
