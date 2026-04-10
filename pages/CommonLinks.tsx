import React from 'react';
import { ArrowLeft, ExternalLink, Lock, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { commonLinks, getCommonLinkById } from '../data/commonLinks';
import { formatLocalizedCalendarDate } from '../lib/date';

interface CommonLinksBoardProps {
  onBack: () => void;
  search: string;
}

interface CommonLinkDetailProps {
  onBack: () => void;
}

export const CommonLinksBoard: React.FC<CommonLinksBoardProps> = ({ onBack, search }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const filteredLinks = search.trim()
    ? commonLinks.filter((item) => {
        const keyword = search.trim().toLowerCase();
        const text = [
          item.id,
          item.title,
          t(item.descriptionKey),
          ...item.tagKeys.map((tagKey) => t(tagKey)),
        ].join(' ').toLowerCase();
        return text.includes(keyword);
      })
    : commonLinks;

  return (
    <div className="themed-page min-h-[calc(100vh-3.5rem)] pb-10">
      <div className="mx-auto max-w-4xl px-2 py-6 sm:px-4">
        <div className="mb-4 flex items-center gap-2 text-xl font-bold text-foreground">
          <button
            onClick={onBack}
            className="themed-inline-action inline-flex items-center gap-1 text-sm font-normal"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('commonLinks.back')}
          </button>
          <span className="themed-meta">/</span>
          <span>/{commonLinks[0]?.boardId ?? 'links'}/</span>
          <span className="themed-meta">/</span>
          <span className="themed-heading text-xl">{t('board.links.name')}</span>
        </div>

        <section className="themed-callout-info mb-6 p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-bold">
            <Lock className="h-4 w-4" />
            {t('commonLinks.readOnlyTitle')}
          </div>
          <p className="text-sm leading-relaxed">
            {t('commonLinks.readOnlyBody')}
          </p>
        </section>

        <div className="space-y-4">
          {filteredLinks.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/board/${item.boardId}/thread/${item.id}`)}
              className="themed-list-card cursor-pointer p-5 transition-colors hover:bg-white/70"
            >
              <div className="themed-meta mb-3 flex flex-wrap items-center gap-2 text-xs font-bold">
                <span>{formatLocalizedCalendarDate(new Date(item.updatedAt), i18n.language)}</span>
                <span className="themed-chip-accent px-2 py-0.5 text-[10px] uppercase tracking-wide">
                  {t('commonLinks.staticBadge')}
                </span>
                {item.tagKeys.map((tagKey) => (
                  <span
                    key={tagKey}
                    className="themed-chip px-2 py-0.5 text-[10px] uppercase tracking-wide"
                  >
                    {t(tagKey)}
                  </span>
                ))}
              </div>

              <div className="themed-heading-sm mb-2 text-lg text-[hsl(var(--brand))]">
                {item.title}
              </div>

              <div className="mb-3 text-sm leading-relaxed text-foreground">
                {t(item.descriptionKey)}
              </div>

              <div className="themed-meta flex items-center gap-4 text-xs font-bold">
                <span className="inline-flex items-center gap-1 text-[hsl(var(--brand))]">
                  <ExternalLink className="h-3.5 w-3.5" />
                  {t('commonLinks.openSite')}
                </span>
                {item.repoHref && (
                  <span className="inline-flex items-center gap-1">
                    <Shield className="h-3.5 w-3.5" />
                    {t('commonLinks.viewSource')}
                  </span>
                )}
                <span className="themed-inline-action ml-auto">
                  {t('commonLinks.viewDetail')}
                </span>
              </div>
            </div>
          ))}

          {filteredLinks.length === 0 && (
            <div className="themed-list-card p-10 text-center themed-meta">
              {t('commonLinks.empty')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const CommonLinkDetail: React.FC<CommonLinkDetailProps> = ({ onBack }) => {
  const { t, i18n } = useTranslation();
  const { linkId } = useParams();

  const item = linkId ? getCommonLinkById(linkId) : null;

  if (!item) {
    return (
      <div className="themed-page min-h-[calc(100vh-3.5rem)] pb-10">
        <div className="mx-auto max-w-4xl px-2 py-6 sm:px-4">
          <div className="themed-list-card p-10 text-center themed-meta">
            {t('commonLinks.notFound')}
          </div>
        </div>
      </div>
    );
  }

  const featureCards = item.featureKeyPrefixes.map((prefix) => ({
    title: t(`${prefix}.title`),
    body: t(`${prefix}.body`),
  }));

  return (
    <div className="themed-page min-h-[calc(100vh-3.5rem)] pb-10">
      <div className="mx-auto max-w-4xl px-2 py-6 sm:px-4">
        <div className="themed-meta mb-4 flex items-center gap-2 text-sm">
          <button onClick={onBack} className="themed-inline-action">
            &lt; {t('board.links.name')}
          </button>
          <span>/ {item.title} /</span>
        </div>

        <div className="themed-list-card mb-4 p-4">
          <div className="themed-meta mb-2 flex flex-wrap items-center gap-2 text-xs font-bold">
            <span>{formatLocalizedCalendarDate(new Date(item.updatedAt), i18n.language)}</span>
            <span className="themed-chip-accent px-2 py-0.5 text-[10px] uppercase tracking-wide">
              {t('commonLinks.staticBadge')}
            </span>
            {item.tagKeys.map((tagKey) => (
              <span
                key={tagKey}
                className="themed-chip px-2 py-0.5 text-[10px] uppercase tracking-wide"
              >
                {t(tagKey)}
              </span>
            ))}
          </div>

          <h1 className="themed-heading mb-3 text-2xl">{item.title}</h1>
          <p className="text-[15px] leading-relaxed text-foreground">
            {t(item.descriptionKey)}
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="themed-primary-action inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition-colors"
            >
              {t('commonLinks.openSite')}
              <ExternalLink className="h-4 w-4" />
            </a>
            {item.repoHref && (
                <a
                  href={item.repoHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="themed-secondary-action inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition-colors"
                >
                {t('commonLinks.viewSource')}
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {featureCards.map((feature) => (
            <div
              key={feature.title}
              className="themed-list-card p-4"
            >
              <div className="themed-heading-sm mb-2 text-sm">{feature.title}</div>
              <div className="text-[15px] leading-relaxed text-foreground">{feature.body}</div>
            </div>
          ))}

          <div className="themed-callout-warn p-4">
            <div className="mb-1 text-sm font-bold">
              {t(item.bestForTitleKey)}
            </div>
            <p className="text-[15px] leading-relaxed">
              {t(item.bestForBodyKey)}
            </p>
          </div>

          <div className="themed-list-card p-4">
            <div className="themed-heading-sm mb-2 text-sm">
              {t('commonLinks.disclaimerTitle')}
            </div>
            <div className="text-[15px] leading-relaxed text-foreground">
              {t('commonLinks.disclaimerBody')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
