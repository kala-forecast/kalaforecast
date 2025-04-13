export const WorkpaperS1 = {
  id: 'S1',
  name: 'Scenario #1 - 30% drop in return rate',
  inputs: {
    scenarioName: 'Base Scenario',
    presentValue: 50000,
    interestRate: 4.2,
    termYears: 30,
    monthlyContribution: 100.0,
    yearRange: [1, 30],
  },
  calculations: {
    // calculate stress effects for S1
    // for each year, get interest earned, reinvest part of it, and update the balance
    stressEffects: (inputs) => {
      const results = [];
      let currentBalance = inputs.presentValue;
      const decimalRate = inputs.interestRate / 100;
      const reinvestmentRate = inputs.monthlyContribution / 100;

      for (let year = inputs.yearRange[0]; year <= inputs.yearRange[1]; year++) {
        const interestEarned = currentBalance * decimalRate;
        const reinvested = interestEarned * reinvestmentRate;
        const newBalance = currentBalance + reinvested;

        results.push({
          year,
          balance: Math.round(currentBalance),
          yearlyContribution: Math.round(reinvested),
          interestEarned: Math.round(interestEarned),
          newBalance: Math.round(newBalance),
        });
        currentBalance = newBalance;
      }
      return results;
    },
    // get residual effects for S1
    // use stress results to estimate interest lost on 30% of balance each year
    residualEffects: (stressResults) => stressResults.map((row, index) => {
      const principal = row.balance * 0.3;
      const annualReturn = 6.02;
      const interestLost = principal * (annualReturn / 100);

      return {
        year: 2025 + index,
        principal: Math.round(principal),
        annualReturnRate: annualReturn,
        forecastYear: index + 1,
        totalInterestsLost: Math.round(interestLost),
      };
    }),
  },
};

export const WorkpaperS2 = {
  id: 'S2',
  name: 'Scenario #2 - 60% sustained drop',
  inputs: {
    scenarioName: 'Revenue Decline Scenario',
    revenueDecreasePercent: 2.25,
    baseRevenue: 153034,
    forecastYears: 12,
  },
  calculations: {
    // get stress effects for S2:
    // sim yearly revenue drop by using decrease rate to current revenue
    stressEffects: (inputs) => {
      const results = [];
      let currentRevenue = inputs.baseRevenue;
      const decreaseRate = inputs.revenueDecreasePercent / 100;

      for (let year = 1; year <= inputs.forecastYears; year++) {
        const decrease = currentRevenue * decreaseRate;
        results.push({
          year: 2024 + year,
          totalRevenue: Math.round(currentRevenue),
          decreaseInRevenue: Math.round(decrease),
        });
        currentRevenue -= decrease;
      }
      return results;
    },
    // get residual effects for S2
    // get interest lost based on the yearly revenue decrease
    residualEffects: (stressResults) => {
      let cumulativeLoss = 0;
      return stressResults.map((row, index) => {
        const principal = row.decreaseInRevenue;
        const annualReturn = 6.02;
        const interestLost = principal * (annualReturn / 100);
        cumulativeLoss += interestLost;

        return {
          year: row.year,
          principal: Math.round(principal),
          annualReturnRate: annualReturn,
          forecastYear: index + 1,
          totalInterestsLost: Math.round(cumulativeLoss),
        };
      });
    },
  },
};

export const WorkpaperS3 = {
  id: 'S3',
  name: 'Scenario #3 - One-time "X" event',
  inputs: {
    scenarioName: 'Emergency Event Scenario',
    expenses: Array.from({ length: 12 }, (_, i) => ({
      year: 2025 + i,
      amount: i === 5 ? 50000 : 0,
    })),
  },
  calculations: {
    // get stress effects for S3
    // map each expense event to its respective year
    stressEffects: (inputs) => inputs.expenses.map((expense) => ({
      year: expense.year,
      increaseInExpenses: expense.amount,
    })),
    // get residual effects for S3
    // get cumulative loss based on increased expenses over remaining years
    residualEffects: (stressResults) => {
      let cumulativeLoss = 0;
      const annualReturn = 6.02;

      return stressResults.map((row, index) => {
        const principal = -row.increaseInExpenses;
        let yearLoss = 0;

        if (principal < 0) {
          const remainingYears = stressResults.length - index;
          yearLoss = principal * (annualReturn / 100) * remainingYears;
        }

        cumulativeLoss += yearLoss;

        return {
          year: row.year,
          principal: principal,
          annualReturnRate: annualReturn,
          forecastYear: index + 1,
          totalInterestsLost: Math.round(cumulativeLoss),
        };
      });
    },
  },
};
