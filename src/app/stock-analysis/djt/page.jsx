'use client';

import React from 'react';
import { TrendingUp, DollarSign, ArrowUp, ArrowDown, Calendar } from 'lucide-react';
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
  { date: 'Jun 20', price: 26.75 },
  { date: 'Jun 24', price: 33.52 },
  { date: 'Jul 1', price: 33.08 },
  { date: 'Jul 8', price: 30.32 },
  { date: 'Jul 15', price: 40.58 },
  { date: 'Jul 19', price: 34.99 },
];

const DJTPerformanceChart = () => {
  const chartData = {
    labels: data.map(item => item.date),
    datasets: [
      {
        label: 'Stock Price',
        data: data.map(item => item.price),
        borderColor: 'rgb(255, 215, 0)',
        backgroundColor: 'rgba(255, 215, 0, 0.5)',
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 5,
        pointBackgroundColor: 'rgb(255, 215, 0)',
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'DJT Stock Price (Last Month)',
        font: {
          size: 16,
          weight: 'bold'
        },
        color: 'white',
        padding: 10
      }
    },
    scales: {
      y: {
        min: 25,
        max: 45,
        ticks: {
          color: 'white',
          font: {
            size: 12,
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
            size: 12,
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
    <div className="bg-gradient-to-br from-red-600 to-blue-600 p-4 sm:p-6 rounded-3xl shadow-2xl max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto mt-6 text-white">
      <div className="flex items-center justify-center mb-4">
        <h1 className="text-2xl sm:text-4xl font-bold text-center">DJT Stock Spotlight</h1>
      </div>
      <p className="text-center text-sm sm:text-xl mb-4 sm:mb-6">Performance Update | July 19, 2024</p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
        <div className="bg-white bg-opacity-20 p-2 sm:p-4 rounded-xl shadow-lg backdrop-blur-md">
          <TrendingUp className="text-green-300 mb-1 sm:mb-2" size={24} />
          <p className="text-xs sm:text-sm">1-Month Change</p>
          <p className="text-lg sm:text-2xl font-bold text-green-300">+30.00%</p>
        </div>
        <div className="bg-white bg-opacity-20 p-2 sm:p-4 rounded-xl shadow-lg backdrop-blur-md">
          <Calendar className="text-yellow-300 mb-1 sm:mb-2" size={24} />
          <p className="text-xs sm:text-sm">1-Year Change</p>
          <p className="text-lg sm:text-2xl font-bold text-yellow-300">+100.00%</p>
        </div>
        <div className="bg-white bg-opacity-20 p-2 sm:p-4 rounded-xl shadow-lg backdrop-blur-md">
          <ArrowDown className="text-red-300 mb-1 sm:mb-2" size={24} />
          <p className="text-xs sm:text-sm">5-Day Change</p>
          <p className="text-lg sm:text-2xl font-bold text-red-300">-24.00%</p>
        </div>
        <div className="bg-white bg-opacity-20 p-2 sm:p-4 rounded-xl shadow-lg backdrop-blur-md">
          <DollarSign className="text-blue-300 mb-1 sm:mb-2" size={24} />
          <p className="text-xs sm:text-sm">Current Price</p>
          <p className="text-lg sm:text-2xl font-bold text-blue-300">$34.99</p>
        </div>
        <div className="bg-white bg-opacity-20 p-2 sm:p-4 rounded-xl shadow-lg backdrop-blur-md">
          <ArrowUp className="text-purple-300 mb-1 sm:mb-2" size={24} />
          <p className="text-xs sm:text-sm">1-Month High</p>
          <p className="text-lg sm:text-2xl font-bold text-purple-300">$40.58</p>
        </div>
        <div className="bg-white bg-opacity-20 p-2 sm:p-4 rounded-xl shadow-lg backdrop-blur-md">
          <ArrowDown className="text-pink-300 mb-1 sm:mb-2" size={24} />
          <p className="text-xs sm:text-sm">1-Month Low</p>
          <p className="text-lg sm:text-2xl font-bold text-pink-300">$26.75</p>
        </div>
      </div>
      
      <div className="bg-white bg-opacity-10 p-2 sm:p-4 rounded-xl shadow-lg backdrop-blur-md mb-4 sm:mb-6" style={{height: '300px'}}>
        <Line options={options} data={chartData} />
      </div>
      
      <div className="text-center">
        <p className="mb-2 text-sm sm:text-lg">DJT stock shows high volatility: +30% in 1 month, +100% in 1 year, but -24% in the last 5 days.</p>
        <p className="font-semibold text-base sm:text-xl">Market sentiment appears mixed with significant price fluctuations.</p>
      </div>
      
      <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm opacity-75">
        <p>Follow @thematt6js for more market insights!</p>
      </div>
    </div>
  );
};

export default DJTPerformanceChart;