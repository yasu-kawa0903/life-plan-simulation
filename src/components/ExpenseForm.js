import React from "react";

function ExpenseForm({ formData, onFormChange }) {
  return (
    <div>
      <h2>支出情報</h2>
      <label htmlFor="monthlyExpenses">月々の生活費（万円）</label>
      <input type="number" name="monthlyExpenses" value={formData.monthlyExpenses} onChange={onFormChange} />
      <br />
      <label htmlFor="housing">住宅関連費（万円/月）</label>
      <input type="number" name="housing" value={formData.housing} onChange={onFormChange} />
      <br />
      <label htmlFor="car">自動車関連費（万円/月）</label>
      <input type="number" name="car" value={formData.car} onChange={onFormChange} />
      <br />
      <label htmlFor="education">教育費（万円/年）</label>
      <input type="number" name="education" value={formData.education} onChange={onFormChange} />
    </div>
  );
}

export default ExpenseForm;