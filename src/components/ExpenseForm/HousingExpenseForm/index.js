import React, { useState } from 'react';
import OwnedHouse from './OwnedHouse';
import RentalHouseForm from './RentalHouseForm';
import PurchasePlan from './PurchasePlan';

/**
 * 住宅費用に関するすべてのフォームを統合するコンポーネントです。
 * ラジオボタンで賃貸、持ち家、住宅購入予定のいずれかを選択して表示します。
 * @param {object} props - コンポーネントのプロパティ
 * @param {object} props.formData - アプリケーション全体のフォームデータ
 * @param {function} props.onFormChange - フォームの変更を処理する関数
 * @param {function} props.onTotalChange - 合計値の変更を通知する関数
 */
function HousingExpenseForm({ formData, onFormChange, onTotalChange }) {
  // formData.housingData.housingType を初期値として使用し、状態を管理
  const [currentSubTab, setCurrentSubTab] = useState(formData.housingData.housingType);

  // ラジオボタンの変更を処理
  const handleSubTabChange = (e) => {
    const { value } = e.target;
    setCurrentSubTab(value);
    // onFormChange を呼び出して、App.js の formData も更新
    onFormChange({ target: { name: 'housingData.housingType', value: value } });
  };

  const renderContent = () => {
    switch (currentSubTab) {
      case '持ち家':
        return <OwnedHouse formData={formData} onFormChange={onFormChange} onTotalChange={onTotalChange} />;
      case '賃貸':
        return <RentalHouseForm formData={formData} onFormChange={onFormChange} onTotalChange={onTotalChange} />;
      case '住宅購入予定':
        return <PurchasePlan formData={formData} onFormChange={onFormChange} onTotalChange={onTotalChange} />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h3 className="text-xl font-bold mb-4 text-gray-800">住宅費</h3>
      <div className="flex space-x-4 mb-6">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input 
            type="radio" 
            name="housingType" 
            value="持ち家" 
            checked={currentSubTab === '持ち家'} 
            onChange={handleSubTabChange} 
            className="form-radio text-blue-600"
          />
          <span className="text-gray-700">持ち家（現在）</span>
        </label>
        <label className="flex items-center space-x-2 cursor-pointer">
          <input 
            type="radio" 
            name="housingType" 
            value="賃貸" 
            checked={currentSubTab === '賃貸'} 
            onChange={handleSubTabChange} 
            className="form-radio text-blue-600"
          />
          <span className="text-gray-700">賃貸（現在）</span>
        </label>
        <label className="flex items-center space-x-2 cursor-pointer">
          <input 
            type="radio" 
            name="housingType" 
            value="住宅購入予定" 
            checked={currentSubTab === '住宅購入予定'} 
            onChange={handleSubTabChange} 
            className="form-radio text-blue-600"
          />
          <span className="text-gray-700">住宅購入予定</span>
        </label>
      </div>
      <div className="p-4 border rounded shadow-md bg-gray-50">
        {renderContent()}
      </div>
    </div>
  );
}

export default HousingExpenseForm;