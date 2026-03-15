/**
 * 兒童發展篩檢問卷 - 資料結構
 * 包含所有年齡層的題目、評分標準與計算邏輯
 */

export type AgeGroup = '6-9' | '9-12' | '12-15' | '5-7';
export type DevelopmentArea = 'gross' | 'fine' | 'cognitive' | 'social';
export type QuestionType = 'yes-no' | 'scale';

export interface Question {
  id: string;
  number: number;
  type: QuestionType;
  category: string;
  description: string;
  passStandard: string;
  failStandard: string;
  scoreOptions: number[]; // [2, 1, 0.5, 0]
}

export interface DevelopmentAreaData {
  name: string;
  nameEn: string;
  questions: Question[];
  cutoffPass: number;
  cutoffFail: number;
  maxScore: number;
}

export interface AgeGroupData {
  ageGroup: AgeGroup;
  ageLabel: string;
  areas: {
    gross: DevelopmentAreaData;
    fine: DevelopmentAreaData;
    cognitive: DevelopmentAreaData;
    social: DevelopmentAreaData;
  };
}

// ============================================================================
// 6-9 個月
// ============================================================================

export const data6to9Months: AgeGroupData = {
  ageGroup: '6-9',
  ageLabel: '6-9 個月',
  areas: {
    gross: {
      name: '粗大動作',
      nameEn: 'Gross Motor',
      cutoffPass: 5,
      cutoffFail: 5,
      maxScore: 10,
      questions: [
        {
          id: 'g1-6-9',
          number: 1,
          type: 'yes-no',
          category: 'G',
          description: '孩子趴著時，可以用手肘或手掌支撐上半身抬離床面，且維持頭部控制嗎？',
          passStandard: '孩子可以用自己的手肘或手掌支撐上半身抬離床面並能維持頭部控制。',
          failStandard: '1. 無法用手支撐抬上半身離床面。\n2. 僅有頭部抬起，胸部仍貼床面。\n3. 頭部控制不穩或搖晃，無法維持抬起姿勢。',
          scoreOptions: [2, 1, 0.5, 0],
        },
        {
          id: 'g2-6-9',
          number: 2,
          type: 'yes-no',
          category: 'G',
          description: '可以翻身？（若不會翻身的嬰幼兒，測試「不對稱頸部反射 Asymmetric tonic neck reflex」是否已消失？）',
          passStandard: '可以從躺姿翻至坐姿，或 ATNR 清失，且出現 Neck righting reflex（兩側均測試試過）。',
          failStandard: '1. ATNR 仍存在，Neck righting reflex 仍存在或僅單側出現。\n2. 軀幹會過度向前傾或頭部仍有扭轉。',
          scoreOptions: [2, 1, 0.5, 0],
        },
        {
          id: 'g3-6-9',
          number: 3,
          type: 'yes-no',
          category: 'G',
          description: '可以在無任何支撐下坐著，且不會身體過度傾向前傾？「牽引反射 Traction Test」是否正常？',
          passStandard: '頭部可以跟著牽引反射的動作，頭部不會向後傾斜。',
          failStandard: '頭部控制不穩或搖晃，無法維持抬起姿勢。',
          scoreOptions: [2, 1, 0.5, 0],
        },
        {
          id: 'g4-6-9',
          number: 4,
          type: 'yes-no',
          category: 'G',
          description: '「拾髖反射 Landau Reflex」是否正常？',
          passStandard: '下列三項狀況均須合才算通過：\n1. 用手臂托住孩子腹部時，嬰兒頭會自動向上抬起，脊部抬直挺直向上（對抗重力）及下肢伸直。\n2. 下壓嬰兒頭部時，嬰兒會向腹部方向彎曲。\n3. 放開下壓嬰兒頭部時，嬰兒頭部會再次抬起。',
          failStandard: '左列請選擇是否有任何一項不出現。嬰幼兒無法抬起頭部或無法向上抬起（只有單邊抬起或頭部搖晃）。',
          scoreOptions: [2, 1, 0.5, 0],
        },
        {
          id: 'g5-6-9',
          number: 5,
          type: 'yes-no',
          category: 'G',
          description: '是否出現「降落傘反射 Parachute Reflex」？',
          passStandard: '有由出現對稱性手臂外展的防禦姿勢。',
          failStandard: '沒有出現「降落傘反射」，或不對稱。',
          scoreOptions: [2, 1, 0.5, 0],
        },
      ],
    },
    fine: {
      name: '精細動作',
      nameEn: 'Fine Motor',
      cutoffPass: 4,
      cutoffFail: 4,
      maxScore: 8,
      questions: [
        {
          id: 'f1-6-9',
          number: 1,
          type: 'yes-no',
          category: 'F',
          description: '可以用雙手提著物品（例如奶瓶）？',
          passStandard: '可以用雙手同時提著物品。',
          failStandard: '無法提著奶瓶，或他人輔助。',
          scoreOptions: [2, 1, 0.5, 0],
        },
        {
          id: 'f2-6-9',
          number: 2,
          type: 'yes-no',
          category: 'F',
          description: '將手怕蓋在孩子寶寶臉上，他會用單手或雙手打開？（左右手均應測試試）',
          passStandard: '左右手皆可單獨揮打。',
          failStandard: '無法拿開，只用同一手。',
          scoreOptions: [2, 1, 0.5, 0],
        },
        {
          id: 'f3-6-9',
          number: 3,
          type: 'yes-no',
          category: 'F',
          description: '★ 大拇指可以伸直與外展，不會持續內縮尖掌心？（可以張開手，不會持續握拳）',
          passStandard: '大拇指可伸直，離開掌心。',
          failStandard: '拇指提起不掌中。',
          scoreOptions: [2, 1, 0.5, 0],
        },
        {
          id: 'f4-6-9',
          number: 4,
          type: 'yes-no',
          category: 'F',
          description: '可以抓扒小玩具？',
          passStandard: '可以用四指及掌心抓（雙手皆可）。',
          failStandard: '無法用四指或掌心抓或只會使用單手。',
          scoreOptions: [2, 1, 0.5, 0],
        },
      ],
    },
    cognitive: {
      name: '認知語言社會發展',
      nameEn: 'Cognitive & Language',
      cutoffPass: 4,
      cutoffFail: 4,
      maxScore: 10,
      questions: [
        {
          id: 'c1-6-9',
          number: 1,
          type: 'yes-no',
          category: 'S',
          description: '呼喚孩子名字或小名有反應嗎？',
          passStandard: '有視線或聲音反應。',
          failStandard: '對呼喚沒有任何視線或聲音回應。',
          scoreOptions: [2, 1, 0.5, 0],
        },
        {
          id: 'c2-6-9',
          number: 2,
          type: 'yes-no',
          category: 'F',
          description: '★ 令玩具在面前揮舞，並將玩具從一邊轉換到另一邊，孩子眼球會跟蹤視線追視嗎？',
          passStandard: '視線追著移動，左右手可以穩定直線牽取。',
          failStandard: '無法穩定追視或只用因定手牽取（非左右手輪流）。',
          scoreOptions: [2, 1, 0.5, 0],
        },
        {
          id: 'c3-6-9',
          number: 3,
          type: 'yes-no',
          category: 'S',
          description: '督師/照護者出聲或說話逗孩子時，孩子有聲音回應互動嗎？',
          passStandard: '孩子會以聲音回應互動。',
          failStandard: '仍佛沒見或沒有興趣回應。',
          scoreOptions: [2, 1, 0.5, 0],
        },
        {
          id: 'c4-6-9',
          number: 4,
          type: 'yes-no',
          category: 'S',
          description: '遇到不喜歡的食物會有抗拒的行為（例：把嘴巴閉起來或轉頭或推開）？',
          passStandard: '會表現出對食物的喜好。',
          failStandard: '不會有特別排斥或喜好需求的反應。',
          scoreOptions: [2, 1, 0.5, 0],
        },
        {
          id: 'c5-6-9',
          number: 5,
          type: 'yes-no',
          category: 'C',
          description: '可以被逗笑嗎？',
          passStandard: '可以被逗笑。',
          failStandard: '面無表情，無法在情境中表現出喜悅。',
          scoreOptions: [2, 1, 0.5, 0],
        },
      ],
    },
    social: {
      name: '社會發展',
      nameEn: 'Social Development',
      cutoffPass: 4,
      cutoffFail: 4,
      maxScore: 10,
      questions: [
        {
          id: 's1-6-9',
          number: 1,
          type: 'yes-no',
          category: 'S',
          description: '呼喚孩子名字或小名有反應嗎？',
          passStandard: '有視線或聲音反應。',
          failStandard: '對呼喚沒有任何視線或聲音回應。',
          scoreOptions: [2, 1, 0.5, 0],
        },
        {
          id: 's2-6-9',
          number: 2,
          type: 'yes-no',
          category: 'S',
          description: '會嘗試模仿大人的簡單動作或表情？例如：嘴巴表情、拍手等。',
          passStandard: '可以模仿簡單動作或表情。',
          failStandard: '很少或沒有出現模仿的行為。',
          scoreOptions: [2, 1, 0.5, 0],
        },
        {
          id: 's3-6-9',
          number: 3,
          type: 'yes-no',
          category: 'S',
          description: '可以跟大人玩 peek-a-boo（躲貓貓）的遊戲？（或孩子看到大人玩 peek-a-boo 的遊戲會笑或頻得開心）',
          passStandard: '孩子有出現遊戲互動意圖圖，（例如發出聲音或是有表情回應）。',
          failStandard: '沒有出現互動回應意圖圖或沒有反應。',
          scoreOptions: [2, 1, 0.5, 0],
        },
        {
          id: 's4-6-9',
          number: 4,
          type: 'yes-no',
          category: 'S',
          description: '看到陌生或陌生人會有怕生或害羞的反應嗎？',
          passStandard: '會怕生或是害羞。',
          failStandard: '沒有辨別分別。',
          scoreOptions: [2, 1, 0.5, 0],
        },
        {
          id: 's5-6-9',
          number: 5,
          type: 'yes-no',
          category: 'S',
          description: '互動時，孩子和大人有目光接觸嗎？',
          passStandard: '沒有任何目光接觸。',
          failStandard: '沒有任何目光接觸。',
          scoreOptions: [2, 1, 0.5, 0],
        },
      ],
    },
  },
};

