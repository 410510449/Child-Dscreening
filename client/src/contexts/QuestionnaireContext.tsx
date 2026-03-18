/**
 * 問卷狀態管理 Context
 * 管理兒童基本資料、問卷回答、評分結果
 */

import React, { createContext, useContext, useState, useCallback } from 'react';
import { AgeGroup } from '@/lib/questionnaire-data-v2';

export interface ChildInfo {
  name: string;
  idNumber: string; // 可選
  birthDate: string; // 民國年格式：110-03-15
  testDate: string; // 民國年格式：115-03-15
  gender?: 'M' | 'F';
  eatingTime?: string; // 是/否
  eatingTimeDescription?: string; // 吃飯/喝奶描述
  developmentConcern?: string; // 是/否
  developmentConcernDescription?: string; // 發展遲緩描述
  behaviorConcern?: string; // 是/否
  behaviorConcernDescription?: string; // 行為問題描述
  ageInMonths?: number; // 計算得出的年齡（月份）
}

export interface QuestionAnswer {
  questionId: string;
  score: number;
}

export interface AreaScores {
  gross: number;
  fine: number;
  cognitive: number;
  social: number;
}

export interface QuestionnaireState {
  // 基本資料
  childInfo: ChildInfo | null;
  
  // 年齡層
  ageGroup: AgeGroup | null;
  
  // 問卷回答
  answers: Map<string, QuestionAnswer>;
  
  // 評分結果
  areaScores: AreaScores | null;
  
  // 評估結論
  assessmentResult: {
    allPass: boolean;
    partialPass: boolean;
    hasAbnormal: boolean;
  } | null;
  
  // 治療建議
  therapyRecommendation: 'regular' | 'followup' | 'referral' | null;
}

interface QuestionnaireContextType {
  state: QuestionnaireState;
  
  // 基本資料操作
  setChildInfo: (info: ChildInfo) => void;
  setAgeGroup: (ageGroup: AgeGroup) => void;
  
  // 問卷回答操作
  setAnswer: (questionId: string, score: number) => void;
  getAnswer: (questionId: string) => number | undefined;
  
  // 評分計算
  calculateScores: () => void;
  
  // 評估結論
  setAssessmentResult: (result: QuestionnaireState['assessmentResult']) => void;
  setTherapyRecommendation: (recommendation: 'regular' | 'followup' | 'referral') => void;
  
  // 重置
  reset: () => void;
}

const QuestionnaireContext = createContext<QuestionnaireContextType | undefined>(undefined);

const initialState: QuestionnaireState = {
  childInfo: null,
  ageGroup: null,
  answers: new Map(),
  areaScores: null,
  assessmentResult: null,
  therapyRecommendation: null,
};

export function QuestionnaireProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<QuestionnaireState>(initialState);

  const setChildInfo = useCallback((info: ChildInfo) => {
    setState((prev) => ({ ...prev, childInfo: info }));
  }, []);

  const setAgeGroup = useCallback((ageGroup: AgeGroup) => {
    setState((prev) => ({ ...prev, ageGroup }));
  }, []);

  const setAnswer = useCallback((questionId: string, score: number) => {
    setState((prev) => {
      const newAnswers = new Map(prev.answers);
      newAnswers.set(questionId, { questionId, score });
      return { ...prev, answers: newAnswers };
    });
  }, []);

  const getAnswer = useCallback((questionId: string): number | undefined => {
    return state.answers.get(questionId)?.score;
  }, [state.answers]);

  const calculateScores = useCallback(() => {
    // 這個函數會在實際計算時實現
    // 目前只是佔位符
  }, []);

  const setAssessmentResult = useCallback((result: QuestionnaireState['assessmentResult']) => {
    setState((prev) => ({ ...prev, assessmentResult: result }));
  }, []);

  const setTherapyRecommendation = useCallback((recommendation: 'regular' | 'followup' | 'referral') => {
    setState((prev) => ({ ...prev, therapyRecommendation: recommendation }));
  }, []);

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  const value: QuestionnaireContextType = {
    state,
    setChildInfo,
    setAgeGroup,
    setAnswer,
    getAnswer,
    calculateScores,
    setAssessmentResult,
    setTherapyRecommendation,
    reset,
  };

  return (
    <QuestionnaireContext.Provider value={value}>
      {children}
    </QuestionnaireContext.Provider>
  );
}

export function useQuestionnaire() {
  const context = useContext(QuestionnaireContext);
  if (!context) {
    throw new Error('useQuestionnaire must be used within QuestionnaireProvider');
  }
  return context;
}
