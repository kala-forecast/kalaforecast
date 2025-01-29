import React from "react";

const FiscalSustainabilityModel = () => {
  const data = [
    {
      stress: "Stress 1",
      scenario: "Scenario #1 - 30% drop in return rate of Investment",
      priorities: [
        { label: "Decrease in Revenue", subLabel: "Stress Effect" },
        { label: "Residual Effect", subLabel: "Interest Lost" }
      ]
    },
    {
      stress: "Stress 2",
      scenario: "Scenario #2 - 60% sustained drop in return rate of Investment",
      priorities: [
        { label: "Decrease in Revenue", subLabel: "Stress Effect" },
        { label: "Residual Effect", subLabel: "Interest Lost" }
      ]
    },
    {
      stress: "Stress 3",
      scenario: "Scenario #3 - One-time 'X' event of $50,000",
      priorities: [
        { label: "Increase in Expense", subLabel: "Stress Effect" },
        { label: "Residual Effect", subLabel: "Interest Lost" }
      ]
    },
    {
      stress: "Stress 4",
      scenario: "Scenario #4 - Increase 2.5% operating expenses each year",
      priorities: [
        { label: "Increase in Expense", subLabel: "Stress Effect" },
        { label: "Residual Effect", subLabel: "Interest Lost" }
      ]
    },
    {
      stress: "Stress 5",
      scenario: "Scenario #5 - Decrease bond return to 1.7% due to increase in inflation",
      priorities: [
        { label: "Decrease in Revenue", subLabel: "Stress Effect" },
        { label: "Residual Effect", subLabel: "Interest Lost" }
      ]
    }
  ];

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Fiscal Sustainability Model (SM) Analysis</h2>
      <h4 className="text-md font-semibold">Stress Test Analysis</h4>
      <p className="mb-4">Choose "0" = no stress test, "1" = implement stress test</p>
      <div className="overflow-auto max-h-96">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="sticky top-0 bg-green-200 z-10">
            <tr>
              <th className="border border-gray-300 p-2">Stress Test</th>
              <th className="border border-gray-300 p-2">Scenario</th>
              <th className="border border-gray-300 p-2 w-72" colSpan={2}>Decision Priorities</th>
              {[...Array(12).keys()].map((i) => (
                <th key={i} className="border border-gray-300 p-2">Forecast {2025 + i}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <React.Fragment key={index}>
                {row.priorities.map((priority, pIndex) => (
                  <tr key={`${index}-${pIndex}`} className={index % 2 === 0 ? "bg-blue-200" : "bg-white"}>
                    {pIndex === 0 && (
                      <>
                        <td className="border border-gray-300 p-2" rowSpan={2}>{row.stress}</td>
                        <td className="border border-gray-300 p-2" rowSpan={2}>{row.scenario}</td>
                      </>
                    )}
                    <td className="border border-gray-300 p-2 w-72">
                      <div className="flex items-center">
                        <span className="font-semibold mr-2">{priority.label}</span>
                        <select className="text-center ml-auto">
                          <option value="0">0</option>
                          <option value="1">1</option>
                        </select>
                      </div>
                    </td>
                    <td className="border border-gray-300 p-2">{priority.subLabel}</td>
                    {[...Array(12).keys()].map((_, i) => (
                      <td key={i} className="border border-gray-300 p-2">
                        <input type="text" className="w-full text-center" />
                      </td>
                    ))}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FiscalSustainabilityModel;
