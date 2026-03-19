/**
 * 本地存儲工具，用於保存評估記錄
 */

export interface StoredAssessment {
  id: string;
  childName: string;
  childId: string;
  birthDate: string; // 民國年格式 YYYY-MM-DD
  assessmentDate: string; // 西元年格式 YYYY-MM-DD
  ageMonths: number;
  ageGroup: string;
  caregiverResponses: {
    question1: 'yes' | 'no';
    question1Description?: string;
    question2: 'yes' | 'no';
    question2Description?: string;
    question3: 'yes' | 'no';
    question3Description?: string;
  };
  scores: {
    grossMotor: number;
    fineMotor: number;
    cognitive: number;
    social: number;
  };
  results: {
    grossMotorPass: boolean;
    fineMotorPass: boolean;
    cognitivePass: boolean;
    socialPass: boolean;
  };
  recommendation: string;
  createdAt: string; // ISO 時間戳
}

const STORAGE_KEY = 'child_development_assessments';

/**
 * 獲取所有本地存儲的評估記錄
 */
export function getStoredAssessments(): StoredAssessment[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to get stored assessments:', error);
    return [];
  }
}

/**
 * 保存評估記錄到本地存儲
 */
export function saveAssessment(assessment: StoredAssessment): void {
  try {
    const assessments = getStoredAssessments();
    const existingIndex = assessments.findIndex(a => a.id === assessment.id);
    
    if (existingIndex >= 0) {
      assessments[existingIndex] = assessment;
    } else {
      assessments.push(assessment);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(assessments));
  } catch (error) {
    console.error('Failed to save assessment:', error);
  }
}

/**
 * 獲取單個評估記錄
 */
export function getAssessmentById(id: string): StoredAssessment | null {
  try {
    const assessments = getStoredAssessments();
    return assessments.find(a => a.id === id) || null;
  } catch (error) {
    console.error('Failed to get assessment:', error);
    return null;
  }
}

/**
 * 刪除評估記錄
 */
export function deleteAssessment(id: string): void {
  try {
    const assessments = getStoredAssessments();
    const filtered = assessments.filter(a => a.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Failed to delete assessment:', error);
  }
}

/**
 * 生成唯一的評估記錄 ID
 */
export function generateAssessmentId(): string {
  return `assessment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * 清除所有本地存儲的評估記錄
 */
export function clearAllAssessments(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear assessments:', error);
  }
}
