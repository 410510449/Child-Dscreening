/**
 * 兒童發展篩檢問卷 - 資料結構（版本 3）
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
    gross: { cutoff: 2, maxScore: 3 },
    fine: { cutoff: 2, maxScore: 3 },
    cognitive: { cutoff: 4, maxScore: 5 },
    social: { cutoff: 2, maxScore: 4 },
  },
  '18-24': {
    gross: { cutoff: 3, maxScore: 5 },
    fine: { cutoff: 2, maxScore: 4 },
    cognitive: { cutoff: 3, maxScore: 5 },
    social: { cutoff: 3, maxScore: 5 },
  },
  '2-3': {
    gross: { cutoff: 3, maxScore: 5 },
    fine: { cutoff: 2, maxScore: 4 },
    cognitive: { cutoff: 3, maxScore: 5 },
    social: { cutoff: 3, maxScore: 5 },
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
            description: '孩子靠著，可以用手肘或手掌支撐將上半身離離床面，且維持頭部穩定嗎？',
            passStandard: '孩子可以用自己的手肘或手掌支撐將上半身離離床面並保持頭部穩定。',
            failStandard: '無法支撐',
          },
          {
            id: '6-9-gross-2',
            number: 2,
            description: '★ 可以翻身？',
            passStandard: '可以從仰翻至俯臥；兩側皆可。',
            failStandard: '無法翻身',
          },
          {
            id: '6-9-gross-3',
            number: 3,
            description: '可以在椅微自己支撐下坐著或坐著時不會過度前傾嗎？',
            passStandard: '可以呈現三點坐姿或獨立坐姿，身體不會過度傾斜。',
            failStandard: '無法坐著',
          },
          {
            id: '6-9-gross-4',
            number: 4,
            description: '拐棍支撐膝下，孩子就能站得很挺？',
            passStandard: '拐棍加支撐即可雙腳伸直呈現站立姿勢。',
            failStandard: '無法站立',
          },
          {
            id: '6-9-gross-5',
            number: 5,
            description: '是否出現「降落傘反射」？',
            passStandard: '頭部可以跟著驅幹維持直線朝坐。',
            failStandard: '無反射',
          },
          {
            id: '6-9-gross-6',
            number: 6,
            description: '『拉嬰反射 Landau Reflex』是否正常？',
            passStandard: '1. 托住腹部時，頭向上抬起，背部及下肢伸直。 2. 下壓頭部時，腿部向腹部彎曲。 3. 放開後恢復伸直。',
            failStandard: '反射異常',
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
            passStandard: '可以用雙手提舉物品。',
            failStandard: '無法提舉',
          },
          {
            id: '6-9-fine-2',
            number: 2,
            description: '將手帕蓋住孩子寶寶上，他會用單手掀開？',
            passStandard: '左右手皆可獨獨掀到。',
            failStandard: '無法掀開',
          },
          {
            id: '6-9-fine-3',
            number: 3,
            description: '★ 大拇指可以伸直與外展，不會持續內縮於掌心？',
            passStandard: '大拇指伸直，離開掌心。',
            failStandard: '大拇指無法伸直',
          },
          {
            id: '6-9-fine-4',
            number: 4,
            description: '可以把抓小玩具？',
            passStandard: '可以用四指及掌心握住（雙手皆可）。',
            failStandard: '無法抓握',
          },
          {
            id: '6-9-fine-5',
            number: 5,
            description: '可以用雙手同時握著物品且不掉落。',
            passStandard: '可以用雙手同時握著物品。',
            failStandard: '無法握著',
          },
        ],
        cutoffPass: 4,
        maxScore: 5,
      },
      cognitive: {
        name: '認知語言',
        questions: [
          {
            id: '6-9-cognitive-1',
            number: 1,
            description: '○ 呼喚孩子名字或小名字或有反應？',
            passStandard: '有視級或聲音反應。',
            failStandard: '無反應',
          },
          {
            id: '6-9-cognitive-2',
            number: 2,
            description: '★ 拿玩具在面前搖晃，跨過中線，該子眼球會追視以會伸手掌？',
            passStandard: '視線追蹤移動，左右手可以伸定直線追取。',
            failStandard: '無法追視',
          },
          {
            id: '6-9-cognitive-3',
            number: 3,
            description: '醫師/照護者說話或發聲音孩子時，孩子有聲音回應嗎？',
            passStandard: '孩子會以聲音回應互動。',
            failStandard: '無聲音回應',
          },
          {
            id: '6-9-cognitive-4',
            number: 4,
            description: '逗孩子時，他會笑的很開心嗎？',
            passStandard: '可以被逗笑。',
            failStandard: '無法笑出',
          },
          {
            id: '6-9-cognitive-5',
            number: 5,
            description: '遇到不喜歡的食物會有拒絕的行為？',
            passStandard: '會表現出對食物的喜好。',
            failStandard: '無反應',
          },
        ],
        cutoffPass: 4,
        maxScore: 5,
      },
      social: {
        name: '社會發展',
        questions: [
          {
            id: '6-9-social-1',
            number: 1,
            description: '○ 呼喚孩子名字或小名字或有反應？',
            passStandard: '有視級或聲音反應。',
            failStandard: '無反應',
          },
          {
            id: '6-9-social-2',
            number: 2,
            description: '可以跟大人玩躲貓貓（peek-a-boo）？',
            passStandard: '有遊戲互動意圖。',
            failStandard: '無互動',
          },
          {
            id: '6-9-social-3',
            number: 3,
            description: '看到陌生人會有怕生或害羞反應？',
            passStandard: '會怕生或害羞。',
            failStandard: '無反應',
          },
          {
            id: '6-9-social-4',
            number: 4,
            description: '互動時有自光接觸嗎？',
            passStandard: '會看著養育者或照顧者。',
            failStandard: '無眼神接觸',
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
            description: '★ 能自己坐手掌至少 1 分鐘，不會搖晃或跌倒？',
            passStandard: '能背部挺直且獨立坐穩至少 1 分鐘。',
            failStandard: '無法坐穩',
          },
          {
            id: '9-12-gross-2',
            number: 2,
            description: '可以住前移動做行一小段距離（至少 30cm）？',
            passStandard: '可以胸部貼地爬行或前進至少 30cm。',
            failStandard: '無法爬行',
          },
          {
            id: '9-12-gross-3',
            number: 3,
            description: '可以由驅幹歪斜的姿勢自己起來？',
            passStandard: '可以自己坐起來。',
            failStandard: '無法坐起',
          },
          {
            id: '9-12-gross-4',
            number: 4,
            description: '拐棍支撐膝下，孩子就能站得很挺？',
            passStandard: '拐棍加支撐即可雙腳伸直呈現站立姿勢。',
            failStandard: '無法站立',
          },
          {
            id: '9-12-gross-5',
            number: 5,
            description: '是否出現「降落傘反射」？',
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
            failStandard: '無法分離',
          },
          {
            id: '9-12-fine-3',
            number: 3,
            description: '可以單手持續搖動玩具至少 3 下？',
            passStandard: '有足夠把握力且可重複搖動。',
            failStandard: '無法持續',
          },
          {
            id: '9-12-fine-4',
            number: 4,
            description: '能以拇指與食指對握方式（中指）對握方式伸手抓握物品？',
            passStandard: '指腹對握（可見虎口），兩手皆可。',
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
            passStandard: '可一手各拿一個玩具相互敲打把玩。',
            failStandard: '無法敲打',
          },
          {
            id: '9-12-cognitive-2',
            number: 2,
            description: '玩具掉在視線外，孩子眼神會去找？',
            passStandard: '有出現尋找的眼神或動作。',
            failStandard: '無尋找行為',
          },
          {
            id: '9-12-cognitive-3',
            number: 3,
            description: '出現多種語音組合（牙牙學語）？',
            passStandard: '使用多種語音組合。',
            failStandard: '語音單調',
          },
          {
            id: '9-12-cognitive-4',
            number: 4,
            description: '會雙手示意抱抱？',
            passStandard: '會舉雙手示意。',
            failStandard: '無示意動作',
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
            description: '★ 呼喚孩子名字或小名字或有反應？',
            passStandard: '有視級或聲音反應。',
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
            failStandard: '無互動',
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
            description: '互動時有自光接觸嗎？',
            passStandard: '會看著養育者或照顧者。',
            failStandard: '無眼神接觸',
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
            description: '★ 能自己扶著傢俱走或牽手走嗎？',
            passStandard: '拿手掌（非手臂）即可向前走。',
            failStandard: '無法行走',
          },
          {
            id: '12-15-gross-2',
            number: 2,
            description: '可以(扶著傢俱)踩下踏墊西再站起來？',
            passStandard: '可穩定踩下取物再恢復站姿。',
            failStandard: '無法踩踏',
          },
          {
            id: '12-15-gross-3',
            number: 3,
            description: '可以爬上沙發或椅墊或樓梯嗎？',
            passStandard: '可以獨自爬上。',
            failStandard: '無法爬行',
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
            description: '★ 可以用指指及食指握筆取貼紙或葡萄乾小物品？',
            passStandard: '指尖或指腹對握（Pincer grasp）。',
            failStandard: '無法用指指握取',
          },
          {
            id: '12-15-fine-2',
            number: 2,
            description: '可以把物品放在大人手中？',
            passStandard: '有意識地輕放。',
            failStandard: '無法放下',
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
            description: '孩子可以立即看向大人手指的物品？',
            passStandard: '有 Joint attention 意圖。',
            failStandard: '無法看向',
          },
          {
            id: '12-15-cognitive-2',
            number: 2,
            description: '玩具被蓋起來，會嘗試去找尋？',
            passStandard: '會試圖指出或拉起遮布。',
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
        questions: [
          {
            id: '15-18-gross-1',
            number: 1,
            description: '★能自己扶著傢俱走或牽手走嗎？',
            passStandard: '拿手掌（非手臂）即可向前走。',
            failStandard: '無法行走',
          },
          {
            id: '15-18-gross-2',
            number: 2,
            description: '可以(扶著傢俱)踩下踏墊西再站起來？',
            passStandard: '可穩定踩下取物再恢復站姿。',
            failStandard: '無法踩踏',
          },
          {
            id: '15-18-gross-3',
            number: 3,
            description: '可以爬上沙發或椅墊或樓梯嗎？',
            passStandard: '可以獨自爬上。',
            failStandard: '無法爬行',
          },
        ],
        cutoffPass: 2,
        maxScore: 3,
      },
      fine: {
        name: '精細動作',
        questions: [
          {
            id: '15-18-fine-1',
            number: 1,
            description: '★可以用指指及食指握筆取貼紙或葡萄乾小物品？',
            passStandard: '指尖或指腹對握（Pincer grasp）。',
            failStandard: '無法用指指握取',
          },
          {
            id: '15-18-fine-2',
            number: 2,
            description: '可以把物品放在大人手中？',
            passStandard: '有意識地輕放。',
            failStandard: '無法放下',
          },
          {
            id: '15-18-fine-3',
            number: 3,
            description: '能把物品放入寬口容器裡？',
            passStandard: '有意識地將物品放入。',
            failStandard: '無法放入',
          },
        ],
        cutoffPass: 2,
        maxScore: 3,
      },
      cognitive: {
        name: '認知語言',
        questions: [
          {
            id: '15-18-cognitive-1',
            number: 1,
            description: '孩子可以立即看向大人手指的物品？',
            passStandard: '有 Joint attention 意圖。',
            failStandard: '無法看向',
          },
          {
            id: '15-18-cognitive-2',
            number: 2,
            description: '玩具被蓋起來，會嘗試去找尋？',
            passStandard: '會試圖指出或拉起遮布。',
            failStandard: '無法尋找',
          },
          {
            id: '15-18-cognitive-3',
            number: 3,
            description: '聽懂簡單指令(如：拍手、遞來)？',
            passStandard: '無手勢下聽懂指令參照做。',
            failStandard: '無法理解',
          },
          {
            id: '15-18-cognitive-4',
            number: 4,
            description: '★會發出 ba-ba、ma-ma 等聲音？',
            passStandard: '使用多種語音組合。',
            failStandard: '無語音',
          },
          {
            id: '15-18-cognitive-5',
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
            id: '15-18-social-1',
            number: 1,
            description: '★呼喚名字有反應？',
            passStandard: '有視線或聲音反應。',
            failStandard: '無反應',
          },
          {
            id: '15-18-social-2',
            number: 2,
            description: '可以和大人玩肢體互動(如：High five)？',
            passStandard: '可以玩互動遊戲。',
            failStandard: '無法互動',
          },
          {
            id: '15-18-social-3',
            number: 3,
            description: '眼神接觸定地看向施測者？',
            passStandard: '眼神接觸穩定。',
            failStandard: '無眼神接觸',
          },
          {
            id: '15-18-social-4',
            number: 4,
            description: '說「謝謝」會以視覺或手勢回應？',
            passStandard: '有視覺或手勢回應。',
            failStandard: '無回應',
          },
        ],
        cutoffPass: 2,
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
        questions: [
          {
            id: '18-24-gross-1',
            number: 1,
            description: '★能自己走路且不會經常跌倒？',
            passStandard: '能獨立走路且步伐穩定。',
            failStandard: '無法走路',
          },
          {
            id: '18-24-gross-2',
            number: 2,
            description: '能走上樓梯(需要扶著)？',
            passStandard: '能比較穩定地上樓。',
            failStandard: '無法上樓',
          },
          {
            id: '18-24-gross-3',
            number: 3,
            description: '能踢球嗎？',
            passStandard: '能以腳踢球。',
            failStandard: '無法踢球',
          },
          {
            id: '18-24-gross-4',
            number: 4,
            description: '可以跑嗎？',
            passStandard: '能比較流暢地跑動。',
            failStandard: '無法跑動',
          },
          {
            id: '18-24-gross-5',
            number: 5,
            description: '能從坐姿站起來嗎？',
            passStandard: '能獨立站起。',
            failStandard: '需要幫助',
          },
        ],
        cutoffPass: 3,
        maxScore: 5,
      },
      fine: {
        name: '精細動作',
        questions: [
          {
            id: '18-24-fine-1',
            number: 1,
            description: '★能用指指及食指握筆取貼紙或葡萄乾小物品？',
            passStandard: '指尖或指腹對握（Pincer grasp）。',
            failStandard: '無法用指指握取',
          },
          {
            id: '18-24-fine-2',
            number: 2,
            description: '能用湯匙自己吃飯嗎？',
            passStandard: '能比較自主地用湯匙吃飯。',
            failStandard: '無法自主吃飯',
          },
          {
            id: '18-24-fine-3',
            number: 3,
            description: '能翻書頁嗎？',
            passStandard: '能翻轉數頁。',
            failStandard: '無法翻頁',
          },
          {
            id: '18-24-fine-4',
            number: 4,
            description: '能堆積木塊嗎？',
            passStandard: '能堆積 2-3 個木塊。',
            failStandard: '無法堆積',
          },
        ],
        cutoffPass: 2,
        maxScore: 4,
      },
      cognitive: {
        name: '認知語言',
        questions: [
          {
            id: '18-24-cognitive-1',
            number: 1,
            description: '玩具被蓋起來，會嘗試去找尋？',
            passStandard: '會試圖指出或拉起遮布。',
            failStandard: '無法尋找',
          },
          {
            id: '18-24-cognitive-2',
            number: 2,
            description: '能指出身體部位(如：鼻子、眼睛)嗎？',
            passStandard: '能指出至少 1 個身體部位。',
            failStandard: '無法指出',
          },
          {
            id: '18-24-cognitive-3',
            number: 3,
            description: '★會說 10-50 個字？',
            passStandard: '會說多個詞彙。',
            failStandard: '少於 10 個字',
          },
          {
            id: '18-24-cognitive-4',
            number: 4,
            description: '會說簡單的兩字詞彙嗎？',
            passStandard: '會說簡單的兩字詞彙。',
            failStandard: '無法說詞彙',
          },
          {
            id: '18-24-cognitive-5',
            number: 5,
            description: '會執行簡單的指令嗎？',
            passStandard: '能執行 2-3 個指令。',
            failStandard: '無法執行',
          },
        ],
        cutoffPass: 3,
        maxScore: 5,
      },
      social: {
        name: '社會發展',
        questions: [
          {
            id: '18-24-social-1',
            number: 1,
            description: '★呼喚名字有反應？',
            passStandard: '有視線或聲音反應。',
            failStandard: '無反應',
          },
          {
            id: '18-24-social-2',
            number: 2,
            description: '會模仿大人的簡單動作或表情？',
            passStandard: '能模仿大人的動作。',
            failStandard: '無法模仿',
          },
          {
            id: '18-24-social-3',
            number: 3,
            description: '會表現出對食物的喜好？',
            passStandard: '會表現出食物的喜好。',
            failStandard: '無法表現',
          },
          {
            id: '18-24-social-4',
            number: 4,
            description: '互動時有自光接觸嗎？',
            passStandard: '會看著養育者或照顧者。',
            failStandard: '無接觸',
          },
          {
            id: '18-24-social-5',
            number: 5,
            description: '會看著養育者或照顧者？',
            passStandard: '能穩定看著大人。',
            failStandard: '無法看著',
          },
        ],
        cutoffPass: 3,
        maxScore: 5,
      },
    },
  },
  '2-3': {
    name: '2-3 歲',
    minMonths: 24,
    maxMonths: 36,
    areas: {
      gross: {
        name: '粗大動作',
        questions: [
          {
            id: '2-3-gross-1',
            number: 1,
            description: '★能自己走路且不會經常跌倒？',
            passStandard: '能獨立走路且步伐穩定。',
            failStandard: '無法走路',
          },
          {
            id: '2-3-gross-2',
            number: 2,
            description: '能走上樓梯(需要扶著)？',
            passStandard: '能比較穩定地上樓。',
            failStandard: '無法上樓',
          },
          {
            id: '2-3-gross-3',
            number: 3,
            description: '能踢球嗎？',
            passStandard: '能以腳踢球。',
            failStandard: '無法踢球',
          },
          {
            id: '2-3-gross-4',
            number: 4,
            description: '可以跑嗎？',
            passStandard: '能比較流暢地跑動。',
            failStandard: '無法跑動',
          },
          {
            id: '2-3-gross-5',
            number: 5,
            description: '能從坐姿站起來嗎？',
            passStandard: '能獨立站起。',
            failStandard: '需要幫助',
          },
        ],
        cutoffPass: 3,
        maxScore: 5,
      },
      fine: {
        name: '精細動作',
        questions: [
          {
            id: '2-3-fine-1',
            number: 1,
            description: '★能用指指及食指握筆取貼紙或葡萄乾小物品？',
            passStandard: '指尖或指腹對握（Pincer grasp）。',
            failStandard: '無法用指指握取',
          },
          {
            id: '2-3-fine-2',
            number: 2,
            description: '能用湯匙自己吃飯嗎？',
            passStandard: '能比較自主地用湯匙吃飯。',
            failStandard: '無法自主吃飯',
          },
          {
            id: '2-3-fine-3',
            number: 3,
            description: '能翻書頁嗎？',
            passStandard: '能翻轉數頁。',
            failStandard: '無法翻頁',
          },
          {
            id: '2-3-fine-4',
            number: 4,
            description: '能堆積木塊嗎？',
            passStandard: '能堆積 2-3 個木塊。',
            failStandard: '無法堆積',
          },
        ],
        cutoffPass: 2,
        maxScore: 4,
      },
      cognitive: {
        name: '認知語言',
        questions: [
          {
            id: '2-3-cognitive-1',
            number: 1,
            description: '玩具被蓋起來，會嘗試去找尋？',
            passStandard: '會試圖指出或拉起遮布。',
            failStandard: '無法尋找',
          },
          {
            id: '2-3-cognitive-2',
            number: 2,
            description: '能指出身體部位(如：鼻子、眼睛)嗎？',
            passStandard: '能指出至少 1 個身體部位。',
            failStandard: '無法指出',
          },
          {
            id: '2-3-cognitive-3',
            number: 3,
            description: '★會說 10-50 個字？',
            passStandard: '會說多個詞彙。',
            failStandard: '少於 10 個字',
          },
          {
            id: '2-3-cognitive-4',
            number: 4,
            description: '會說簡單的兩字詞彙嗎？',
            passStandard: '會說簡單的兩字詞彙。',
            failStandard: '無法說詞彙',
          },
          {
            id: '2-3-cognitive-5',
            number: 5,
            description: '會執行簡單的指令嗎？',
            passStandard: '能執行 2-3 個指令。',
            failStandard: '無法執行',
          },
        ],
        cutoffPass: 3,
        maxScore: 5,
      },
      social: {
        name: '社會發展',
        questions: [
          {
            id: '2-3-social-1',
            number: 1,
            description: '★呼喚名字有反應？',
            passStandard: '有視線或聲音反應。',
            failStandard: '無反應',
          },
          {
            id: '2-3-social-2',
            number: 2,
            description: '會模仿大人的簡單動作或表情？',
            passStandard: '能模仿大人的動作。',
            failStandard: '無法模仿',
          },
          {
            id: '2-3-social-3',
            number: 3,
            description: '會表現出對食物的喜好？',
            passStandard: '會表現出食物的喜好。',
            failStandard: '無法表現',
          },
          {
            id: '2-3-social-4',
            number: 4,
            description: '互動時有自光接觸嗎？',
            passStandard: '會看著養育者或照顧者。',
            failStandard: '無接觸',
          },
          {
            id: '2-3-social-5',
            number: 5,
            description: '會看著養育者或照顧者？',
            passStandard: '能穩定看著大人。',
            failStandard: '無法看著',
          },
        ],
        cutoffPass: 3,
        maxScore: 5,
      },
    },
  },
  '3-4': {
    name: '3-4 歲',
    minMonths: 36,
    maxMonths: 48,
    areas: {
      gross: {
        name: '粗大動作',
        questions: [
          {
            id: '3-4-gross-1',
            number: 1,
            description: '能走上樓梯(需要扶著)？',
            passStandard: '能穩定地上樓。',
            failStandard: '無法上樓',
          },
          {
            id: '3-4-gross-2',
            number: 2,
            description: '能踢球嗎？',
            passStandard: '能以腳踢球。',
            failStandard: '無法踢球',
          },
          {
            id: '3-4-gross-3',
            number: 3,
            description: '能跑嗎？',
            passStandard: '能流暢地跑動。',
            failStandard: '無法跑動',
          },
          {
            id: '3-4-gross-4',
            number: 4,
            description: '能單腳站立嗎？',
            passStandard: '能單腳站立。',
            failStandard: '無法單腳站立',
          },
          {
            id: '3-4-gross-5',
            number: 5,
            description: '能跳躍嗎？',
            passStandard: '能跳躍。',
            failStandard: '無法跳躍',
          },
        ],
        cutoffPass: 4,
        maxScore: 5,
      },
      fine: {
        name: '精細動作',
        questions: [
          {
            id: '3-4-fine-1',
            number: 1,
            description: '能用湯匙自己吃飯嗎？',
            passStandard: '能自主地用湯匙吃飯。',
            failStandard: '無法自主吃飯',
          },
          {
            id: '3-4-fine-2',
            number: 2,
            description: '能堆積木塊嗎？',
            passStandard: '能堆積 4-6 個木塊。',
            failStandard: '無法堆積',
          },
          {
            id: '3-4-fine-3',
            number: 3,
            description: '能畫簡單的圖形嗎？',
            passStandard: '能畫圓形或直線。',
            failStandard: '無法畫圖',
          },
        ],
        cutoffPass: 2,
        maxScore: 3,
      },
      cognitive: {
        name: '認知語言',
        questions: [
          {
            id: '3-4-cognitive-1',
            number: 1,
            description: '能指出身體部位嗎？',
            passStandard: '能指出多個身體部位。',
            failStandard: '無法指出',
          },
          {
            id: '3-4-cognitive-2',
            number: 2,
            description: '會說簡單的句子嗎？',
            passStandard: '會說簡單的 2-3 字句子。',
            failStandard: '無法說句子',
          },
          {
            id: '3-4-cognitive-3',
            number: 3,
            description: '會執行多個指令嗎？',
            passStandard: '能執行 3-4 個指令。',
            failStandard: '無法執行',
          },
          {
            id: '3-4-cognitive-4',
            number: 4,
            description: '能認識顏色嗎？',
            passStandard: '能認識至少 1 種顏色。',
            failStandard: '無法認識',
          },
        ],
        cutoffPass: 3,
        maxScore: 4,
      },
      social: {
        name: '社會發展',
        questions: [
          {
            id: '3-4-social-1',
            number: 1,
            description: '會與其他小孩互動嗎？',
            passStandard: '會與其他小孩互動。',
            failStandard: '無法互動',
          },
          {
            id: '3-4-social-2',
            number: 2,
            description: '會表現出情緒嗎？',
            passStandard: '能表現出基本情緒。',
            failStandard: '無法表現',
          },
          {
            id: '3-4-social-3',
            number: 3,
            description: '會遵守簡單的規則嗎？',
            passStandard: '能遵守簡單的規則。',
            failStandard: '無法遵守',
          },
          {
            id: '3-4-social-4',
            number: 4,
            description: '會表現出獨立性嗎？',
            passStandard: '能表現出獨立性。',
            failStandard: '無法表現',
          },
          {
            id: '3-4-social-5',
            number: 5,
            description: '會表現出同情心嗎？',
            passStandard: '能表現出基本的同情心。',
            failStandard: '無法表現',
          },
        ],
        cutoffPass: 4,
        maxScore: 5,
      },
    },
  },
  '4-5': {
    name: '4-5 歲',
    minMonths: 48,
    maxMonths: 60,
    areas: {
      gross: {
        name: '粗大動作',
        questions: [
          {
            id: '4-5-gross-1',
            number: 1,
            description: '能走上樓梯嗎？',
            passStandard: '能穩定地上樓。',
            failStandard: '無法上樓',
          },
          {
            id: '4-5-gross-2',
            number: 2,
            description: '能踢球嗎？',
            passStandard: '能準確地踢球。',
            failStandard: '無法踢球',
          },
          {
            id: '4-5-gross-3',
            number: 3,
            description: '能跑嗎？',
            passStandard: '能流暢地跑動。',
            failStandard: '無法跑動',
          },
          {
            id: '4-5-gross-4',
            number: 4,
            description: '能單腳站立嗎？',
            passStandard: '能單腳站立。',
            failStandard: '無法單腳站立',
          },
        ],
        cutoffPass: 3,
        maxScore: 4,
      },
      fine: {
        name: '精細動作',
        questions: [
          {
            id: '4-5-fine-1',
            number: 1,
            description: '能用筷子吃飯嗎？',
            passStandard: '能用筷子吃飯。',
            failStandard: '無法用筷子',
          },
          {
            id: '4-5-fine-2',
            number: 2,
            description: '能堆積木塊嗎？',
            passStandard: '能堆積 8-10 個木塊。',
            failStandard: '無法堆積',
          },
          {
            id: '4-5-fine-3',
            number: 3,
            description: '能畫簡單的圖形嗎？',
            passStandard: '能畫圓形、直線和簡單的人物。',
            failStandard: '無法畫圖',
          },
          {
            id: '4-5-fine-4',
            number: 4,
            description: '能剪紙嗎？',
            passStandard: '能用剪刀剪紙。',
            failStandard: '無法剪紙',
          },
        ],
        cutoffPass: 3,
        maxScore: 4,
      },
      cognitive: {
        name: '認知語言',
        questions: [
          {
            id: '4-5-cognitive-1',
            number: 1,
            description: '會說完整的句子嗎？',
            passStandard: '會說完整的句子。',
            failStandard: '無法說句子',
          },
          {
            id: '4-5-cognitive-2',
            number: 2,
            description: '會執行複雜的指令嗎？',
            passStandard: '能執行複雜的指令。',
            failStandard: '無法執行',
          },
          {
            id: '4-5-cognitive-3',
            number: 3,
            description: '能認識顏色嗎？',
            passStandard: '能認識多種顏色。',
            failStandard: '無法認識',
          },
          {
            id: '4-5-cognitive-4',
            number: 4,
            description: '能認識數字嗎？',
            passStandard: '能認識基本數字。',
            failStandard: '無法認識',
          },
          {
            id: '4-5-cognitive-5',
            number: 5,
            description: '能講故事嗎？',
            passStandard: '能講簡單的故事。',
            failStandard: '無法講故事',
          },
        ],
        cutoffPass: 4,
        maxScore: 5,
      },
      social: {
        name: '社會發展',
        questions: [
          {
            id: '4-5-social-1',
            number: 1,
            description: '會與其他小孩合作嗎？',
            passStandard: '能與其他小孩合作。',
            failStandard: '無法合作',
          },
          {
            id: '4-5-social-2',
            number: 2,
            description: '會表現出複雜的情緒嗎？',
            passStandard: '能表現出複雜的情緒。',
            failStandard: '無法表現',
          },
          {
            id: '4-5-social-3',
            number: 3,
            description: '會遵守複雜的規則嗎？',
            passStandard: '能遵守複雜的規則。',
            failStandard: '無法遵守',
          },
          {
            id: '4-5-social-4',
            number: 4,
            description: '會表現出獨立性嗎？',
            passStandard: '能表現出高度獨立性。',
            failStandard: '無法表現',
          },
        ],
        cutoffPass: 3,
        maxScore: 4,
      },
    },
  },
  '5-7': {
    name: '5-7 歲',
    minMonths: 60,
    maxMonths: 84,
    areas: {
      gross: {
        name: '粗大動作',
        questions: [
          {
            id: '5-7-gross-1',
            number: 1,
            description: '能走上樓梯嗎？',
            passStandard: '能穩定地上樓。',
            failStandard: '無法上樓',
          },
          {
            id: '5-7-gross-2',
            number: 2,
            description: '能踢球嗎？',
            passStandard: '能準確地踢球。',
            failStandard: '無法踢球',
          },
          {
            id: '5-7-gross-3',
            number: 3,
            description: '能跑嗎？',
            passStandard: '能流暢地跑動。',
            failStandard: '無法跑動',
          },
          {
            id: '5-7-gross-4',
            number: 4,
            description: '能單腳站立嗎？',
            passStandard: '能單腳站立。',
            failStandard: '無法單腳站立',
          },
        ],
        cutoffPass: 3,
        maxScore: 4,
      },
      fine: {
        name: '精細動作',
        questions: [
          {
            id: '5-7-fine-1',
            number: 1,
            description: '能用筷子吃飯嗎？',
            passStandard: '能用筷子吃飯。',
            failStandard: '無法用筷子',
          },
          {
            id: '5-7-fine-2',
            number: 2,
            description: '能堆積木塊嗎？',
            passStandard: '能堆積 10 個以上木塊。',
            failStandard: '無法堆積',
          },
          {
            id: '5-7-fine-3',
            number: 3,
            description: '能畫簡單的圖形嗎？',
            passStandard: '能畫複雜的人物和場景。',
            failStandard: '無法畫圖',
          },
          {
            id: '5-7-fine-4',
            number: 4,
            description: '能剪紙嗎？',
            passStandard: '能用剪刀剪複雜的圖形。',
            failStandard: '無法剪紙',
          },
        ],
        cutoffPass: 3,
        maxScore: 4,
      },
      cognitive: {
        name: '認知語言',
        questions: [
          {
            id: '5-7-cognitive-1',
            number: 1,
            description: '會說完整的句子嗎？',
            passStandard: '會說完整的複雜句子。',
            failStandard: '無法說句子',
          },
          {
            id: '5-7-cognitive-2',
            number: 2,
            description: '會執行複雜的指令嗎？',
            passStandard: '能執行複雜的多步驟指令。',
            failStandard: '無法執行',
          },
          {
            id: '5-7-cognitive-3',
            number: 3,
            description: '能認識顏色嗎？',
            passStandard: '能認識所有基本顏色。',
            failStandard: '無法認識',
          },
          {
            id: '5-7-cognitive-4',
            number: 4,
            description: '能認識數字嗎？',
            passStandard: '能認識 1-10 的數字。',
            failStandard: '無法認識',
          },
          {
            id: '5-7-cognitive-5',
            number: 5,
            description: '能講故事嗎？',
            passStandard: '能講詳細的故事。',
            failStandard: '無法講故事',
          },
        ],
        cutoffPass: 4,
        maxScore: 5,
      },
      social: {
        name: '社會發展',
        questions: [
          {
            id: '5-7-social-1',
            number: 1,
            description: '會與其他小孩合作嗎？',
            passStandard: '能與其他小孩良好合作。',
            failStandard: '無法合作',
          },
          {
            id: '5-7-social-2',
            number: 2,
            description: '會表現出複雜的情緒嗎？',
            passStandard: '能表現出複雜的情緒。',
            failStandard: '無法表現',
          },
          {
            id: '5-7-social-3',
            number: 3,
            description: '會遵守複雜的規則嗎？',
            passStandard: '能遵守複雜的規則。',
            failStandard: '無法遵守',
          },
          {
            id: '5-7-social-4',
            number: 4,
            description: '會表現出獨立性嗎？',
            passStandard: '能表現出高度獨立性。',
            failStandard: '無法表現',
          },
        ],
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

export function getAssessmentTable(ageGroup: AgeGroup): Record<string, { cutoff: number; maxScore: number }> {
  return ASSESSMENT_TABLES[ageGroup];
}

export function calculateAgeInMonths(birthDateROC: string, testDateROC: string): number {
  // 將民國年轉換為西元年
  const [birthYear, birthMonth, birthDay] = birthDateROC.split('-').map(Number);
  const [testYear, testMonth, testDay] = testDateROC.split('-').map(Number);
  
  const birthDateAD = new Date(birthYear + 1911, birthMonth - 1, birthDay);
  const testDateAD = new Date(testYear + 1911, testMonth - 1, testDay);
  
  const months = (testDateAD.getFullYear() - birthDateAD.getFullYear()) * 12 + 
                 (testDateAD.getMonth() - birthDateAD.getMonth());
  
  return Math.max(0, months);
}

export function formatAge(months: number): string {
  if (months <= 24) {
    return `${months} 個月`;
  } else {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (remainingMonths === 0) {
      return `${years} 歲`;
    } else {
      return `${years} 歲`;
    }
  }
}
