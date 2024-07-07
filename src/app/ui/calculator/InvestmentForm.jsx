import React, { useState } from 'react';
import clsx from 'clsx';

const InvestmentForm = ({
  initialInvestment,
  setInitialInvestment,
  monthlyContribution,
  setMonthlyContribution,
  annualInterestRate,
  setAnnualInterestRate,
  years,
  setYears,
  onCalculate,
}) => {
  const [initialInvestmentError, setInitialInvestmentError] = useState('');
  const [monthlyContributionError, setMonthlyContributionError] = useState('');
  const [annualInterestRateError, setAnnualInterestRateError] = useState('');
  const [yearsError, setYearsError] = useState('');

  const handleInputChange = (
    event,
    setter,
    setError
  ) => {
    const value = event.target.value;
    if (value === '') {
      setter('');
      setError('This field is required');
    } else if (value === '-') {
      setter(value);
      setError('');
    } else if (!isNaN(Number(value))) {
      setter(Number(value));
      setError('');
    } else {
      setter('');
      setError('Please enter a valid number');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div>
        <label className="block mb-2">Initial Investment ($)</label>
        <input
          type="text"
          value={initialInvestment.toString()}
          onChange={(e) => handleInputChange(e, setInitialInvestment, setInitialInvestmentError)}
          className="w-full p-2 border rounded text-black"
        />
        {initialInvestmentError && <p className="text-red-500 text-sm">{initialInvestmentError}</p>}
      </div>
      <div>
        <label className="block mb-2">Monthly Contribution ($)</label>
        <input
          type="text"
          value={monthlyContribution.toString()}
          onChange={(e) => handleInputChange(e, setMonthlyContribution, setMonthlyContributionError)}
          className="w-full p-2 border rounded text-black"
        />
        {monthlyContributionError && <p className="text-red-500 text-sm">{monthlyContributionError}</p>}
      </div>
      <div>
        <label className="block mb-2">Annual Interest Rate (%)</label>
        <input
          type="text"
          value={annualInterestRate.toString()}
          onChange={(e) => handleInputChange(e, setAnnualInterestRate, setAnnualInterestRateError)}
          className="w-full p-2 border rounded text-black"
        />
        {annualInterestRateError && <p className="text-red-500 text-sm">{annualInterestRateError}</p>}
      </div>
      <div>
        <label className="block mb-2">Investment Period (years)</label>
        <input
          type="text"
          value={years.toString()}
          onChange={(e) => handleInputChange(e, setYears, setYearsError)}
          className="w-full p-2 border rounded text-black"
        />
        {yearsError && <p className="text-red-500 text-sm">{yearsError}</p>}
      </div>
      <button
        onClick={onCalculate}
        className={clsx(
          "col-span-1 md:col-span-2 w-full p-2 rounded mt-2", // Base Classes
          {
            // Conditional Classes
            "bg-gray-500 text-gray-300 cursor-not-allowed": !!initialInvestmentError ||
            !!monthlyContributionError ||
            !!annualInterestRateError ||
            !!yearsError ||
            initialInvestment === '' ||
            monthlyContribution === '' ||
            annualInterestRate === '' ||
            years === '',
            "bg-blue-500 text-white hover:bg-blue-600": !initialInvestmentError &&
            !monthlyContributionError &&
            !annualInterestRateError &&
            !yearsError &&
            initialInvestment !== '' &&
            monthlyContribution !== '' &&
            annualInterestRate !== '' &&
            years !== ''
          }
        )}
        disabled={
          !!initialInvestmentError ||
          !!monthlyContributionError ||
          !!annualInterestRateError ||
          !!yearsError ||
          initialInvestment === '' ||
          monthlyContribution === '' ||
          annualInterestRate === '' ||
          years === ''
        }
      >
        Calculate
      </button>
    </div>
  );
};

export default InvestmentForm;
