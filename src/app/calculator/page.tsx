'use client';
import React, { useState, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import html2canvas from 'html2canvas';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface CalculationResult {
  finalBalance: number;
  totalContributions: number;
  totalInterest: number;
  dataPoints: { year: number; balance: number }[];
}

const CompoundInterestCalculator: React.FC = () => {
  const [initialInvestment, setInitialInvestment] = useState<number>(1000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(100);
  const [annualInterestRate, setAnnualInterestRate] = useState<number>(7);
  const [years, setYears] = useState<number>(10);
  const [results, setResults] = useState<CalculationResult | null>(null);
  const shareableRef = useRef<HTMLDivElement>(null);

  const calculateCompoundInterest = () => {
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block mb-2">Initial Investment ($)</label>
          <input
            type="number"
            value={initialInvestment}
            onChange={(e) => setInitialInvestment(Number(e.target.value))}
            className="w-full p-2 border rounded text-black"
          />
        </div>
        <div>
          <label className="block mb-2">Monthly Contribution ($)</label>
          <input
            type="number"
            value={monthlyContribution}
            onChange={(e) => setMonthlyContribution(Number(e.target.value))}
            className="w-full p-2 border rounded text-black"
          />
        </div>
        <div>
          <label className="block mb-2">Annual Interest Rate (%)</label>
          <input
            type="number"
            value={annualInterestRate}
            onChange={(e) => setAnnualInterestRate(Number(e.target.value))}
            className="w-full p-2 border rounded text-black"
          />
        </div>
        <div>
          <label className="block mb-2">Investment Period (years)</label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full p-2 border rounded text-black"
          />
        </div>
      </div>
      <button
        onClick={calculateCompoundInterest}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Calculate
      </button>{results && (
        <>
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Results</h2>
            <p className='text-center text-xl'>Final Balance: ${results.finalBalance.toLocaleString()}</p>
            <p className='text-center text-xl'>Total Contributions: ${results.totalContributions.toLocaleString()}</p>
            <p className='text-center text-xl'>Total Interest Earned: ${results.totalInterest.toLocaleString()}</p>
            <div className="mt-12 h-80">
              <Line options={chartOptions} data={chartData} />
            </div>
          </div>

          <button
            onClick={generateShareableImage}
            className="mt-4 w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Generate Shareable Image
          </button>
        </>
      )}
    </div>
  );
};

export default CompoundInterestCalculator;