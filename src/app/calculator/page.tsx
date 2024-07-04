'use client';
import React, { useState, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import html2canvas from 'html2canvas';
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
  const [initialInvestment, setInitialInvestment] = useState<number | string>(1000);
  const [monthlyContribution, setMonthlyContribution] = useState<number | string>(100);
  const [annualInterestRate, setAnnualInterestRate] = useState<number | string>(7);
  const [years, setYears] = useState<number | string>(10);
  const [results, setResults] = useState<CalculationResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const shareableRef = useRef<HTMLDivElement>(null);

  const calculateCompoundInterest = () => {
    setIsLoading(true);
    setTimeout(() => {
      let balance = initialInvestment;
      const monthlyRate = annualInterestRate / 12 / 100;
      const dataPoints: { year: number; balance: number }[] = [];

      for (let year = 0; year <= years; year++) {
        dataPoints.push({
          year,
          balance: Math.round(balance)
        });

        for (let month = 0; month < 12; month++) {
          balance += monthlyContribution;
          balance *= (1 + monthlyRate);
        }
      }

      setResults({
        finalBalance: Math.round(balance),
        totalContributions: initialInvestment + (monthlyContribution * 12 * years),
        totalInterest: Math.round(balance - initialInvestment - (monthlyContribution * 12 * years)),
        dataPoints
      });
      setIsLoading(false);
    });
  };

  const generateShareableImage = async () => {
    if (shareableRef.current) {
      const canvas = await html2canvas(shareableRef.current);
      const image = canvas.toDataURL("image/png");
      const link = document.createElement('a');
      link.href = image;
      link.download = 'compound-interest-results.png';
      link.click();
    }
  };

  const chartData = {
    labels: results?.dataPoints.map(point => point.year) || [],
    datasets: [
      {
        label: 'Balance',
        data: results?.dataPoints.map(point => point.balance) || [],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
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
      <h1 className="text-3xl font-bold mb-6 text-center">Compound Interest Calculator</h1>
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
      ) : (
        results ? (
          <Results
            results={results}
            chartData={chartData}
            chartOptions={chartOptions}
            generateShareableImage={generateShareableImage}
          />
        ) : (
          <LoadingSkeleton />
        )
      )}
    </div>
  );
};


export default CompoundInterestCalculator;
