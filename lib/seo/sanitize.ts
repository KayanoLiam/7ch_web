export const stripMarkdown = (value: string) =>
  value
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[#>*_~|]/g, ' ')
    .replace(/>>\d{1,7}/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

export const truncateText = (value: string, maxLength: number) => {
  const normalized = value.replace(/\s+/g, ' ').trim();
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength - 1).trimEnd()}…`;
};

export const buildDescription = (value: string, fallback: string, maxLength = 150) => {
  const stripped = stripMarkdown(value);
  return truncateText(stripped || fallback, maxLength);
};

export const escapeJsonLd = (value: string) => value.replace(/</g, '\\u003c');

