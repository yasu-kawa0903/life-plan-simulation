// src/components/ExpenseForm/HousingExpenseForm/OwnedHouse/index.js (仮)
// 今後、OwnedHouse/LoanForm.jsなどをインポートするハブになります。
import React from 'react';
import LoanForm from './LoanForm.js'; // LoanFormをインポート

function OwnedHouse({ formData, onFormChange, onTotalChange }) {
  return (
    <div>
      <h4>持ち家</h4>
      {/* 持ち家に関する各コンポーネントをここに配置します */}
      <p>持ち家の詳細フォームがここに表示されます。</p>
      <LoanForm formData={formData} onFormChange={onFormChange} />
    </div>
  );
}

export default OwnedHouse;