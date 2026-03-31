import type { TFunction } from 'i18next';

import type {
  ContactType,
  JobMeta,
  JapaneseRequirement,
  TransportationCovered,
  YesNo,
  YesNoUnknown,
} from '../types';

export const BAITO_BOARD_ID = 'baito';

export interface JobMetaDraft {
  region: string;
  nearestStation: string;
  hourlyWageMinJpy: string;
  hourlyWageMaxJpy: string;
  hourlyWageNote: string;
  monthlyWageMinJpy: string;
  monthlyWageMaxJpy: string;
  monthlyWageNote: string;
  transportationCovered: '' | TransportationCovered;
  internationalStudentsAccepted: '' | YesNo;
  noExperienceAccepted: '' | YesNo;
  japaneseRequirement: '' | JapaneseRequirement;
  visaRequirement: string;
  shiftStyle: string;
  housingProvided: '' | YesNo;
  housingSubsidy: string;
  hasChineseStaff: '' | YesNoUnknown;
  businessType: string;
  companySize: string;
  contactType: '' | ContactType;
  contactValue: string;
}

export const createEmptyJobMetaDraft = (): JobMetaDraft => ({
  region: '',
  nearestStation: '',
  hourlyWageMinJpy: '',
  hourlyWageMaxJpy: '',
  hourlyWageNote: '',
  monthlyWageMinJpy: '',
  monthlyWageMaxJpy: '',
  monthlyWageNote: '',
  transportationCovered: '',
  internationalStudentsAccepted: '',
  noExperienceAccepted: '',
  japaneseRequirement: '',
  visaRequirement: '',
  shiftStyle: '',
  housingProvided: '',
  housingSubsidy: '',
  hasChineseStaff: '',
  businessType: '',
  companySize: '',
  contactType: '',
  contactValue: '',
});

const trimOrUndefined = (value: string) => {
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
};

const parsePositiveInt = (value: string) => {
  if (!/^\d+$/.test(value.trim())) return null;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
};

export const isBaitoBoard = (boardId?: string | null) => boardId === BAITO_BOARD_ID;

export const validateJobMetaDraft = (draft: JobMetaDraft, t: TFunction): string | null => {
  const requiredTextFields: Array<[string, string]> = [
    ['job.fields.region', draft.region],
    ['job.fields.nearestStation', draft.nearestStation],
    ['job.fields.visaRequirement', draft.visaRequirement],
    ['job.fields.shiftStyle', draft.shiftStyle],
    ['job.fields.housingSubsidy', draft.housingSubsidy],
    ['job.fields.businessType', draft.businessType],
    ['job.fields.companySize', draft.companySize],
    ['job.fields.contactValue', draft.contactValue],
  ];

  for (const [labelKey, value] of requiredTextFields) {
    if (!value.trim()) {
      return t('job.errors.requiredField', { field: t(labelKey) });
    }
  }

  const hourlyMin = parsePositiveInt(draft.hourlyWageMinJpy);
  if (hourlyMin === null) {
    return t('job.errors.positiveNumberField', { field: t('job.fields.hourlyWageMinJpy') });
  }

  const monthlyMin = parsePositiveInt(draft.monthlyWageMinJpy);
  if (monthlyMin === null) {
    return t('job.errors.positiveNumberField', { field: t('job.fields.monthlyWageMinJpy') });
  }

  const hourlyMax = draft.hourlyWageMaxJpy.trim() ? parsePositiveInt(draft.hourlyWageMaxJpy) : undefined;
  if (draft.hourlyWageMaxJpy.trim() && hourlyMax === null) {
    return t('job.errors.positiveNumberField', { field: t('job.fields.hourlyWageMaxJpy') });
  }
  if (typeof hourlyMax === 'number' && hourlyMax < hourlyMin) {
    return t('job.errors.rangeField', {
      minField: t('job.fields.hourlyWageMinJpy'),
      maxField: t('job.fields.hourlyWageMaxJpy'),
    });
  }

  const monthlyMax = draft.monthlyWageMaxJpy.trim() ? parsePositiveInt(draft.monthlyWageMaxJpy) : undefined;
  if (draft.monthlyWageMaxJpy.trim() && monthlyMax === null) {
    return t('job.errors.positiveNumberField', { field: t('job.fields.monthlyWageMaxJpy') });
  }
  if (typeof monthlyMax === 'number' && monthlyMax < monthlyMin) {
    return t('job.errors.rangeField', {
      minField: t('job.fields.monthlyWageMinJpy'),
      maxField: t('job.fields.monthlyWageMaxJpy'),
    });
  }

  const requiredSelectFields: Array<[string, string]> = [
    ['job.fields.transportationCovered', draft.transportationCovered],
    ['job.fields.internationalStudentsAccepted', draft.internationalStudentsAccepted],
    ['job.fields.noExperienceAccepted', draft.noExperienceAccepted],
    ['job.fields.japaneseRequirement', draft.japaneseRequirement],
    ['job.fields.housingProvided', draft.housingProvided],
    ['job.fields.hasChineseStaff', draft.hasChineseStaff],
    ['job.fields.contactType', draft.contactType],
  ];

  for (const [labelKey, value] of requiredSelectFields) {
    if (!value) {
      return t('job.errors.requiredField', { field: t(labelKey) });
    }
  }

  return null;
};

