import React from 'react';
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

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const UserChart = ({ data }) => {
  const labels = data.map((item) => item.date);
  const userCounts = data.map((item) => item.count);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Number of Users',
        data: userCounts,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'User Registrations Over Time',
      },
    },
  };

  return (
    <div>
      <h2>User Registration Chart</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default UserChart;
