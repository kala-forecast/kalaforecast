import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

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

  return (
    <div className="container p-4">
      <h2 className="mb-2">Fiscal Sustainability Model (SM) Analysis</h2>
      <h4 className="mb-1 text-success">Stress Test Analysis</h4>
      <p className="mb-4">Toggle On = implement stress test, Off = no stress test</p>
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
              <th colSpan={2} style={{ minWidth: '300px' }}>Decision Priorities</th>
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
                        {/* Button on top */}
                        <ToggleSwitch
                          value={toggleStates[`${index}-${pIndex}`] || false}
                          onChange={() => handleToggleChange(`${index}-${pIndex}`)}
                        />
                        {/* Label text below */}
                        <span className="d-block font-weight-bold mt-2">
                          {priority.label}
                        </span>
                      </div>
                    </td>
                    <td style={{ minWidth: '100px' }}>{priority.subLabel}</td>
                    {[...Array(12).keys()].map((_, i) => (
                      // eslint-disable-next-line jsx-a11y/control-has-associated-label
                      <td key={i} className="text-center">
                        <input
                          type="text"
                          className="form-control text-center mx-auto"
                          style={{ width: '100px' }}
                        />
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
