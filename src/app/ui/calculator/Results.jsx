import React from 'react';
import { Line } from 'react-chartjs-2';

const Results = ({ results, chartData, chartOptions }) => {
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
    </>
  );
};

export default Results;
