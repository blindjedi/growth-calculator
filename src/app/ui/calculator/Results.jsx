import React from 'react';
import { Line } from 'react-chartjs-2';

const Results = ({ results, chartData, chartOptions }) => {
  if (!results) return null;

  return (
    <>
      <div className="mt-8">
        <h2 className="text-3xl font-bold mb-4 text-center">Results</h2>
        <p className="text-center text-2xl mb-2">Final Balance: ${results.finalBalance.toLocaleString()}</p>
        <p className="text-center text-2xl mb-2">Total Contributions: ${results.totalContributions.toLocaleString()}</p>
        <p className="text-center text-2xl mb-6">Total Interest Earned: ${results.totalInterest.toLocaleString()}</p>
        <div className="w-full h-96 flex justify-center my-6">
          <Line options={chartOptions} data={chartData} />
        </div>
      </div>
    </>
  );
};

export default Results;
