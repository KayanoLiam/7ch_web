const pad2 = (value: number) => value.toString().padStart(2, '0');

const isJapaneseLanguage = (language: string) => language.toLowerCase().startsWith('ja');

const formatJapaneseEraYear = (date: Date) => {
  const year = date.getFullYear();

  if (year >= 2019) return `R${year - 2018}`;
  if (year >= 1989) return `H${year - 1988}`;
  if (year >= 1926) return `S${year - 1925}`;

  return `${year}`;
};

export const formatLocalizedCalendarDate = (date: Date, language: string) => {
  const year = isJapaneseLanguage(language) ? formatJapaneseEraYear(date) : `${date.getFullYear()}`;
  return `${year}/${pad2(date.getMonth() + 1)}/${pad2(date.getDate())}`;
};

export const formatLocalizedCalendarDateTime = (date: Date, language: string) =>
  `${formatLocalizedCalendarDate(date, language)} ${pad2(date.getHours())}:${pad2(date.getMinutes())}:${pad2(date.getSeconds())}`;