// ============================================================================
// 9-12 個月
// ============================================================================

export const data9to12Months: AgeGroupData = {
  ageGroup: '9-12',
  ageLabel: '9-12 個月',
  areas: {
    gross: {
      name: '粗大動作',
      nameEn: 'Gross Motor',
      cutoffPass: 4,
      cutoffFail: 4,
      maxScore: 10,
      questions: [
        {
          id: 'g1-9-12',
          number: 1,
          type: 'yes-no',
          category: 'G',
          description: '★ 能自己扶著傢俱坐至少 1 分鐘，不會搖晃或跌倒？',
          passStandard: '能脊部挺直且獨立坐著至少 1 分鐘，不需以手臂支撐。',
          failStandard: '1. 無法脊部挺直且獨立坐著超過 1 分鐘。\n2. 軀幹會過度向前傾或頭部仍有扭轉。\n3. 仍需以手臂外力支撐維持坐姿。',
          scoreOptions: [2, 1, 0.5, 0],
        },
        {
          id: 'g2-9-12',
          number: 2,
          type: 'yes-no',
          category: 'G',
          description: '可以從胸部貼地面向前爬行一小段距離（至少 30cm）？',
          passStandard: '可以胸部貼地面向前爬行或胸部離地面向前爬行一小段距離（至少 30cm）。',
          failStandard: '1. 無法向前爬行超過 30cm 距離。\n2. 只能跪著向後轉向，無法向前移動。\n3. 只能後退爬，無法往前爬行。',
          scoreOptions: [2, 1, 0.5, 0],
        },
        {
          id: 'g3-9-12',
          number: 3,
          type: 'yes-no',
          category: 'G',
          description: '可以由躺姿或坐姿自己坐起來？',
          passStandard: '可以自己坐起來。',
          failStandard: '無法完全自己成成，需他人協助。',
          scoreOptions: [2, 1, 0.5, 0],
        },
        {
          id: 'g4-9-12',
          number: 4,
          type: 'yes-no',
          category: 'G',
          description: '將雙手放在孩子腹下，稍加支撐孩子就能站立起來？',
          passStandard: '稍加支撐即可雙腳伸直，呈現站立姿勢。',
          failStandard: '無法呈現站立姿勢，仍須大人外力支撐。',
          scoreOptions: [2, 1, 0.5, 0],
        },
        {
          id: 'g5-9-12',
          number: 5,
          type: 'yes-no',
          category: 'G',
          description: '是否出現「降落傘反射」？',
          passStandard: '有由出現對稱性手臂外展的防禦姿勢。',
          failStandard: '沒有出現「降落傘反射」，或不對稱。',
          scoreOptions: [2, 1, 0.5, 0],
        },
      ],
    },
    fine: {
      name: '精細動作',
      nameEn: 'Fine Motor',
      cutoffPass: 3,
      cutoffFail: 3,
      maxScore: 8,
      questions: [
        {
          id: 'f1-9-12',
          number: 1,
          type: 'yes-no',
          category: 'F',
          description: '★ 會掌玩具由一手換至另一手？（可在身體中線處將物品從一手換到另一手中，過程物品點不會掉落）',
          passStandard: '可左右手交換持物。',
          failStandard: '左右手各自持物，沒有觀察到在身體中線交換的動作。',
          scoreOptions: [2, 1, 0.5, 0],
        },
        {
          id: 'f2-9-12',
          number: 2,
          type: 'yes-no',
          category: 'F',
          description: '會用食指去戳或按東西，例如戳小洞、按按鈕、開關？',
          passStandard: '有單獨的手指分離動作。（會單獨伸出食指對準目標按壓）',
          failStandard: '操作時無法伸出食指使用時無法對準目標。',
          scoreOptions: [2, 1, 0.5, 0],
        },
        {
          id: 'f3-9-12',
          number: 3,
          type: 'yes-no',
          category: 'F',
          description: '可以單手持續搖動玩具至少 3 下？',
          passStandard: '有足夠的抓握力道，且可重複持續搖動玩具至少 3 下。',
          failStandard: '1. 抓握力量不足或搖晃角度太小不明顯。\n2. 無法持續搖動玩具超過 3 下。',
          scoreOptions: [2, 1, 0.5, 0],
        },
        {
          id: 'f4-9-12',
          number: 4,
          type: 'yes-no',
          category: 'F',
          description: '將積木或小玩具放在桌上，孩子能以拇指與食指對提方式伸手拿起來嗎？（說明：請重複測試，當孩子用一手拿提後，將積木或小玩具移至另一側鼓勵引誘他用另一隻手再拿取一次。）',
          passStandard: '以拇指與食指（中指）對提方式拿起（Pincer grasp）該端與食指對提方式拿起，且兩手均可做到。',
          failStandard: '1. 僅使用手掌抓取或只會使用單手。\n2. 只用拇指與食指側邊提（非左右指尖對提）。\n3. 重複測驗只用同一隻手拿取（出現慣用手）。',
          scoreOptions: [2, 1, 0.5, 0],
        },
      ],
    },
    cognitive: {
      name: '認知語言',
      nameEn: 'Cognitive & Language',
      cutoffPass: 3,
      cutoffFail: 3,
      maxScore: 8,
      questions: [
        {
          id: 'c1-9-12',
          number: 1,
          type: 'yes-no',
          category: 'C',
          description: '會一手各拿一個玩具相互敲打把玩嗎？（可示範）',
          passStandard: '可一手各拿一個玩具相互敲打把玩。',
          failStandard: '選沒有出現將玩具互碰敲打的玩法。',
          scoreOptions: [2, 1, 0.5, 0],
        },
        {
          id: 'c2-9-12',
          number: 2,
          type: 'yes-no',
          category: 'C',
          description: '玩具(積木)在孩子面前掉落或被隱藏，孩子眼神會去找嗎？',
          passStandard: '有由現尋找積木的眼神或動作。',
          failStandard: '沒有明顯反應或不會去找。',
          scoreOptions: [2, 1, 0.5, 0],
        },
        {
          id: 'c3-9-12',
          number: 3,
          type: 'yes-no',
          category: 'L',
          description: '出現多種語音組合（字牙學語），可以使用語音組合與聲調進行類溝通嗎？',
          passStandard: '使用多種語音組合進行溝通意圖。',
          failStandard: '語音單一或缺少少變化，沒有溝通意圖。',
          scoreOptions: [2, 1, 0.5, 0],
        },
        {
          id: 'c4-9-12',
          number: 4,
          type: 'yes-no',
          category: 'L',
          description: '會舉雙手示意要抱抱？',
          passStandard: '會舉雙手示意。',
          failStandard: '不會舉雙手示意。',
          scoreOptions: [2, 1, 0.5, 0],
        },
      ],
    },
    social: {
      name: '社會發展',
      nameEn: 'Social Development',
      cutoffPass: 4,
      cutoffFail: 4,
      maxScore: 10,
      questions: [
        {
          id: 's1-9-12',
          number: 1,
          type: 'yes-no',
          category: 'S',
          description: '★ 呼喚孩子名字或小名有反應嗎？',
          passStandard: '有視線或聲音反應。',
          failStandard: '對呼喚沒有任何視線或聲音回應。',
          scoreOptions: [2, 1, 0.5, 0],
        },
        {
          id: 's2-9-12',
          number: 2,
          type: 'yes-no',
          category: 'S',
          description: '會嘗試模仿大人的簡單動作或表情？例如：嘴巴表情、拍手等。',
          passStandard: '可以模仿簡單動作或表情。',
          failStandard: '很少或沒有出現模仿的行為。',
          scoreOptions: [2, 1, 0.5, 0],
        },
        {
          id: 's3-9-12',
          number: 3,
          type: 'yes-no',
          category: 'S',
          description: '可以跟大人玩 peek-a-boo（躲貓貓）的遊戲？（或孩子看到大人玩 peek-a-boo 的遊戲會笑或頻得開心）',
          passStandard: '孩子有由現遊戲互動意圖，（例如發出聲音或是有表情回應）。',
          failStandard: '沒有出現互動回應意圖或沒有反應。',
          scoreOptions: [2, 1, 0.5, 0],
        },
        {
          id: 's4-9-12',
          number: 4,
          type: 'yes-no',
          category: 'S',
          description: '看到陌生或陌生人會有怕生或害羞的反應嗎？',
          passStandard: '會怕生或是害羞。',
          failStandard: '沒有辨別分別。',
          scoreOptions: [2, 1, 0.5, 0],
        },
        {
          id: 's5-9-12',
          number: 5,
          type: 'yes-no',
          category: 'S',
          description: '互動時，孩子和大人有目光接觸嗎？',
          passStandard: '沒有任何目光接觸。',
          failStandard: '沒有任何目光接觸。',
          scoreOptions: [2, 1, 0.5, 0],
        },
      ],
    },
  },
};

