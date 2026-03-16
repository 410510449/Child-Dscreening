/**
 * 兒童發展篩檢問卷資料結構 - 版本 2
 * 支援 9 個年齡集合（6-9個月、9-12個月、12-15個月、15-18個月、18-24個月、2-3歲、3-4歲、4-5歲、5-7歲）
 */

export type AgeGroup = '6-9' | '9-12' | '12-15' | '15-18' | '18-24' | '2-3' | '3-4' | '4-5' | '5-7';

export interface Question {
  id: string;
  number: number;
  description: string;
  scoreOptions: number[];
  passStandard: string;
  failStandard: string;
}

export interface DevelopmentArea {
  name: string;
  questions: Question[];
  maxScore: number;
  cutoffPass: number;
}

export interface AgeGroupData {
  name: string;
  minMonths: number;
  maxMonths: number;
  displayFormat: 'months' | 'years'; // 24個月以下顯示月份，以上顯示年齡
  areas: {
    gross: DevelopmentArea;
    fine: DevelopmentArea;
    cognitive: DevelopmentArea;
    social: DevelopmentArea;
  };
}

// 評估結果量表
const ASSESSMENT_TABLES: Record<AgeGroup, Record<string, { cutoff: number; maxScore: number }>> = {
  '6-9': {
    gross: { cutoff: 5, maxScore: 6 },
    fine: { cutoff: 4, maxScore: 5 },
    cognitive: { cutoff: 4, maxScore: 5 },
    social: { cutoff: 4, maxScore: 5 },
  },
  '9-12': {
    gross: { cutoff: 4, maxScore: 5 },
    fine: { cutoff: 3, maxScore: 4 },
    cognitive: { cutoff: 3, maxScore: 4 },
    social: { cutoff: 4, maxScore: 5 },
  },
  '12-15': {
    gross: { cutoff: 3, maxScore: 4 },
    fine: { cutoff: 3, maxScore: 4 },
    cognitive: { cutoff: 4, maxScore: 5 },
    social: { cutoff: 3, maxScore: 4 },
  },
  '15-18': {
    gross: { cutoff: 3, maxScore: 4 },
    fine: { cutoff: 3, maxScore: 4 },
    cognitive: { cutoff: 4, maxScore: 5 },
    social: { cutoff: 3, maxScore: 4 },
  },
  '18-24': {
    gross: { cutoff: 3, maxScore: 4 },
    fine: { cutoff: 3, maxScore: 4 },
    cognitive: { cutoff: 5, maxScore: 6 },
    social: { cutoff: 4, maxScore: 5 },
  },
  '2-3': {
    gross: { cutoff: 3, maxScore: 4 },
    fine: { cutoff: 4, maxScore: 5 },
    cognitive: { cutoff: 4, maxScore: 5 },
    social: { cutoff: 4, maxScore: 5 },
  },
  '3-4': {
    gross: { cutoff: 4, maxScore: 5 },
    fine: { cutoff: 2, maxScore: 3 },
    cognitive: { cutoff: 3, maxScore: 4 },
    social: { cutoff: 4, maxScore: 5 },
  },
  '4-5': {
    gross: { cutoff: 3, maxScore: 4 },
    fine: { cutoff: 3, maxScore: 4 },
    cognitive: { cutoff: 4, maxScore: 5 },
    social: { cutoff: 3, maxScore: 4 },
  },
  '5-7': {
    gross: { cutoff: 3, maxScore: 4 },
    fine: { cutoff: 3, maxScore: 4 },
    cognitive: { cutoff: 4, maxScore: 5 },
    social: { cutoff: 3, maxScore: 4 },
  },
};

