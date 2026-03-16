/**
 * 基本資料登錄頁面
 * 收集兒童基本資訊：姓名、身份證號、出生日期、施測日期、三個照護問題
 */

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { useQuestionnaire } from '@/contexts/QuestionnaireContext';
import { validateTaiwaneseID } from '@/lib/id-validation';
import { getAgeGroupByMonths, calculateAgeInMonths, formatAge } from '@/lib/questionnaire-data';
import DatePickerButton from '@/components/DatePickerButton';

interface BasicInfoPageProps {
  onNext: () => void;
}

export default function BasicInfoPage({ onNext }: BasicInfoPageProps) {
  const { state, setChildInfo, setAgeGroup } = useQuestionnaire();
  
  const [name, setName] = useState(state.childInfo?.name || '');
  const [idNumber, setIdNumber] = useState(state.childInfo?.idNumber || '');
  const [birthDateROC, setBirthDateROC] = useState(state.childInfo?.birthDate || '');
  const [testDateROC, setTestDateROC] = useState(state.childInfo?.testDate || getTodayROC());
  const [gender, setGender] = useState<'M' | 'F' | ''>(state.childInfo?.gender || '');
  
  // 三個照護問題
  const [eatingTime, setEatingTime] = useState(state.childInfo?.eatingTime || '');
  const [developmentConcern, setDevelopmentConcern] = useState(state.childInfo?.developmentConcern || '');
  const [behaviorConcern, setBehaviorConcern] = useState(state.childInfo?.behaviorConcern || '');
  
  const [ageMonths, setAgeMonths] = useState<number | null>(null);
  const [ageDisplay, setAgeDisplay] = useState<string>('');
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [idError, setIdError] = useState('');

  // 取得今天日期 (民國年格式)
  function getTodayROC(): string {
    const today = new Date();
    const year = today.getFullYear() - 1911;
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // 計算年齡
  useEffect(() => {
    if (birthDateROC && testDateROC) {
      try {
        const months = calculateAgeInMonths(birthDateROC, testDateROC);
        setAgeMonths(months);
        setAgeDisplay(formatAge(months));
      } catch (e) {
        setAgeMonths(null);
        setAgeDisplay('');
      }
    }
  }, [birthDateROC, testDateROC]);

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

    if (!birthDateROC) {
      newErrors.birthDate = '請輸入出生日期';
    }

    if (!testDateROC) {
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

    if (!ageMonths) {
      alert('無法計算年齡，請檢查日期');
      return;
    }

    const ageGroup = getAgeGroupByMonths(ageMonths);

    setChildInfo({
      name: name.trim(),
      idNumber: idNumber.trim(),
      birthDate: birthDateROC,
      testDate: testDateROC,
      gender: gender as 'M' | 'F' | undefined,
      eatingTime,
      developmentConcern,
      behaviorConcern,
      ageInMonths: ageMonths,
    });

    if (ageGroup) {
      setAgeGroup(ageGroup);
    }

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
                    onChange={(e) => setBirthDateROC(e.target.value)}
                    className="text-lg h-12"
                  />
                </div>
                <DatePickerButton
                  value={birthDateROC}
                  onChange={setBirthDateROC}
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
                    onChange={(e) => setTestDateROC(e.target.value)}
                    className="text-lg h-12"
                  />
                </div>
                <DatePickerButton
                  value={testDateROC}
                  onChange={setTestDateROC}
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
                格式：民國年-月-日（例：115-03-15）
              </p>
            </div>

            {/* 年齡顯示 */}
            {ageDisplay && (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-lg font-semibold text-blue-900">
                  計算年齡：{ageDisplay}
                </p>
              </div>
            )}

            {/* 三個照護問題 */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">近期照護情形</h3>

              {/* 問題 1 */}
              <div className="mb-4">
                <Label className="text-base font-semibold text-gray-900">
                  吃飯/喝奶是否超過半小時？
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
              </div>

              {/* 問題 2 */}
              <div className="mb-4">
                <Label className="text-base font-semibold text-gray-900">
                  發展是否比同齡慢？
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
              </div>

              {/* 問題 3 */}
              <div className="mb-4">
                <Label className="text-base font-semibold text-gray-900">
                  是否有活動量過大、衝動、注意力短暫？
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
              </div>
            </div>

            {/* 提交按鈕 */}
            <div className="flex gap-4 pt-6">
              <Button
                type="button"
                onClick={handleSubmit}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 text-lg"
              >
                繼續評量
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
