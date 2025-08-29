import React from 'react';

/**
 * 住宅購入予定の場合のその他の費用を入力するコンポーネントです。
 * @param {object} props - コンポーネントのプロパティ
 * @param {object} props.formData - アプリケーション全体のフォームデータ
 * @param {function} props.onFormChange - フォームの変更を処理する関数
 */
function OtherCostForm({ formData, onFormChange }) {
  return (
    <div className="p-4 border rounded shadow-md bg-white mt-4">
      <h4 className="text-lg font-semibold mb-4 text-gray-800">その他の費用</h4>
      
      {[...Array(5)].map((_, index) => (
        <div key={index} className="mb-4 p-3 border rounded bg-gray-50">
          <h6 className="text-sm font-medium mb-2 text-gray-600">その他の費用 {index + 1}</h6>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2 min-w-[70px]">金額</span>
              <input
                id={`otherCostAmount${index}`}
                type="number"
                name={`housingData.purchasePlan.otherCosts[${index}].amount`}
                value={formData.housingData.purchasePlan.otherCosts?.[index]?.amount || ''}
                onChange={onFormChange}
                className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-600">万円</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2 min-w-[70px]">支払サイクル</span>
              <input
                id={`otherCostCycle${index}`}
                type="number"
                name={`housingData.purchasePlan.otherCosts[${index}].cycle`}
                value={formData.housingData.purchasePlan.otherCosts?.[index]?.cycle || ''}
                onChange={onFormChange}
                className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-600">年</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OtherCostForm;
