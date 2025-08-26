import React from 'react';

// 住宅費の入力フォームをレンダリングするコンポーネント
// App.js から渡された formData と onFormChange を使用
function HousingExpenseForm({ formData, onFormChange }) {

  // フォーム入力フィールドのヘルパー関数
  const renderInput = (name, label, type = 'number', unit = '万円') => {
    // ネストされたオブジェクトの値を動的に取得
    const parts = name.split('.');
    let value = formData;
    for (const part of parts) {
      if (value) {
        value = value[part];
      } else {
        value = undefined;
        break;
      }
    }
    value = value === undefined ? '' : value; // 値がundefinedの場合、空文字列に

    return (
      <div className="input-group">
        <label>{label}（{unit}）</label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onFormChange}
        />
      </div>
    );
  };

  // 持ち家関連の入力フィールドをレンダリングするヘルパー関数
  const renderOwnedHouseFields = () => (
    <div>
      <h4>持ち家</h4>
      <div>
        <label>ローン</label>
        <select
          name="housingData.ownedHouse.hasLoan"
          value={formData.housingData.ownedHouse.hasLoan}
          onChange={onFormChange}
        >
          <option value="あり">あり</option>
          <option value="なし">なし</option>
        </select>
      </div>
      {formData.housingData.ownedHouse.hasLoan === 'あり' && (
        <>
          {renderInput('housingData.ownedHouse.loanBalance', 'ローン残高')}
          {renderInput('housingData.ownedHouse.remainingTerm', '残返済期間', 'number', '年')}
          {renderInput('housingData.ownedHouse.interestRate', '適用金利', 'number', '%')}
          <div>
            <label>金利区分</label>
            <select
              name="housingData.ownedHouse.interestType"
              value={formData.housingData.ownedHouse.interestType}
              onChange={onFormChange}
            >
              <option value="変動金利">変動金利</option>
              <option value="固定金利">固定金利</option>
            </select>
          </div>
        </>
      )}
      {renderInput('housingData.ownedHouse.propertyTax', '固定資産税', 'number', '万円/年')}
      {renderInput('housingData.ownedHouse.fireInsurance', '火災保険', 'number', '万円/年')}
      {renderInput('housingData.ownedHouse.earthquakeInsurance', '地震保険', 'number', '万円/年')}
      
      <div>
        <label>種類</label>
        <select
          name="housingData.ownedHouse.dwellingType"
          value={formData.housingData.ownedHouse.dwellingType}
          onChange={onFormChange}
        >
          <option value="マンション">マンション</option>
          <option value="戸建て">戸建て</option>
        </select>
      </div>

      {formData.housingData.ownedHouse.dwellingType === 'マンション' && (
        <>
          {renderInput('housingData.ownedHouse.maintenanceReserve', '修繕積立金', 'number', '万円/月')}
          {renderInput('housingData.ownedHouse.commonAreaFee', '共益費', 'number', '万円/月')}
          {renderInput('housingData.ownedHouse.other', 'その他', 'number', '万円/月')}
        </>
      )}
      {formData.housingData.ownedHouse.dwellingType === '戸建て' && (
        <>
          {renderInput('housingData.ownedHouse.houseRepairCost', '修繕費', 'number', '万円/月')}
          {renderInput('housingData.ownedHouse.other', 'その他', 'number', '万円/月')}
        </>
      )}
    </div>
  );
  
  // 賃貸関連の入力フィールドをレンダリングするヘルパー関数
  const renderRentalHouseFields = () => (
    <div>
      <h4>賃貸</h4>
      {renderInput('housingData.rentalHouse.rentAndCommonFee', '家賃・共益費', 'number', '万円/月')}
      {renderInput('housingData.rentalHouse.renewalFee', '更新料', 'number', '万円/年')}
      {renderInput('housingData.rentalHouse.movingCost', '引越し費用', 'number', '万円/年')}
      {renderInput('housingData.rentalHouse.other', 'その他', 'number', '万円/月')}
    </div>
  );

  // 住宅購入予定関連の入力フィールドをレンダリングするヘルパー関数
  const renderPurchasePlanFields = () => (
    <div>
      <h4>住宅購入予定</h4>
      <div>
        <label>購入予定</label>
        <select
          name="housingData.purchasePlan.hasPlan"
          value={formData.housingData.purchasePlan.hasPlan}
          onChange={onFormChange}
        >
          <option value="なし">なし</option>
          <option value="あり">あり</option>
        </select>
      </div>

      {formData.housingData.purchasePlan.hasPlan === 'あり' && (
        <>
          {renderInput('housingData.purchasePlan.purchaseAge', '購入時期', 'number', '歳')}
          {renderInput('housingData.purchasePlan.purchasePrice', '購入金額')}
          {renderInput('housingData.purchasePlan.miscCost', '諸費用')}
          <div>
            <label>ローン</label>
            <select
              name="housingData.purchasePlan.hasLoan"
              value={formData.housingData.purchasePlan.hasLoan}
              onChange={onFormChange}
            >
              <option value="あり">あり</option>
              <option value="なし">なし</option>
            </select>
          </div>

          {formData.housingData.purchasePlan.hasLoan === 'あり' && (
            <>
              {renderInput('housingData.purchasePlan.downPayment', '頭金')}
              {renderInput('housingData.purchasePlan.loanAmount', '借入金額')}
              {renderInput('housingData.purchasePlan.repaymentTerm', '返済期間', 'number', '年')}
              {renderInput('housingData.purchasePlan.loanInterestRate', '適用金利', 'number', '%')}
              <div>
                <label>金利区分</label>
                <select
                  name="housingData.purchasePlan.loanInterestType"
                  value={formData.housingData.purchasePlan.loanInterestType}
                  onChange={onFormChange}
                >
                  <option value="変動金利">変動金利</option>
                  <option value="固定金利">固定金利</option>
                </select>
              </div>
            </>
          )}

          {/* 購入後の費用 */}
          <h4>購入後の費用</h4>
          {renderInput('housingData.purchasePlan.propertyTax', '固定資産税', 'number', '万円/年')}
          {renderInput('housingData.purchasePlan.fireInsurance', '火災保険', 'number', '万円/年')}
          {renderInput('housingData.purchasePlan.earthquakeInsurance', '地震保険', 'number', '万円/年')}

          <div>
            <label>種類</label>
            <select
              name="housingData.purchasePlan.dwellingType"
              value={formData.housingData.purchasePlan.dwellingType}
              onChange={onFormChange}
            >
              <option value="マンション">マンション</option>
              <option value="戸建て">戸建て</option>
            </select>
          </div>
          {formData.housingData.purchasePlan.dwellingType === 'マンション' && (
            <>
              {renderInput('housingData.purchasePlan.maintenanceReserve', '修繕積立金', 'number', '万円/月')}
              {renderInput('housingData.purchasePlan.commonAreaFee', '共益費', 'number', '万円/月')}
              {renderInput('housingData.purchasePlan.other', 'その他', 'number', '万円/月')}
            </>
          )}
          {formData.housingData.purchasePlan.dwellingType === '戸建て' && (
            <>
              {renderInput('housingData.purchasePlan.houseRepairCost', '修繕費', 'number', '万円/月')}
              {renderInput('housingData.purchasePlan.other', 'その他', 'number', '万円/月')}
            </>
          )}
        </>
      )}
    </div>
  );

  return (
    <div className="housing-form">
      <h3>住宅費</h3>
      <div>
        <label>住宅のパターン</label>
        <select
          name="housingData.housingType"
          value={formData.housingData.housingType}
          onChange={onFormChange}
        >
          <option value="持ち家">持ち家（現在）</option>
          <option value="賃貸">賃貸（現在）</option>
          <option value="住宅購入予定">住宅購入予定</option>
        </select>
      </div>

      {/* 選択されたパターンに応じてフォームをレンダリング */}
      {formData.housingData.housingType === '持ち家' && renderOwnedHouseFields()}
      {formData.housingData.housingType === '賃貸' && renderRentalHouseFields()}
      {formData.housingData.housingType === '住宅購入予定' && renderPurchasePlanFields()}
    </div>
  );
}

export default HousingExpenseForm;
