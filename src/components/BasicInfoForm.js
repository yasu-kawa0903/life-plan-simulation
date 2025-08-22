import React from "react";

// propsとしてonSubmit関数を受け取れるように変更
function BasicInfoForm({ formData, onFormChange }) {
  return (
    <div>
      <h2>基本情報</h2>
      <label>年齢</label>
      <input type="number" name="age" value={formData.age} onChange={onFormChange}/>
      <br />
      <label>現在の貯蓄額</label>
      <input type="number" name="savings" value={formData.savings} onChange={onFormChange}/>
    </div>
  );
}

export default BasicInfoForm