export const buildJobMetaFromDraft = (draft: JobMetaDraft): JobMeta => ({
  region: draft.region.trim(),
  nearestStation: draft.nearestStation.trim(),
  hourlyWageMinJpy: Number.parseInt(draft.hourlyWageMinJpy, 10),
  hourlyWageMaxJpy: trimOrUndefined(draft.hourlyWageMaxJpy)
    ? Number.parseInt(draft.hourlyWageMaxJpy, 10)
    : undefined,
  hourlyWageNote: trimOrUndefined(draft.hourlyWageNote),
  monthlyWageMinJpy: Number.parseInt(draft.monthlyWageMinJpy, 10),
  monthlyWageMaxJpy: trimOrUndefined(draft.monthlyWageMaxJpy)
    ? Number.parseInt(draft.monthlyWageMaxJpy, 10)
    : undefined,
  monthlyWageNote: trimOrUndefined(draft.monthlyWageNote),
  transportationCovered: draft.transportationCovered as TransportationCovered,
  internationalStudentsAccepted: draft.internationalStudentsAccepted as YesNo,
  noExperienceAccepted: draft.noExperienceAccepted as YesNo,
  japaneseRequirement: draft.japaneseRequirement as JapaneseRequirement,
  visaRequirement: draft.visaRequirement.trim(),
  shiftStyle: draft.shiftStyle.trim(),
  housingProvided: draft.housingProvided as YesNo,
  housingSubsidy: draft.housingSubsidy.trim(),
  hasChineseStaff: draft.hasChineseStaff as YesNoUnknown,
  businessType: draft.businessType.trim(),
  companySize: draft.companySize.trim(),
  contactType: draft.contactType as ContactType,
  contactValue: draft.contactValue.trim(),
});

export const formatJpyAmount = (value: number) =>
  new Intl.NumberFormat('ja-JP').format(value);

export const formatWageRange = (min: number, max?: number) =>
  typeof max === 'number'
    ? `${formatJpyAmount(min)} - ${formatJpyAmount(max)}`
    : `${formatJpyAmount(min)}`;

export const formatWageLabel = (t: TFunction, min: number, max?: number, note?: string) => {
  const base = t('job.summary.wageFormat', {
    amount: formatWageRange(min, max),
  });
  return note ? `${base} (${note})` : base;
};

export const maskContactValue = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return '***';
  if (trimmed.length <= 4) return '*'.repeat(Math.max(trimmed.length, 3));
  if (trimmed.length <= 10) return `${trimmed.slice(0, 1)}***${trimmed.slice(-1)}`;
  if (trimmed.length <= 18) return `${trimmed.slice(0, 2)}***${trimmed.slice(-2)}`;
  return `${trimmed.slice(0, 3)}***${trimmed.slice(-3)}`;
};

export const getTransportationCoveredLabel = (
  t: TFunction,
  value: TransportationCovered,
) => t(`job.options.transportationCovered.${value}`);

export const getYesNoLabel = (t: TFunction, value: YesNo) =>
  t(`job.options.yesNo.${value}`);

export const getYesNoUnknownLabel = (t: TFunction, value: YesNoUnknown) =>
  t(`job.options.yesNoUnknown.${value}`);

export const getJapaneseRequirementLabel = (
  t: TFunction,
  value: JapaneseRequirement,
) => t(`job.options.japaneseRequirement.${value}`);

export const getContactTypeLabel = (t: TFunction, value: ContactType) =>
  t(`job.options.contactType.${value}`);

export const buildJobMetaSearchText = (jobMeta?: JobMeta) => {
  if (!jobMeta) return '';
  return [
    jobMeta.region,
    jobMeta.nearestStation,
    jobMeta.visaRequirement,
    jobMeta.shiftStyle,
    jobMeta.housingSubsidy,
    jobMeta.businessType,
    jobMeta.companySize,
    jobMeta.contactValue,
    jobMeta.hourlyWageNote,
    jobMeta.monthlyWageNote,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
};
