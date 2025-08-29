import React from 'react';

/**
 * 住宅購入予定の場合のローン情報を入力するコンポーネントです。
 * @param {object} props - コンポーネントのプロパティ
 * @param {object} props.formData - アプリケーション全体のフォームデータ
 * @param {function} props.onFormChange - フォームの変更を処理する関数
 */
function LoanForm({ formData, onFormChange }) {
  const isVariableRate = formData.housingData.purchasePlan.loanInterestType === '変動金利';

  return (
    <div className="p-4 border rounded shadow-md bg-white mt-4">
      <h4 className="text-lg font-semibold mb-4 text-gray-800">住宅ローン</h4>
      
      {/* 借り入れ予定額 */}
      <div className="mb-4">
        <label htmlFor="loanAmount" className="block text-sm font-bold text-gray-700 mb-1">
          借り入れ予定額
        </label>
        <div className="flex items-center">
          <input
            id="loanAmount"
            type="number"
            name="housingData.purchasePlan.loanAmount"
            value={formData.housingData.purchasePlan.loanAmount}
            onChange={onFormChange}
            className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="ml-2 text-gray-600">万円</span>
        </div>
      </div>

      {/* 返済期間 */}
      <div className="mb-4">
        <label htmlFor="repaymentTerm" className="block text-sm font-bold text-gray-700 mb-1">
          返済期間
        </label>
        <div className="flex items-center">
          <input
            id="repaymentTerm"
            type="number"
            name="housingData.purchasePlan.repaymentTerm"
            value={formData.housingData.purchasePlan.repaymentTerm}
            onChange={onFormChange}
            className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="ml-2 text-gray-600">年</span>
        </div>
      </div>
      
      {/* 適用金利 */}
      <div className="mb-4">
        <label htmlFor="loanInterestRate" className="block text-sm font-bold text-gray-700 mb-1">
          適用金利
        </label>
        <div className="flex items-center">
          <input
            id="loanInterestRate"
            type="number"
            name="housingData.purchasePlan.loanInterestRate"
            value={formData.housingData.purchasePlan.loanInterestRate}
            onChange={onFormChange}
            className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="ml-2 text-gray-600">%</span>
        </div>
      </div>

      {/* 金利区分 */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">金利区分</label>
        <div className="flex space-x-4">
          <label className="inline-flex items-center">
            <input 
              type="radio" 
              name="housingData.purchasePlan.loanInterestType" 
              value="変動金利" 
              checked={formData.housingData.purchasePlan.loanInterestType === '変動金利'} 
              onChange={onFormChange}
              className="form-radio text-blue-600"
            />
            <span className="ml-2 text-gray-700">変動金利</span>
          </label>
          <label className="inline-flex items-center">
            <input 
              type="radio" 
              name="housingData.purchasePlan.loanInterestType" 
              value="固定金利" 
              checked={formData.housingData.purchasePlan.loanInterestType === '固定金利'} 
              onChange={onFormChange}
              className="form-radio text-blue-600"
            />
            <span className="ml-2 text-gray-700">固定金利</span>
          </label>
        </div>
      </div>
      
      {/* 変動金利の場合のみ表示 */}
      {isVariableRate && (
        <>
          {/* 金利変動サイクル */}
          <div className="mb-4">
            <label htmlFor="loanInterestChangeCycle" className="block text-sm font-bold text-gray-700 mb-1">
              金利変動サイクル
            </label>
            <div className="flex items-center">
              <input
                id="loanInterestChangeCycle"
                type="number"
                name="housingData.purchasePlan.interestChangeCycle"
                value={formData.housingData.purchasePlan.interestChangeCycle}
                onChange={onFormChange}
                className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-600">年</span>
            </div>
          </div>

          {/* 変動率 */}
          <div className="mb-4">
            <label htmlFor="loanInterestChangeRate" className="block text-sm font-bold text-gray-700 mb-1">
              変動率
            </label>
            <div className="flex items-center">
              <input
                id="loanInterestChangeRate"
                type="number"
                name="housingData.purchasePlan.interestChangeRate"
                value={formData.housingData.purchasePlan.interestChangeRate}
                onChange={onFormChange}
                className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-600">%</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default LoanForm;
