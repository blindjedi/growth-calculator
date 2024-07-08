'use client';
import React, { useState } from 'react';
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
import InvestmentForm from '../ui/calculator/InvestmentForm';
import Results from '../ui/calculator/Results';
import LoadingSkeleton from '../ui/skeletons';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CompoundInterestCalculator = () => {
  const [initialInvestment, setInitialInvestment] = useState(1000);
  const [monthlyContribution, setMonthlyContribution] = useState(100);
  const [annualInterestRate, setAnnualInterestRate] = useState(7);
  const [years, setYears] = useState(10);
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const calculateCompoundInterest = () => {
    setIsLoading(true);
    setTimeout(() => {
      const initialInvestmentNum = Number(initialInvestment);
      const monthlyContributionNum = Number(monthlyContribution);
      const annualInterestRateNum = Number(annualInterestRate);
      const yearsNum = Number(years);

      let balance = initialInvestmentNum;
      const monthlyRate = annualInterestRateNum / 12 / 100;
      const dataPoints = [];

      for (let year = 0; year <= yearsNum; year++) {
        for (let month = 0; month < 12; month++) {
          balance += monthlyContributionNum;
          balance *= 1 + monthlyRate;
        }

        // Push the balance at the end of each year
        dataPoints.push({
          year,
          balance: Math.round(balance),
        });
      }

      const finalBalance = Math.round(balance);
      const totalContributions = initialInvestmentNum + monthlyContributionNum * 12 * yearsNum;
      const totalInterest = finalBalance - totalContributions;

      // uncomment for debugging results data points and chart data points
      // console.log('Data Points:', dataPoints);
      // console.log('Final Balance:', finalBalance);

      setResults({
        finalBalance,
        totalContributions,
        totalInterest,
        dataPoints,
      });
      setIsLoading(false);
    }, 500); // Add delay to simulate loading
  };

  const chartData = {
    labels: results?.dataPoints.map((point) => point.year) || [],
    datasets: [
      {
        label: 'Balance',
        data: results?.dataPoints.map((point) => point.balance) || [],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Ensures the chart takes up more space
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14, // Increased font size for legend
          },
        },
      },
      title: {
        display: true,
        text: 'Investment Growth Over Time',
        font: {
          size: 24, // Increased font size for title
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Years',
          font: {
            size: 16, // Increased font size for x-axis title
          },
        },
        ticks: {
          font: {
            size: 14, // Increased font size for x-axis ticks
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Amount ($)',
          font: {
            size: 16, // Increased font size for y-axis title
          },
        },
        ticks: {
          font: {
            size: 14, // Increased font size for y-axis ticks
          },
          callback: function(value) {
            if (value >= 1000000) {
              return (value / 1000000).toFixed(1) + 'M'; // Convert to millions
            } else if (value >= 1000) {
              return (value / 1000).toFixed(1) + 'K'; // Convert to thousands
            }
            return value;
          },
        },
      },
    },
    elements: {
      line: {
        borderDash: [5, 5], // Dashed line style
      },
    },
    animation: {
      duration: 1000, // Animation duration in milliseconds
      easing: 'easeOutBounce', // Animation easing effect
    },
  };
  

  return (
    <div className="max-w-4xl mx-auto p-4 min-h-screen flex flex-col">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Compound Interest Calculator
      </h1>
      <InvestmentForm
        initialInvestment={initialInvestment}
        setInitialInvestment={setInitialInvestment}
        monthlyContribution={monthlyContribution}
        setMonthlyContribution={setMonthlyContribution}
        annualInterestRate={annualInterestRate}
        setAnnualInterestRate={setAnnualInterestRate}
        years={years}
        setYears={setYears}
        onCalculate={calculateCompoundInterest}
      />
      {isLoading ? (
        <LoadingSkeleton />
      ) : results ? (
        <Results
          results={results}
          chartData={chartData}
          chartOptions={chartOptions}
        />
      ) : (
        <LoadingSkeleton />
      )}
    </div>
  );
};

export default CompoundInterestCalculator;
