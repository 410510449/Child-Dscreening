/**
 * 兒童發展篩檢問卷 - 資料結構（版本 2）
 * 支援 9 個年齡集合：6-9、9-12、12-15、15-18、18-24、2-3、3-4、4-5、5-7
 */

export type AgeGroup = '6-9' | '9-12' | '12-15' | '15-18' | '18-24' | '2-3' | '3-4' | '4-5' | '5-7';
export type DevelopmentArea = 'gross' | 'fine' | 'cognitive' | 'social';

export interface Question {
  id: string;
  number: number;
  description: string;
  passStandard: string;
  failStandard: string;
}

export interface DevelopmentAreaData {
  name: string;
  questions: Question[];
  cutoffPass: number;
  maxScore: number;
}

export interface AgeGroupData {
  name: string;
  minMonths: number;
  maxMonths: number;
  areas: {
    gross: DevelopmentAreaData;
    fine: DevelopmentAreaData;
    cognitive: DevelopmentAreaData;
    social: DevelopmentAreaData;
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

// 問卷資料
const QUESTIONNAIRE_DATA: Record<AgeGroup, AgeGroupData> = {
  '6-9': {
    name: '6-9 個月',
    minMonths: 6,
    maxMonths: 9,
    areas: {
      gross: {
        name: '粗大動作',
        questions: [
          {
            id: '6-9-gross-1',
            number: 1,
            description: '孩子可以用手肘或手掌支撐將上半身離床面，且維持頭部穩定嗎？',
            passStandard: '孩子可以用自己的手肘或手掌支撐將上半身離床面並保持頸部穩定。',
            failStandard: '無法維持穩定支撐',
          },
          {
            id: '6-9-gross-2',
            number: 2,
            description: '可以翻身？',
            passStandard: '可以從騎翻至趴姿，兩側皆可。',
            failStandard: '無法翻身',
          },
          {
            id: '6-9-gross-3',
            number: 3,
            description: '可以在稍微自己支撐下或坐微輔助下自己維持坐姿，不會身體過度前傾？',
            passStandard: '可以呈現三點坐姿或獨立坐姿，身體不會過度向前傾身算通過。',
            failStandard: '無法維持坐姿',
          },
          {
            id: '6-9-gross-4',
            number: 4,
            description: '『牽引反射 Traction Test』是否正常？',
            passStandard: '頭部可以跟著軀幹維持直線到坐姿，頭不會向後仰。',
            failStandard: '頭部無法跟著軀幹',
          },
          {
            id: '6-9-gross-5',
            number: 5,
            description: '『拉嬰反射 Landau Reflex』是否正常？',
            passStandard: '1. 托住腹部時，頭向上抬起，背部及下肢伸直。2. 下壓頭部時，腿部向腹部彎曲。3. 放開後恢復俯臥。',
            failStandard: '反射不正常',
          },
        ],
        cutoffPass: 5,
        maxScore: 6,
      },
      fine: {
        name: '精細動作',
        questions: [
          {
            id: '6-9-fine-1',
            number: 1,
            description: '可以用雙手提舉物品（例如奶瓶）？',
            passStandard: '可以用雙手同時握著物品。',
            failStandard: '無法用雙手握住',
          },
          {
            id: '6-9-fine-2',
            number: 2,
            description: '將手臂蓋住孩子寶寶上，他會用單手掌開？',
            passStandard: '左右手皆可獨獨拿到。',
            failStandard: '無法掌開',
          },
          {
            id: '6-9-fine-3',
            number: 3,
            description: '大拇指可以伸直與外展，不會持續內縮於掌心？',
            passStandard: '大拇指可伸直，離開掌心。',
            failStandard: '大拇指內縮',
          },
          {
            id: '6-9-fine-4',
            number: 4,
            description: '可以把抓小玩具？',
            passStandard: '可以用四指及掌心抓（雙手皆可）。',
            failStandard: '無法抓握',
          },
        ],
        cutoffPass: 4,
        maxScore: 5,
      },
      cognitive: {
        name: '認知語言社會發展',
        questions: [
          {
            id: '6-9-cognitive-1',
            number: 1,
            description: '呼喚孩子名字或小名有反應？',
            passStandard: '有視線或聲音反應。',
            failStandard: '無反應',
          },
          {
            id: '6-9-cognitive-2',
            number: 2,
            description: '會玩具在面前搖晃，跨過中線，該子眼球會追視也會伸手拿？',
            passStandard: '視線追蹤移動，左右手可以確定直線拿取。',
            failStandard: '無法追視或拿取',
          },
          {
            id: '6-9-cognitive-3',
            number: 3,
            description: '醫師/照護者說逗弄孩子時，孩子有聲音回應？',
            passStandard: '該子會以聲音回應互動。',
            failStandard: '無聲音回應',
          },
          {
            id: '6-9-cognitive-4',
            number: 4,
            description: '逗孩子時，他會笑的很開心？',
            passStandard: '可以被逗笑。',
            failStandard: '無法被逗笑',
          },
          {
            id: '6-9-cognitive-5',
            number: 5,
            description: '遇到不喜歡的食物會有拒絕的行為？',
            passStandard: '會表現出對食物的喜好。',
            failStandard: '無法表現喜惡',
          },
        ],
        cutoffPass: 4,
        maxScore: 5,
      },
      social: {
        name: '認知語言社會發展',
        questions: [
          {
            id: '6-9-social-1',
            number: 1,
            description: '呼喚孩子名字或小名有反應？',
            passStandard: '有視線或聲音反應。',
            failStandard: '無反應',
          },
          {
            id: '6-9-social-2',
            number: 2,
            description: '會玩具在面前搖晃，跨過中線，該子眼球會追視也會伸手拿？',
            passStandard: '視線追蹤移動，左右手可以確定直線拿取。',
            failStandard: '無法追視或拿取',
          },
          {
            id: '6-9-social-3',
            number: 3,
            description: '醫師/照護者說逗弄孩子時，孩子有聲音回應？',
            passStandard: '該子會以聲音回應互動。',
            failStandard: '無聲音回應',
          },
          {
            id: '6-9-social-4',
            number: 4,
            description: '逗孩子時，他會笑的很開心？',
            passStandard: '可以被逗笑。',
            failStandard: '無法被逗笑',
          },
          {
            id: '6-9-social-5',
            number: 5,
            description: '遇到不喜歡的食物會有拒絕的行為？',
            passStandard: '會表現出對食物的喜好。',
            failStandard: '無法表現喜惡',
          },
        ],
        cutoffPass: 4,
        maxScore: 5,
      },
    },
  },
  '9-12': {
    name: '9-12 個月',
    minMonths: 9,
    maxMonths: 12,
    areas: {
      gross: {
        name: '粗大動作',
        questions: [
          {
            id: '9-12-gross-1',
            number: 1,
            description: '★ 能自己坐手坐提至少 1 分鐘，不會搖晃或跌倒？',
            passStandard: '能背部挺直且獨立坐提至少 1 分鐘。',
            failStandard: '無法獨立坐提',
          },
          {
            id: '9-12-gross-2',
            number: 2,
            description: '可以住前移動做爬行一小段距離（至少 30cm）？',
            passStandard: '可以胸部貼地爬前進或離地爬行至少 30cm。',
            failStandard: '無法爬行',
          },
          {
            id: '9-12-gross-3',
            number: 3,
            description: '可以由騎或跪的姿勢自己坐起來？',
            passStandard: '可以自己坐起來。',
            failStandard: '無法坐起來',
          },
          {
            id: '9-12-gross-4',
            number: 4,
            description: '稍微支撐腋下，孩子就能站得很挺？',
            passStandard: '稍加支撐即可雙腳伸直呈現站立姿勢。',
            failStandard: '無法站立',
          },
          {
            id: '9-12-gross-5',
            number: 5,
            description: '是否出現『降落傘反射』？',
            passStandard: '有出現對稱性手臂外展的姿勢。',
            failStandard: '無反射',
          },
        ],
        cutoffPass: 4,
        maxScore: 5,
      },
      fine: {
        name: '精細動作',
        questions: [
          {
            id: '9-12-fine-1',
            number: 1,
            description: '★ 會將玩具由一手換至另一手？',
            passStandard: '可在身體中線處交換物品且不掉落。',
            failStandard: '無法交換',
          },
          {
            id: '9-12-fine-2',
            number: 2,
            description: '會用食指戳或按東西？',
            passStandard: '有單獨的手指分離動作。',
            failStandard: '無法單獨使用食指',
          },
          {
            id: '9-12-fine-3',
            number: 3,
            description: '可以單手持續搖擺玩具至少 3 下？',
            passStandard: '有足夠拿握力且可重複搖擺動。',
            failStandard: '無法搖擺',
          },
          {
            id: '9-12-fine-4',
            number: 4,
            description: '能以拇指與食指（中指）對握方式伸手抓握積木？',
            passStandard: '指腹對握（可見虎口），兩手均可。',
            failStandard: '無法對握',
          },
        ],
        cutoffPass: 3,
        maxScore: 4,
      },
      cognitive: {
        name: '認知語言',
        questions: [
          {
            id: '9-12-cognitive-1',
            number: 1,
            description: '會一手各拿一個玩具相互敲打？',
            passStandard: '可一手各拿一個玩具相互敲打玩。',
            failStandard: '無法敲打',
          },
          {
            id: '9-12-cognitive-2',
            number: 2,
            description: '玩具掉在視線外，孩子眼神會去找？',
            passStandard: '有出現尋找的眼神或動作。',
            failStandard: '無法尋找',
          },
          {
            id: '9-12-cognitive-3',
            number: 3,
            description: '出現多種語音組合（牙牙學語）？',
            passStandard: '使用多種語音組合進行類清通。',
            failStandard: '無語音組合',
          },
          {
            id: '9-12-cognitive-4',
            number: 4,
            description: '會雙雙手示意抱抱？',
            passStandard: '會舉雙手示意。',
            failStandard: '無法示意',
          },
        ],
        cutoffPass: 3,
        maxScore: 4,
      },
      social: {
        name: '社會發展',
        questions: [
          {
            id: '9-12-social-1',
            number: 1,
            description: '★ 呼喚孩子名字或小名有反應？',
            passStandard: '有視線或聲音反應。',
            failStandard: '無反應',
          },
          {
            id: '9-12-social-2',
            number: 2,
            description: '會嘗試模仿大人的簡單動作或表情？',
            passStandard: '可以模仿簡單動作（如拍手）。',
            failStandard: '無法模仿',
          },
          {
            id: '9-12-social-3',
            number: 3,
            description: '可以跟大人玩躲貓貓（peek-a-boo）？',
            passStandard: '有遊戲互動意圖。',
            failStandard: '無法互動',
          },
          {
            id: '9-12-social-4',
            number: 4,
            description: '看到陌生人會有怕生或害羞反應？',
            passStandard: '會怕生或害羞。',
            failStandard: '無反應',
          },
          {
            id: '9-12-social-5',
            number: 5,
            description: '互動時有目光接觸嗎？',
            passStandard: '會看著醫師或照顧者。',
            failStandard: '無目光接觸',
          },
        ],
        cutoffPass: 4,
        maxScore: 5,
      },
    },
  },
  '12-15': {
    name: '12-15 個月',
    minMonths: 12,
    maxMonths: 15,
    areas: {
      gross: {
        name: '粗大動作',
        questions: [
          {
            id: '12-15-gross-1',
            number: 1,
            description: '★ 能自己拉著傢俱走或牽手走嗎？',
            passStandard: '牽手掌（非手臂）即可向前走。',
            failStandard: '無法行走',
          },
          {
            id: '12-15-gross-2',
            number: 2,
            description: '可以（扶著傢俱）踏下搓西再站起來？',
            passStandard: '可穩定踏下取物再恢復站姿。',
            failStandard: '無法蹲下站起',
          },
          {
            id: '12-15-gross-3',
            number: 3,
            description: '可以爬上沙發或樓梯或爬樓梯嗎？',
            passStandard: '可以獨自爬上。',
            failStandard: '無法爬上',
          },
        ],
        cutoffPass: 3,
        maxScore: 4,
      },
      fine: {
        name: '精細動作',
        questions: [
          {
            id: '12-15-fine-1',
            number: 1,
            description: '★ 可以用拇指及食指對握拿取貼紙或葡萄乾小物品？',
            passStandard: '指尖或指腹對握（Pincer grasp）。',
            failStandard: '無法對握',
          },
          {
            id: '12-15-fine-2',
            number: 2,
            description: '可以把物品放在大人手中？',
            passStandard: '有意識地輕放。',
            failStandard: '無法放置',
          },
          {
            id: '12-15-fine-3',
            number: 3,
            description: '能把物品放入寬口容器裡？',
            passStandard: '有意識地將物品放入。',
            failStandard: '無法放入',
          },
        ],
        cutoffPass: 3,
        maxScore: 4,
      },
      cognitive: {
        name: '認知語言',
        questions: [
          {
            id: '12-15-cognitive-1',
            number: 1,
            description: '孩子可以立即看向大人手指的物品嗎？',
            passStandard: '有 Joint attention 意圖。',
            failStandard: '無法跟隨',
          },
          {
            id: '12-15-cognitive-2',
            number: 2,
            description: '玩具掉在視線外，會曾試找出或拉起逃布。',
            passStandard: '會曾試指出或拉起逃布。',
            failStandard: '無法尋找',
          },
          {
            id: '12-15-cognitive-3',
            number: 3,
            description: '聽懂簡單指令（如：拍手、適來）？',
            passStandard: '無手勢下聽懂指令參照做。',
            failStandard: '無法理解',
          },
          {
            id: '12-15-cognitive-4',
            number: 4,
            description: '★ 會發出 ba-ba, ma-ma 等聲音？',
            passStandard: '使用多種語音組合。',
            failStandard: '無語音',
          },
          {
            id: '12-15-cognitive-5',
            number: 5,
            description: '會說 1-2 個有意義的詞彙？',
            passStandard: '會講出照者聽得懂的詞彙。',
            failStandard: '無詞彙',
          },
        ],
        cutoffPass: 4,
        maxScore: 5,
      },
      social: {
        name: '社會發展',
        questions: [
          {
            id: '12-15-social-1',
            number: 1,
            description: '★ 呼喚名字有反應？',
            passStandard: '有視線或聲音反應。',
            failStandard: '無反應',
          },
          {
            id: '12-15-social-2',
            number: 2,
            description: '可以和大人玩肢體互動（如：High five）？',
            passStandard: '可以玩互動遊戲。',
            failStandard: '無法互動',
          },
          {
            id: '12-15-social-3',
            number: 3,
            description: '眼神接觸定地看向施測者？',
            passStandard: '眼神接觸穩定。',
            failStandard: '無眼神接觸',
          },
          {
            id: '12-15-social-4',
            number: 4,
            description: '說「謝謝」會以視覺或手勢回應？',
            passStandard: '有視覺或手勢回應。',
            failStandard: '無回應',
          },
        ],
        cutoffPass: 3,
        maxScore: 4,
      },
    },
  },
  '15-18': {
    name: '15-18 個月',
    minMonths: 15,
    maxMonths: 18,
    areas: {
      gross: {
        name: '粗大動作',
        questions: [],
        cutoffPass: 3,
        maxScore: 4,
      },
      fine: {
        name: '精細動作',
        questions: [],
        cutoffPass: 3,
        maxScore: 4,
      },
      cognitive: {
        name: '認知語言',
        questions: [],
        cutoffPass: 4,
        maxScore: 5,
      },
      social: {
        name: '社會發展',
        questions: [],
        cutoffPass: 3,
        maxScore: 4,
      },
    },
  },
  '18-24': {
    name: '18-24 個月',
    minMonths: 18,
    maxMonths: 24,
    areas: {
      gross: {
        name: '粗大動作',
        questions: [],
        cutoffPass: 3,
        maxScore: 4,
      },
      fine: {
        name: '精細動作',
        questions: [],
        cutoffPass: 3,
        maxScore: 4,
      },
      cognitive: {
        name: '認知語言',
        questions: [],
        cutoffPass: 5,
        maxScore: 6,
      },
      social: {
        name: '社會發展',
        questions: [],
        cutoffPass: 4,
        maxScore: 5,
      },
    },
  },
  '2-3': {
    name: '2-3 歲',
    minMonths: 24,
    maxMonths: 35,
    areas: {
      gross: {
        name: '粗大動作',
        questions: [],
        cutoffPass: 3,
        maxScore: 4,
      },
      fine: {
        name: '精細動作',
        questions: [],
        cutoffPass: 4,
        maxScore: 5,
      },
      cognitive: {
        name: '認知語言',
        questions: [],
        cutoffPass: 4,
        maxScore: 5,
      },
      social: {
        name: '社會發展',
        questions: [],
        cutoffPass: 4,
        maxScore: 5,
      },
    },
  },
  '3-4': {
    name: '3-4 歲',
    minMonths: 36,
    maxMonths: 47,
    areas: {
      gross: {
        name: '粗大動作',
        questions: [],
        cutoffPass: 4,
        maxScore: 5,
      },
      fine: {
        name: '精細動作',
        questions: [],
        cutoffPass: 2,
        maxScore: 3,
      },
      cognitive: {
        name: '認知語言',
        questions: [],
        cutoffPass: 3,
        maxScore: 4,
      },
      social: {
        name: '社會發展',
        questions: [],
        cutoffPass: 4,
        maxScore: 5,
      },
    },
  },
  '4-5': {
    name: '4-5 歲',
    minMonths: 48,
    maxMonths: 59,
    areas: {
      gross: {
        name: '粗大動作',
        questions: [],
        cutoffPass: 3,
        maxScore: 4,
      },
      fine: {
        name: '精細動作',
        questions: [],
        cutoffPass: 3,
        maxScore: 4,
      },
      cognitive: {
        name: '認知語言',
        questions: [],
        cutoffPass: 4,
        maxScore: 5,
      },
      social: {
        name: '社會發展',
        questions: [],
        cutoffPass: 3,
        maxScore: 4,
      },
    },
  },
  '5-7': {
    name: '5-7 歲',
    minMonths: 60,
    maxMonths: 85,
    areas: {
      gross: {
        name: '粗大動作',
        questions: [],
        cutoffPass: 3,
        maxScore: 4,
      },
      fine: {
        name: '精細動作',
        questions: [],
        cutoffPass: 3,
        maxScore: 4,
      },
      cognitive: {
        name: '認知語言',
        questions: [],
        cutoffPass: 4,
        maxScore: 5,
      },
      social: {
        name: '社會發展',
        questions: [],
        cutoffPass: 3,
        maxScore: 4,
      },
    },
  },
};

export function getAgeGroupData(ageGroup: AgeGroup): AgeGroupData {
  return QUESTIONNAIRE_DATA[ageGroup];
}

export function getAgeGroupByMonths(months: number): AgeGroup | null {
  const ageGroups: AgeGroup[] = ['6-9', '9-12', '12-15', '15-18', '18-24', '2-3', '3-4', '4-5', '5-7'];
  
  for (const group of ageGroups) {
    const data = QUESTIONNAIRE_DATA[group];
    if (months >= data.minMonths && months < data.maxMonths) {
      return group;
    }
  }
  
  return null;
}

export function getAllAgeGroups(): AgeGroup[] {
  return ['6-9', '9-12', '12-15', '15-18', '18-24', '2-3', '3-4', '4-5', '5-7'];
}

/**
 * 將民國年日期字符串轉換為西元年 Date 物件
 * @param rocDateString 民國年日期字符串，格式："110-03-15"
 * @returns Date 物件
 */
export function rocDateToDate(rocDateString: string): Date {
  const [rocYear, month, day] = rocDateString.split('-').map(Number);
  const adYear = rocYear + 1911;
  return new Date(adYear, month - 1, day);
}

/**
 * 計算兩個民國年日期之間的月數
 * @param birthDateROC 出生日期（民國年），格式："110-03-15"
 * @param testDateROC 施測日期（民國年），格式："115-03-16"
 * @returns 月數
 */
export function calculateAgeInMonths(birthDateROC: string, testDateROC: string): number {
  const birthDate = rocDateToDate(birthDateROC);
  const testDate = rocDateToDate(testDateROC);
  
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
 * 格式化年齡顯示
 * @param months 月數
 * @returns 格式化的年齡字符串
 */
export function formatAge(months: number): string {
  if (months < 24) {
    return `${months} 個月`;
  } else {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (remainingMonths === 0) {
      return `${years} 歲`;
    } else {
      return `${years} 歲 ${remainingMonths} 個月`;
    }
  }
}
