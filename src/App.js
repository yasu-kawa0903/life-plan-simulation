import React, { useState } from 'react';
import Header from './components/Header';
import BasicInfoForm from './components/BasicInfoForm';
import IncomeForm from './components/IncomeForm';
import ExpenseForm from './components/ExpenseForm/index.js';
import AssetForm from './components/AssetForm';
import HousingExpenseForm from './components/ExpenseForm/HousingExpenseForm.js';
import ResultDisplay from './components/ResultDisplay';
import './styles.css';

function App() {
  const [currentTab, setCurrentTab] = useState('basic-info');
  const [simulationData, setSimulationData] = useState([]);
  
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
    fixedCosts: {
      waterHeat: { amount: 1.5, inflation: 2, changes: [] },
      telecom: { amount: 1, inflation: 0, changes: [] },
      insurance: { amount: 2, inflation: 1, changes: [] },
      subscription: { amount: 0.5, inflation: 0, changes: [] },
      socialInsurance: { amount: 5, inflation: 2, changes: [] },
      other: { amount: 1, inflation: 2, changes: [] },
    },
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
    // 住宅費データ
    housingData: {
      housingType: '持ち家',
      ownedHouse: {
        hasLoan: 'あり',
        loanBalance: 0,
        remainingTerm: 0,
        interestRate: 0,
        interestType: '変動金利',
        propertyTax: 0,
        fireInsurance: 0,
        earthquakeInsurance: 0,
        dwellingType: 'マンション',
        maintenanceReserve: 0,
        commonAreaFee: 0,
        houseRepairCost: 0,
        other: 0,
      },
      rentalHouse: {
        rentAndCommonFee: 0,
        renewalFee: 0,
        movingCost: 0,
        other: 0,
      },
      purchasePlan: {
        hasPlan: 'なし',
        purchaseAge: 0,
        purchasePrice: 0,
        miscCost: 0,
        hasLoan: 'あり',
        downPayment: 0,
        loanAmount: 0,
        repaymentTerm: 0,
        loanInterestRate: 0,
        loanInterestType: '変動金利',
        dwellingType: 'マンション',
        propertyTax: 0,
        fireInsurance: 0,
        earthquakeInsurance: 0,
        maintenanceReserve: 0,
        commonAreaFee: 0,
        houseRepairCost: 0,
        other: 0,
      }
    },
    // その他の費用
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

  // フォーム全体の変更を処理する汎用関数
  const handleFormChange = (e) => {
    const { name, value, type } = e.target;
    // 数値型に変換、NaNの場合は0に
    const parsedValue = type === 'number' ? Number(value) || 0 : value;

    setFormData(prevData => {
      // nameをドットで分割して、ネストされたプロパティにアクセス
      const parts = name.split('.');
      let newData = { ...prevData };
      let current = newData;
      
      // 最後の要素以外のパスをたどる
      for (let i = 0; i < parts.length - 1; i++) {
        current = current[parts[i]];
      }
      // 最後の要素に値をセット
      current[parts[parts.length - 1]] = parsedValue;
      
      // ライフスタイル変更の特殊なケース
      if (name.includes('changes') && name.includes('age')) {
        // change-active の状態も更新
        const changeActiveName = parts.slice(0, 3).join('.') + '.change-active';
        if (newData[parts[0]][parts[1]][parts[2]].changes[0].age !== 0) {
           newData[parts[0]][parts[1]][parts[2]]['change-active'] = 'true';
        }
      }

      return newData;
    });
  };

  // 計算ロジックを独立した関数にまとめる
  const runSimulation = () => {
    // 必須入力項目のチェック
    if (!formData.age || !formData.annualIncome){
      // ここにカスタムアラートUIを実装
      alert("すべての情報を入力してください。");
      return;
    }

    let cashFlow = [];
    let currentSavings = formData.savings;
    const retirementAge = 65;
    const finalAge = 100;
    const investmentRate = Number(formData.investmentReturn) / 100;

    for (let age = Number(formData.age); age <= finalAge; age++) {
      let annualIncome = Number(formData.annualIncome) + Number(formData.spouseIncome);
      let annualExpense = 0; // 支出の計算を個別に開始

      // 収入計算
      // ...（既存の収入ロジック）
      if (age >= retirementAge) {
        annualIncome += Number(formData.pensionAmount) + Number(formData.spousePensionAmount);
      }

      // 支出計算
      // 生活費
      // ...（既存の生活費計算ロジック）

      // 住宅費
      // ...（住宅費の計算ロジックを追加予定）

      // その他の費用
      annualExpense += Number(formData.carCost) * 12 + Number(formData.educationCost);

      currentSavings = currentSavings * (1 + investmentRate) + (annualIncome - annualExpense) + Number(formData.additionalSavings);

      cashFlow.push({
        age: age,
        income: annualIncome,
        expense: annualExpense,
        savings: currentSavings
      });
    }

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
        {currentTab === 'housing' && <HousingExpenseForm formData={formData} onFormChange={handleFormChange} />}
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
