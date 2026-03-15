/**
 * 日期選單按鈕元件
 * 支援民國年格式的日期選擇
 */

import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { formatROCDate, parseROCDate } from '@/lib/date-utils';

interface DatePickerButtonProps {
  value: string;
  onChange: (dateStr: string) => void;
  placeholder?: string;
}

export default function DatePickerButton({ value, onChange, placeholder = '選擇日期' }: DatePickerButtonProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(value ? parseROCDate(value) : null);

  // 取得當前年份（民國年）
  const currentDate = new Date();
  const currentROCYear = currentDate.getFullYear() - 1911;

  // 年份範圍：過去 10 年到現在
  const startYear = currentROCYear - 10;
  const endYear = currentROCYear;

  const handleDateChange = (year: number, month: number, day: number) => {
    const date = new Date(year + 1911, month - 1, day);
    setSelectedDate(date);
    onChange(formatROCDate(date));
    setShowPicker(false);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!selectedDate) return;
    const month = parseInt(e.target.value, 10);
    handleDateChange(selectedDate.getFullYear() - 1911, month, selectedDate.getDate());
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!selectedDate) return;
    const year = parseInt(e.target.value, 10);
    handleDateChange(year, selectedDate.getMonth() + 1, selectedDate.getDate());
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!selectedDate) return;
    const day = parseInt(e.target.value, 10);
    handleDateChange(selectedDate.getFullYear() - 1911, selectedDate.getMonth() + 1, day);
  };

  // 計算選定月份的天數
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  const currentYear = selectedDate ? selectedDate.getFullYear() - 1911 : currentROCYear;
  const currentMonth = selectedDate ? selectedDate.getMonth() + 1 : 1;
  const currentDay = selectedDate ? selectedDate.getDate() : 1;
  const daysInMonth = getDaysInMonth(currentYear + 1911, currentMonth);

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowPicker(!showPicker)}
          className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          type="button"
        >
          <Calendar size={20} className="text-blue-600" />
        </button>
        {showPicker && (
          <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50">
            <div className="flex gap-2 mb-4">
              {/* 年份選擇 */}
              <select
                value={currentYear}
                onChange={handleYearChange}
                className="px-2 py-1 border border-gray-300 rounded text-sm"
              >
                {Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>

              {/* 月份選擇 */}
              <select
                value={currentMonth}
                onChange={handleMonthChange}
                className="px-2 py-1 border border-gray-300 rounded text-sm"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                  <option key={month} value={month}>
                    {String(month).padStart(2, '0')}
                  </option>
                ))}
              </select>

              {/* 日期選擇 */}
              <select
                value={currentDay}
                onChange={handleDayChange}
                className="px-2 py-1 border border-gray-300 rounded text-sm"
              >
                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
                  <option key={day} value={day}>
                    {String(day).padStart(2, '0')}
                  </option>
                ))}
              </select>
            </div>

            {/* 日期預覽 */}
            {selectedDate && (
              <div className="text-sm text-gray-600 text-center mb-2">
                民國 {currentYear}-{String(currentMonth).padStart(2, '0')}-{String(currentDay).padStart(2, '0')}
              </div>
            )}

            {/* 確認按鈕 */}
            <button
              onClick={() => setShowPicker(false)}
              className="w-full px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
            >
              確認
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