// ============================================================================
// 12-15 個月
// ============================================================================

export const data12to15Months: AgeGroupData = {
  ageGroup: '12-15',
  ageLabel: '12-15 個月',
  areas: {
    gross: {
      name: '粗大動作',
      nameEn: 'Gross Motor',
      cutoffPass: 3,
      cutoffFail: 3,
      maxScore: 6,
      questions: [
        {
          id: 'g1-12-15',
          number: 1,
          type: 'yes-no',
          category: 'G',
          description: '★ 能自己扶著傢俱坐至少 1 分鐘，不會搖晃或跌倒？',
          passStandard: '能脊部挺直且獨立坐著至少 1 分鐘，不需以手臂支撐。',
          failStandard: '1. 無法脊部挺直且獨立坐著超過 1 分鐘。\n2. 軀幹會過度向前傾或頭部仍有扭轉。\n3. 仍需以手臂外力支撐維持坐姿。',
          scoreOptions: [2, 1, 0.5, 0],
        },
        {
          id: 'g2-12-15',
          number: 2,
          type: 'yes-no',
          category: 'G',
          description: '可以從胸部貼地面向前爬行一小段距離（至少 30cm）？',
          passStandard: '可以胸部貼地面向前爬行或胸部離地面向前爬行一小段距離（至少 30cm）。',
          failStandard: '1. 無法向前爬行超過 30cm 距離。\n2. 只能跪著向後轉向，無法向前移動。\n3. 只能後退爬，無法往前爬行。',
          scoreOptions: [2, 1, 0.5, 0],
        },
        {
          id: 'g3-12-15',
          number: 3,
          type: 'yes-no',
          category: 'G',
          description: '可以爬上上沙發或樓梯嗎？',
          passStandard: '可以獨自爬上沙發或樓梯。',
          failStandard: '兩無法獨自爬上沙發或樓梯，仍需要協助。',
          scoreOptions: [2, 1, 0.5, 0],
        },
      ],
    },
    fine: {
      name: '精細動作',
      nameEn: 'Fine Motor',
      cutoffPass: 3,
      cutoffFail: 3,
      maxScore: 6,
      questions: [
        {
          id: 'f1-12-15',
          number: 1,
          type: 'yes-no',
          category: 'F',
          description: '★ 可以用拇指及食指對提方式拿取貼紙或葡萄乾大小的小東西？',
          passStandard: '可以用拇指及食指對提方式拿取貼紙與食指對提方式拿取。（Pincer grasp）',
          failStandard: '1. 僅使用手掌抓取或他人輔助。\n2. 僅用手掌或四指側邊提與梅指側邊提。',
          scoreOptions: [2, 1, 0.5, 0],
        },
        {
          id: 'f2-12-15',
          number: 2,
          type: 'yes-no',
          category: 'F',
          description: '可以把物品放在大人手中？',
          passStandard: '可以「有意識地」把物品放在大人手中(輕放)，而非不小心掉落或丟落。',
          failStandard: '無法做到或掉落。',
          scoreOptions: [2, 1, 0.5, 0],
        },
        {
          id: 'f3-12-15',
          number: 3,
          type: 'yes-no',
          category: 'F',
          description: '能把物品放入寬口容器裡，例如將積木放入 8-12 公分的玩具桶/馬克杯中？',
          passStandard: '可以有意識的將物品放入。',
          failStandard: '沒辦法對準放入。',
          scoreOptions: [2, 1, 0.5, 0],
        },
      ],
    },
    cognitive: {
      name: '認知語言',
      nameEn: 'Cognitive & Language',
      cutoffPass: 3,
      cutoffFail: 3,
      maxScore: 10,
      questions: [
        {
          id: 'c1-12-15',
          number: 1,
          type: 'yes-no',
          category: 'S',
          description: '會一手各拿一個玩具相互敲打把玩嗎？（可示範）',
          passStandard: '可一手各拿一個玩具相互敲打把玩。',
          failStandard: '選沒有出現將玩具互碰敲打的玩法。',
          scoreOptions: [2, 1, 0.5, 0],
        },
        {
          id: 'c2-12-15',
          number: 2,
          type: 'yes-no',
          category: 'C',
          description: '玩具(積木)在孩子面前掉落或被隱藏，孩子眼神會去找嗎？',
          passStandard: '有由現尋找積木的眼神或動作。',
          failStandard: '沒有明顯反應或不會去找。',
          scoreOptions: [2, 1, 0.5, 0],
        },
        {
          id: 'c3-12-15',
          number: 3,
          type: 'yes-no',
          category: 'L',
          description: '出現多種語音組合（字牙學語），可以使用語音組合與聲調進行類溝通嗎？',
          passStandard: '使用多種語音組合進行溝通意圖。',
          failStandard: '語音單一或缺少少變化，沒有溝通意圖。',
          scoreOptions: [2, 1, 0.5, 0],
        },
        {
          id: 'c4-12-15',
          number: 4,
          type: 'yes-no',
          category: 'L',
          description: '會舉雙手示意要抱抱？',
          passStandard: '會舉雙手示意。',
          failStandard: '不會舉雙手示意。',
          scoreOptions: [2, 1, 0.5, 0],
        },
        {
          id: 'c5-12-15',
          number: 5,
          type: 'yes-no',
          category: 'L',
          description: '會說 1-2 個有意義的「詞彙」？',
          passStandard: '會說出照顧者聽得懂的有意義詞彙至少 1-2 個。',
          failStandard: '高無有意義的詞彙出現。',
          scoreOptions: [2, 1, 0.5, 0],
        },
      ],
    },
    social: {
      name: '社會發展',
      nameEn: 'Social Development',
      cutoffPass: 4,
      cutoffFail: 4,
      maxScore: 10,
      questions: [
        {
          id: 's1-12-15',
          number: 1,
          type: 'yes-no',
          category: 'S',
          description: '★ 呼喚孩子名字或小名有反應嗎？',
          passStandard: '有視線或聲音反應。',
          failStandard: '對呼喚沒有任何視線或聲音回應。',
          scoreOptions: [2, 1, 0.5, 0],
        },
        {
          id: 's2-12-15',
          number: 2,
          type: 'yes-no',
          category: 'S',
          description: '會嘗試模仿大人的簡單動作或表情？例如：嘴巴表情、拍手等。',
          passStandard: '可以模仿簡單動作或表情。',
          failStandard: '很少或沒有出現模仿的行為。',
          scoreOptions: [2, 1, 0.5, 0],
        },
        {
          id: 's3-12-15',
          number: 3,
          type: 'yes-no',
          category: 'S',
          description: '可以跟大人玩 peek-a-boo（躲貓貓）的遊戲？（或孩子看到大人玩 peek-a-boo 的遊戲會笑或頻得開心）',
          passStandard: '孩子有由現遊戲互動意圖，（例如發出聲音或是有表情回應）。',
          failStandard: '沒有出現互動回應意圖或沒有反應。',
          scoreOptions: [2, 1, 0.5, 0],
        },
        {
          id: 's4-12-15',
          number: 4,
          type: 'yes-no',
          category: 'S',
          description: '看到陌生或陌生人會有怕生或害羞的反應嗎？',
          passStandard: '會怕生或是害羞。',
          failStandard: '沒有辨別分別。',
          scoreOptions: [2, 1, 0.5, 0],
        },
        {
          id: 's5-12-15',
          number: 5,
          type: 'yes-no',
          category: 'S',
          description: '互動時，孩子和大人有目光接觸嗎？',
          passStandard: '沒有任何目光接觸。',
          failStandard: '沒有任何目光接觸。',
          scoreOptions: [2, 1, 0.5, 0],
        },
      ],
    },
  },
};

