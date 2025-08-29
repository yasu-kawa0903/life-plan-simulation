import React from 'react';

/**
 * 住宅購入予定の場合の維持・管理費用を入力するコンポーネントです。
 * @param {object} props - コンポーネントのプロパティ
 * @param {object} props.formData - アプリケーション全体のフォームデータ
 * @param {function} props.onFormChange - フォームの変更を処理する関数
 */
function MaintenanceForm({ formData, onFormChange }) {
  const isMansion = formData.housingData.purchasePlan.dwellingType === 'マンション';

  return (
    <div className="p-4 border rounded shadow-md bg-white mt-4">
      <h4 className="text-lg font-semibold mb-4 text-gray-800">維持・管理費用</h4>
      
      {isMansion && (
        <>
          {/* 修繕積立金 */}
          <div className="mb-4">
            <label htmlFor="maintenanceReserve" className="block text-sm font-bold text-gray-700 mb-1">
              修繕積立金
            </label>
            <div className="flex items-center">
              <input
                id="maintenanceReserve"
                type="number"
                name="housingData.purchasePlan.maintenanceReserve"
                value={formData.housingData.purchasePlan.maintenanceReserve}
                onChange={onFormChange}
                className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-600">万円/月</span>
            </div>
          </div>
          {/* 管理費 */}
          <div className="mb-4">
            <label htmlFor="commonAreaFee" className="block text-sm font-bold text-gray-700 mb-1">
              管理費
            </label>
            <div className="flex items-center">
              <input
                id="commonAreaFee"
                type="number"
                name="housingData.purchasePlan.commonAreaFee"
                value={formData.housingData.purchasePlan.commonAreaFee}
                onChange={onFormChange}
                className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-600">万円/月</span>
            </div>
          </div>
        </>
      )}

      {/* メンテナンス・修繕費 */}
      <h5 className="text-md font-semibold mt-6 mb-2 text-gray-700">メンテナンス・修繕費</h5>
      {[...Array(5)].map((_, index) => (
        <div key={index} className="mb-4 p-3 border rounded bg-gray-50">
          <h6 className="text-sm font-medium mb-2 text-gray-600">メンテナンス・修繕費 {index + 1}</h6>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2 min-w-[70px]">金額</span>
              <input
                id={`repairCostAmount${index}`}
                type="number"
                name={`housingData.purchasePlan.repairCosts[${index}].amount`}
                value={formData.housingData.purchasePlan.repairCosts?.[index]?.amount || ''}
                onChange={onFormChange}
                className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-600">万円</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2 min-w-[70px]">支払サイクル</span>
              <input
                id={`repairCostCycle${index}`}
                type="number"
                name={`housingData.purchasePlan.repairCosts[${index}].cycle`}
                value={formData.housingData.purchasePlan.repairCosts?.[index]?.cycle || ''}
                onChange={onFormChange}
                className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-600">年</span>
            </div>
          </div>
        </div>
      ))}
      
      {/* その他の維持・管理費 */}
      <h5 className="text-md font-semibold mt-6 mb-2 text-gray-700">その他の維持・管理費</h5>
      {[...Array(5)].map((_, index) => (
        <div key={index} className="mb-4 p-3 border rounded bg-gray-50">
          <h6 className="text-sm font-medium mb-2 text-gray-600">その他の維持・管理費 {index + 1}</h6>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2 min-w-[70px]">金額</span>
              <input
                id={`otherMaintenanceAmount${index}`}
                type="number"
                name={`housingData.purchasePlan.otherMaintenanceCosts[${index}].amount`}
                value={formData.housingData.purchasePlan.otherMaintenanceCosts?.[index]?.amount || ''}
                onChange={onFormChange}
                className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-600">万円</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2 min-w-[70px]">支払サイクル</span>
              <input
                id={`otherMaintenanceCycle${index}`}
                type="number"
                name={`housingData.purchasePlan.otherMaintenanceCosts[${index}].cycle`}
                value={formData.housingData.purchasePlan.otherMaintenanceCosts?.[index]?.cycle || ''}
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

export default MaintenanceForm;
