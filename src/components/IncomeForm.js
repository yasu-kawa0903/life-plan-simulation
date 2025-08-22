import React from "react";

function IncomeForm({ formData, onFormChange }) {
  return (
    <div>
      <h2>収入情報</h2>
      <label>年収（万円）</label>
      <input type="number" name="annualIncome" value={formData.annualIncome} onChange={onFormChange} />
      <br />
      <label htmlFor="spouseIncome">配偶者の収入（万円）</label>
      <input type="number" name="spouseIncome" value={formData.spouseIncome} onChange={onFormChange} />
      <br />
      <label htmlFor="otherIncome">その他の収入（万円）</label>
      <input type="number" name="otherIncome" value={formData.otherIncome} onChange={onFormChange} />
    </div>
  );
}

export default IncomeForm;