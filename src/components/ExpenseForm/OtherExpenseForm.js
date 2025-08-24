import React from 'react';

function OtherExpenseForm({ formData, onFormChange }) {
  return (
    <div>
      <h3>その他</h3>
      <label htmlFor='otherExpense1'>その他の支出1（万円）</label>
      <input type='number' name='otherExpense1' value={formData.otherExpense1} onChange={onFormChange} />
      <br />
      <label htmlFor='otherExpense2'>その他の支出2（万円）</label>
      <input type='number' name='otherExpense2' value={formData.otherExpense2} onChange={onFormChange} />
      <br />
      <label htmlFor='otherExpense3'>その他の支出3（万円）</label>
      <input type='number' name='otherExpense3' value={formData.otherExpense3} onChange={onFormChange} />
      <br />
      <label htmlFor='otherExpense4'>その他の支出4（万円）</label>
      <input type='number' name='otherExpense4' value={formData.otherExpense4} onChange={onFormChange} />
      <br />
      <label htmlFor='otherExpense5'>その他の支出5（万円）</label>
      <input type='number' name='otherExpense5' value={formData.otherExpense5} onChange={onFormChange} />
      <br />
    </div>
  );
}

export default OtherExpenseForm