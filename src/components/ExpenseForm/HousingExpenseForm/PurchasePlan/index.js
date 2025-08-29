import React from 'react';
import LoanForm from './LoanForm';
import InsuranceForm from './InsuranceForm';
import PropertyTaxForm from './PropertyTaxForm';
import MaintenanceForm from './MaintenanceForm';
import OtherCostForm from './OtherCostForm'; // 新しいOtherCostFormをインポート

/**
 * 住宅購入予定に関する費用入力フォーム全体をレンダリングするコンポーネントです。
 * @param {object} props - コンポーネントのプロパティ
 * @param {object} props.formData - アプリケーション全体のフォームデータ
 * @param {function} props.onFormChange - フォームの変更を処理する関数
 * @param {function} props.onTotalChange - 合計値の変更を通知する関数
 */
function PurchasePlan({ formData, onFormChange, onTotalChange }) {
  return (
    <div className="p-4 border rounded shadow-md bg-gray-50">
      <h4 className="text-lg font-semibold mb-4 text-gray-800">住宅購入予定</h4>
      
      {/* 購入計画の入力フィールドをここに追加 */}
      <div className="mb-4 p-4 border rounded shadow-sm bg-white">
        <h5 className="text-md font-semibold mb-2 text-gray-700">購入計画</h5>
        
        {/* 購入予定価格 */}
        <div className="mb-4">
          <label htmlFor="purchasePrice" className="block text-sm font-bold text-gray-700 mb-1">
            購入予定価格
          </label>
          <div className="flex items-center">
            <input
              id="purchasePrice"
              type="number"
              name="housingData.purchasePlan.purchasePrice"
              value={formData.housingData.purchasePlan.purchasePrice}
              onChange={onFormChange}
              className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-600">万円</span>
          </div>
        </div>
        
        {/* 諸費用（予定） */}
        <div className="mb-4">
          <label htmlFor="miscCost" className="block text-sm font-bold text-gray-700 mb-1">
            諸費用（予定）
          </label>
          <div className="flex items-center">
            <input
              id="miscCost"
              type="number"
              name="housingData.purchasePlan.miscCost"
              value={formData.housingData.purchasePlan.miscCost}
              onChange={onFormChange}
              className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-600">万円</span>
          </div>
        </div>

        {/* 頭金（予定） */}
        <div className="mb-4">
          <label htmlFor="downPayment" className="block text-sm font-bold text-gray-700 mb-1">
            頭金（予定）
          </label>
          <div className="flex items-center">
            <input
              id="downPayment"
              type="number"
              name="housingData.purchasePlan.downPayment"
              value={formData.housingData.purchasePlan.downPayment}
              onChange={onFormChange}
              className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-600">万円</span>
          </div>
        </div>
      </div>
      
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

export default PurchasePlan;
