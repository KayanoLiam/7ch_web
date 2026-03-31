import React from 'react';
import { useTranslation } from 'react-i18next';

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

  return (
    <div className="mb-3 rounded-lg border border-sky-100 bg-sky-50/70 p-3 text-sm text-slate-800 dark:border-sky-900/50 dark:bg-sky-950/20 dark:text-slate-100">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-sky-100 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-sky-700 dark:bg-sky-900/40 dark:text-sky-200">
          {t('job.summary.badge')}
        </span>
        <span className="font-semibold">
          {jobMeta.region} / {jobMeta.nearestStation}
        </span>
      </div>

      <div className="grid gap-2 text-xs sm:grid-cols-2">
        <div>
          <span className="font-semibold text-slate-500 dark:text-slate-400">
            {t('job.fields.hourlyWageMinJpy')}
          </span>
          <div>{formatWageLabel(t, jobMeta.hourlyWageMinJpy, jobMeta.hourlyWageMaxJpy, jobMeta.hourlyWageNote)}</div>
        </div>
        <div>
          <span className="font-semibold text-slate-500 dark:text-slate-400">
            {t('job.fields.monthlyWageMinJpy')}
          </span>
          <div>{formatWageLabel(t, jobMeta.monthlyWageMinJpy, jobMeta.monthlyWageMaxJpy, jobMeta.monthlyWageNote)}</div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-medium">
        <span className="rounded-full border border-slate-200 bg-white px-2 py-1 dark:border-slate-700 dark:bg-slate-900/70">
          {t('job.fields.transportationCovered')}: {getTransportationCoveredLabel(t, jobMeta.transportationCovered)}
        </span>
        <span className="rounded-full border border-slate-200 bg-white px-2 py-1 dark:border-slate-700 dark:bg-slate-900/70">
          {t('job.fields.internationalStudentsAccepted')}: {getYesNoLabel(t, jobMeta.internationalStudentsAccepted)}
        </span>
        <span className="rounded-full border border-slate-200 bg-white px-2 py-1 dark:border-slate-700 dark:bg-slate-900/70">
          {t('job.fields.noExperienceAccepted')}: {getYesNoLabel(t, jobMeta.noExperienceAccepted)}
        </span>
        <span className="rounded-full border border-slate-200 bg-white px-2 py-1 dark:border-slate-700 dark:bg-slate-900/70">
          {t('job.fields.japaneseRequirement')}: {getJapaneseRequirementLabel(t, jobMeta.japaneseRequirement)}
        </span>
        <span className="rounded-full border border-slate-200 bg-white px-2 py-1 dark:border-slate-700 dark:bg-slate-900/70">
          {t('job.fields.hasChineseStaff')}: {getYesNoUnknownLabel(t, jobMeta.hasChineseStaff)}
        </span>
        <span className="rounded-full border border-slate-200 bg-white px-2 py-1 dark:border-slate-700 dark:bg-slate-900/70">
          {t('job.fields.contactType')}: {getContactTypeLabel(t, jobMeta.contactType)}
        </span>
      </div>

      <div className="mt-3 grid gap-2 text-xs sm:grid-cols-2">
        <div>
          <span className="font-semibold text-slate-500 dark:text-slate-400">
            {t('job.fields.businessType')}
          </span>
          <div>{jobMeta.businessType}</div>
        </div>
        <div>
          <span className="font-semibold text-slate-500 dark:text-slate-400">
            {t('job.fields.companySize')}
          </span>
          <div>{jobMeta.companySize}</div>
        </div>
      </div>
    </div>
  );
};
