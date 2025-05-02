/**
 * Convert English digits to Persian digits
 * @param num The number or string to convert (e.g., 123456789 or "123456789")
 * @returns The converted string with Persian digits (e.g., "۱۲۳۴۵۶۷۸۹")
 */
export const toPersianDigits = (num: number | string): string => {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return num
    .toString()
    .replace(/\d/g, (match) => persianDigits[parseInt(match, 10)]);
};
