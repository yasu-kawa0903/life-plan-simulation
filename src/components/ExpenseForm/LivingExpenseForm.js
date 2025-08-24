import React, { useState, useEffect } from 'react';

function LivingExpenseForm({ formData, onFormChange, onTotalChange }) {
  // ライフスタイル変更のチェックボックス状態を管理
  const [expenseResults, setExpenseResults] = useState([]);
  const finalAge = 100;
  const startAge = Number(formData.age);

  useEffect(() => {
    const results = [];
    const totals = {}; // 年齢ごとの合計値を格納するオブジェクト

    for (let currentAge = startAge; currentAge <= finalAge; currentAge++) {
      let annualTotalLiving = 0;

      // 固定費の計算
      for (const key in formData.fixedCosts) {
        const item = formData.fixedCosts[key];
        let currentAmount = Number(item.amount);
        const inflationRate = Number(item.inflation) / 100;

        // インフレ率を考慮した金額を計算
        currentAmount = currentAmount * Math.pow(1 + inflationRate, currentAge - startAge);
        annualTotalLiving += currentAmount *12;
      }

      // 変動費の計算
      for (const key in formData.variableCosts) {
        const item = formData.variableCosts[key];
        let currentAmount = Number(item.amount);
        const inflationRate = Number(item.inflation) / 100;

        // インフレを考慮した金額を計算
        currentAmount = currentAmount * Math.pow(1 + inflationRate, currentAge - startAge);
        annualTotalLiving += currentAmount * 12;
      }

      results.push({
        age: currentAge,
        total: annualTotalLiving,
      });

      totals[currentAge] = annualTotalLiving;
    }

    setExpenseResults(results);
    onTotalChange(totals); // 親コンポーネントに合計値を渡す
  }, [formData, onTotalChange, startAge]);

  // 各項目のレンダリングするヘルパー関数
  const renderInput = (category, name, label) => (
    <div key={name}>
      <label>{label} （万円/月）</label>
      <input type="number" name={`${category}-${name}-amount`} value={formData[category][name].amount} onChange={onFormChange}/>
      <label>インフレ率（％）</label>
      <input type='number' name={`${category}-${name}-inflation`} value={formData[category][name].inflation} onChange={onFormChange}/>
      {/* ライフスタイル変更の入力欄（後で実装） */}
    </div>
  );

  return (
    <div>
      <h3>生活費（月間）</h3>
      {/* 固定費セクション */}
      <h4>固定費</h4>
      {renderInput('fixedCosts', 'waterHeat', '水道光熱費')}
      {renderInput('fixedCosts', 'telecom', '通信費')}
      {renderInput('fixedCosts', 'insurance', '生命保険料')}
      {renderInput('fixedCosts', 'subscription', 'サブスク')}
      {renderInput('fixedCosts', 'socialInsurance', '社会保険料')}
      {renderInput('fixedCosts', 'other', 'その他')}

      {/* 変動費セクション */}
      <h4>変動費</h4>
      {renderInput('variableCosts', 'food', '食費')}
      {renderInput('variableCosts', 'dailyGoods', '日用品')}
      {renderInput('variableCosts', 'hobby', '趣味・娯楽')}
      {renderInput('variableCosts', 'beauty', '美容')}
      {renderInput('variableCosts', 'social', '交際費')}
      {renderInput('variableCosts', 'transport', '交通費')}
      {renderInput('variableCosts', 'education', '教養')}
      {renderInput('variableCosts', 'health', '健康・医療')}
      {renderInput('variableCosts', 'allowance', 'おこづかい')}
      {renderInput('variableCosts', 'other', 'その他')}

      <br />
      <h3>生活費の推移</h3>
      <table border="1">
        <thead>
          <tr>
            <th>年齢</th>
            <th>年間生活費合計（万円）</th>
          </tr>
        </thead>
        <tbody>
          {expenseResults.map((result, index) => (
            <tr key={index}>
              <td>{result.age}</td>
              <td>{Math.round(result.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LivingExpenseForm