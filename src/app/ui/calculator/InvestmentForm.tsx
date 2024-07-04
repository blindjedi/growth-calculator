import React, { useState } from 'react';

interface InvestmentFormProps {
  initialInvestment: number | string;
  setInitialInvestment: (value: number | string) => void;
  monthlyContribution: number | string;
  setMonthlyContribution: (value: number | string) => void;
  annualInterestRate: number | string;
  setAnnualInterestRate: (value: number | string) => void;
  years: number | string;
  setYears: (value: number | string) => void;
  onCalculate: () => void;
}

const InvestmentForm: React.FC<InvestmentFormProps> = ({
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
  const [initialInvestmentError, setInitialInvestmentError] = useState<string>('');
  const [monthlyContributionError, setMonthlyContributionError] = useState<string>('');
  const [annualInterestRateError, setAnnualInterestRateError] = useState<string>('');
  const [yearsError, setYearsError] = useState<string>('');

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setter: (value: number | string) => void,
    setError: (message: string) => void
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
        className={`col-span-1 md:col-span-2 w-full p-2 rounded ${
          !!initialInvestmentError ||
          !!monthlyContributionError ||
          !!annualInterestRateError ||
          !!yearsError ||
          initialInvestment === '' ||
          monthlyContribution === '' ||
          annualInterestRate === '' ||
          years === ''
            ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
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