// ============================================================================
// 5-7 歲
// ============================================================================

export const data5to7Years: AgeGroupData = {
  ageGroup: '5-7',
  ageLabel: '5-7 歲',
  areas: {
    gross: {
      name: '粗大動作',
      nameEn: 'Gross Motor',
      cutoffPass: 3,
      cutoffFail: 3,
      maxScore: 6,
      questions: [
        {
          id: 'g1-5-7',
          number: 1,
          type: 'yes-no',
          category: 'G',
          description: '★ 能穩定地單腳站至少 1 分鐘，不會搖晃或跌倒？',
          passStandard: '能自己扶著傢俱供側坐至或大人不需大人協助（頂多牽手）即可向前走。',
          failStandard: '選不能自己向前走或仍須大人大力支撐。',
          scoreOptions: [2, 1, 0.5, 0],
        },
        {
          id: 'g2-5-7',
          number: 2,
          type: 'yes-no',
          category: 'G',
          description: '可以從胸部貼地面向前爬行一小段距離（至少 30cm）？',
          passStandard: '可以胸部貼地面向前爬行或胸部離地面向前爬行一小段距離（至少 30cm）。',
          failStandard: '1. 無法向前爬行超過 30cm 距離。\n2. 只能跪著向後轉向，無法向前移動。\n3. 只能後退爬，無法往前爬行。',
          scoreOptions: [2, 1, 0.5, 0],
        },
        {
          id: 'g3-5-7',
          number: 3,
          type: 'yes-no',
          category: 'G',
          description: '能腳跟著著腳尖交替向前走 5 步？',
          passStandard: '可以腳跟接著腳尖（Tandem gait）交替向前走 5 步（合）以上。',
          failStandard: '1. 無法腳跟接著腳尖走（前後腳間隔，無法腳跟尖相接）。\n2. 無法連續走走 5 步（合）以上。',
          scoreOptions: [2, 1, 0.5, 0],
        },
      ],
    },
    fine: {
      name: '精細動作',
      nameEn: 'Fine Motor',
      cutoffPass: 4,
      cutoffFail: 4,
      maxScore: 10,
      questions: [
        {
          id: 'f1-5-7',
          number: 1,
          type: 'yes-no',
          category: 'F',
          description: '★ （圖卡 4）可以看著指定圖形照著畫出？（不示範）\n註：5 歲:三角形, 6-7 歲:菱形',
          passStandard: '1. 滿 5 歲：至少可以畫出三角形。\n2. 滿 6 歲：至少可以畫出菱形。\n3. 三角形/菱形的邊角清楚，且形狀可辨識。',
          failStandard: '1. 無法完成圖形的抄畫。\n2. 三角形/菱形的邊角不清楚。\n3. 畫出的圖形為倒三角形。',
          scoreOptions: [2, 1, 0.5, 0],
        },
        {
          id: 'f2-5-7',
          number: 2,
          type: 'yes-no',
          category: 'F',
          description: '能使用前三指提筆書圖？',
          passStandard: '可以使用前三指端端提筆（靜態、動態三指提筆皆可）。',
          failStandard: '提筆姿勢不是使用前三指選端提筆或前三指生掌。',
          scoreOptions: [2, 1, 0.5, 0],
        },
        {
          id: 'f3-5-7',
          number: 3,
          type: 'yes-no',
          category: 'F',
          description: '能單手將手掌中三枚硬幣一次一枚分別放置在桌上？（說明：施測者先示範一次，手掌中放置三枚硬幣，可以將掌中的硬幣一一取出至指尖，放在桌上。）',
          passStandard: '可以單手完成，並且將 3 枚硬幣一次一枚分別放置在桌上（手放開時硬幣已在桌上）。',
          failStandard: '1. 無法單手完成，需另一隻手輔助。\n2. 無法一次將一枚硬幣放置在桌上。',
          scoreOptions: [2, 1, 0.5, 0],
        },
        {
          id: 'f4-5-7',
          number: 4,
          type: 'yes-no',
          category: 'F',
          description: '能獨立完成。',
          passStandard: '可以獨立完成。',
          failStandard: '無法完成。',
          scoreOptions: [2, 1, 0.5, 0],
        },
      ],
    },
    cognitive: {
      name: '認知語言',
      nameEn: 'Cognitive & Language',
      cutoffPass: 5,
      cutoffFail: 5,
      maxScore: 12,
      questions: [
        {
          id: 'c1-5-7',
          number: 1,
          type: 'yes-no',
          category: 'L',
          description: '★ （圖卡 5-8）可以用完整句子敘述圖卡中的任一因素，或回答「為什麼」的問題？（例：手指著圖 7 中的小男孩說：「他為什麼哭？」）',
          passStandard: '完全符合下列 4 點：\n1. 主詞+動詞+受詞，至少能以完整句子結構完整。\n2. 語法正確，句子結構完整。\n3. 有使用連接詞在句子中（因為...所以...和...或...後來...）\n4. 可以一問一答至少 3 次結構對話，不會含糊其詞。',
          failStandard: '左列請選擇是否有任何一項無法出現。無法敘述，即不算通過。',
          scoreOptions: [2, 1, 0.5, 0],
        },
        {
          id: 'c2-5-7',
          number: 2,
          type: 'yes-no',
          category: 'L',
          description: '○ （圖卡 5-8）能正確指出圖卡中的任一因某事件，或回答「為什麼」的問題？（例：手指著圖 7 中的小男孩說：「他為什麼哭？」）',
          passStandard: '可以指出因某事件，例如：「因為受傷了所以哭泣」的問題。',
          failStandard: '無法指出任一因某事件或無法回答問題。',
          scoreOptions: [2, 1, 0.5, 0],
        },
        {
          id: 'c3-5-7',
          number: 3,
          type: 'yes-no',
          category: 'C',
          description: '○ （圖卡 9）可以正確說出或指出阿拉伯數字（至少 1-5）',
          passStandard: '可以指著或說出數字 1-5。',
          failStandard: '無法正確說出/指出數字 1-5。',
          scoreOptions: [2, 1, 0.5, 0],
        },
        {
          id: 'c4-5-7',
          number: 4,
          type: 'yes-no',
          category: 'C',
          description: '（圖卡 5）可以正確數出某子裡的小球數量？',
          passStandard: '可以指著小球一點數，並回答共有 8 個小球小球算通過。施測者務必詢問「請問總共有幾個小球？」',
          failStandard: '無法一一點數或數字回答錯誤或忘記有幾個。',
          scoreOptions: [2, 1, 0.5, 0],
        },
        {
          id: 'c5-5-7',
          number: 5,
          type: 'yes-no',
          category: 'L',
          description: '孩子操音清晰嗎？\n請孩子跟著唸下列詞詞：\n「三」、「八」、「狗」、「阿公」、「鳴水」、「車裁」、「車」、「兔子」',
          passStandard: '構音清楚且流暢，有任何一詞無法清楚發音即不算通過。',
          failStandard: '構音不清楚、三個（《乙》、八《八》、狗（狗束）、八公（阿束）、鳴水（鳴兔）、車裁（分乙）、兔子（絳子）',
          scoreOptions: [2, 1, 0.5, 0],
        },
      ],
    },
    social: {
      name: '社會發展',
      nameEn: 'Social Development',
      cutoffPass: 4,
      cutoffFail: 4,
      maxScore: 12,
      questions: [
        {
          id: 's1-5-7',
          number: 1,
          type: 'yes-no',
          category: 'S',
          description: '可以遵守遊戲規則，參與圓圈遊戲？\n例如：「可以參與『黑鼠圈』遊戲」、「圓圈闖關遊戲」等等需要遵循規則的遊戲。',
          passStandard: '可以圓隊合作，配合遊戲規則參與遊戲，而不會自行其是或常獨自玩或常獨自玩或常獨自玩。',
          failStandard: '常獨自玩或無法遵循遊戲規則常獨自玩或常獨自玩。',
          scoreOptions: [2, 1, 0.5, 0],
        },
        {
          id: 's2-5-7',
          number: 2,
          type: 'yes-no',
          category: 'S',
          description: '會嘗試模仿大人的簡單動作或表情？例如：嘴巴表情、拍手等。',
          passStandard: '可以模仿簡單動作或表情。',
          failStandard: '很少或沒有出現模仿的行為。',
          scoreOptions: [2, 1, 0.5, 0],
        },
        {
          id: 's3-5-7',
          number: 3,
          type: 'yes-no',
          category: 'S',
          description: '可以跟大人玩 peek-a-boo（躲貓貓）的遊戲？（或孩子看到大人玩 peek-a-boo 的遊戲會笑或頻得開心）',
          passStandard: '孩子有由現遊戲互動意圖，（例如發出聲音或是有表情回應）。',
          failStandard: '沒有出現互動回應意圖或沒有反應。',
          scoreOptions: [2, 1, 0.5, 0],
        },
        {
          id: 's4-5-7',
          number: 4,
          type: 'yes-no',
          category: 'S',
          description: '看到陌生或陌生人會有怕生或害羞的反應嗎？',
          passStandard: '會怕生或是害羞。',
          failStandard: '沒有辨別分別。',
          scoreOptions: [2, 1, 0.5, 0],
        },
        {
          id: 's5-5-7',
          number: 5,
          type: 'yes-no',
          category: 'S',
          description: '互動時，孩子和大人有目光接觸嗎？',
          passStandard: '沒有任何目光接觸。',
          failStandard: '沒有任何目光接觸。',
          scoreOptions: [2, 1, 0.5, 0],
        },
        {
          id: 's6-5-7',
          number: 6,
          type: 'yes-no',
          category: 'S',
          description: '施測過程中，孩子的眼神可以穩定著看著施測者或家長？',
          passStandard: '整個施測過程中，孩子的眼神可以穩定著看著施測者或家長。',
          failStandard: '在診間走來走去，坐不住走來走去，或完全不看施測者或家長。',
          scoreOptions: [2, 1, 0.5, 0],
        },
      ],
    },
  },
};

// ============================================================================
// 匯出所有資料
// ============================================================================

export const allAgeGroupsData: Record<AgeGroup, AgeGroupData> = {
  '6-9': data6to9Months,
  '9-12': data9to12Months,
  '12-15': data12to15Months,
  '5-7': data5to7Years,
};

/**
 * 根據出生日期計算年齡層
 */
export function calculateAgeGroup(birthDate: Date, testDate: Date): AgeGroup {
  const ageInMonths = (testDate.getFullYear() - birthDate.getFullYear()) * 12 +
    (testDate.getMonth() - birthDate.getMonth());

  if (ageInMonths < 9) return '6-9';
  if (ageInMonths < 12) return '9-12';
  if (ageInMonths < 15) return '12-15';
  return '5-7';
}

/**
 * 獲取特定年齡層的問卷資料
 */
export function getAgeGroupData(ageGroup: AgeGroup): AgeGroupData {
  return allAgeGroupsData[ageGroup];
}
