import React, { useState, useMemo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { calculateResidualEffects } from '../components/calculations'; // <-- Import shared function

// eslint-disable-next-line react/prop-types
const ToggleSwitch = ({ value, onChange }) => (
  <button
    type="button"
    onClick={onChange}
    className={`btn ${value ? 'btn-success' : 'btn-secondary'} rounded-pill`}
    style={{ width: '120px' }} // Wider button
  >
    {value ? 'On' : 'Off'}
  </button>
);

const FiscalSustainabilityModel = () => {
  const [toggleStates, setToggleStates] = useState({});

  // --- New: Local state for calculation inputs ---
  const [presentValue, setPresentValue] = useState(50000);
  const [termInYears, setTermInYears] = useState(10);
  const [monthlyContribution, setMonthlyContribution] = useState(100.0);
  const residualForecastYears = 12;

  // --- New: Compute residual data using the shared calculation function ---
  const residualData = useMemo(() => {
    return calculateResidualEffects(
      monthlyContribution,
      presentValue,
      termInYears,
      residualForecastYears,
    );
  }, [monthlyContribution, presentValue, termInYears, residualForecastYears]);

  const handleToggleChange = (index) => {
    setToggleStates((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  // Original static data for stress tests/scenarios
  const data = [
    {
      stress: 'Stress 1',
      scenario: 'Scenario #1 - 30% drop in return rate of Investment',
      priorities: [
        { label: 'Decrease in Revenue', subLabel: 'Stress Effect' },
        { label: 'Residual Effect', subLabel: 'Interest Lost' },
      ],
    },
    {
      stress: 'Stress 2',
      scenario: 'Scenario #2 - 60% sustained drop in return rate of Investment',
      priorities: [
        { label: 'Decrease in Revenue', subLabel: 'Stress Effect' },
        { label: 'Residual Effect', subLabel: 'Interest Lost' },
      ],
    },
    {
      stress: 'Stress 3',
      scenario: "Scenario #3 - One-time 'X' event of $50,000",
      priorities: [
        { label: 'Increase in Expense', subLabel: 'Stress Effect' },
        { label: 'Residual Effect', subLabel: 'Interest Lost' },
      ],
    },
    {
      stress: 'Stress 4',
      scenario: 'Scenario #4 - Increase 2.5% operating expenses each year',
      priorities: [
        { label: 'Increase in Expense', subLabel: 'Stress Effect' },
        { label: 'Residual Effect', subLabel: 'Interest Lost' },
      ],
    },
    {
      stress: 'Stress 5',
      scenario: 'Scenario #5 - Decrease bond return to 1.7% due to increase in inflation',
      priorities: [
        { label: 'Decrease in Revenue', subLabel: 'Stress Effect' },
        { label: 'Residual Effect', subLabel: 'Interest Lost' },
      ],
    },
  ];

  // (Optional) Update your exportToCSV function if you wish to include the calculated forecast values in the CSV.
  const exportToCSV = () => {
    const forecastYears = residualData.map((item) => `Forecast ${item.year}`);
    const header = [
      'Stress Test',
      'Scenario',
      'Priority Label',
      'Priority SubLabel',
      'Toggle',
      ...forecastYears,
    ];
    const csvRows = [header.join(',')];

    data.forEach((row, index) => {
      row.priorities.forEach((priority, pIndex) => {
        const toggleKey = `${index}-${pIndex}`;
        const toggleValue = toggleStates[toggleKey] ? 'On' : 'Off';
        // Use calculated forecast values for each column
        const forecastData = residualData.map((item) =>
          pIndex === 0 ? item.principal : item.totalInterestsLost,
        );
        const csvRow = [
          `"${row.stress}"`,
          `"${row.scenario}"`,
          `"${priority.label}"`,
          `"${priority.subLabel}"`,
          toggleValue,
          ...forecastData,
        ];
        csvRows.push(csvRow.join(','));
      });
    });

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'fiscal_sustainability_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container p-4">
      <h2 className="mb-2">Fiscal Sustainability Model (SM) Analysis</h2>
      <h4 className="mb-1 text-success">Stress Test Analysis</h4>
      <p className="mb-4">Toggle On = implement stress test, Off = no stress test</p>

      

      {/* Export CSV Button */}
      <button className="btn btn-primary mb-3" onClick={exportToCSV}>
        Export CSV
      </button>

      <div className="table-responsive">
        <table className="table table-bordered">
          {/* Define column widths */}
          <colgroup>
            <col style={{ width: '100px' }} /> {/* Stress Test column */}
            <col style={{ width: '250px' }} /> {/* Scenario column */}
            <col style={{ minWidth: '200px' }} /> {/* Decision Priority: toggle/button & label */}
            <col style={{ minWidth: '100px' }} /> {/* Decision Priority: subLabel */}
            {residualData.map((item) => (
              <col key={item.year} style={{ width: '60px' }} />
            ))}
          </colgroup>
          <thead className="thead-light">
            <tr>
              <th style={{ backgroundColor: '#ADD8E6', color: 'white' }}>Stress Test</th>
              <th>Scenario</th>
              <th colSpan={2} style={{ minWidth: '300px' }}>
                Decision Priorities
              </th>
              {residualData.map((item) => (
                <th key={item.year}>Forecast {item.year}</th>
              ))}
            </tr>
          </thead>
          <tbody>
  {data.map((row, index) => (
    <React.Fragment key={index}>
      {row.priorities.map((priority, pIndex) => (
        <tr key={`${index}-${pIndex}`}>
          {pIndex === 0 && (
            <>
              <td
                rowSpan={row.priorities.length}
                style={{ backgroundColor: '#ADD8E6', color: 'white' }}
              >
                {row.stress}
              </td>
              <td rowSpan={row.priorities.length}>{row.scenario}</td>
            </>
          )}
          <td style={{ minWidth: '200px' }}>
            <div className="text-center">
              <ToggleSwitch
                value={toggleStates[`${index}-${pIndex}`] || false}
                onChange={() => handleToggleChange(`${index}-${pIndex}`)}
              />
              <span className="d-block font-weight-bold mt-2">
                {priority.label}
              </span>
            </div>
          </td>
          <td style={{ minWidth: '100px' }}>{priority.subLabel}</td>
          {/* Forecast columns: Only show calculated data if stress is 'Stress 1'; else blank */}
          {[...Array(residualForecastYears).keys()].map((_, i) => {
            const forecastValue =
              row.stress === 'Stress 1'
                ? (pIndex === 0
                    ? residualData[i].principal
                    : residualData[i].totalInterestsLost)
                : '';
            return (
              <td key={i} className="text-center">
                {typeof forecastValue === 'number'
                  ? forecastValue.toLocaleString()
                  : forecastValue}
              </td>
            );
          })}
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
