import React from 'react';
import LoanForm from './LoanForm';
import InsuranceForm from './InsuranceForm';
import PropertyTaxForm from './PropertyTaxForm';
import MaintenanceForm from './MaintenanceForm';
import OtherCostForm from './OtherCostForm'; // 新しいOtherCostFormをインポート

/**
 * 持ち家に関する費用入力フォーム全体をレンダリングするコンポーネントです。
 * LoanForm.js、InsuranceForm.js、PropertyTaxForm.js、MaintenanceForm.js、OtherCostForm.jsを統合します。
 * @param {object} props - コンポーネントのプロパティ
 * @param {object} props.formData - アプリケーション全体のフォームデータ
 * @param {function} props.onFormChange - フォームの変更を処理する関数
 * @param {function} props.onTotalChange - 合計値の変更を通知する関数
 */
function OwnedHouse({ formData, onFormChange, onTotalChange }) {
  // コンポーネントが分割されたため、この関数はここでは使用されません。
  const renderInput = (name, label, unit = '万円', type = 'number') => {
    const parts = name.split('.');
    let value = formData;
    for (const part of parts) {
      if (value) {
        value = value[part];
      } else {
        value = undefined;
        break;
      }
    }
    value = value === undefined || value === null ? '' : value;

    return (
      <div className="flex flex-col mb-4">
        <label className="text-gray-700 text-sm font-bold mb-2">{label}（{unit}）</label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type={type}
          name={name}
          value={value}
          onChange={onFormChange}
        />
      </div>
    );
  };

  return (
    <div className="p-4 border rounded shadow-md bg-gray-50">
      <h4 className="text-lg font-semibold mb-4 text-gray-800">持ち家（現在）</h4>
      
      {/* 住宅ローンフォーム */}
      <LoanForm formData={formData} onFormChange={onFormChange} />

      {/* 保険フォーム */}
      <InsuranceForm formData={formData} onFormChange={onFormChange} />
      
      {/* 固定資産税フォーム */}
      <PropertyTaxForm formData={formData} onFormChange={onFormChange} />

      {/* 維持・管理費フォーム */}
      <MaintenanceForm formData={formData} onFormChange={onFormChange} />

      {/* その他の費用フォーム */}
      <OtherCostForm formData={formData} onFormChange={onFormChange} />
    </div>
  );
}

export default OwnedHouse;