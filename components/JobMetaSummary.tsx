import React from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';
import { useTheme } from './theme-provider';

import type { JobMeta } from '../types';
import {
  formatWageLabel,
  getContactTypeLabel,
  getJapaneseRequirementLabel,
  getTransportationCoveredLabel,
  getYesNoLabel,
  getYesNoUnknownLabel,
} from '../lib/jobMeta';

interface JobMetaSummaryProps {
  jobMeta: JobMeta;
}

export const JobMetaSummary: React.FC<JobMetaSummaryProps> = ({ jobMeta }) => {
  const { t } = useTranslation();
  const { themeVariant } = useTheme();
  const isClaude = themeVariant === 'claude';

  return (
    <div className={cn('themed-card-muted mb-3 p-3 text-sm text-foreground', isClaude && 'rounded-[1.25rem]')}>
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span className="themed-chip-accent px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide">
          {t('job.summary.badge')}
        </span>
        <span className={cn('font-semibold', isClaude && 'font-serif font-medium')}>
          {jobMeta.region} / {jobMeta.nearestStation}
        </span>
      </div>

      <div className="grid gap-2 text-xs sm:grid-cols-2">
        <div>
          <span className="themed-kicker">
            {t('job.fields.hourlyWageMinJpy')}
          </span>
          <div>{formatWageLabel(t, jobMeta.hourlyWageMinJpy, jobMeta.hourlyWageMaxJpy, jobMeta.hourlyWageNote)}</div>
        </div>
        <div>
          <span className="themed-kicker">
            {t('job.fields.monthlyWageMinJpy')}
          </span>
          <div>{formatWageLabel(t, jobMeta.monthlyWageMinJpy, jobMeta.monthlyWageMaxJpy, jobMeta.monthlyWageNote)}</div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-medium">
        <span className="themed-chip px-2 py-1">
          {t('job.fields.transportationCovered')}: {getTransportationCoveredLabel(t, jobMeta.transportationCovered)}
        </span>
        <span className="themed-chip px-2 py-1">
          {t('job.fields.internationalStudentsAccepted')}: {getYesNoLabel(t, jobMeta.internationalStudentsAccepted)}
        </span>
        <span className="themed-chip px-2 py-1">
          {t('job.fields.noExperienceAccepted')}: {getYesNoLabel(t, jobMeta.noExperienceAccepted)}
        </span>
        <span className="themed-chip px-2 py-1">
          {t('job.fields.japaneseRequirement')}: {getJapaneseRequirementLabel(t, jobMeta.japaneseRequirement)}
        </span>
        <span className="themed-chip px-2 py-1">
          {t('job.fields.hasChineseStaff')}: {getYesNoUnknownLabel(t, jobMeta.hasChineseStaff)}
        </span>
        <span className="themed-chip px-2 py-1">
          {t('job.fields.contactType')}: {getContactTypeLabel(t, jobMeta.contactType)}
        </span>
      </div>

      <div className="mt-3 grid gap-2 text-xs sm:grid-cols-2">
        <div>
          <span className="themed-kicker">
            {t('job.fields.businessType')}
          </span>
          <div>{jobMeta.businessType}</div>
        </div>
        <div>
          <span className="themed-kicker">
            {t('job.fields.companySize')}
          </span>
          <div>{jobMeta.companySize}</div>
        </div>
      </div>
    </div>
  );
};
