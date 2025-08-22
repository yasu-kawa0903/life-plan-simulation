import React from "react";
import { Bar, Line} from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement} from 'chart.js';

// Chart.jsのコンポーネントを登録
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

// propsとしてsimulationDataを受け取る
function ResultDisplay({ simulationData }) {
  if (!simulationData || simulationData.length === 0) {
    return <div>シミュレーション結果がありません。</div>
  }

  // グラフのデータを準備
  const data = {
    labels: simulationData.map(d => d.age),
    datasets: [
      {
        labels: '貯蓄額',
        data: simulationData.map(d => d.savings),
        borderColor: 'rgba(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        yAxisID: 'y',
      },
      {
        labels: '収入',
        data: simulationData.map(d => d.income),
        borderColor: 'rgba(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        yAxisID: 'y',
      },
      {
        labels: '支出',
        data: simulationData.map(d => d.expense),
        borderColor: 'rgba(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title:{
        display: true,
        text: '貯蓄額・収入・支出の推移',
      },
    },
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>シミュレーション結果</h2>

      {/* グラフを表示 */}
      <div style={{ marginBottom: '20px' }}>
        <Line data={data} options={options} />
      </div>

      {/* テーブルを表示 */}
      <h3>年間収支詳細</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>年齢</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>収入</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>支出</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>貯蓄額</th>
          </tr>
        </thead>
        <tbody>
          {simulationData.map((yearData, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{yearData.age}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{yearData.income}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{yearData.expense}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{yearData.savings}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResultDisplay;
