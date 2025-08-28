// src/components/ExpenseForm/HousingExpenseForm/PurchasePlan/index.js (仮)
// 今後、PurchasePlan/LoanForm.jsなどをインポートするハブになります。
import React from 'react';
import LoanForm from './LoanForm.js'; // LoanFormをインポート

function PurchasePlan({ formData, onFormChange, onTotalChange }) {
  return (
    <div>
      <h4>住宅購入予定</h4>
      {/* 住宅購入予定に関する各コンポーネントをここに配置します */}
      <LoanForm formData={formData} onFormChange={onFormChange} />
    </div>
  );
}

export default PurchasePlan;