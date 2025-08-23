import React, { useState, useEffect } from "react";

function IncomeForm({ formData, onFormChange }) {
  const [incomeResults, setIncomeResults] = useState([]);
  const finalAge = 100;

  useEffect(() => {
    const results = [];
    let currentAnnualIncome = Number(formData.annualIncome);
    let currentSpouseIncome = Number(formData.spouseIncome);

    const incomeIncreaseRate = Number(formData.incomeIncreaseRate) / 100;
    const spouseIncreaseRate = Number(formData.spouseIncreaseRate) / 100;

    for (let currentAge = Number(formData.age); currentAge <= finalAge; currentAge++) {
      let annualTotalIncome = 0;
      let ownIncome = 0;
      let spouseIncome = 0;
      let otherIncome = 0;

      const spouseCurrentAge = Number(formData.spouseAge) + (currentAge - Number(formData.age));

      // 本人の収入計算
      if (currentAge < Number(formData.retirementAge)) {
        ownIncome += currentAnnualIncome;
        currentAnnualIncome = currentAnnualIncome * (1 + incomeIncreaseRate);
      } else if (currentAge === Number(formData.retirementAge)) {
        ownIncome += Number(formData.retirementAllowance);
      }
      if (currentAge >= Number(formData.pensionStartAge)) {
        ownIncome += Number(formData.pensionAmount);
      }
      // 配偶者の収入計算
      if (spouseCurrentAge < Number(formData.spouseRetirementAge)) {
        spouseIncome += currentSpouseIncome;
        currentSpouseIncome = currentSpouseIncome * (1 + spouseIncreaseRate);
      } else if (spouseCurrentAge === Number(formData.spouseRetirementAge)) {
        spouseIncome += Number(formData.spouseRetirementAllowance);
      }
      if (spouseCurrentAge >= Number(formData.spousePensionStartAge)) {
        spouseIncome += Number(formData.spousePensionAmount);
      }

      // その他の収入
      otherIncome += Number(formData.otherIncome1) + Number(formData.otherIncome2) + Number(formData.otherIncome3) + Number(formData.otherIncome4) + Number(formData.otherIncome5);

      annualTotalIncome = ownIncome + spouseIncome + otherIncome;

      results.push({
        age: currentAge,
        totalIncome: annualTotalIncome,
        own: ownIncome,
        spouse: spouseIncome,
        other: otherIncome
      });
    }

    setIncomeResults(results);
  }, [formData]); // formDataが変更されるたびに再計算

  return (
    <div>
      <div>
        <h2>収入情報</h2>
        <div>
          <label>年収（万円）</label>
          <input type="number" name="annualIncome" value={formData.annualIncome} onChange={onFormChange} />
          <label>昇給率（％）</label>
          <input type="number" name="incomeIncreaseRate" value={formData.incomeIncreaseRate} onChange={onFormChange} />
          <label>退職年齢</label>
          <input type="number" name="retirementAge" value={formData.retirementAge} onChange={onFormChange} />
          <label>退職金額（万円）</label>
          <input type="number" name="retirementAllowance" value={formData.retirementAllowance} onChange={onFormChange} />
        </div>
        <br />
        <div>
          <label>配偶者の年収（万円）</label>
          <input type="number" name="spouseIncome" value={formData.spouseIncome} onChange={onFormChange} />
          <label>昇給率（％）</label>
          <input type="number" name="spouseIncreaseRate" value={formData.spouseIncreaseRate} onChange={onFormChange} />
          <label>退職年齢</label>
          <input type="number" name="spouseRetirementAge" value={formData.spouseRetirementAge} onChange={onFormChange} />
          <label>退職金額（万円）</label>
          <input type="number" name="spouseRetirementAllowance" value={formData.spouseRetirementAllowance} onChange={onFormChange} />
        </div>
        <br />
        <div>
          <label>年金受給額</label>
          <input type="number" name="pensionAmount" value={formData.pensionAmount} onChange={onFormChange} />
          <label>年金受給開始年齢</label>
          <input type="number" name="pensionStartAge" value={formData.pensionStartAge} onChange={onFormChange} />
          <br />
          <label>配偶者の年金受給額</label>
          <input type="number" name="spousePensionAmount" value={formData.spousePensionAmount} onChange={onFormChange} />
          <label>年金受給開始年齢</label>
          <input type="number" name="spousePensionStartAge" value={formData.spousePensionStartAge} onChange={onFormChange} />        
        </div>
        <br />
        <div>
          <label htmlFor="otherIncome">その他の収入1（万円）</label>
          <input type="number" name="otherIncome1" value={formData.otherIncome1} onChange={onFormChange} />
          <br />
          <label htmlFor="otherIncome">その他の収入2（万円）</label>
          <input type="number" name="otherIncome2" value={formData.otherIncome2} onChange={onFormChange} />
          <br />
          <label htmlFor="otherIncome">その他の収入3（万円）</label>
          <input type="number" name="otherIncome3" value={formData.otherIncome3} onChange={onFormChange} />
          <br />
          <label htmlFor="otherIncome">その他の収入4（万円）</label>
          <input type="number" name="otherIncome4" value={formData.otherIncome4} onChange={onFormChange} />
          <br />
          <label htmlFor="otherIncome">その他の収入5（万円）</label>
          <input type="number" name="otherIncome5" value={formData.otherIncome5} onChange={onFormChange} />
          <br />
        </div>
      </div>  
      <div>
        <h3>年間収入の推移</h3>
        <table border="1">
          <thead>
            <tr>
              <th>年齢</th>
              <th>本人収入</th>
              <th>配偶者収入</th>
              <th>その他収入</th>
              <th>年間総収入</th>
            </tr>
          </thead>
          <tbody>
            {incomeResults.map((result, index) => (
              <tr key={index}>
                <td>{result.age}</td>
                <td>{Math.round(result.own)}</td>
                <td>{Math.round(result.spouse)}</td>
                <td>{Math.round(result.other)}</td>
                <td>{Math.round(result.totalIncome)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default IncomeForm;