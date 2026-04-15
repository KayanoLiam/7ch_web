import type { Metadata } from 'next';

import { StaticDocumentPage, StaticSection } from '../../features/static-pages/StaticDocumentPage.server';
import { tServer } from '../../lib/i18n/dictionaries';
import { buildLocalizedStaticPath } from '../../lib/i18n/routing';
import { getServerLocale } from '../../lib/i18n/server';
import { buildFaqPageJsonLd, stringifyJsonLd } from '../../lib/seo/jsonLd';
import { buildStaticPageMetadata } from '../../lib/seo/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return buildStaticPageMetadata({
    title: tServer('page.qa.fullTitle', locale),
    description: tServer('page.qa.metaDescription', locale),
    path: '/QA',
    locale,
  });
}

export default async function QAPage() {
  const locale = await getServerLocale();
  const t = (key: string) => tServer(key, locale);
  const faqEntries = [
    {
      id: 'access',
      label: t('qa.toc.access'),
      question: t('qa.q1.question'),
      paragraphs: [t('qa.q1.answer1'), t('qa.q1.answer2')],
      jsonLdAnswer: [t('qa.q1.answer1'), t('qa.q1.answer2')].join('\n\n'),
    },
    {
      id: 'anonymity',
      label: t('qa.toc.anonymity'),
      question: t('qa.q2.question'),
      paragraphs: [t('qa.q2.answer1'), t('qa.q2.answer2')],
      jsonLdAnswer: [t('qa.q2.answer1'), t('qa.q2.answer2')].join('\n\n'),
    },
    {
      id: 'identity',
      label: t('qa.toc.identity'),
      question: t('qa.q3.question'),
      paragraphs: [t('qa.q3.answer1')],
      jsonLdAnswer: [t('qa.q3.answer1'), `${t('qa.q3.note')} ${t('qa.q3.note-text')}`].join('\n\n'),
    },
    {
      id: 'privacy',
      label: t('qa.toc.privacy'),
      question: t('qa.q4.question'),
      paragraphs: [t('qa.q4.answer1'), t('qa.q4.answer2')],
      jsonLdAnswer: [t('qa.q4.answer1'), t('qa.q4.answer2')].join('\n\n'),
    },
    {
      id: 'opensource',
      label: t('qa.toc.opensource'),
      question: t('qa.q5.question'),
      paragraphs: [t('qa.q5.answer1'), t('qa.q5.answer2')],
      jsonLdAnswer: [t('qa.q5.answer1'), t('qa.q5.answer2')].join('\n\n'),
    },
    {
      id: 'deletion',
      label: t('qa.toc.deletion'),
      question: t('qa.q6.question'),
      paragraphs: [t('qa.q6.answer1'), t('qa.q6.answer2')],
      jsonLdAnswer: [t('qa.q6.answer1'), t('qa.q6.answer2')].join('\n\n'),
    },
    {
      id: 'report',
      label: t('qa.toc.report'),
      question: t('qa.q7.question'),
      paragraphs: [t('qa.q7.answer2')],
      jsonLdAnswer: [`${t('qa.q7.answer1')} Piercekaoru@proton.me.`, t('qa.q7.answer2')].join('\n\n'),
    },
    {
      id: 'legal',
      label: t('qa.toc.legal'),
      question: t('qa.q8.question'),
      paragraphs: [t('qa.q8.answer1'), t('qa.q8.answer2'), t('qa.q8.answer3')],
      jsonLdAnswer: [t('qa.q8.answer1'), t('qa.q8.answer2'), t('qa.q8.answer3')].join('\n\n'),
    },
  ] as const;
  const navItems = faqEntries.map((entry) => ({ id: entry.id, label: entry.label }));
  const faqJsonLd = buildFaqPageJsonLd(
    buildLocalizedStaticPath('/QA', locale),
    faqEntries.map((entry) => ({
      question: entry.question,
      answer: entry.jsonLdAnswer,
    })),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: stringifyJsonLd(faqJsonLd) }}
      />
      <StaticDocumentPage
        kicker={t('footer.QA')}
        title={t('qa.title')}
        subtitle={t('qa.subtitle')}
        contentsLabel={t('qa.toc.title')}
        navItems={navItems}
        homeLabel={t('nav.home')}
      >
        {faqEntries.map((entry) => (
          <StaticSection key={entry.id} id={entry.id} title={entry.question}>
            {entry.id === 'report' && (
              <p>
                {t('qa.q7.answer1')}{' '}
                <a href="mailto:Piercekaoru@proton.me" className="themed-inline-action">
                  Piercekaoru@proton.me
                </a>
                .
              </p>
            )}
            {entry.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {entry.id === 'identity' && (
              <div className="themed-callout-warn p-4">
                <p className="text-sm">
                  <strong>{t('qa.q3.note')}</strong> {t('qa.q3.note-text')}
                </p>
              </div>
            )}
          </StaticSection>
        ))}
      </StaticDocumentPage>
    </>
  );
}
