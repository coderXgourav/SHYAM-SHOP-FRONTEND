// EarningsChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';

const AdminLineChart = ({ earningsData, filterType }) => {
  const labels = filterType === 'monthly' ? Object.keys(earningsData.monthlyEarnings) : Object.keys(earningsData.individualEarnings);
  const data = filterType === 'monthly' ? Object.values(earningsData.monthlyEarnings) : Object.values(earningsData.individualEarnings);

  const chartData = {
    labels,
    datasets: [
      {
        label: filterType === 'monthly' ? 'Monthly Earnings' : 'Individual Earnings',
        data,
        backgroundColor: 'rgba(75, 192, 192, 0.6)', // Bar color
        borderColor: 'rgba(75, 192, 192, 1)', // Border color
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: '80%', margin: 'auto' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default AdminLineChart;
