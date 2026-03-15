/**
 * PDF 匯出工具
 * 使用 jsPDF 與 html2canvas 將評估結果匯出為 PDF
 */

import { ChildInfo } from '@/contexts/QuestionnaireContext';
import { AgeGroup } from '@/lib/questionnaire-data';

interface ExportData {
  childInfo: ChildInfo;
  ageGroup: AgeGroup;
  areaScores: Record<string, {
    name: string;
    totalScore: number;
    maxScore: number;
    cutoff: number;
    isPass: boolean;
    isMaxScore: boolean;
  }>;
  assessmentResult: {
    allPass: boolean;
    allMaxScore: boolean;
    hasAbnormal: boolean;
    partialPass: boolean;
  };
  therapyRecommendation: 'regular' | 'followup' | 'referral' | null;
}

/**
 * 匯出評估結果為 PDF
 * 檔名格式：{兒童姓名}_{施測日期}.pdf
 */
export async function exportToPDF(data: ExportData): Promise<void> {
  try {
    // 動態導入 jsPDF 與 html2canvas
    const { jsPDF } = await import('jspdf');
    const html2canvas = (await import('html2canvas')).default;

    // 建立 HTML 內容
    const htmlContent = generateHTMLContent(data);

    // 建立臨時容器
    const container = document.createElement('div');
    container.innerHTML = htmlContent;
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.width = '1200px';
    container.style.backgroundColor = '#ffffff';
    document.body.appendChild(container);

    // 轉換為 Canvas
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
    });

    // 建立 PDF
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const imgWidth = 210; // A4 寬度
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    // 分頁處理
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= 297; // A4 高度

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= 297;
    }

    // 生成檔名
    const fileName = `${data.childInfo.name}_${data.childInfo.testDate}.pdf`;

    // 下載 PDF
    pdf.save(fileName);

    // 清理臨時容器
    document.body.removeChild(container);
  } catch (error) {
    console.error('PDF 匯出失敗:', error);
    throw new Error('PDF 匯出失敗，請稍後重試');
  }
}

/**
 * 生成 PDF 內容的 HTML
 */
function generateHTMLContent(data: ExportData): string {
  const { childInfo, ageGroup, areaScores, assessmentResult, therapyRecommendation } = data;

  // 轉換日期格式
  const birthDate = new Date(childInfo.birthDate);
  const testDate = new Date(childInfo.testDate);
  const birthDateStr = `${birthDate.getFullYear()}-${String(birthDate.getMonth() + 1).padStart(2, '0')}-${String(birthDate.getDate()).padStart(2, '0')}`;
  const testDateStr = `${testDate.getFullYear()}-${String(testDate.getMonth() + 1).padStart(2, '0')}-${String(testDate.getDate()).padStart(2, '0')}`;

  // 評估結論文字
  let assessmentText = '';
  if (assessmentResult.allMaxScore) {
    assessmentText = '全部發展面向均達滿分';
  } else if (assessmentResult.partialPass) {
    assessmentText = '任一發展面向通過，但未達滿分';
  } else if (assessmentResult.hasAbnormal) {
    assessmentText = '任一發展面向異常';
  }

  // 治療建議文字
  let therapyText = '';
  switch (therapyRecommendation) {
    case 'regular':
      therapyText = '定期追蹤';
      break;
    case 'followup':
      therapyText = '回診追蹤';
      break;
    case 'referral':
      therapyText = '需轉介';
      break;
    default:
      therapyText = '未選擇';
  }

  // 評分表格行
  const scoresTableRows = Object.entries(areaScores)
    .map(([_, score]: [string, any]) => `
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${score.name}</td>
        <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${score.totalScore}</td>
        <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${score.maxScore}</td>
        <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">≥ ${score.cutoff}</td>
        <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">
          ${score.isMaxScore ? '滿分' : score.isPass ? '通過' : '不通過'}
        </td>
      </tr>
    `)
    .join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          font-family: 'Microsoft YaHei', Arial, sans-serif;
          margin: 0;
          padding: 20px;
          line-height: 1.6;
          color: #333;
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
          border-bottom: 3px solid #0066cc;
          padding-bottom: 20px;
        }
        .header h1 {
          margin: 0;
          color: #0066cc;
          font-size: 28px;
        }
        .header p {
          margin: 5px 0;
          color: #666;
        }
        .section {
          margin-bottom: 30px;
        }
        .section-title {
          font-size: 18px;
          font-weight: bold;
          color: #0066cc;
          margin-bottom: 15px;
          border-left: 4px solid #0066cc;
          padding-left: 10px;
        }
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-bottom: 20px;
        }
        .info-item {
          background: #f5f5f5;
          padding: 10px;
          border-radius: 4px;
        }
        .info-label {
          font-weight: bold;
          color: #0066cc;
          font-size: 12px;
        }
        .info-value {
          font-size: 14px;
          color: #333;
          margin-top: 5px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        th {
          background: #0066cc;
          color: white;
          padding: 10px;
          text-align: left;
          font-weight: bold;
        }
        td {
          border: 1px solid #ddd;
          padding: 8px;
        }
        .result-box {
          background: #e8f2ff;
          border-left: 4px solid #0066cc;
          padding: 15px;
          margin-bottom: 15px;
          border-radius: 4px;
        }
        .result-box p {
          margin: 0;
          color: #333;
        }
        .footer {
          text-align: center;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #ddd;
          color: #999;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>兒童發展篩檢問卷評估報告</h1>
        <p>生成日期：${new Date().toLocaleDateString('zh-TW')}</p>
      </div>

      <div class="section">
        <div class="section-title">基本資料</div>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">兒童姓名</div>
            <div class="info-value">${childInfo.name}</div>
          </div>
          <div class="info-item">
            <div class="info-label">性別</div>
            <div class="info-value">${childInfo.gender === 'M' ? '男' : childInfo.gender === 'F' ? '女' : '未填'}</div>
          </div>
          <div class="info-item">
            <div class="info-label">出生日期</div>
            <div class="info-value">${birthDateStr}</div>
          </div>
          <div class="info-item">
            <div class="info-label">施測日期</div>
            <div class="info-value">${testDateStr}</div>
          </div>
          <div class="info-item">
            <div class="info-label">身份證號</div>
            <div class="info-value">${childInfo.idNumber || '未填'}</div>
          </div>
          <div class="info-item">
            <div class="info-label">年齡層</div>
            <div class="info-value">${ageGroup} 個月</div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">各領域評分</div>
        <table>
          <thead>
            <tr>
              <th>發展領域</th>
              <th>得分</th>
              <th>滿分</th>
              <th>通過標準</th>
              <th>狀態</th>
            </tr>
          </thead>
          <tbody>
            ${scoresTableRows}
          </tbody>
        </table>
      </div>

      <div class="section">
        <div class="section-title">評估結論</div>
        <div class="result-box">
          <p><strong>${assessmentText}</strong></p>
        </div>
      </div>

      <div class="section">
        <div class="section-title">治療建議</div>
        <div class="result-box">
          <p><strong>${therapyText}</strong></p>
        </div>
      </div>

      <div class="footer">
        <p>劉氏工作室 製作 2026.03.15</p>
        <p>本報告僅供參考，具體診斷與治療建議請諮詢專業醫療人員</p>
      </div>
    </body>
    </html>
  `;
}
