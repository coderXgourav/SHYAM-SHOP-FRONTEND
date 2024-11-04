import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registering necessary chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ data, labels }) => {
  const chartData = {
    labels: labels, // X-axis labels (months or individual dates)
    datasets: [
      {
        label: "Earnings ($)", // Updated label
        data: data, // Earnings data for each month or individual order
        borderColor: "rgba(75, 192, 192, 1)", // Line color
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Light fill color under the line
        fill: true, // Fill the area under the line
        tension: 0.4, // Smooth the line
        borderWidth: 2, // Border width of the line
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow chart to take full height of container
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Earnings Over Time", // Chart title
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Earnings ($)', // Title for the y-axis
        },
        ticks: {
          callback: (value) => `$${value}`, // Format y-axis ticks as dollar values
        },
      },
      x: {
        title: {
          display: true,
          text: 'Time', // Title for the x-axis
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default LineChart;
