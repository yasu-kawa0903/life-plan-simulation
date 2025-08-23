import React from "react";

function AssetForm({ formData, onFormChange }) {
  return (
    <div>
      <h2>資産情報</h2>
      <label htmlFor="additionalSavings">追加貯蓄（万円/年）</label>
      <input type="number" name="additionalSavings" value={formData.additionalSavings} onChange={onFormChange}/>
      <br />
      <label htmlFor="investmentReturn">投資リターン（％）</label>
      <input type="number" name="investmentReturn" value={formData.investmentReturn} onChange={onFormChange}/>
    </div>
  )
}

export default AssetForm;