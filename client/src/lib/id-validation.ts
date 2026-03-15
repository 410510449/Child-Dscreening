/**
 * 台灣身份證號驗證工具
 * 實作台灣身份證號的格式與檢查碼驗證
 */

/**
 * 驗證台灣身份證號
 * 格式：1 個英文字母 + 9 個數字
 * 檢查碼使用 Luhn 演算法變體
 * 
 * @param id 身份證號
 * @returns 驗證結果
 */
export function validateTaiwaneseID(id: string): {
  isValid: boolean;
  error?: string;
} {
  // 移除空白
  const cleanId = id.trim().toUpperCase();

  // 檢查格式
  if (!/^[A-Z]\d{9}$/.test(cleanId)) {
    return {
      isValid: false,
      error: '身份證號格式不正確（應為 1 個英文字母 + 9 個數字）',
    };
  }

  // 檢查碼驗證
  if (!validateChecksum(cleanId)) {
    return {
      isValid: false,
      error: '身份證號檢查碼不正確',
    };
  }

  return { isValid: true };
}

/**
 * 驗證身份證號檢查碼
 * 使用台灣身份證號的標準檢查碼演算法
 */
function validateChecksum(id: string): boolean {
  // 字母轉換表
  const letterMap: Record<string, number> = {
    A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, G: 16, H: 17,
    I: 34, J: 18, K: 19, L: 20, M: 21, N: 22, O: 35, P: 23,
    Q: 24, R: 25, S: 26, T: 27, U: 28, V: 29, W: 32, X: 30,
    Y: 31, Z: 33,
  };

  // 第一個字母轉換
  const firstLetter = id.charAt(0);
  const letterValue = letterMap[firstLetter];

  if (!letterValue) {
    return false;
  }

  // 計算檢查碼
  let sum = Math.floor(letterValue / 10) + (letterValue % 10) * 9;

  // 處理後面 9 個數字
  for (let i = 0; i < 9; i++) {
    const digit = parseInt(id.charAt(i + 1), 10);
    sum += digit * (8 - i);
  }

  // 檢查碼應該使總和能被 10 整除
  return sum % 10 === 0;
}

/**
 * 格式化身份證號顯示
 * 例：A123456789 -> A123 456 789
 */
export function formatIDDisplay(id: string): string {
  const cleanId = id.trim().toUpperCase();
  if (!/^[A-Z]\d{9}$/.test(cleanId)) {
    return id;
  }
  return `${cleanId.substring(0, 4)} ${cleanId.substring(4, 7)} ${cleanId.substring(7)}`;
}
