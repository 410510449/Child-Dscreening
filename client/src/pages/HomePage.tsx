/**
 * 首頁
 * 提供開始問卷的入口與應用說明
 */

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, BarChart3, FileText } from 'lucide-react';

interface HomePageProps {
  onStart: () => void;
}

export default function HomePage({ onStart }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-50">
      {/* 頂部區域 */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">
            兒童發展篩檢問卷
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            專業的發展評估工具，幫助您了解兒童的發展狀況
          </p>
          <Button
            onClick={onStart}
            size="lg"
            className="bg-white text-blue-600 hover:bg-blue-50 font-bold text-lg px-8 py-6"
          >
            開始問卷
          </Button>
        </div>
      </div>

      {/* 特色介紹 */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* 特色 1 */}
          <Card className="p-8 text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              多年齡層支援
            </h3>
            <p className="text-gray-600">
              涵蓋 6-9 個月、9-12 個月、12-15 個月、5-7 歲等多個年齡層，根據兒童年齡自動選擇適合的評估項目
            </p>
          </Card>

          {/* 特色 2 */}
          <Card className="p-8 text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <BarChart3 className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              四大發展領域
            </h3>
            <p className="text-gray-600">
              評估粗大動作、精細動作、認知語言、社會發展四個關鍵發展領域
            </p>
          </Card>

          {/* 特色 3 */}
          <Card className="p-8 text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              自動評估與報告
            </h3>
            <p className="text-gray-600">
              自動計算評分、判定發展狀況、提供治療建議，並可匯出 PDF 報告
            </p>
          </Card>
        </div>

        {/* 使用說明 */}
        <Card className="p-8 bg-white shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            使用說明
          </h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">輸入基本資料</h3>
                <p className="text-gray-600">
                  填寫兒童姓名、出生日期、施測日期等基本資訊
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">完成四個發展領域的評估</h3>
                <p className="text-gray-600">
                  根據觀察結果，為每個問題選擇相應的評分（0、0.5、1、2）
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">查看評估結果</h3>
                <p className="text-gray-600">
                  系統會自動計算評分、判定發展狀況，並提供治療建議
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">匯出報告</h3>
                <p className="text-gray-600">
                  將評估結果匯出為 PDF 報告，方便保存與分享
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* 頁尾 */}
      <div className="text-center py-8 text-gray-600 text-sm">
        劉氏工作室 製作 2026.03.15
      </div>
    </div>
  );
}
