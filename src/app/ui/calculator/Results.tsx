import React from 'react';
import { Line } from 'react-chartjs-2';
import { CalculationResult } from './types';

interface ResultsProps {
  results: CalculationResult | null;
  chartData: any;
  chartOptions: any;
  generateShareableImage: () => void;
}

const Results: React.FC<ResultsProps> = ({
  results,
  chartData,
  chartOptions,
  generateShareableImage,
}) => {
  if (!results) return null;

  return (
    <>
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Results</h2>
        <p className="text-center text-xl">Final Balance: ${results.finalBalance.toLocaleString()}</p>
        <p className="text-center text-xl">Total Contributions: ${results.totalContributions.toLocaleString()}</p>
        <p className="text-center text-xl">Total Interest Earned: ${results.totalInterest.toLocaleString()}</p>
          <div className="w-full h-auto flex justify-center my-6">
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
  );
};

export default Results;
