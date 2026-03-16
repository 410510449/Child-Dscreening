/**
 * 問卷區塊元件
 * 用於顯示發展領域的問題與評分選項
 */

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Question } from '@/lib/questionnaire-data';
import { useQuestionnaire } from '@/contexts/QuestionnaireContext';

interface QuestionnaireSectionProps {
  areaName: string;
  questions: Question[];
  maxScore: number;
  onScoresChange?: (scores: Record<string, number>) => void;
}

export default function QuestionnaireSection({
  areaName,
  questions,
  maxScore,
  onScoresChange,
}: QuestionnaireSectionProps) {
  const { getAnswer, setAnswer } = useQuestionnaire();

  // 生成評分選項（0 到 maxScore）
  const scoreOptions = Array.from({ length: maxScore + 1 }, (_, i) => i);

  const handleScoreSelect = (questionId: string, score: number) => {
    setAnswer(questionId, score);
    
    // 通知父元件評分已變更
    if (onScoresChange) {
      const scores: Record<string, number> = {};
      questions.forEach((q) => {
        const answer = getAnswer(q.id);
        if (answer !== undefined) {
          scores[q.id] = answer;
        }
      });
      scores[questionId] = score;
      onScoresChange(scores);
    }
  };

  return (
    <div className="space-y-6">
      {/* 區塊標題 */}
      <div className="border-b-2 border-blue-600 pb-3">
        <h2 className="text-2xl font-bold text-gray-900">{areaName}</h2>
      </div>

      {/* 問題列表 */}
      <div className="space-y-6">
        {questions.map((question) => {
          const selectedScore = getAnswer(question.id);
          
          return (
            <Card key={question.id} className="p-6 border-l-4 border-l-blue-600">
              {/* 問題編號與描述 */}
              <div className="mb-4">
                <div className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm flex-shrink-0">
                    {question.number}
                  </span>
                  <div className="flex-1">
                    <p className="text-base font-semibold text-gray-900 leading-relaxed">
                      {question.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* 評分選項 */}
              <div className="mt-6 space-y-3">
                <div className="flex gap-2 flex-wrap">
                  {scoreOptions.map((score: number) => (
                    <Button
                      key={`${question.id}-${score}`}
                      onClick={() => handleScoreSelect(question.id, score)}
                      variant={selectedScore === score ? 'default' : 'outline'}
                      className={`min-w-20 h-10 font-semibold transition-all ${
                        selectedScore === score
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-blue-600'
                      }`}
                    >
                      {score}
                    </Button>
                  ))}
                </div>
              </div>

              {/* 評分說明 */}
              <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div className="bg-green-50 p-3 rounded border border-green-200">
                  <p className="font-semibold text-green-900 mb-1">通過標準：</p>
                  <p className="text-green-800 whitespace-pre-wrap text-xs leading-relaxed">
                    {question.passStandard}
                  </p>
                </div>
                <div className="bg-red-50 p-3 rounded border border-red-200">
                  <p className="font-semibold text-red-900 mb-1">不通過標準：</p>
                  <p className="text-red-800 whitespace-pre-wrap text-xs leading-relaxed">
                    {question.failStandard}
                  </p>
                </div>
              </div>

              {/* 已選分數提示 */}
              {selectedScore !== undefined && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
                  <p className="text-blue-900 font-semibold">
                    已選分數：<span className="text-lg">{selectedScore}</span>
                  </p>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
