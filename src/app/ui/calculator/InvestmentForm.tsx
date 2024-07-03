import React from 'react';

interface InvestmentFormProps {
  initialInvestment: number;
  setInitialInvestment: (value: number) => void;
  monthlyContribution: number;
  setMonthlyContribution: (value: number) => void;
  annualInterestRate: number;
  setAnnualInterestRate: (value: number) => void;
  years: number;
  setYears: (value: number) => void;
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
  return (
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
      <button
        onClick={onCalculate}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Calculate
      </button>
    </div>
  );
};

export default InvestmentForm;
