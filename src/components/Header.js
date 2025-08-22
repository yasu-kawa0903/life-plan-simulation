import React from 'react';

// propsとしてhandleTabChange関数を受け取る
function Header({ handleTabChange }) {
  return (
    <header>
      <nav>
        <ul>
          <li><a onClick={() => handleTabChange('basic-info')}>基本情報</a></li>
          <li><a onClick={() => handleTabChange('income')}>収入</a></li>
          <li><a onClick={() => handleTabChange('expense')}>支出</a></li>
          <li><a onClick={() => handleTabChange('asset')}>資産</a></li>
          <li><a onClick={() => handleTabChange('result')}>結果</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;