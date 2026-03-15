/**
 * 基本資料頁面
 * 收集兒童基本資訊：姓名、身份證號、出生日期、施測日期
 */

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { useQuestionnaire } from '@/contexts/QuestionnaireContext';
import { validateTaiwaneseID } from '@/lib/id-validation';
import { calculateAgeGroup } from '@/lib/questionnaire-data';
import DatePickerButton from '@/components/DatePickerButton';
import { parseROCDate, formatROCDate, calculateAgeInMonths } from '@/lib/date-utils';

interface BasicInfoPageProps {
  onNext: () => void;
}

export default function BasicInfoPage({ onNext }: BasicInfoPageProps) {
  const { state, setChildInfo, setAgeGroup } = useQuestionnaire();
  
  const [name, setName] = useState(state.childInfo?.name || '');
  const [idNumber, setIdNumber] = useState(state.childInfo?.idNumber || '');
  const [birthDateROC, setBirthDateROC] = useState('');
  const [birthDateAD, setBirthDateAD] = useState(state.childInfo?.birthDate || '');
  const [testDateROC, setTestDateROC] = useState('');
  const [testDateAD, setTestDateAD] = useState(state.childInfo?.testDate || getTodayAD());
  const [gender, setGender] = useState<'M' | 'F' | ''>(state.childInfo?.gender || '');
  const [eatingTime, setEatingTime] = useState('');
  const [eatingTimeDetail, setEatingTimeDetail] = useState('');
  const [developmentConcern, setDevelopmentConcern] = useState('');
  const [developmentConcernDetail, setDevelopmentConcernDetail] = useState('');
  const [behaviorConcern, setBehaviorConcern] = useState('');
  const [behaviorConcernDetail, setBehaviorConcernDetail] = useState('');
  const [ageMonths, setAgeMonths] = useState<number | null>(null);
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [idError, setIdError] = useState('');

  // 初始化日期顯示
  useEffect(() => {
    if (birthDateAD) {
      setBirthDateROC(convertADtoROC(birthDateAD));
    }
    if (testDateAD) {
      setTestDateROC(convertADtoROC(testDateAD));
    }
  }, []);

  // 取得今天日期 (AD 格式)
  function getTodayAD(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  // AD 年份轉民國
  function convertADtoROC(dateStr: string): string {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    const rocYear = parseInt(year) - 1911;
    return `${rocYear}-${month}-${day}`;
  }

  // 民國轉 AD 年份
  function convertROCtoAD(rocDateStr: string): string {
    if (!rocDateStr) return '';
    const [rocYear, month, day] = rocDateStr.split('-');
    const adYear = parseInt(rocYear) + 1911;
    return `${adYear}-${month}-${day}`;
  }

  // 處理出生日期民國輸入
  const handleBirthDateROCChange = (value: string) => {
    setBirthDateROC(value);
    if (value) {
      const adDate = convertROCtoAD(value);
      setBirthDateAD(adDate);
    }
  };

  // 處理施測日期民國輸入
  const handleTestDateROCChange = (value: string) => {
    setTestDateROC(value);
    if (value) {
      const adDate = convertROCtoAD(value);
      setTestDateAD(adDate);
      // 自動計算年齡
      if (birthDateAD) {
        const birthDate = new Date(birthDateAD);
        const testDate = new Date(adDate);
        const months = calculateAgeInMonths(birthDate, testDate);
        setAgeMonths(months);
      }
    }
  };

  // 處理出生日期變更時計算年齡
  useEffect(() => {
    if (birthDateAD && testDateAD) {
      const birthDate = new Date(birthDateAD);
      const testDate = new Date(testDateAD);
      const months = calculateAgeInMonths(birthDate, testDate);
      setAgeMonths(months);
    }
  }, [birthDateAD, testDateAD]);

  // 驗證身份證號
  const handleIdChange = (value: string) => {
    setIdNumber(value);
    if (value) {
      const validation = validateTaiwaneseID(value);
      if (!validation.isValid) {
        setIdError(validation.error || '');
      } else {
        setIdError('');
      }
    } else {
      setIdError('');
    }
  };

  // 驗證表單
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = '請輸入兒童姓名';
    }

    if (!birthDateAD) {
      newErrors.birthDate = '請輸入出生日期';
    }

    if (!testDateAD) {
      newErrors.testDate = '請輸入施測日期';
    }

    if (idNumber && !validateTaiwaneseID(idNumber).isValid) {
      newErrors.idNumber = '身份證號格式不正確';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 提交表單
  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    const birthDate = new Date(birthDateAD);
    const testDate = new Date(testDateAD);
    const ageGroup = calculateAgeGroup(birthDate, testDate);

    setChildInfo({
      name: name.trim(),
      idNumber: idNumber.trim(),
      birthDate: birthDateAD,
      testDate: testDateAD,
      gender: gender as 'M' | 'F' | undefined,
      eatingTime,
      eatingTimeDetail,
      developmentConcern,
      developmentConcernDetail,
      behaviorConcern,
      behaviorConcernDetail,
    });

    setAgeGroup(ageGroup);
    onNext();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="max-w-2xl mx-auto">
        {/* 標題 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            兒童發展篩檢問卷
          </h1>
          <p className="text-gray-600">基本資料登錄</p>
        </div>

        {/* 主要表單卡片 */}
        <Card className="p-8 shadow-lg border-0">
          <form className="space-y-6">
            {/* 兒童姓名 */}
            <div>
              <Label htmlFor="name" className="text-base font-semibold text-gray-900">
                兒童姓名 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="請輸入兒童姓名"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 text-lg h-12"
              />
              {errors.name && (
                <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  {errors.name}
                </div>
              )}
            </div>

            {/* 身份證號 */}
            <div>
              <Label htmlFor="idNumber" className="text-base font-semibold text-gray-900">
                身份證號
              </Label>
              <Input
                id="idNumber"
                type="text"
                placeholder="例：A123456789（可選）"
                value={idNumber}
                onChange={(e) => handleIdChange(e.target.value)}
                className="mt-2 text-lg h-12"
              />
              {idError && (
                <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  {idError}
                </div>
              )}
              <p className="text-xs text-gray-500 mt-1">
                身份證號為可選欄位，若填寫會進行防誤檢查
              </p>
            </div>

            {/* 性別 */}
            <div>
              <Label className="text-base font-semibold text-gray-900">性別</Label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="M"
                    checked={gender === 'M'}
                    onChange={(e) => setGender(e.target.value as 'M')}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-700">男</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="F"
                    checked={gender === 'F'}
                    onChange={(e) => setGender(e.target.value as 'F')}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-700">女</span>
                </label>
              </div>
            </div>

            {/* 出生日期 */}
            <div>
              <Label htmlFor="birthDate" className="text-base font-semibold text-gray-900">
                出生日期（民國年） <span className="text-red-500">*</span>
              </Label>
              <div className="flex gap-2 items-end mt-2">
                <div className="flex-1">
                  <Input
                    id="birthDate"
                    type="text"
                    placeholder="例：110-03-15"
                    value={birthDateROC}
                    onChange={(e) => handleBirthDateROCChange(e.target.value)}
                    className="text-lg h-12"
                  />
                </div>
                <DatePickerButton
                  value={birthDateROC}
                  onChange={handleBirthDateROCChange}
                  placeholder="選擇日期"
                />
              </div>
              {errors.birthDate && (
                <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  {errors.birthDate}
                </div>
              )}
              <p className="text-xs text-gray-500 mt-1">
                格式：民國年-月-日（例：110-03-15）
              </p>
            </div>

            {/* 施測日期 */}
            <div>
              <Label htmlFor="testDate" className="text-base font-semibold text-gray-900">
                施測日期（民國年） <span className="text-red-500">*</span>
              </Label>
              <div className="flex gap-2 items-end mt-2">
                <div className="flex-1">
                  <Input
                    id="testDate"
                    type="text"
                    placeholder="例：115-03-15"
                    value={testDateROC}
                    onChange={(e) => handleTestDateROCChange(e.target.value)}
                    className="text-lg h-12"
                  />
                </div>
                <DatePickerButton
                  value={testDateROC}
                  onChange={handleTestDateROCChange}
                  placeholder="選擇日期"
                />
              </div>
              {errors.testDate && (
                <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  {errors.testDate}
                </div>
              )}
              <p className="text-xs text-gray-500 mt-1">
                格式：民國年-月-日（預填今天）
              </p>
              {ageMonths !== null && (
                <p className="text-xs text-blue-600 mt-1 font-semibold">
                  年齡：{ageMonths} 個月
                </p>
              )}
            </div>

            {/* 分隔線 */}
            <div className="border-t-2 border-gray-200 my-6"></div>

            {/* 近期照護情形 - 問題 1 */}
            <div>
              <Label className="text-base font-semibold text-gray-900">
                請問孩子吃飯/喝奶是否需要超過半小時？
              </Label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="eatingTime"
                    value="yes"
                    checked={eatingTime === 'yes'}
                    onChange={(e) => setEatingTime(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-700">是</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="eatingTime"
                    value="no"
                    checked={eatingTime === 'no'}
                    onChange={(e) => setEatingTime(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-700">否</span>
                </label>
              </div>
              {eatingTime === 'yes' && (
                <Input
                  type="text"
                  placeholder="請詳細說明"
                  value={eatingTimeDetail}
                  onChange={(e) => setEatingTimeDetail(e.target.value)}
                  className="mt-2 text-sm"
                />
              )}
            </div>

            {/* 近期照護情形 - 問題 2 */}
            <div>
              <Label className="text-base font-semibold text-gray-900">
                請問您覺得孩子在動作、語言、認知、情緒互動或自我照顧的發展有比同齡孩子落後嗎？
              </Label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="developmentConcern"
                    value="yes"
                    checked={developmentConcern === 'yes'}
                    onChange={(e) => setDevelopmentConcern(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-700">是</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="developmentConcern"
                    value="no"
                    checked={developmentConcern === 'no'}
                    onChange={(e) => setDevelopmentConcern(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-700">否</span>
                </label>
              </div>
              {developmentConcern === 'yes' && (
                <Input
                  type="text"
                  placeholder="請詳細說明"
                  value={developmentConcernDetail}
                  onChange={(e) => setDevelopmentConcernDetail(e.target.value)}
                  className="mt-2 text-sm"
                />
              )}
            </div>

            {/* 近期照護情形 - 問題 3 */}
            <div>
              <Label className="text-base font-semibold text-gray-900">
                請問您孩子在家或在校是否有活動會過大、衝動、或注意力短暫等問題？
              </Label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="behaviorConcern"
                    value="yes"
                    checked={behaviorConcern === 'yes'}
                    onChange={(e) => setBehaviorConcern(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-700">是</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="behaviorConcern"
                    value="no"
                    checked={behaviorConcern === 'no'}
                    onChange={(e) => setBehaviorConcern(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-700">否</span>
                </label>
              </div>
              {behaviorConcern === 'yes' && (
                <Input
                  type="text"
                  placeholder="請詳細說明"
                  value={behaviorConcernDetail}
                  onChange={(e) => setBehaviorConcernDetail(e.target.value)}
                  className="mt-2 text-sm"
                />
              )}
            </div>

            {/* 提交按鈕 */}
            <div className="flex gap-4 pt-6">
              <Button
                type="button"
                onClick={handleSubmit}
                className="flex-1 h-12 text-lg bg-blue-600 hover:bg-blue-700 text-white"
              >
                開始問卷
              </Button>
            </div>
          </form>
        </Card>

        {/* 頁尾 */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          劉氏工作室 製作 2026.03.15
        </div>
      </div>
    </div>
  );
}
