import React from 'react';

/**
 * 持ち家の場合の住宅ローン情報を入力するコンポーネントです。
 * @param {object} props - コンポーネントのプロパティ
 * @param {object} props.formData - アプリケーション全体のフォームデータ
 * @param {function} props.onFormChange - フォームの変更を処理する関数
 */
function LoanForm({ formData, onFormChange }) {
  const isVariableRate = formData.housingData.ownedHouse.interestType === '変動金利';

  return (
    <div className="p-4 border rounded shadow-md bg-white mt-4">
      <h4 className="text-lg font-semibold mb-4 text-gray-800">住宅ローン</h4>
      
      {/* ローン残高 */}
      <div className="mb-4">
        <label htmlFor="loanBalance" className="block text-sm font-bold text-gray-700 mb-1">
          ローン残高
        </label>
        <div className="flex items-center">
          <input 
            id="loanBalance"
            type="number"
            name="housingData.ownedHouse.loanBalance"
            value={formData.housingData.ownedHouse.loanBalance}
            onChange={onFormChange}
            className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="ml-2 text-gray-600">万円</span>
        </div>
      </div>

      {/* 返済期間 */}
      <div className="mb-4">
        <label htmlFor="remainingTerm" className="block text-sm font-bold text-gray-700 mb-1">
          返済期間（残り）
        </label>
        <div className="flex items-center">
          <input 
            id="remainingTerm"
            type="number"
            name="housingData.ownedHouse.remainingTerm"
            value={formData.housingData.ownedHouse.remainingTerm}
            onChange={onFormChange}
            className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="ml-2 text-gray-600">年</span>
        </div>
      </div>
      
      {/* 適用金利 */}
      <div className="mb-4">
        <label htmlFor="interestRate" className="block text-sm font-bold text-gray-700 mb-1">
          適用金利
        </label>
        <div className="flex items-center">
          <input 
            id="interestRate"
            type="number"
            name="housingData.ownedHouse.interestRate"
            value={formData.housingData.ownedHouse.interestRate}
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
              name="housingData.ownedHouse.interestType" 
              value="変動金利" 
              checked={formData.housingData.ownedHouse.interestType === '変動金利'} 
              onChange={onFormChange}
              className="form-radio text-blue-600"
            />
            <span className="ml-2 text-gray-700">変動金利</span>
          </label>
          <label className="inline-flex items-center">
            <input 
              type="radio" 
              name="housingData.ownedHouse.interestType" 
              value="固定金利" 
              checked={formData.housingData.ownedHouse.interestType === '固定金利'} 
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
            <label htmlFor="interestChangeCycle" className="block text-sm font-bold text-gray-700 mb-1">
              金利変動サイクル
            </label>
            <div className="flex items-center">
              <input
                id="interestChangeCycle"
                type="number"
                name="housingData.ownedHouse.interestChangeCycle"
                value={formData.housingData.ownedHouse.interestChangeCycle}
                onChange={onFormChange}
                className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-600">年</span>
            </div>
          </div>

          {/* 変動率 */}
          <div className="mb-4">
            <label htmlFor="interestChangeRate" className="block text-sm font-bold text-gray-700 mb-1">
              変動率
            </label>
            <div className="flex items-center">
              <input
                id="interestChangeRate"
                type="number"
                name="housingData.ownedHouse.interestChangeRate"
                value={formData.housingData.ownedHouse.interestChangeRate}
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