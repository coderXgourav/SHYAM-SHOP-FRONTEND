import React from 'react';
import { Line } from 'react-chartjs-2'; // Or any chart library you're using

const SellerEarningsAdmin = ({ orders = [], selectedSeller }) => {
  // Ensure orders is defined and filter based on the selected seller
  const sellerOrders = orders.filter(order =>
    order.productDetails.some(product => product.sellerId._id === selectedSeller)
  );

  // Prepare data for the chart
  const earningsData = sellerOrders.flatMap(order =>
    order.productDetails.map(product => ({
      date: new Date(order.createdAt).toLocaleDateString(),
      earnings: parseFloat(product.earnings),
      commission: parseFloat(product.commission),
    }))
  );

  // Group by date for charting
  const groupedData = earningsData.reduce((acc, { date, earnings, commission }) => {
    acc[date] = acc[date] || { earnings: 0, commission: 0 };
    acc[date].earnings += earnings;
    acc[date].commission += commission;
    return acc;
  }, {});

  const labels = Object.keys(groupedData);
  const earnings = labels.map(label => groupedData[label].earnings);
  const commissions = labels.map(label => groupedData[label].commission);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Earnings',
        data: earnings,
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      },
      {
        label: 'Commission',
        data: commissions,
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: false,
      },
    ],
  };

  return (
    <div>
      <h4>Earnings for Seller</h4>
      <Line data={data} />
    </div>
  );
};

export default SellerEarningsAdmin;
