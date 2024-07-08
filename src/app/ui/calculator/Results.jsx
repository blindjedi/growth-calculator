import React from 'react';
import { Line } from 'react-chartjs-2';

const Results = ({ results, chartData, chartOptions }) => {
  if (!results) return null;

  return (
    <div className="mt-8">
      <h2 className="text-3xl font-bold mb-4 text-center">Results</h2>
      <div className="bg-gray-100 p-4 rounded-lg shadow-lg dark:bg-gray-800">
        <div className="stats text-center">
          <div className="stat">
            <div className="stat-title">Final Balance</div>
            <div className="stat-value text-2xl">${results.finalBalance.toLocaleString()}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Total Contributions</div>
            <div className="stat-value text-2xl">${results.totalContributions.toLocaleString()}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Total Interest Earned</div>
            <div className="stat-value text-2xl">${results.totalInterest.toLocaleString()}</div>
          </div>
        </div>
      </div>
      <div className="w-full h-96 flex justify-center my-6">
        <Line options={chartOptions} data={chartData} />
      </div>
    </div>
  );
};

export default Results;
