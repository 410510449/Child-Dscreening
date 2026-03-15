/**
 * 導航欄元件
 * 提供在各個頁面之間切換的按鈕
 */

import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';

export type PageType = 'home' | 'info' | 'gross' | 'fine' | 'cognitive' | 'social' | 'result';

interface NavigationBarProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  canGoBack?: boolean;
  canGoNext?: boolean;
}

const pageOrder: PageType[] = ['home', 'info', 'gross', 'fine', 'cognitive', 'social', 'result'];

const pageLabels: Record<PageType, string> = {
  home: '首頁',
  info: '基本資料',
  gross: '粗大動作',
  fine: '精細動作',
  cognitive: '認知語言',
  social: '社會發展',
  result: '結果量表',
};

export default function NavigationBar({
  currentPage,
  onNavigate,
  canGoBack = true,
  canGoNext = true,
}: NavigationBarProps) {
  const currentIndex = pageOrder.indexOf(currentPage);
  const hasBack = currentIndex > 0 && canGoBack;
  const hasNext = currentIndex < pageOrder.length - 1 && canGoNext;

  const goHome = () => onNavigate('home');
  const goPrevious = () => {
    if (hasBack) {
      onNavigate(pageOrder[currentIndex - 1]);
    }
  };
  const goNext = () => {
    if (hasNext) {
      onNavigate(pageOrder[currentIndex + 1]);
    }
  };
  const goFirst = () => onNavigate('info');
  const goLast = () => onNavigate('result');

  return (
    <div className="bg-white border-t border-gray-200 p-4 shadow-lg">
      <div className="max-w-6xl mx-auto">
        {/* 進度指示 */}
        <div className="mb-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            <span className="font-semibold">{pageLabels[currentPage]}</span>
            <span className="mx-2">({currentIndex + 1}/{pageOrder.length})</span>
          </div>
          <div className="flex gap-1">
            {pageOrder.map((page, index) => (
              <div
                key={page}
                className={`h-2 flex-1 rounded-full transition-colors ${
                  index <= currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* 導航按鈕 */}
        <div className="flex gap-2 justify-between items-center flex-wrap">
          {/* 左側按鈕 */}
          <div className="flex gap-2">
            <Button
              onClick={goHome}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Home size={16} />
              首頁
            </Button>
            <Button
              onClick={goPrevious}
              variant="outline"
              size="sm"
              disabled={!hasBack}
              className="flex items-center gap-2"
            >
              <ChevronLeft size={16} />
              上一頁
            </Button>
          </div>

          {/* 快速導航 */}
          <div className="flex gap-1 flex-wrap justify-center">
            {pageOrder.map((page) => (
              <Button
                key={page}
                onClick={() => onNavigate(page)}
                variant={currentPage === page ? 'default' : 'outline'}
                size="sm"
                className={`text-xs px-2 py-1 h-8 ${
                  currentPage === page ? 'bg-blue-600 text-white' : ''
                }`}
              >
                {pageLabels[page]}
              </Button>
            ))}
          </div>

          {/* 右側按鈕 */}
          <div className="flex gap-2">
            <Button
              onClick={goNext}
              variant="outline"
              size="sm"
              disabled={!hasNext}
              className="flex items-center gap-2"
            >
              下一頁
              <ChevronRight size={16} />
            </Button>
            <Button
              onClick={goLast}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              末頁
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