// 臨時問卷資料（將逐步補充完整題目）
const QUESTIONNAIRE_DATA: Record<AgeGroup, AgeGroupData> = {
  '6-9': {
    name: '6-9 個月',
    minMonths: 6,
    maxMonths: 9,
    displayFormat: 'months',
    areas: {
      gross: {
        name: '粗大動作',
        questions: [],
        maxScore: 6,
        cutoffPass: 5,
      },
      fine: {
        name: '精細動作',
        questions: [],
        maxScore: 5,
        cutoffPass: 4,
      },
      cognitive: {
        name: '認知語言社會發展',
        questions: [],
        maxScore: 5,
        cutoffPass: 4,
      },
      social: {
        name: '認知語言社會發展',
        questions: [],
        maxScore: 5,
        cutoffPass: 4,
      },
    },
  },
  '9-12': {
    name: '9-12 個月',
    minMonths: 9,
    maxMonths: 12,
    displayFormat: 'months',
    areas: {
      gross: {
        name: '粗大動作',
        questions: [],
        maxScore: 5,
        cutoffPass: 4,
      },
      fine: {
        name: '精細動作',
        questions: [],
        maxScore: 4,
        cutoffPass: 3,
      },
      cognitive: {
        name: '認知語言',
        questions: [],
        maxScore: 4,
        cutoffPass: 3,
      },
      social: {
        name: '社會發展',
        questions: [],
        maxScore: 5,
        cutoffPass: 4,
      },
    },
  },
  '12-15': {
    name: '12-15 個月',
    minMonths: 12,
    maxMonths: 15,
    displayFormat: 'months',
    areas: {
      gross: {
        name: '粗大動作',
        questions: [],
        maxScore: 4,
        cutoffPass: 3,
      },
      fine: {
        name: '精細動作',
        questions: [],
        maxScore: 4,
        cutoffPass: 3,
      },
      cognitive: {
        name: '認知語言',
        questions: [],
        maxScore: 5,
        cutoffPass: 4,
      },
      social: {
        name: '社會發展',
        questions: [],
        maxScore: 4,
        cutoffPass: 3,
      },
    },
  },
  '15-18': {
    name: '15-18 個月',
    minMonths: 15,
    maxMonths: 18,
    displayFormat: 'months',
    areas: {
      gross: {
        name: '粗大動作',
        questions: [],
        maxScore: 4,
        cutoffPass: 3,
      },
      fine: {
        name: '精細動作',
        questions: [],
        maxScore: 4,
        cutoffPass: 3,
      },
      cognitive: {
        name: '認知語言',
        questions: [],
        maxScore: 5,
        cutoffPass: 4,
      },
      social: {
        name: '社會發展',
        questions: [],
        maxScore: 4,
        cutoffPass: 3,
      },
    },
  },
  '18-24': {
    name: '18-24 個月',
    minMonths: 18,
    maxMonths: 24,
    displayFormat: 'months',
    areas: {
      gross: {
        name: '粗大動作',
        questions: [],
        maxScore: 4,
        cutoffPass: 3,
      },
      fine: {
        name: '精細動作',
        questions: [],
        maxScore: 4,
        cutoffPass: 3,
      },
      cognitive: {
        name: '認知語言',
        questions: [],
        maxScore: 6,
        cutoffPass: 5,
      },
      social: {
        name: '社會發展',
        questions: [],
        maxScore: 5,
        cutoffPass: 4,
      },
    },
  },
  '2-3': {
    name: '2-3 歲',
    minMonths: 24,
    maxMonths: 36,
    displayFormat: 'years',
    areas: {
      gross: {
        name: '粗大動作',
        questions: [],
        maxScore: 4,
        cutoffPass: 3,
      },
      fine: {
        name: '精細動作',
        questions: [],
        maxScore: 5,
        cutoffPass: 4,
      },
      cognitive: {
        name: '認知語言',
        questions: [],
        maxScore: 5,
        cutoffPass: 4,
      },
      social: {
        name: '社會發展',
        questions: [],
        maxScore: 5,
        cutoffPass: 4,
      },
    },
  },
  '3-4': {
    name: '3-4 歲',
    minMonths: 36,
    maxMonths: 48,
    displayFormat: 'years',
    areas: {
      gross: {
        name: '粗大動作',
        questions: [],
        maxScore: 5,
        cutoffPass: 4,
      },
      fine: {
        name: '精細動作',
        questions: [],
        maxScore: 3,
        cutoffPass: 2,
      },
      cognitive: {
        name: '認知語言',
        questions: [],
        maxScore: 4,
        cutoffPass: 3,
      },
      social: {
        name: '社會發展',
        questions: [],
        maxScore: 5,
        cutoffPass: 4,
      },
    },
  },
  '4-5': {
    name: '4-5 歲',
    minMonths: 48,
    maxMonths: 60,
    displayFormat: 'years',
    areas: {
      gross: {
        name: '粗大動作',
        questions: [],
        maxScore: 4,
        cutoffPass: 3,
      },
      fine: {
        name: '精細動作',
        questions: [],
        maxScore: 4,
        cutoffPass: 3,
      },
      cognitive: {
        name: '認知語言',
        questions: [],
        maxScore: 5,
        cutoffPass: 4,
      },
      social: {
        name: '社會發展',
        questions: [],
        maxScore: 4,
        cutoffPass: 3,
      },
    },
  },
  '5-7': {
    name: '5-7 歲',
    minMonths: 60,
    maxMonths: 84,
    displayFormat: 'years',
    areas: {
      gross: {
        name: '粗大動作',
        questions: [],
        maxScore: 4,
        cutoffPass: 3,
      },
      fine: {
        name: '精細動作',
        questions: [],
        maxScore: 4,
        cutoffPass: 3,
      },
      cognitive: {
        name: '認知語言',
        questions: [],
        maxScore: 5,
        cutoffPass: 4,
      },
      social: {
        name: '社會發展',
        questions: [],
        maxScore: 4,
        cutoffPass: 3,
      },
    },
  },
};

