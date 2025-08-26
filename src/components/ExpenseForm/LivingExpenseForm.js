import React, { useState, useEffect } from 'react';

function LivingExpenseForm({ formData, onFormChange, onTotalChange }) {
  const [expenseResults, setExpenseResults] = useState([]);
  const finalAge = 100;
  const startAge = Number(formData.age);

  useEffect(() => {
    // ユーザーが変更年と月額の両方を入力した後にのみ計算を実行
    const shouldRunCalculation = (item) => {
      return item.changes.length > 0 && item.changes[0].age !== 0 && item.changes[0].amount !== 0;
    };

    const results = [];
    const totals = {}; // 年齢ごとの合計値を格納するオブジェクト

    for (let currentAge = startAge; currentAge <= finalAge; currentAge++) {
      let annualTotalLiving = 0;
      const annualDetails = {
        age: currentAge,
        fixed: {},
        variable: {},
      };

      // 固定費の計算
      for (const key in formData.fixedCosts) {
        const item = formData.fixedCosts[key];
        const inflationRate = Number(item.inflation) / 100;
        let currentAmount = 0;
        const change = item.changes[0];

        if (shouldRunCalculation(item) && currentAge >= change.age) {
          // 変更年時点のインフレ率適用後の金額を基準にする
          const inflationFactorAtChangeAge = Math.pow(1 + inflationRate, change.age - startAge);
          const baseAmount = Number(change.amount);
          const inflatedBaseAmount = baseAmount * inflationFactorAtChangeAge;
          currentAmount = inflatedBaseAmount * Math.pow(1 + inflationRate, currentAge - change.age);
        } else {
          // 変更年以前の計算
          currentAmount = Number(item.amount) * Math.pow(1 + inflationRate, currentAge - startAge);
        }
        annualDetails.fixed[key] = currentAmount * 12;
        annualTotalLiving += annualDetails.fixed[key];
      }

      // 変動費の計算
      for (const key in formData.variableCosts) {
        const item = formData.variableCosts[key];
        const inflationRate = Number(item.inflation) / 100;
        let currentAmount = 0;
        const change = item.changes[0];

        if (shouldRunCalculation(item) && currentAge >= change.age) {
          // 変更年時点のインフレ率適用後の金額を基準にする
          const inflationFactorAtChangeAge = Math.pow(1 + inflationRate, change.age - startAge);
          const baseAmount = Number(change.amount);
          const inflatedBaseAmount = baseAmount * inflationFactorAtChangeAge;
          currentAmount = inflatedBaseAmount * Math.pow(1 + inflationRate, currentAge - change.age);
        } else {
          // 変更年以前の計算
          currentAmount = Number(item.amount) * Math.pow(1 + inflationRate, currentAge - startAge);
        }
        annualDetails.variable[key] = currentAmount * 12;
        annualTotalLiving += annualDetails.variable[key];
      }

      annualDetails.total = annualTotalLiving;
      results.push(annualDetails);
      totals[currentAge] = annualTotalLiving;
    }

    setExpenseResults(results);
    onTotalChange(totals); // 親コンポーネントに合計値を渡す
  }, [formData, onTotalChange, startAge]);

  // ライフスタイル変更の選択肢
  const changeOptions = [
    { value: 'false', label: 'しない' },
    { value: 'true', label: 'する' },
  ];

  // 各項目のレンダリングするヘルパー関数
  const renderTableRow = (category, name, label) => {
    const isChangeActive = formData[category][name].changes.length > 0;

    // 入力表
    return (
      <tr key={name}>
        <td>{label}</td>
        <td>
          <input type='number' name={`${category}-${name}-amount`} value={formData[category][name].amount} onChange={onFormChange} />
        </td>
        <td>
          <input type='number' name={`${category}-${name}-inflation`} value={formData[category][name].inflation} onChange={onFormChange} />
        </td>
        <td>
          <select
            name={`${category}-${name}-change-active`}
            value={isChangeActive ? 'true' : 'false'}
            onChange={(e) => {
              const isEnabled = e.target.value === 'true';
              const updatedFormData = {
                ...formData,
                [category]: {
                  ...formData[category],
                  [name]: {
                    ...formData[category][name],
                    changes: isEnabled ? [{ age: 0, amount: 0 }] : []
                  }
                }
              };
              onFormChange({ target: { name: 'livingExpenses', value: updatedFormData } });
            }}
          >
            {changeOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </td>
        <td>
          <input
            type='number'
            name={`${category}-${name}-changes-0-age`}
            value={formData[category][name].changes[0]?.age || ''}
            onChange={onFormChange}
            disabled={!isChangeActive}
            style={{ backgroundColor: !isChangeActive ? '#f0f0f0' : 'white' }}
          />
        </td>
        <td>
          <input
            type='number'
            name={`${category}-${name}-changes-0-amount`}
            value={formData[category][name].changes[0]?.amount || ''}
            onChange={onFormChange}
            disabled={!isChangeActive}
            style={{ backgroundColor: !isChangeActive ? '#f0f0f0' : 'white' }}
          />
        </td>
      </tr>
    );
  };

  return (
    <div>
      <h3>生活費（月間）</h3>
      {/* 固定費セクション */}
      <h4>固定費</h4>
      <table border="1">
        <thead>
          <tr>
            <th>項目名</th>
            <th>月額<br/>（万円/月）</th>
            <th>インフレ率<br/>（%）</th>
            <th>ライフスタイル<br/>変更反映</th>
            <th>変更年<br/>（何歳から）</th>
            <th>月額<br/>（万円/月）</th>
          </tr>
        </thead>
        <tbody>
          {renderTableRow('fixedCosts', 'waterHeat', '水道光熱費')}
          {renderTableRow('fixedCosts', 'telecom', '通信費')}
          {renderTableRow('fixedCosts', 'insurance', '生命保険料')}
          {renderTableRow('fixedCosts', 'subscription', 'サブスク')}
          {renderTableRow('fixedCosts', 'socialInsurance', '社会保険料')}
          {renderTableRow('fixedCosts', 'other', 'その他')}  
        </tbody>
      </table>

      {/* 変動費セクション */}
      <h4>変動費</h4>
      <table border="1">
        <thead>
          <tr>
            <th>項目名</th>
            <th>月額<br/>（万円/月）</th>
            <th>インフレ率<br/>（%）</th>
            <th>ライフスタイル<br/>変更反映</th>
            <th>変更年<br/>（何歳から）</th>
            <th>月額<br/>（万円/月）</th>
          </tr>
        </thead>
        <tbody>
          {renderTableRow('variableCosts', 'food', '食費')}
          {renderTableRow('variableCosts', 'dailyGoods', '日用品')}
          {renderTableRow('variableCosts', 'hobby', '趣味・娯楽')}
          {renderTableRow('variableCosts', 'beauty', '美容')}
          {renderTableRow('variableCosts', 'social', '交際費')}
          {renderTableRow('variableCosts', 'transport', '交通費')}
          {renderTableRow('variableCosts', 'education', '教養')}
          {renderTableRow('variableCosts', 'health', '健康・医療')}
          {renderTableRow('variableCosts', 'allowance', 'おこづかい')}
          {renderTableRow('variableCosts', 'other', 'その他')}
        </tbody>
      </table>
      <br />
      <h3>生活費の推移</h3>
      <table border="1">
        <thead>
          <tr>
            <th>年齢</th>
            <th>水道光熱費</th>
            <th>通信費</th>
            <th>生命保険料</th>
            <th>サブスク</th>
            <th>社会保険料</th>
            <th>その他（固定費）</th>
            <th>食費</th>
            <th>日用品</th>
            <th>趣味・娯楽</th>
            <th>美容</th>
            <th>交際費</th>
            <th>交通費</th>
            <th>教養</th>
            <th>健康・医療</th>
            <th>おこづかい</th>
            <th>その他（変動費）</th>
            <th>年間合計（万円）</th>
          </tr>
        </thead>
        <tbody>
          {expenseResults.map((result, index) => (
            <tr key={index}>
              <td>{result.age}</td>
              <td>{Math.round(result.fixed.waterHeat)}</td>
              <td>{Math.round(result.fixed.telecom)}</td>
              <td>{Math.round(result.fixed.insurance)}</td>
              <td>{Math.round(result.fixed.subscription)}</td>
              <td>{Math.round(result.fixed.socialInsurance)}</td>
              <td>{Math.round(result.fixed.other)}</td>
              <td>{Math.round(result.variable.food)}</td>
              <td>{Math.round(result.variable.dailyGoods)}</td>
              <td>{Math.round(result.variable.hobby)}</td>
              <td>{Math.round(result.variable.beauty)}</td>
              <td>{Math.round(result.variable.social)}</td>
              <td>{Math.round(result.variable.transport)}</td>
              <td>{Math.round(result.variable.education)}</td>
              <td>{Math.round(result.variable.health)}</td>
              <td>{Math.round(result.variable.allowance)}</td>
              <td>{Math.round(result.variable.other)}</td>
              <td>{Math.round(result.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LivingExpenseForm;
