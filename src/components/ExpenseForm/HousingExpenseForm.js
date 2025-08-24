import React from 'react';

function HousingExpenseForm({ formData, onFormChange }) {
  return (
    <div>
      <h3>住宅費</h3>
      <label>月々の住宅費（万円）</label>
      <input type='number' name='housingCost' value={formData.housingCost} onChange={onFormChange} />
    </div>
  );
}

export default HousingExpenseForm