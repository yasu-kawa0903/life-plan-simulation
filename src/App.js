import React, { useState } from 'react';
import Header from './components/Header';
import BasicInfoForm from './components/BasicInfoForm';
import IncomeForm from './components/IncomeForm';
import ExpenseForm from './components/ExpenseForm';
import ResultDisplay from './components/ResultDisplay';
import './styles.css';

function App() {
  const [currentTab, setCurrentTab] = useState('basic-info');
  const [simulationData, setSimulationData] = useState([]);
  const [formData, setFormData] = useState({
    age: 30,
    annualIncome: 500,
    savings: 1000,
    spouseIncome: 0,
    otherIncome: 0,
    monthlyExpenses: 25,
    housing: 10,
    car: 5,
    education: 0
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

    for (let age = Number(formData.age); age <= finalAge; age++) {
      let annualIncome = Number(formData.annualIncome) + Number(formData.spouseIncome) + Number(formData.otherIncome);
      let annualExpense = (Number(formData.monthlyExpenses) + Number(formData.housing) + Number(formData.car)) * 12 + Number(formData.education);

      if (age >= retirementAge) {
        annualIncome = 240;
      }

      const yearEndSavings = currentSavings + (annualIncome - annualExpense);

      cashFlow.push({
        age: age,
        income: annualIncome,
        expense: annualExpense,
        savings: yearEndSavings
      });

      currentSavings = yearEndSavings;
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
        {currentTab === 'asset' && <div>資産入力ページ</div>}
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