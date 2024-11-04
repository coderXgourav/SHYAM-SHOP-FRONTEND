import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ products }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const processProductData = () => {
    const categoryMap = {};
    const colors = [
      'rgba(75, 192, 192, 0.6)',
      'rgba(255, 99, 132, 0.6)',
      'rgba(255, 206, 86, 0.6)',
      'rgba(54, 162, 235, 0.6)',
      'rgba(153, 102, 255, 0.6)',
    ];

    // Calculate total quantity per category
    products?.forEach((product) => {
      const categoryName = product.category_id?.name; // Use optional chaining
      const quantity = product.quantity;

      if (!categoryMap[categoryName]) {
        categoryMap[categoryName] = 0;
      }
      categoryMap[categoryName] += quantity;
    });

    // Prepare data for the chart
    const labels = Object.keys(categoryMap);
    const data = Object.values(categoryMap);

    const datasetColors = data.map((_, index) => colors[index % colors.length]);

    setChartData({
      labels: labels,
      datasets: [
        {
          label: 'Product Quantity',
          data: data,
          backgroundColor: datasetColors,
          barThickness: 10, // Set thickness of the bars
        },
      ],
    });
  };

  useEffect(() => {
    if (Array.isArray(products) && products.length) {
      processProductData();
    }
  }, [products]);

  // Check if chartData is ready to render
  if (!chartData.labels.length || !chartData.datasets.length) {
    return <div>Loading data...</div>; // Fallback UI
  }

  const containerStyle = {
    marginTop: '20px',
    textAlign: 'center',
  };

  const titleStyle = {
    marginBottom: '20px',
    fontSize: '1.2rem',
    fontWeight: '600',
  };

  const cardStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    backgroundColor: 'white',
  };

  const cardBodyStyle = {
    padding: '20px',
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Product Quantity by Category</h2>
      <div style={cardStyle}>
        <div style={cardBodyStyle}>
          <Bar data={chartData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
};

export default BarChart;
