// src/components/ExpenseForm/HousingExpenseForm/index.js
import React, { useState } from 'react';
import OwnedHouse from './OwnedHouse';
import RentalHouseForm from './RentalHouseForm';
import PurchasePlan from './PurchasePlan';

function HousingExpenseForm({ formData, onFormChange, onTotalChange }) {
  const [currentSubTab, setCurrentSubTab] = useState('owned-house');

  const renderContent = () => {
    switch (currentSubTab) {
      case 'owned-house':
        return <OwnedHouse formData={formData} onFormChange={onFormChange} onTotalChange={onTotalChange} />;
      case 'rental-house':
        return <RentalHouseForm formData={formData} onFormChange={onFormChange} onTotalChange={onTotalChange} />;
      case 'purchase-plan':
        return <PurchasePlan formData={formData} onFormChange={onFormChange} onTotalChange={onTotalChange} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <h3>住宅費</h3>
      <div>
        <button onClick={() => setCurrentSubTab('owned-house')}>持ち家（現在）</button>
        <button onClick={() => setCurrentSubTab('rental-house')}>賃貸（現在）</button>
        <button onClick={() => setCurrentSubTab('purchase-plan')}>住宅購入予定</button>
      </div>
      <hr />
      {renderContent()}
    </div>
  );
}

export default HousingExpenseForm;