import type { Metadata } from 'next';

import { KeyTag, StaticDocumentPage, StaticSection } from '../../features/static-pages/StaticDocumentPage.server';
import { tServer } from '../../lib/i18n/dictionaries';
import { getServerLocale } from '../../lib/i18n/server';
import { buildStaticPageMetadata } from '../../lib/seo/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return buildStaticPageMetadata({
    title: tServer('page.help.title', locale),
    description: tServer('page.help.metaDescription', locale),
    path: '/help',
    locale,
  });
}

export default async function HelpPage() {
  const locale = await getServerLocale();
  const t = (key: string) => tServer(key, locale);
  const navItems = [
    { id: 'basics', label: t('help.toc.basics') },
    { id: 'tripcodes', label: t('help.toc.tripcodes') },
    { id: 'sage', label: t('help.toc.sage') },
    { id: 'anchors', label: t('help.toc.anchors') },
    { id: 'ids', label: t('help.toc.ids') },
  ];

  return (
    <StaticDocumentPage
      kicker={t('footer.help')}
      title={t('help.banner.title')}
      subtitle={t('help.banner.subtitle')}
      contentsLabel={t('help.toc.title')}
      navItems={navItems}
      homeLabel={t('nav.home')}
    >
      <StaticSection id="basics" title={t('help.section.basics')}>
        <p>{t('help.basics.intro')}</p>
        <ul className="mt-2 list-inside list-disc space-y-2 pl-2">
          <li><strong>{t('help.basics.posting')}</strong></li>
          <li><strong>{t('help.basics.anonymity')}</strong></li>
        </ul>
      </StaticSection>

      <StaticSection id="tripcodes" title={t('help.section.tripcodes')}>
        <p>{t('help.tripcodes.intro')}</p>
        <div className="themed-metric-card mt-2 p-4">
          <h3 className="themed-heading-sm mb-2 text-sm">{t('help.tripcodes.how')}</h3>
          <p className="text-sm">
            {t('help.tripcodes.how-desc')} <KeyTag>Name#password</KeyTag>
          </p>
          <p className="themed-meta mt-2 text-sm">{t('help.tripcodes.example-desc')}</p>
        </div>
        <p className="themed-meta mt-2 text-sm">{t('help.tripcodes.note')}</p>
      </StaticSection>

      <StaticSection id="sage" title={t('help.section.sage')}>
        <p>{t('help.sage.intro')}</p>
        <p>{t('help.sage.how')} <KeyTag>sage</KeyTag></p>
        <ul className="mt-2 list-inside list-disc space-y-1 pl-2 text-sm">
          <li><strong>{t('help.sage.normal')}</strong></li>
          <li><strong>{t('help.sage.sage-post')}</strong></li>
        </ul>
      </StaticSection>

      <StaticSection id="anchors" title={t('help.section.anchors')}>
        <p>{t('help.anchors.intro')}</p>
        <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="themed-metric-card p-3">
            <span className="themed-kicker mb-1 block text-xs">{t('help.anchors.input')}</span>
            <code className="text-sm">I agree with &gt;&gt;1 completely.</code>
          </div>
          <div className="themed-list-card p-3">
            <span className="themed-kicker mb-1 block text-xs">{t('help.anchors.result')}</span>
            <span className="text-sm text-foreground">
              I agree with <span className="cursor-pointer themed-inline-action">&gt;&gt;1</span> completely.
            </span>
          </div>
        </div>
        <p className="mt-2">{t('help.anchors.hover')}</p>
      </StaticSection>

      <StaticSection id="ids" title={t('help.section.ids')}>
        <p>{t('help.ids.intro')}</p>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-sm font-bold themed-meta">{t('help.ids.example')}</span>
          <span className="themed-code-inline px-2 py-1 font-mono">ID:A1b2C3d4</span>
        </div>
        <ul className="mt-3 list-inside list-disc space-y-2 pl-2 text-sm">
          <li><strong>{t('help.ids.scope')}</strong></li>
          <li><strong>{t('help.ids.reset')}</strong></li>
          <li><strong>{t('help.ids.privacy')}</strong></li>
        </ul>
      </StaticSection>
    </StaticDocumentPage>
  );
}
