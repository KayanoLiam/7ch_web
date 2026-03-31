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
  maskContactValue,
} from '../lib/jobMeta';

interface JobMetaPanelProps {
  jobMeta: JobMeta;
  showContactValue: boolean;
  onToggleContactValue: () => void;
}

const FieldRow: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div className="rounded-lg border border-slate-200 bg-slate-50/80 p-3 dark:border-slate-800 dark:bg-slate-900/60">
    <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
      {label}
    </div>
    <div className="text-sm leading-relaxed text-slate-900 dark:text-slate-100">{value}</div>
  </div>
);

export const JobMetaPanel: React.FC<JobMetaPanelProps> = ({
  jobMeta,
  showContactValue,
  onToggleContactValue,
}) => {
  const { t } = useTranslation();
  const contactValue = showContactValue
    ? jobMeta.contactValue
    : maskContactValue(jobMeta.contactValue);

  return (
    <section className="mb-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-sky-700 dark:bg-sky-900/40 dark:text-sky-200">
          {t('job.summary.badge')}
        </span>
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          {t('job.detail.title')}
        </h2>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <FieldRow label={t('job.fields.region')} value={jobMeta.region} />
        <FieldRow label={t('job.fields.nearestStation')} value={jobMeta.nearestStation} />
        <FieldRow
          label={t('job.fields.hourlyWageMinJpy')}
          value={formatWageLabel(t, jobMeta.hourlyWageMinJpy, jobMeta.hourlyWageMaxJpy, jobMeta.hourlyWageNote)}
        />
        <FieldRow
          label={t('job.fields.monthlyWageMinJpy')}
          value={formatWageLabel(t, jobMeta.monthlyWageMinJpy, jobMeta.monthlyWageMaxJpy, jobMeta.monthlyWageNote)}
        />
        <FieldRow
          label={t('job.fields.transportationCovered')}
          value={getTransportationCoveredLabel(t, jobMeta.transportationCovered)}
        />
        <FieldRow
          label={t('job.fields.internationalStudentsAccepted')}
          value={getYesNoLabel(t, jobMeta.internationalStudentsAccepted)}
        />
        <FieldRow
          label={t('job.fields.noExperienceAccepted')}
          value={getYesNoLabel(t, jobMeta.noExperienceAccepted)}
        />
        <FieldRow
          label={t('job.fields.japaneseRequirement')}
          value={getJapaneseRequirementLabel(t, jobMeta.japaneseRequirement)}
        />
        <FieldRow label={t('job.fields.visaRequirement')} value={jobMeta.visaRequirement} />
        <FieldRow label={t('job.fields.shiftStyle')} value={jobMeta.shiftStyle} />
        <FieldRow
          label={t('job.fields.housingProvided')}
          value={getYesNoLabel(t, jobMeta.housingProvided)}
        />
        <FieldRow label={t('job.fields.housingSubsidy')} value={jobMeta.housingSubsidy} />
        <FieldRow
          label={t('job.fields.hasChineseStaff')}
          value={getYesNoUnknownLabel(t, jobMeta.hasChineseStaff)}
        />
        <FieldRow label={t('job.fields.businessType')} value={jobMeta.businessType} />
        <FieldRow label={t('job.fields.companySize')} value={jobMeta.companySize} />
        <FieldRow
          label={t('job.fields.contactType')}
          value={getContactTypeLabel(t, jobMeta.contactType)}
        />
        <div className="rounded-lg border border-slate-200 bg-slate-50/80 p-3 dark:border-slate-800 dark:bg-slate-900/60">
          <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            {t('job.fields.contactValue')}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm leading-relaxed text-slate-900 dark:text-slate-100">
              {contactValue}
            </span>
            <button
              type="button"
              onClick={onToggleContactValue}
              className="rounded border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {showContactValue ? t('job.contact.hide') : t('job.contact.reveal')}
            </button>
          </div>
          {!showContactValue && (
            <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              {t('job.contact.maskedNote')}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
