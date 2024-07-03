export interface CalculationResult {
    finalBalance: number;
    totalContributions: number;
    totalInterest: number;
    dataPoints: { year: number; balance: number }[];
  }
  