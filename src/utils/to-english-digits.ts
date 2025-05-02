/**
 * Convert Persian digits to English digits
 * @param str The string containing Persian digits (e.g., "۱۲۳۴۵۶۷۸۹")
 * @returns The converted string with English digits (e.g., "123456789")
 */
export const toEnglishDigits = (str: string): string => {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return str.replace(/[۰-۹]/g, (match) =>
    persianDigits.indexOf(match).toString(),
  );
};
