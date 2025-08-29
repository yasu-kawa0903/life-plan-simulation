import React from 'react';

/**
 * 固定資産税の入力フォームをレンダリングするコンポーネントです。
 * @param {object} props - コンポーネントのプロパティ
 * @param {object} props.formData - アプリケーション全体のフォームデータ
 * @param {function} props.onFormChange - フォームの変更を処理する関数
 */
function PropertyTaxForm({ formData, onFormChange }) {
  // ネストされたフォームデータにアクセスするためのヘルパー関数
  const renderInput = (name, label, unit = '万円', type = 'number') => {
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
    value = value === undefined || value === null ? '' : value;

    return (
      <div className="flex flex-col mb-4">
        <label className="text-gray-700 text-sm font-bold mb-2">{label}（{unit}）</label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type={type}
          name={name}
          value={value}
          onChange={onFormChange}
        />
      </div>
    );
  };

  return (
    <div className="p-4 border rounded shadow-md bg-white mt-4">
      <h4 className="text-lg font-semibold mb-4">固定資産税</h4>
      {/* 固定資産税の入力 */}
      {renderInput('housingData.ownedHouse.propertyTax', '固定資産税', '万円/年')}
    </div>
  );
}

export default PropertyTaxForm;
