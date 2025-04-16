import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// eslint-disable-next-line react/prop-types
const forecastValues = {
  "0-0": [900, 1892, 2982, 4180, 5491, 6926, 8494, 10204, 12067, 14094, 16298, 18691], // Stress 1 - Stress Effect
  "0-1": [54, 226, 587, 1221, 2225, 3705, 5786, 8607, 12324, 17114, 23172, 30721],    // Stress 1 - Interest Lost

  "1-0": [3443, 3495, 3547, 3601, 3655, 3709, 3765, 3821, 3879, 3937, 3996, 4056],    // Stress 2 - Stress Effect
  "1-1": [207, 637, 1307, 2234, 3436, 4934, 6749, 8904, 11421, 14327, 17649, 25294],  // Stress 2 - Interest Lost

  "2-0": [null, null, null, null, null, 50000, null, null, null, null, null, null],  // Stress 3 - Stress Effect
  "2-1": [null, null, null, null, null, 3010, 6201, 9585, 13172, 16974, 21006, 25281],// Stress 3 - Interest Lost

  "3-0": [1315, 1314, 1323, 1317, 1318, 1320, 1318, 1319, 1319, 1319, 1319, 1319],    // Stress 4 - Stress Effect
  "3-1": [79, 242, 495, 842, 1289, 1843, 2509, 3295, 4207, 5254, 6443, 7783],         // Stress 4 - Interest Lost

  "4-0": [215, 323, 429, 534, 637, 738, 837, 934, 1027, 1117, 1204, 1287],            // Stress 5 - Stress Effect
  "4-1": [227, 582, 1071, 1810, 2594, 3532, 4632, 5900, 7343, 8970, 10786, 12799],    // Stress 5 - Interest Lost
};


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

  const handleToggleChange = (index) => {
    setToggleStates((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

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

  // Function to export CSV
  const exportToCSV = () => {
    // Create CSV header row
    const forecastYears = Array.from({ length: 12 }, (_, i) => `Forecast ${2025 + i}`);
    const header = [
      'Stress Test',
      'Scenario',
      'Priority Label',
      'Priority SubLabel',
      'Toggle',
      ...forecastYears,
    ];
    const csvRows = [header.join(',')];

    // Loop through data and each priority row
    data.forEach((row, index) => {
      row.priorities.forEach((priority, pIndex) => {
        const toggleKey = `${index}-${pIndex}`;
        const toggleValue = toggleStates[toggleKey] ? 'On' : 'Off';
        // Placeholder empty forecast columns
        const forecastData = Array(12).fill('');
        const csvRow = [
          // Repeat stress and scenario for each priority row
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
            {[...Array(12).keys()].map((i) => (
              <col key={i} style={{ width: '60px' }} /> // Forecast columns
            ))}
          </colgroup>
          <thead className="thead-light">
            <tr>
              <th style={{ backgroundColor: '#ADD8E6', color: 'white' }}>Stress Test</th>
              <th>Scenario</th>
              <th colSpan={2} style={{ minWidth: '300px' }}>
                Decision Priorities
              </th>
              {[...Array(12).keys()].map((i) => (
                <th key={i}>Forecast {2025 + i}</th>
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
                        <td rowSpan={2} style={{ backgroundColor: '#ADD8E6', color: 'white' }}>
                          {row.stress}
                        </td>
                        <td rowSpan={2}>{row.scenario}</td>
                      </>
                    )}
                    <td style={{ minWidth: '200px' }}>
                      <div className="text-center">
                        {/* Toggle button */}
                        <ToggleSwitch
                          value={toggleStates[`${index}-${pIndex}`] || false}
                          onChange={() => handleToggleChange(`${index}-${pIndex}`)}
                        />
                        {/* Label below */}
                        <span className="d-block font-weight-bold mt-2">
                          {priority.label}
                        </span>
                      </div>
                    </td>
                    <td style={{ minWidth: '100px' }}>{priority.subLabel}</td>
                    {[...Array(12).keys()].map((_, i) => (
                        <td key={i} className="text-center">
                        <div
                          style={{
                            width: '100px',
                            minHeight: '38px',
                            lineHeight: '80px',
                            textAlign: 'center',
                            margin: '0 auto',
                          }}
                        >
                          {
                            forecastValues[`${index}-${pIndex}`] !== undefined
                              ? forecastValues[`${index}-${pIndex}`][i] ?? '-'
                              : ''
                          }
                        </div>
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