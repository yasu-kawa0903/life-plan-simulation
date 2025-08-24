import React from 'react';

function CarExpenseForm({ formData, onFormChange }) {
  return (
    <div>
      <h3>車両費</h3>
      <label>月々の車両費（万円）</label>
      <input type='number' name='carCost' value={formData.carCost} onChange={onFormChange} />
    </div>
  );
}

export default CarExpenseForm