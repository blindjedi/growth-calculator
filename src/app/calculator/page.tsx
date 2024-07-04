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
      },
      title: {
        display: true,
        text: 'Compound Interest Growth',
      },
    },
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
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
