import React from 'react';
import { Line } from 'react-chartjs-2';

const Results = ({ results, chartData, chartOptions }) => {
  if (!results) return null;

  const getContributions = (index) => {
    return results.totalContributions / results.dataPoints.length * (index + 1);
  };

  const getInterest = (balance, contributions) => {
    return balance - contributions;
  };

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
      <div className="mt-8">
        <h2 className="text-3xl font-bold mb-4 text-center">Yearly Breakdown</h2>
        <div className="overflow-x-auto w-full">
          <table className="table-auto w-full text-center text-sm">
            <thead>
              <tr>
                <th className="border-b-2 border-gray-300 px-2 py-1 dark:border-gray-600">Year</th>
                <th className="border-b-2 border-gray-300 px-2 py-1 dark:border-gray-600">Balance</th>
                <th className="border-b-2 border-gray-300 px-2 py-1 dark:border-gray-600">Contributions</th>
                <th className="border-b-2 border-gray-300 px-2 py-1 dark:border-gray-600">Interest</th>
              </tr>
            </thead>
            <tbody>
              {results.dataPoints.map((point, index) => {
                const contributions = getContributions(index);
                const interest = getInterest(point.balance, contributions);
                return (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-100 dark:bg-gray-700' : 'dark:bg-gray-800'}>
                    <td className="px-2 py-1 whitespace-nowrap dark:text-gray-200">{point.year + 1}</td> {/* Adjusted year to start from 1 */}
                    <td className="px-2 py-1 whitespace-nowrap dark:text-gray-200">${point.balance.toLocaleString()}</td>
                    <td className="px-2 py-1 whitespace-nowrap dark:text-gray-200">${contributions.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td className="px-2 py-1 whitespace-nowrap dark:text-gray-200">${interest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Results;
