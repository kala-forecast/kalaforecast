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
    stressEffects: (inputs) => inputs.expenses.map(expense => ({
      year: expense.year,
      increaseInExpenses: expense.amount,
    })),
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

export const WorkpaperS4 = {
  id: 'S4',
  name: 'Scenario #4 - 2.5% Operating Expenses Increase',
  inputs: {
    scenarioName: 'Operating Expenses Scenario',
    operatingExpensePercent: 2.5,
    baseExpenses: {
      2025: 52589,
      2026: 52564,
      2027: 52930,
      2028: 52694,
      2029: 52729,
      2030: 52785,
      2031: 52736,
      2032: 52750,
      2033: 52757,
      2034: 52748,
      2035: 52752,
      2036: 52752,
    },
  },
  calculations: {
    stressEffects: (inputs) => Object.entries(inputs.baseExpenses).map(([year, expense]) => {
      const increase = expense * (inputs.operatingExpensePercent / 100);
      return {
        year: parseInt(year, 10),
        totalExpense: expense,
        increaseInExpenses: Math.round(increase),
        newTotal: Math.round(expense + increase),
      };
    }).sort((a, b) => a.year - b.year),
    residualEffects: (stressResults) => {
      let cumulativeLoss = 0;
      const annualReturn = 6.02;

      return stressResults.map((row, index) => {
        const principal = -row.increaseInExpenses;
        const remainingYears = stressResults.length - index;
        const yearLoss = principal * (annualReturn / 100) * remainingYears;
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

export const WorkpaperS5 = {
  id: 'S5',
  name: 'Scenario #5 - Bond Return Decrease',
  inputs: {
    scenarioName: 'Debt Service Scenario',
    presentValue: 5000,
    interestRate: 6.0,
    termYears: 24,
    monthlyContribution: 100.0,
    fullyFunded: 100,
  },
  calculations: {
    stressEffects: (inputs) => {
      const results = [];
      let currentBalance = inputs.presentValue;
      const monthlyRate = inputs.interestRate / 100 / 12;
      const loanPayment = currentBalance * monthlyRate / (1 - (1 + monthlyRate) ** (-inputs.termYears * 12));
      const decimalRate = inputs.interestRate / 100;
      const reinvestmentRate = inputs.monthlyContribution / 100;

      for (let year = 1; year <= inputs.termYears; year++) {
        const interestEarned = currentBalance * decimalRate;
        const reinvested = interestEarned * reinvestmentRate;
        const principalPayment = loanPayment - (currentBalance * monthlyRate);
        const newBalance = currentBalance + reinvested - principalPayment;

        results.push({
          year,
          balance: Math.round(currentBalance),
          yearlyContribution: Math.round(reinvested),
          interestEarned: Math.round(interestEarned),
          loanPayment: Math.round(loanPayment),
          principalPayment: Math.round(principalPayment),
          newBalance: Math.round(newBalance),
        });

        currentBalance = newBalance;
      }
      return results;
    },
    residualEffects: (stressResults, inputs) => {
      let cumulativeLoss = 0;
      const annualReturn = 6.02;

      return stressResults.map((row) => {
        const principal = row.balance * (inputs.fullyFunded / 100);
        const interestLost = principal * (annualReturn / 100);
        cumulativeLoss += interestLost;

        return {
          year: row.year,
          principal: Math.round(principal),
          annualReturnRate: annualReturn,
          forecastYear: row.year,
          totalInterestsLost: Math.round(cumulativeLoss),
        };
      });
    },
  },
};

export const WorkpaperS5A = {
  id: 'S5A',
  name: 'Loan Calculator I',
  inputs: {
    scenarioName: 'Loan Analysis',
    loanAmount: 5000,
    annualInterestRate: 6.0,
    loanPeriodYears: 24,
    startDate: new Date('2025-01-30'),
  },
  calculations: {
    stressEffects: (inputs) => {
      const monthlyRate = inputs.annualInterestRate / 100 / 12;
      const numberOfPayments = inputs.loanPeriodYears * 12;
      const monthlyPayment = (inputs.loanAmount * monthlyRate) / (1 - (1 + monthlyRate) ** -numberOfPayments);

      const schedule = [];
      let balance = inputs.loanAmount;
      const currentDate = new Date(inputs.startDate);
      let totalInterest = 0;

      for (let i = 0; i < numberOfPayments; i++) {
        const interest = balance * monthlyRate;
        const principal = monthlyPayment - interest;
        totalInterest += interest;

        schedule.push({
          paymentNumber: i + 1,
          paymentDate: new Date(currentDate),
          beginningBalance: balance,
          payment: monthlyPayment,
          principal: principal,
          interest: interest,
          endingBalance: balance - principal,
        });

        balance -= principal;
        currentDate.setMonth(currentDate.getMonth() + 1);
      }

      return {
        monthlyPayment: monthlyPayment,
        numberOfPayments: numberOfPayments,
        totalInterest: totalInterest,
        totalCost: inputs.loanAmount + totalInterest,
        schedule: schedule,
      };
    },
    residualEffects: (loanData) => {
      const annualSummary = {};
      loanData.schedule.forEach(payment => {
        const year = payment.paymentDate.getFullYear();
        if (!annualSummary[year]) annualSummary[year] = 0;
        annualSummary[year] += payment.interest;
      });

      return Object.entries(annualSummary).map(([year, interest]) => ({
        year: parseInt(year, 10),
        totalInterest: interest,
        averageMonthlyInterest: interest / 12,
      }));
    },
  },
};

export const WorkpaperS5B = {
  id: 'S5B',
  name: 'Loan Calculator II',
  inputs: {
    scenarioName: 'Loan Analysis',
    loanAmount: 5000,
    annualInterestRate: 2.0,
    loanPeriodYears: 24,
    startDate: new Date('2025-01-30'),
  },
  calculations: {
    stressEffects: (inputs) => {
      const monthlyRate = inputs.annualInterestRate / 100 / 12;
      const numberOfPayments = inputs.loanPeriodYears * 12;
      const monthlyPayment = (inputs.loanAmount * monthlyRate) / (1 - (1 + monthlyRate) ** -numberOfPayments);

      const schedule = [];
      let balance = inputs.loanAmount;
      const currentDate = new Date(inputs.startDate);
      let totalInterest = 0;

      currentDate.setMonth(currentDate.getMonth() + 1);

      for (let i = 0; i < numberOfPayments; i++) {
        const interest = balance * monthlyRate;
        const principal = monthlyPayment - interest;
        totalInterest += interest;

        schedule.push({
          paymentNumber: i + 1,
          paymentDate: new Date(currentDate),
          beginningBalance: balance,
          payment: monthlyPayment,
          principal: principal,
          interest: interest,
          endingBalance: balance - principal,
        });

        balance -= principal;
        currentDate.setMonth(currentDate.getMonth() + 1);
      }

      return {
        monthlyPayment: monthlyPayment,
        numberOfPayments: numberOfPayments,
        totalInterest: totalInterest,
        totalCost: inputs.loanAmount + totalInterest,
        schedule: schedule,
      };
    },
    residualEffects: (loanData) => {
      const annualSummary = {};
      loanData.schedule.forEach(payment => {
        const year = payment.paymentDate.getFullYear();
        if (!annualSummary[year]) annualSummary[year] = 0;
        annualSummary[year] += payment.interest;
      });

      return Object.entries(annualSummary).map(([year, interest]) => ({
        year: parseInt(year, 10),
        totalInterest: interest,
        averageMonthlyInterest: interest / 12,
      }));
    },
  },
};
