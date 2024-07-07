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
import { CalculationResult } from '../ui/calculator/types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CompoundInterestCalculator: React.FC = () => {
  const [initialInvestment, setInitialInvestment] = useState<number | string>(
    1000
  );
  const [monthlyContribution, setMonthlyContribution] = useState<
    number | string
  >(100);
  const [annualInterestRate, setAnnualInterestRate] = useState<number | string>(
    7
  );
  const [years, setYears] = useState<number | string>(10);
  const [results, setResults] = useState<CalculationResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const calculateCompoundInterest = () => {
    setIsLoading(true);
    setTimeout(() => {
      const initialInvestmentNum = Number(initialInvestment);
      const monthlyContributionNum = Number(monthlyContribution);
      const annualInterestRateNum = Number(annualInterestRate);
      const yearsNum = Number(years);

      let balance = initialInvestmentNum;
      const monthlyRate = annualInterestRateNum / 12 / 100;
      const dataPoints: { year: number; balance: number }[] = [];

      for (let year = 0; year <= yearsNum; year++) {
        dataPoints.push({
          year,
          balance: Math.round(balance),
        });

        for (let month = 0; month < 12; month++) {
          balance += monthlyContributionNum;
          balance *= 1 + monthlyRate;
        }
      }

      setResults({
        finalBalance: Math.round(balance),
        totalContributions: initialInvestmentNum + monthlyContributionNum * 12 * yearsNum,
        totalInterest: Math.round(balance - initialInvestmentNum - monthlyContributionNum * 12 * yearsNum),
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
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'rgb(255, 255, 255)', // Adjust according to your theme
        },
      },
      title: {
        display: true,
        text: 'Compound Interest Growth',
        color: 'rgb(255, 255, 255)', // Adjust according to your theme
        font: {
          size: 18,
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
          color: 'rgb(255, 255, 255)', // Adjust according to your theme
        },
        ticks: {
          color: 'rgb(255, 255, 255)', // Adjust according to your theme
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // Adjust according to your theme
        },
      },
      y: {
        title: {
          display: true,
          text: 'Amount ($)',
          color: 'rgb(255, 255, 255)', // Adjust according to your theme
        },
        ticks: {
          callback: function(value: number) {
            if (value >= 1000000) {
              return (value / 1000000).toFixed(1) + 'M'; // Convert to millions
            } else if (value >= 1000) {
              return (value / 1000).toFixed(1) + 'K'; // Convert to thousands
            }
            return value;
          },
          color: 'rgb(255, 255, 255)', // Adjust according to your theme
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // Adjust according to your theme
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
