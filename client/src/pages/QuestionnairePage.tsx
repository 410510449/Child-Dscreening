/**
 * 問卷頁面容器
 * 顯示特定發展領域的問題
 */

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import QuestionnaireSection from '@/components/QuestionnaireSection';
import { useQuestionnaire } from '@/contexts/QuestionnaireContext';
import { getAgeGroupData, DevelopmentArea } from '@/lib/questionnaire-data';

interface QuestionnairePageProps {
  area: DevelopmentArea;
  onScoresCalculated?: (scores: Record<string, number>) => void;
}

const areaNames: Record<DevelopmentArea, string> = {
  gross: '粗大動作',
  fine: '精細動作',
  cognitive: '認知語言',
  social: '社會發展',
};

export default function QuestionnairePage({
  area,
  onScoresCalculated,
}: QuestionnairePageProps) {
  const { state } = useQuestionnaire();
  const [areaData, setAreaData] = useState<any>(null);

  useEffect(() => {
    if (state.ageGroup) {
      const ageData = getAgeGroupData(state.ageGroup);
      setAreaData(ageData.areas[area]);
    }
  }, [state.ageGroup, area]);

  if (!areaData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 text-center">
            <p className="text-gray-600">載入中...</p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* 頁面標題 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {areaNames[area]}
          </h1>
          <p className="text-gray-600">
            年齡層：{state.ageGroup ? `${state.ageGroup} 個月` : '未知'}
          </p>
        </div>

        {/* 問卷內容 */}
        <Card className="p-8 shadow-lg border-0">
          <QuestionnaireSection
            areaName={areaNames[area]}
            questions={areaData.questions}
            maxScore={areaData.maxScore}
            onScoresChange={onScoresCalculated}
          />
        </Card>

        {/* 小計資訊 */}
        <Card className="mt-6 p-6 bg-blue-50 border-l-4 border-l-blue-600">
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">通過標準：</span> 總分 ≥ {areaData.cutoffPass}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">不通過標準：</span> 總分 &lt; {areaData.cutoffPass}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">最高分數：</span> {areaData.maxScore}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
