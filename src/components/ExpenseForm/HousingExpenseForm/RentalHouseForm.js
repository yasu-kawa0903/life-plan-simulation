import React from 'react';

/**
 * 賃貸住宅の場合の費用を入力するコンポーネントです。
 * @param {object} props - コンポーネントのプロパティ
 * @param {object} props.formData - アプリケーション全体のフォームデータ
 * @param {function} props.onFormChange - フォームの変更を処理する関数
 */
function RentalHouseForm({ formData, onFormChange }) {
  return (
    <div className="p-4 border rounded shadow-md bg-white">
      <h4 className="text-lg font-semibold mb-4 text-gray-800">賃貸費用</h4>

      {/* 家賃・共益費 */}
      <div className="mb-4">
        <label htmlFor="rentAndCommonFee" className="block text-sm font-bold text-gray-700 mb-1">
          家賃・共益費
        </label>
        <div className="flex items-center">
          <input
            id="rentAndCommonFee"
            type="number"
            name="housingData.rentalHouse.rentAndCommonFee"
            value={formData.housingData.rentalHouse.rentAndCommonFee}
            onChange={onFormChange}
            className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="ml-2 text-gray-600">万円/月</span>
        </div>
      </div>

      {/* 更新料 */}
      <h5 className="text-md font-semibold mt-6 mb-2 text-gray-700">更新料</h5>
      <div className="mb-4 p-3 border rounded bg-gray-50">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-2 min-w-[70px]">金額</span>
            <input
              id="renewalFeeAmount"
              type="number"
              name="housingData.rentalHouse.renewalFee.amount"
              value={formData.housingData.rentalHouse.renewalFee.amount}
              onChange={onFormChange}
              className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-600">万円</span>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-2 min-w-[70px]">支払サイクル</span>
            <input
              id="renewalFeeCycle"
              type="number"
              name="housingData.rentalHouse.renewalFee.cycle"
              value={formData.housingData.rentalHouse.renewalFee.cycle}
              onChange={onFormChange}
              className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-600">年</span>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-2 min-w-[70px]">次回支払</span>
            <input
              id="renewalFeeNextPayment"
              type="number"
              name="housingData.rentalHouse.renewalFee.nextPaymentAge"
              value={formData.housingData.rentalHouse.renewalFee.nextPaymentAge}
              onChange={onFormChange}
              className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-600">歳</span>
          </div>
        </div>
      </div>

      {/* 引越し費用 */}
      <h5 className="text-md font-semibold mt-6 mb-2 text-gray-700">引越し費用</h5>
      <div className="mb-4 p-3 border rounded bg-gray-50">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-2 min-w-[70px]">金額</span>
            <input
              id="movingCostAmount"
              type="number"
              name="housingData.rentalHouse.movingCost.amount"
              value={formData.housingData.rentalHouse.movingCost.amount}
              onChange={onFormChange}
              className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-600">万円</span>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-2 min-w-[70px]">支払サイクル</span>
            <input
              id="movingCostCycle"
              type="number"
              name="housingData.rentalHouse.movingCost.cycle"
              value={formData.housingData.rentalHouse.movingCost.cycle}
              onChange={onFormChange}
              className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-600">年</span>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-2 min-w-[70px]">次回支払</span>
            <input
              id="movingCostNextPayment"
              type="number"
              name="housingData.rentalHouse.movingCost.nextPaymentAge"
              value={formData.housingData.rentalHouse.movingCost.nextPaymentAge}
              onChange={onFormChange}
              className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-600">歳</span>
          </div>
        </div>
      </div>

      {/* その他の費用 */}
      <h5 className="text-md font-semibold mt-6 mb-2 text-gray-700">その他の費用</h5>
      {[...Array(5)].map((_, index) => (
        <div key={index} className="mb-4 p-3 border rounded bg-gray-50">
          <h6 className="text-sm font-medium mb-2 text-gray-600">その他の費用 {index + 1}</h6>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2 min-w-[70px]">金額</span>
              <input
                id={`otherAmount${index}`}
                type="number"
                name={`housingData.rentalHouse.otherCosts[${index}].amount`}
                value={formData.housingData.rentalHouse.otherCosts?.[index]?.amount || ''}
                onChange={onFormChange}
                className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-600">万円</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2 min-w-[70px]">支払サイクル</span>
              <input
                id={`otherCycle${index}`}
                type="number"
                name={`housingData.rentalHouse.otherCosts[${index}].cycle`}
                value={formData.housingData.rentalHouse.otherCosts?.[index]?.cycle || ''}
                onChange={onFormChange}
                className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-600">年</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2 min-w-[70px]">次回支払</span>
              <input
                id={`otherNextPayment${index}`}
                type="number"
                name={`housingData.rentalHouse.otherCosts[${index}].nextPaymentAge`}
                value={formData.housingData.rentalHouse.otherCosts?.[index]?.nextPaymentAge || ''}
                onChange={onFormChange}
                className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-600">歳</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RentalHouseForm;
