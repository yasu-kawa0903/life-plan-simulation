import React from 'react';

function EducationExpenseForm({ formData, onFormChange }) {
  return (
    <div>
      <h3>教育費</h3>
      <label>年間の教育費（万円）</label>
      <input type='number' name='educationCost' value={formData.educationCost} onChange={onFormChange} />
    </div>
  );
}

export default EducationExpenseForm