export function calculateResidualEffects(rRate, pV, tIY, forecastYears) {
    const baseMonthlyContribution = 1000;
    const effectiveMonthlyContribution = baseMonthlyContribution * (rRate / 100);
    const yearlyContribution = effectiveMonthlyContribution * 12;
    const factor = (pV / 50000 + tIY / 10) / 2;
    const initialResidualPrincipal = yearlyContribution * 0.075 * factor;
    const residualContribution = yearlyContribution * 0.07815 * factor;
    const residualRate = 6.02;
    const results = [];
    let currentPrincipal = initialResidualPrincipal;
    let cumulativeInterestsLost = 0;
  
    for (let i = 1; i <= forecastYears; i++) {
      const year = 2025 + i - 1;
      const interestEarned = currentPrincipal * (residualRate / 100);
      cumulativeInterestsLost += interestEarned;
      results.push({
        year,
        principal: Math.round(currentPrincipal),
        annualReturnRate: residualRate,
        forecastYears: i,
        totalInterestsLost: Math.round(cumulativeInterestsLost),
      });
      currentPrincipal = currentPrincipal + interestEarned + residualContribution;
    }
    return results;
  }
  