/**
 * 根據年齡（月份）判定適用的年齡集合
 */
export function getAgeGroupByMonths(months: number): AgeGroup | null {
  if (months < 6 || months > 84) {
    return null;
  }
  if (months < 9) return '6-9';
  if (months < 12) return '9-12';
  if (months < 15) return '12-15';
  if (months < 18) return '15-18';
  if (months < 24) return '18-24';
  if (months < 36) return '2-3';
  if (months < 48) return '3-4';
  if (months < 60) return '4-5';
  return '5-7';
}

/**
 * 獲取指定年齡集合的資料
 */
export function getAgeGroupData(ageGroup: AgeGroup): AgeGroupData {
  return QUESTIONNAIRE_DATA[ageGroup];
}

/**
 * 獲取所有年齡集合
 */
export function getAllAgeGroups(): AgeGroup[] {
  return ['6-9', '9-12', '12-15', '15-18', '18-24', '2-3', '3-4', '4-5', '5-7'];
}

/**
 * 格式化年齡顯示
 * 24個月以下顯示「幾個月」，以上顯示「幾歲」
 */
export function formatAge(months: number): string {
  if (months < 24) {
    return `${months}個月`;
  } else {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (remainingMonths === 0) {
      return `${years}歲`;
    } else {
      return `${years}歲${remainingMonths}個月`;
    }
  }
}

/**
 * 計算年齡（月份）
 * @param birthDate 出生日期（民國年格式：110-03-15）
 * @param testDate 施測日期（民國年格式：115-03-15）
 */
export function calculateAgeInMonths(birthDate: string, testDate: string): number {
  // 解析民國年日期
  const [birthYear, birthMonth, birthDay] = birthDate.split('-').map(Number);
  const [testYear, testMonth, testDay] = testDate.split('-').map(Number);

  // 轉換為西元年
  const birthYearAD = birthYear + 1911;
  const testYearAD = testYear + 1911;

  // 建立日期物件
  const birth = new Date(birthYearAD, birthMonth - 1, birthDay);
  const test = new Date(testYearAD, testMonth - 1, testDay);

  // 計算月份差
  let months = (test.getFullYear() - birth.getFullYear()) * 12;
  months += test.getMonth() - birth.getMonth();

  // 如果施測日期的日期小於出生日期，減去一個月
  if (test.getDate() < birth.getDate()) {
    months--;
  }

  return Math.max(0, months);
}
