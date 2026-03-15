/**
 * 結果頁面
 * 顯示評估結果、評分、評估結論與治療建議
 */

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle, AlertTriangle, Download } from 'lucide-react';
import { useQuestionnaire } from '@/contexts/QuestionnaireContext';
import { getAgeGroupData } from '@/lib/questionnaire-data';
import { exportToPDF } from '@/lib/pdf-export';

export default function ResultPage() {
  const { state, setAssessmentResult, setTherapyRecommendation } = useQuestionnaire();
  const [areaScores, setAreaScores] = useState<Record<string, any>>({});
  const [assessmentResult, setLocalAssessmentResult] = useState<any>(null);
  const [therapyRecommendation, setLocalTherapyRecommendation] = useState<'regular' | 'followup' | 'referral' | null>(null);

  useEffect(() => {
    if (state.ageGroup && state.childInfo) {
      const ageData = getAgeGroupData(state.ageGroup);
      
      // 計算各領域評分
      const scores: Record<string, any> = {};
      
      ['gross', 'fine', 'cognitive', 'social'].forEach((area) => {
        const areaInfo = ageData.areas[area as keyof typeof ageData.areas];
        let totalScore = 0;
        let answeredCount = 0;
        
        areaInfo.questions.forEach((q) => {
          const answer = state.answers.get(q.id);
          if (answer !== undefined) {
            totalScore += answer.score;
            answeredCount++;
          }
        });
        
        const isPass = totalScore >= areaInfo.cutoffPass;
        const isMaxScore = totalScore === areaInfo.maxScore;
        
        scores[area] = {
          name: areaInfo.name,
          totalScore,
          maxScore: areaInfo.maxScore,
          cutoff: areaInfo.cutoffPass,
          answeredCount,
          totalQuestions: areaInfo.questions.length,
          isPass,
          isMaxScore,
        };
      });
      
      setAreaScores(scores);
      
      // 判定評估結果
      const allPass = Object.values(scores).every((s: any) => s.isPass);
      const allMaxScore = Object.values(scores).every((s: any) => s.isMaxScore);
      const hasAbnormal = Object.values(scores).some((s: any) => !s.isPass);
      
      const result = {
        allPass,
        allMaxScore,
        hasAbnormal,
        partialPass: !allMaxScore && !hasAbnormal,
      };
      
      setLocalAssessmentResult(result);
      setAssessmentResult(result);
    }
  }, [state.ageGroup, state.childInfo, state.answers]);

  const handleTherapyRecommendation = (rec: 'regular' | 'followup' | 'referral') => {
    setLocalTherapyRecommendation(rec);
    setTherapyRecommendation(rec);
  };

  const handleExportPDF = async () => {
    if (!state.childInfo || !state.ageGroup || !assessmentResult || !therapyRecommendation) {
      alert('請先完成所有評估步驟');
      return;
    }

    try {
      await exportToPDF({
        childInfo: state.childInfo,
        ageGroup: state.ageGroup,
        areaScores,
        assessmentResult,
        therapyRecommendation,
      });
      alert('PDF 已成功匯出');
    } catch (error) {
      alert('PDF 匯出失敗，請稍後重試');
      console.error(error);
    }
  };

  if (!state.childInfo || !assessmentResult) {
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
            評估結果量表
          </h1>
          <p className="text-gray-600">
            兒童姓名：{state.childInfo.name}
          </p>
        </div>

        {/* 基本資料卡片 */}
        <Card className="p-6 mb-6 bg-blue-50 border-l-4 border-l-blue-600">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-600 font-semibold">姓名</p>
              <p className="text-gray-900 text-lg font-bold">{state.childInfo.name}</p>
            </div>
            <div>
              <p className="text-gray-600 font-semibold">出生日期</p>
              <p className="text-gray-900">{state.childInfo.birthDate}</p>
            </div>
            <div>
              <p className="text-gray-600 font-semibold">施測日期</p>
              <p className="text-gray-900">{state.childInfo.testDate}</p>
            </div>
            <div>
              <p className="text-gray-600 font-semibold">年齡層</p>
              <p className="text-gray-900">{state.ageGroup} 個月</p>
            </div>
          </div>
        </Card>

        {/* 評分結果表格 */}
        <Card className="p-6 mb-6 overflow-x-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">各領域評分</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left py-3 px-4 font-bold text-gray-900">發展領域</th>
                <th className="text-center py-3 px-4 font-bold text-gray-900">得分</th>
                <th className="text-center py-3 px-4 font-bold text-gray-900">滿分</th>
                <th className="text-center py-3 px-4 font-bold text-gray-900">通過標準</th>
                <th className="text-center py-3 px-4 font-bold text-gray-900">狀態</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(areaScores).map(([key, score]: [string, any]) => (
                <tr key={key} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4 font-semibold text-gray-900">{score.name}</td>
                  <td className="text-center py-3 px-4 text-lg font-bold text-blue-600">
                    {score.totalScore}
                  </td>
                  <td className="text-center py-3 px-4 text-gray-600">{score.maxScore}</td>
                  <td className="text-center py-3 px-4 text-gray-600">≥ {score.cutoff}</td>
                  <td className="text-center py-3 px-4">
                    {score.isMaxScore ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full font-semibold text-xs">
                        <CheckCircle size={14} />
                        滿分
                      </span>
                    ) : score.isPass ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full font-semibold text-xs">
                        <AlertTriangle size={14} />
                        通過
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-800 rounded-full font-semibold text-xs">
                        <AlertCircle size={14} />
                        不通過
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* 評估結論 */}
        <Card className="p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">評估結論</h2>
          <div className="space-y-3">
            <label className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name="assessment"
                value="all-pass"
                checked={assessmentResult.allMaxScore}
                disabled
                className="w-5 h-5 mt-1"
              />
              <div>
                <p className="font-semibold text-gray-900">全部發展面向均達滿分（白色區）</p>
                <p className="text-sm text-gray-600">兒童在所有發展領域均表現優異</p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name="assessment"
                value="partial-pass"
                checked={assessmentResult.partialPass}
                disabled
                className="w-5 h-5 mt-1"
              />
              <div>
                <p className="font-semibold text-gray-900">任一發展面向通過，但未達滿分（淺灰色區）</p>
                <p className="text-sm text-gray-600">兒童在某些領域需要持續觀察與支持</p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name="assessment"
                value="abnormal"
                checked={assessmentResult.hasAbnormal}
                disabled
                className="w-5 h-5 mt-1"
              />
              <div>
                <p className="font-semibold text-gray-900">任一發展面向異常（深灰色區）</p>
                <p className="text-sm text-gray-600">兒童在某個領域可能需要專業評估與介入</p>
              </div>
            </label>
          </div>
        </Card>

        {/* 治療建議 */}
        <Card className="p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">治療建議</h2>
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => handleTherapyRecommendation('regular')}>
              <input
                type="radio"
                name="therapy"
                value="regular"
                checked={therapyRecommendation === 'regular'}
                onChange={() => handleTherapyRecommendation('regular')}
                className="w-5 h-5"
              />
              <div>
                <p className="font-semibold text-gray-900">定期追蹤</p>
                <p className="text-sm text-gray-600">建議定期進行發展評估，持續監測兒童發展進度</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => handleTherapyRecommendation('followup')}>
              <input
                type="radio"
                name="therapy"
                value="followup"
                checked={therapyRecommendation === 'followup'}
                onChange={() => handleTherapyRecommendation('followup')}
                className="w-5 h-5"
              />
              <div>
                <p className="font-semibold text-gray-900">回診追蹤</p>
                <p className="text-sm text-gray-600">建議在一段時間後回診進行複評，評估介入效果</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => handleTherapyRecommendation('referral')}>
              <input
                type="radio"
                name="therapy"
                value="referral"
                checked={therapyRecommendation === 'referral'}
                onChange={() => handleTherapyRecommendation('referral')}
                className="w-5 h-5"
              />
              <div>
                <p className="font-semibold text-gray-900">需轉介</p>
                <p className="text-sm text-gray-600">建議轉介至專科醫師或治療師進行進一步評估與治療</p>
              </div>
            </label>
          </div>
        </Card>

        {/* 匯出按鈕 */}
        <div className="flex gap-4 mb-6">
          <Button
            onClick={handleExportPDF}
            disabled={!therapyRecommendation}
            className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download size={20} />
            匯出 PDF 報告
          </Button>
        </div>
        {!therapyRecommendation && (
          <p className="text-center text-sm text-gray-600 mb-6">
            請先選擇治療建議後，才能匯出 PDF 報告
          </p>
        )}
      </div>
    </div>
  );
}
