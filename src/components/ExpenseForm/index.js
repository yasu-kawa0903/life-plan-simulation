import React, {useState, useEffect} from "react";
// 各コンポーネントをインポート
import LivingExpenseForm from './LivingExpenseForm'
import HousingExpenseForm from './HousingExpenseForm/index.js'
import CarExpenseForm from './CarExpenseForm'
import EducationExpenseForm from './EducationExpenseForm'
import OtherExpenseForm from './OtherExpenseForm'

/**
 * 支出に関するすべてのフォームと、年間支出の推移テーブルを統合するコンポーネントです。
 * @param {object} props - コンポーネントのプロパティ
 * @param {object} props.formData - アプリケーション全体のフォームデータ
 * @param {function} props.onFormChange - フォームの変更を処理する関数
 */
function ExpenseForm({ formData, onFormChange }) {
  const [expenseResults, setExpenseResults] = useState([]);
  const [currentTab, setCurrentTab] = useState('living'); //サブタブの状態を管理
  const finalAge = 100

  // 各支出項目の年間合計を保持する状態
  const [livingTotals, setLivingTotals] = useState({});
  const [housingTotals, setHousingTotals] = useState({});
  const [carTotals, setCarTotals] = useState({});
  const [educationTotals, setEducationTotals] = useState({});
  const [otherTotals, setOtherTotals] = useState({});

  useEffect(() => {
    const results = [];
    const startAge = Number(formData.age);

    for (let currentAge = startAge; currentAge <= finalAge; currentAge++) {
      let annualTotalExpense = 0;
      // 各コンポーネントから合計値を取得
      const living = livingTotals[currentAge] || 0;
      const housing = housingTotals[currentAge] || 0;
      const car = carTotals[currentAge] || 0;
      const education = educationTotals[currentAge] || 0;
      const other = otherTotals[currentAge] || 0;

      annualTotalExpense = living + housing + car + education + other;

      results.push({
        age: currentAge,
        totalExpense : annualTotalExpense,
        living: living,
        housing: housing,
        car: car,
        education: education,
        other: other,
      });
    }

    setExpenseResults(results);
  }, [formData.age, finalAge, livingTotals, housingTotals, carTotals, educationTotals, otherTotals]);

  // 各コンポーネントに合計値を渡すためのコールバック関数
  const handleLivingTotalChange = (totals) => {
    setLivingTotals(totals);
  };
  const handleHousingTotalChange = (totals) => {
    setHousingTotals(totals);
  };
  const handleCarTotalChange = (totals) => {
    setCarTotals(totals);
  };
  const handleEducationTotalChange = (totals) => {
    setEducationTotals(totals);
  };
  const handleOtherTotalChange = (totals) => {
    setOtherTotals(totals);
  };

  return (
    <div>
      <h2>支出情報</h2>
      <div>
        <button onClick={() => setCurrentTab('living')}>生活費</button>
        <button onClick={() => setCurrentTab('housing')}>住宅費</button>
        <button onClick={() => setCurrentTab('car')}>車両費</button>
        <button onClick={() => setCurrentTab('education')}>教育費</button>
        <button onClick={() => setCurrentTab('other')}>その他</button>
      </div>
      <hr />

      {currentTab === 'living' && < LivingExpenseForm formData={formData} onFormChange={onFormChange} onTotalChange={handleLivingTotalChange}/>}
      {currentTab === 'housing' && < HousingExpenseForm formData={formData} onFormChange={onFormChange} onTotalChange={handleHousingTotalChange}/>}
      {currentTab === 'car' && < CarExpenseForm formData={formData} onFormChange={onFormChange} onTotalChange={handleCarTotalChange}/>}
      {currentTab === 'education' && < EducationExpenseForm formData={formData} onFormChange={onFormChange} onTotalChange={handleEducationTotalChange}/>}
      {currentTab === 'other' && < OtherExpenseForm formData={formData} onFormChange={onFormChange} onTotalChange={handleOtherTotalChange}/>}
      <br />

      <h3>年間支出の推移</h3>
      <table border="1">
        <thead>
          <tr>
            <th>年齢</th>
            <th>生活費（万円）</th>
            <th>住宅費（万円）</th>
            <th>車両費（万円）</th>
            <th>教育費（万円）</th>
            <th>その他（万円）</th>
            <th>年間総支出（万円）</th>
          </tr>
        </thead>
        <tbody>
          {expenseResults.map((result, index) => (
            <tr key={index}>
              <td>{result.age}</td>
              <td>{Math.round(result.living)}</td>
              <td>{Math.round(result.housing)}</td>
              <td>{Math.round(result.car)}</td>
              <td>{Math.round(result.education)}</td>
              <td>{Math.round(result.other)}</td>
              <td>{Math.round(result.totalExpense)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseForm;