/**
 * 日期與年齡計算工具
 */

/**
 * 將民國年日期字串轉換為 Date 物件
 * 支援格式：110-03-15, 110/03/15
 */
export function parseROCDate(dateStr: string): Date | null {
  if (!dateStr) return null;

  // 移除空格
  dateStr = dateStr.trim();

  // 支援 "-" 或 "/" 作為分隔符
  const parts = dateStr.split(/[-/]/);
  if (parts.length !== 3) return null;

  const rocYear = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);

  // 驗證
  if (isNaN(rocYear) || isNaN(month) || isNaN(day)) return null;
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;

  // 民國年轉西元年（民國年 + 1911）
  const adYear = rocYear + 1911;

  try {
    const date = new Date(adYear, month - 1, day);
    // 驗證日期是否有效
    if (date.getFullYear() !== adYear || date.getMonth() !== month - 1 || date.getDate() !== day) {
      return null;
    }
    return date;
  } catch {
    return null;
  }
}

/**
 * 將 Date 物件轉換為民國年日期字串
 * 格式：110-03-15
 */
export function formatROCDate(date: Date): string {
  const adYear = date.getFullYear();
  const rocYear = adYear - 1911;
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${rocYear}-${month}-${day}`;
}

/**
 * 計算年齡（以月為單位）
 * @param birthDate 出生日期
 * @param testDate 施測日期
 * @returns 年齡（月數）
 */
export function calculateAgeInMonths(birthDate: Date, testDate: Date): number {
  let months = 0;
  let currentDate = new Date(birthDate);

  while (currentDate <= testDate) {
    currentDate.setMonth(currentDate.getMonth() + 1);
    if (currentDate <= testDate) {
      months++;
    }
  }

  return months;
}

/**
 * 根據年齡（月數）判定年齡層
 */
export function getAgeGroupFromMonths(months: number): string {
  if (months >= 6 && months < 9) return '6-9';
  if (months >= 9 && months < 12) return '9-12';
  if (months >= 12 && months < 15) return '12-15';
  if (months >= 60 && months < 84) return '5-7';
  return 'unknown';
}

/**
 * 驗證日期字串格式
 */
export function isValidROCDateFormat(dateStr: string): boolean {
  if (!dateStr) return false;
  dateStr = dateStr.trim();
  const parts = dateStr.split(/[-/]/);
  if (parts.length !== 3) return false;

  const rocYear = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);

  if (isNaN(rocYear) || isNaN(month) || isNaN(day)) return false;
  if (month < 1 || month > 12 || day < 1 || day > 31) return false;

  return true;
}

/**
 * 取得今天的民國年日期字串
 */
export function getTodayROCDate(): string {
  return formatROCDate(new Date());
}
