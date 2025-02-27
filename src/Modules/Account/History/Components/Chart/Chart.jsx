import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2"; // Replacing PureChart
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"; // Required Chart.js imports
import CustomText from "../../../../../Components/CustomText/CustomText";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Chart({ data }) {
  const [chartData, setChartData] = useState(JSON.parse(data));

  return (
    <div className="flex-1 bg-white space-y-4 p-4">
      <Card title="Progressive" data={{ data: chartData.prog, color: "rgba(3, 169, 121, 1)" }} />
      <Card title="None Progressive" data={{ data: chartData.nprogs, color: "rgba(3, 169, 244, 1)" }} />
      <Card title="Immotile" data={{ data: chartData.immotiles, color: "rgba(244, 67, 54, 1)" }} />
    </div>
  );
}

function Card({ title, data }) {
  // Chart.js data configuration
  const chartData = {
    labels: [title], // Single label for simplicity; adjust if data array has multiple labels
    datasets: [
      {
        label: title,
        data: [data.data], // Assuming data.data is a single value; adjust if array
        backgroundColor: data.color,
        borderColor: data.color,
        borderWidth: 1,
      },
    ],
  };

  // Chart.js options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { color: "#D1D1D6" }, // light_gray equivalent
        ticks: { color: "#1B5E20" }, // dark_green equivalent
      },
      y: {
        grid: { color: "#D1D1D6" }, // light_gray equivalent
        ticks: { color: "#388E3C" }, // green equivalent
        beginAtZero: true,
      },
    },
    plugins: {
      legend: { display: false }, // Hide legend for single bar
      tooltip: { enabled: true },
    },
  };

  return (
    <div className="w-full mx-auto my-2 border-t border-b border-blue-800">
      <div className="h-10 flex items-center justify-center bg-gray-200">
        <CustomText className="text-xl text-black font-bold">{title}</CustomText>
      </div>
      <div className="w-full h-[200px]">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}

export default Chart;