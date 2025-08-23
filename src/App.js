import React, { useState } from 'react';
import Header from './components/Header';
import BasicInfoForm from './components/BasicInfoForm';
import IncomeForm from './components/IncomeForm';
import ExpenseForm from './components/ExpenseForm';
import AssetForm from './components/AssetForm';
import ResultDisplay from './components/ResultDisplay';
import './styles.css';

function App() {
  const [currentTab, setCurrentTab] = useState('basic-info');
  const [simulationData, setSimulationData] = useState([]);
  // 入力欄の初期値設定
  const [formData, setFormData] = useState({
    // 基本情報
    age: 30,
    spouseAge: 30,
    savings: 1000,
    monthlyExpenses: 25,
    housing: 10,
    car: 5,
    education: 0,
    additionalSavings: 0,
    investmentReturn: 0,
    // 収入ページ
    annualIncome: 500,
    incomeIncreaseRate: 1,
    retirementAge: 65,
    retirementAllowance: 2000,
    spouseIncome: 0,
    spouseIncreaseRate: 0,
    spouseRetirementAge: 65,
    spouseRetirementAllowance: 0,
    pensionAmount: 240,
    pensionStartAge: 65,
    spousePensionAmount: 100,
    spousePensionStartAge: 65,
    otherIncome1: 0,
    otherIncome2: 0,
    otherIncome3: 0,
    otherIncome4: 0,
    otherIncome5: 0
  });


  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: Number(value)
    }));
  };

  // 計算ロジックを独立した関数にまとめる
  const runSimulation = () => {
    if (!formData.age || !formData.annualIncome || !formData.monthlyExpenses){
      alert("すべての情報を入力してください。");
      return;
    }

    let cashFlow = [];
    let currentSavings = formData.savings;
    const retirementAge = 65;
    const finalAge = 100;
    const investmentRate = Number(formData.investmentReturn) / 100  //パーセントを少数に変換

    for (let age = Number(formData.age); age <= finalAge; age++) {
      let annualIncome = Number(formData.annualIncome) + Number(formData.spouseIncome) + Number(formData.otherIncome);
      let annualExpense = (Number(formData.monthlyExpenses) + Number(formData.housing) + Number(formData.car)) * 12 + Number(formData.education);

      if (age >= retirementAge) {
        annualIncome = 240;
      }
      
      // ★追加貯蓄と投資リターンを考慮した新しい計算ロジック
      currentSavings = currentSavings * (1 + investmentRate) + (annualIncome - annualExpense) + Number(formData.additionalSavings);

      cashFlow.push({
        age: age,
        income: annualIncome,
        expense: annualExpense,
        savings: currentSavings
      });
    }
    // ★forループの外に移動
    setSimulationData(cashFlow); 
    setCurrentTab('result');
  };

  return (
    <div>
      <h1>ライフプランシミュレーション</h1>
      <Header handleTabChange={handleTabChange} />
      <main>
        {currentTab === 'basic-info' && <BasicInfoForm formData={formData} onFormChange={handleFormChange} />}
        {currentTab === 'income' && <IncomeForm formData={formData} onFormChange={handleFormChange} />}
        {currentTab === 'expense' && <ExpenseForm formData={formData} onFormChange={handleFormChange} />}
        {currentTab === 'asset' && <AssetForm formData={formData} onFormChange={handleFormChange} />}
        {currentTab === 'result' && (
          <div>
            <button onClick={runSimulation}>シミュレーション実行</button>
            <ResultDisplay simulationData={simulationData} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;