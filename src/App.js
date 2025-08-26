import React, { useState } from 'react';
import Header from './components/Header';
import BasicInfoForm from './components/BasicInfoForm';
import IncomeForm from './components/IncomeForm';
import ExpenseForm from './components/ExpenseForm/index.js';
import AssetForm from './components/AssetForm';
import ResultDisplay from './components/ResultDisplay';
import './styles.css';

function App() {
  const [currentTab, setCurrentTab] = useState('basic-info');
  const [simulationData, setSimulationData] = useState([]);
  // 入力欄,初期値設定
  const [formData, setFormData] = useState({
    // 基本情報
    age: 30,
    spouseAge: 30,
    savings: 1000,
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
    otherIncome5: 0,
    // 支出ページ
    livingExpenses: 0,
    // 固定費
    fixedCosts: {
      waterHeat: { amount: 1.5, inflation: 2, changes: [] },
      telecom: { amount: 1, inflation: 0, changes: [] },
      insurance: { amount: 2, inflation: 1, changes: [] },
      subscription: { amount: 0.5, inflation: 0, changes: [] },
      socialInsurance: { amount: 5, inflation: 2, changes: [] },
      other: { amount: 1, inflation: 2, changes: [] },
    },
    // 変動費
    variableCosts: {
      food: { amount: 5, inflation: 3, changes: [] },
      dailyGoods: { amount: 1, inflation: 2, changes: [] },
      hobby: { amount: 2, inflation: 2, changes: [] },
      beauty: { amount: 0.5, inflation: 2, changes: [] },
      social: { amount: 1, inflation: 2, changes: [] },
      transport: { amount: 0.5, inflation: 2, changes: [] },
      education: { amount: 1, inflation: 2, changes: [] },
      health: { amount: 0.5, inflation: 2, changes: [] },
      allowance: { amount: 2, inflation: 2, changes: [] },
      other: { amount: 1, inflation: 2, changes: [] },
    },
    // ライフスタイル変更のチェックボックス状態
    livingStyleChange: false,
    housingCost: 10,
    carCost: 5,
    educationCost: 0,
    otherExpense1:0,    
    otherExpense2:0,    
    otherExpense3:0,    
    otherExpense4:0,    
    otherExpense5:0,    
  });


  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    const numericValue = Number(value);

    // LivingexpenseFormからの特別のデータ形式の場合
    if (name === 'livingExpenses' && typeof value === 'object') {
      setFormData(value);
      return;
    }

    // ライフスタイル変更のage/amountまたはその他のinputの更新を処理
    setFormData(prevData => {
      // name を分割
      const parts = name.split('-');
      // 'fixedCosts'または'variableCosts'で始まるかチェック
      const isLivingExpense = parts[0] === 'fixedCosts' || parts[0] === 'variableCosts';

      if (isLivingExpense) {
        const category = parts[0]; // fixedCosts or variableCosts
        const subCategory = parts[1]; // waterHeat, telecom, etc
        const fieldName = parts[2]; // amount, inflation, changes
        const newData = {...prevData};
        const numericValue = Number(value);

        if (fieldName === 'change-active') {
          // 変更反映のselect BOX
          const isEnabled = value === 'true';
          newData[category][subCategory].changes = isEnabled ? [{ age:0, amount:0 }] : [];
        } else if (fieldName === 'changes') {
          // 変更年/月額のinput
          const index = Number(parts[3]);
          const changeField = parts[4];
          const changes = [...newData[category][subCategory].changes];
          changes[index][changeField] = numericValue;
          newData[category][subCategory].changes = changes;
        } else {
          // amount/inflation の input
          newData[category][subCategory][fieldName] = numericValue;
        }
        return newData;
      }

      // 他のコンポーネントからの単純な入力の場合
      return {
        ...prevData,
        [name]: Number(value)
      };
    });
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