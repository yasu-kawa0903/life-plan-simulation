import React from 'react';

/**
 * 持ち家の場合の保険費用を入力するコンポーネントです。
 * @param {object} props - コンポーネントのプロパティ
 * @param {object} props.formData - アプリケーション全体のフォームデータ
 * @param {function} props.onFormChange - フォームの変更を処理する関数
 */
function InsuranceForm({ formData, onFormChange }) {
  return (
    <div className="p-4 border rounded shadow-md bg-white mt-4">
      <h4 className="text-lg font-semibold mb-4 text-gray-800">保険費用</h4>
      
      {/* 火災保険 */}
      <div className="mb-4">
        <label className="block text-sm font-bold text-gray-700 mb-1">
          火災保険
        </label>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center">
            <input 
              id="fireInsuranceAmount"
              type="number"
              name="housingData.ownedHouse.fireInsurance.amount"
              value={formData.housingData.ownedHouse.fireInsurance.amount}
              onChange={onFormChange}
              className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-600">万円</span>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-2">支払サイクル</span>
            <input
              id="fireInsuranceCycle"
              type="number"
              name="housingData.ownedHouse.fireInsurance.cycle"
              value={formData.housingData.ownedHouse.fireInsurance.cycle}
              onChange={onFormChange}
              className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-600">年</span>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-2">次回支払</span>
            <input
              id="fireInsuranceNextPayment"
              type="number"
              name="housingData.ownedHouse.fireInsurance.nextPaymentAge"
              value={formData.housingData.ownedHouse.fireInsurance.nextPaymentAge}
              onChange={onFormChange}
              className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-600">歳</span>
          </div>
        </div>
      </div>
      
      {/* 地震保険 */}
      <div className="mb-4">
        <label className="block text-sm font-bold text-gray-700 mb-1">
          地震保険
        </label>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center">
            <input
              id="earthquakeInsuranceAmount"
              type="number"
              name="housingData.ownedHouse.earthquakeInsurance.amount"
              value={formData.housingData.ownedHouse.earthquakeInsurance.amount}
              onChange={onFormChange}
              className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-600">万円</span>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-2">支払サイクル</span>
            <input
              id="earthquakeInsuranceCycle"
              type="number"
              name="housingData.ownedHouse.earthquakeInsurance.cycle"
              value={formData.housingData.ownedHouse.earthquakeInsurance.cycle}
              onChange={onFormChange}
              className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-600">年</span>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-2">次回支払</span>
            <input
              id="earthquakeInsuranceNextPayment"
              type="number"
              name="housingData.ownedHouse.earthquakeInsurance.nextPaymentAge"
              value={formData.housingData.ownedHouse.earthquakeInsurance.nextPaymentAge}
              onChange={onFormChange}
              className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-600">歳</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InsuranceForm;
