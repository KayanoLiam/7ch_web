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
  maskContactValue,
} from '../lib/jobMeta';

interface JobMetaPanelProps {
  jobMeta: JobMeta;
  showContactValue: boolean;
  onToggleContactValue: () => void;
}

const FieldRow: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div className="themed-card-muted p-3">
    <div className="themed-kicker mb-1">
      {label}
    </div>
    <div className="text-sm leading-relaxed text-foreground">{value}</div>
  </div>
);

export const JobMetaPanel: React.FC<JobMetaPanelProps> = ({
  jobMeta,
  showContactValue,
  onToggleContactValue,
}) => {
  const { t } = useTranslation();
  const { themeVariant } = useTheme();
  const isClaude = themeVariant === 'claude';
  const contactValue = showContactValue
    ? jobMeta.contactValue
    : maskContactValue(jobMeta.contactValue);

  return (
    <section className={cn('themed-card themed-card-featured mb-4 p-4', isClaude && 'rounded-[1.6rem]')}>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="themed-chip-accent px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide">
          {t('job.summary.badge')}
        </span>
        <h2 className={cn('themed-heading text-lg', isClaude && 'text-[1.45rem]')}>
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
        <div className="themed-card-muted p-3">
          <div className="themed-kicker mb-1">
            {t('job.fields.contactValue')}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm leading-relaxed text-foreground">
              {contactValue}
            </span>
            <button
              type="button"
              onClick={onToggleContactValue}
              className="themed-secondary-action rounded-xl px-3 py-1 text-xs font-semibold transition"
            >
              {showContactValue ? t('job.contact.hide') : t('job.contact.reveal')}
            </button>
          </div>
          {!showContactValue && (
            <div className="themed-meta mt-2 text-xs">
              {t('job.contact.maskedNote')}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
