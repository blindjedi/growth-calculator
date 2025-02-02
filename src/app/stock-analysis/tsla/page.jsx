'use client';

import React from 'react';
import { TrendingUp, DollarSign, ArrowUp, ArrowDown } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const data = [
  { date: 'Jun 15', price: 177.30 },
  { date: 'Jun 22', price: 189.25 },
  { date: 'Jun 29', price: 212.19 },
  { date: 'Jul 6', price: 231.47 },
  { date: 'Jul 13', price: 248.23 },
  { date: 'Jul 15', price: 248.23 },
];

const TeslaPerformanceChart = () => {
  const chartData = {
    labels: data.map(item => item.date),
    datasets: [
      {
        label: 'Stock Price',
        data: data.map(item => item.price),
        borderColor: 'rgb(0, 255, 255)',
        backgroundColor: 'rgba(0, 255, 255, 0.5)',
        fill: true,
        tension: 0.4,
        borderWidth: 3
      },
      {
        label: '52-Week High',
        data: data.map(() => 299.29),
        borderColor: 'rgb(255, 100, 100)',
        borderDash: [5, 5],
        pointRadius: 0,
        borderWidth: 2
      },
      {
        label: '52-Week Low',
        data: data.map(() => 138.80),
        borderColor: 'rgb(100, 255, 100)',
        borderDash: [5, 5],
        pointRadius: 0,
        borderWidth: 2
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 10,
            weight: 'bold'
          },
          color: 'white',
          padding: 10,
          usePointStyle: true,
          pointStyle: 'rect'
        }
      },
      title: {
        display: true,
        text: 'Tesla Stock Price (Last Month)',
        font: {
          size: 14,
          weight: 'bold'
        },
        color: 'white',
        padding: 10
      }
    },
    scales: {
      y: {
        min: 130,
        max: 310,
        ticks: {
          color: 'white',
          font: {
            size: 10,
            weight: 'bold'
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      x: {
        ticks: {
          color: 'white',
          font: {
            size: 10,
            weight: 'bold'
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-4 sm:p-6 rounded-3xl shadow-2xl max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto mt-6 text-white">
      <div className="flex items-center justify-center mb-4">
        <svg viewBox="0 0 24 24" className="w-8 h-8 sm:w-12 sm:h-12 mr-2 sm:mr-4" fill="currentColor">
          <path d="M21 15l-3-10H6L3 15h18zm-3.75 1.5H6.75c-.41 0-.75.34-.75.75s.34.75.75.75h10.5c.41 0 .75-.34.75-.75s-.34-.75-.75-.75zM4 12l2.25-7.5h11.5L20 12H4z"/>
        </svg>
        <h1 className="text-2xl sm:text-4xl font-bold text-center">Tesla Stock Spotlight</h1>
      </div>
      <p className="text-center text-sm sm:text-xl mb-4 sm:mb-6">1-Month Performance | July 15, 2024</p>
      
      <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-6">
        <div className="bg-white bg-opacity-20 p-2 sm:p-4 rounded-xl shadow-lg backdrop-blur-md">
          <TrendingUp className="text-green-300 mb-1 sm:mb-2" size={24} />
          <p className="text-xs sm:text-sm">1-Month Change</p>
          <p className="text-lg sm:text-2xl font-bold text-green-300">+40.01%</p>
        </div>
        <div className="bg-white bg-opacity-20 p-2 sm:p-4 rounded-xl shadow-lg backdrop-blur-md">
          <DollarSign className="text-yellow-300 mb-1 sm:mb-2" size={24} />
          <p className="text-xs sm:text-sm">Current Price</p>
          <p className="text-lg sm:text-2xl font-bold text-yellow-300">$248.23</p>
        </div>
        <div className="bg-white bg-opacity-20 p-2 sm:p-4 rounded-xl shadow-lg backdrop-blur-md">
          <ArrowUp className="text-red-300 mb-1 sm:mb-2" size={24} />
          <p className="text-xs sm:text-sm">52-Week High</p>
          <p className="text-lg sm:text-2xl font-bold text-red-300">$299.29</p>
        </div>
        <div className="bg-white bg-opacity-20 p-2 sm:p-4 rounded-xl shadow-lg backdrop-blur-md">
          <ArrowDown className="text-blue-300 mb-1 sm:mb-2" size={24} />
          <p className="text-xs sm:text-sm">52-Week Low</p>
          <p className="text-lg sm:text-2xl font-bold text-blue-300">$138.80</p>
        </div>
      </div>
      
      <div className="bg-white bg-opacity-10 p-2 sm:p-4 rounded-xl shadow-lg backdrop-blur-md mb-4 sm:mb-6" style={{height: '300px'}}>
        <Line options={options} data={chartData} />
      </div>
      
      <div className="text-center">
        <p className="mb-2 text-sm sm:text-lg">Tesla&#39;s stock has staged a dramatic recovery, surging by 40.01% over the past month! 🚀</p>
        <p className="font-semibold text-base sm:text-xl">Showcasing Tesla&#39;s resilience and strong market position.</p>
      </div>
      
      <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm opacity-75">
        <p>Follow @thematt6js for more market insights!</p>
      </div>
    </div>
  );
};

export default TeslaPerformanceChart;