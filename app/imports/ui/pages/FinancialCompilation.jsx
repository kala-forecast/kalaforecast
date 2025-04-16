/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { Container, Button, Table, Tabs, Tab, Form, InputGroup } from 'react-bootstrap';
import { CaretRightFill, CaretDownFill, PlusCircle, DashCircle } from 'react-bootstrap-icons';
import { PAGE_IDS } from '../utilities/PageIDs';

const FinancialCompilation = () => {
  const incomeStatementData = [
    {
      id: 1, title: 'Net Sales',
      AuditData: [131345, 142341, 150772],
      expandableRows: [{ id: 100, title: 'Revenue', AuditData: [131345, 142341, 150772] }],
    },
    {
      id: 2, title: 'Cost of Goods Sold',
      AuditData: [49123, 53254, 57310],
      expandableRows: [
        { id: 3, title: 'Cost of Contracting', AuditData: [48456, 52587, 56643] },
        { id: 4, title: 'Overhead', AuditData: [667, 667, 667] },
      ],
    },
    { id: 5, title: 'Gross Profit', AuditData: [82222, 89087, 93462] },
    { id: 6, title: 'Gross Margin %', AuditData: [62.6, 62.6, 62.0] },
  ];
  const [expandedRows, setExpandedRows] = useState({});
  const [forecastYears, setForecastYears] = useState(8); // initial forecast years
  const defaultMultiplier = 1.5;

  const generateInitialState = (data) => {
    const options = {};
    const inputs = {};
    data.forEach((row) => {
      options[row.id] = 'option2';
      inputs[row.id] = defaultMultiplier;

      row.expandableRows?.forEach((subRow) => {
        options[subRow.id] = 'option2';
        inputs[subRow.id] = defaultMultiplier;
      });
    });
    return { options, inputs };
  };

  const { options: initialOptions, inputs: initialInputs } = generateInitialState([
    ...incomeStatementData,
    // add more datasets here if needed (like assetsData or liabilitiesEquityData)
  ]);

  const [selectedOptions, setSelectedOptions] = useState(initialOptions);
  const [percentageInputs, setPercentageInputs] = useState(initialInputs);

  const toggleRow = (rowId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  };

  const handleRadioChange = (rowId, option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [rowId]: option,
    }));
  };

  const handleInputChange = (rowId, value) => {
    const parsed = parseFloat(value);
    const numericValue = Math.max(0, Math.min(100, parsed));

    setPercentageInputs((prev) => ({
      ...prev,
      [rowId]: numericValue,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  const handleAddYear = () => setForecastYears(prev => prev + 1);
  const handleRemoveYear = () => setForecastYears(prev => Math.max(1, prev - 1));

  const generateForecastData = (row) => {
    const option = selectedOptions[row.id];
    const multiplier = percentageInputs[row.id];
    const data = [...row.AuditData]; // Copy of the AuditData array

    if (option === 'option1') {
      // Average Mode: Calculate average including all years (past + forecasted)
      const allValues = [...data]; // Start with the AuditData

      // Create forecast based on all past data
      const forecasts = [];
      for (let i = 0; i < forecastYears; i++) {
        // Calculate average based on all available years up to this point (including forecasted values)
        const sum = allValues.reduce((a, b) => a + b, 0);
        const avg = Math.round(sum / allValues.length);
        forecasts.push(avg);
        allValues.push(avg); // Add forecast to allValues for next year
      }

      return forecasts;

    }

    if (option === 'option2') {
      // Multiplier Mode: Use previous forecast year as base
      const forecasts = [];

      // Start with the last audited data value (2024 in this case)
      let lastForecast = data[data.length - 1];
      forecasts.push(Math.round(lastForecast * (1 + multiplier / 100))); // 2025 forecast is based on 2024 (last audited data)

      for (let i = 1; i < forecastYears; i++) {
        lastForecast *= (1 + multiplier / 100); // Apply multiplier
        forecasts.push(Math.round(lastForecast)); // Round off the forecast for the current year
      }

      return forecasts;
    }

    return Array(forecastYears).fill(''); // Default empty values if no valid option
  };

  const renderTable = (dataset) => (
    <>
      {dataset.map((row) => (
        <React.Fragment key={row.id}>
          <tr>
            <td>
              <Form onSubmit={handleFormSubmit}>
                <Form.Check
                  type="radio"
                  label="Average"
                  name={`radio-${row.id}`}
                  checked={selectedOptions[row.id] === 'option1'}
                  onChange={() => handleRadioChange(row.id, 'option1')}
                />
                <Form.Check
                  type="radio"
                  label="Multiplier"
                  name={`radio-${row.id}`}
                  checked={selectedOptions[row.id] === 'option2'}
                  onChange={() => handleRadioChange(row.id, 'option2')}
                />
                {selectedOptions[row.id] === 'option2' && (
                  <InputGroup size="sm">
                    <Form.Control
                      size="sm"
                      type="number"
                      placeholder="% Multiplier"
                      value={percentageInputs[row.id] || ''}
                      onChange={(e) => handleInputChange(row.id, e.target.value)}
                      className="mt-2"
                      min="0"
                      max="100"
                      step="any"
                    />
                    <InputGroup.Text size="sm">%</InputGroup.Text>
                  </InputGroup>
                )}
              </Form>
            </td>
            <th>
              {row.expandableRows && (
                <Button variant="link" className="p-0 mx-1 border-0 bg-transparent" onClick={() => toggleRow(row.id)}>
                  {expandedRows[row.id] ? <CaretDownFill /> : <CaretRightFill />}
                </Button>
              )}
              {row.title}
            </th>
            {row.AuditData.map((cell, idx) => (
              <th key={idx} style={{ backgroundColor: 'lightgrey' }}>{cell}</th>
            ))}
            {generateForecastData(row).map((cell, idx) => (
              <th key={idx}>{cell}</th>
            ))}
          </tr>

          {expandedRows[row.id] && row.expandableRows.map((expandable) => (
            <tr key={expandable.id}>
              <td>
                <Form onSubmit={handleFormSubmit}>
                  <Form.Check
                    type="radio"
                    label="Average"
                    name={`radio-${expandable.id}`}
                    checked={selectedOptions[expandable.id] === 'option1'}
                    onChange={() => handleRadioChange(expandable.id, 'option1')}
                  />
                  <Form.Check
                    type="radio"
                    label="Multiplier"
                    name={`radio-${expandable.id}`}
                    checked={selectedOptions[expandable.id] === 'option2'}
                    onChange={() => handleRadioChange(expandable.id, 'option2')}
                  />
                  {selectedOptions[expandable.id] === 'option2' && (
                    <InputGroup size="sm">
                      <Form.Control
                        size="sm"
                        type="number"
                        placeholder="% Multiplier"
                        value={percentageInputs[expandable.id] || ''}
                        onChange={(e) => handleInputChange(expandable.id, e.target.value)}
                        className="mt-2"
                        min="0"
                        max="100"
                        step="any"
                      />
                      <InputGroup.Text size="sm">%</InputGroup.Text>
                    </InputGroup>
                  )}
                </Form>
              </td>
              <td>{expandable.title}</td>
              {expandable.AuditData.map((cell, idx) => (
                <td key={idx} style={{ backgroundColor: 'lightgrey' }}>{cell}</td>
              ))}
              {generateForecastData(expandable).map((cell, idx) => (
                <td key={idx}>{cell}</td>
              ))}
            </tr>
          ))}
        </React.Fragment>
      ))}
    </>
  );

  return (
    <Container id={PAGE_IDS.FINANCIAL_COMPILATION} className="py-3" align="center">
      <h1>Financial Compilation</h1>
      <div className="d-flex justify-content-end mb-2">
        <Button variant="outline-primary" size="sm" onClick={handleAddYear} className="me-2">
          <PlusCircle /> Add Year
        </Button>
        <Button variant="outline-danger" size="sm" onClick={handleRemoveYear}>
          <DashCircle /> Remove Year
        </Button>
      </div>
      <Tabs defaultActiveKey="income-statement" className="mb-3" justify>
        <Tab eventKey="income-statement" title="Income Statement">
          <Table striped bordered hover>
            <Header forecastYears={forecastYears} />
            <tbody>
              {renderTable(incomeStatementData)}
            </tbody>
          </Table>
        </Tab>
      </Tabs>
    </Container>
  );
};

// eslint-disable-next-line react/prop-types
const Header = ({ forecastYears }) => {
  const actualYears = ['2022', '2023', '2024'];
  const futureYears = Array.from({ length: forecastYears }, (_, i) => 2025 + i);

  return (
    <thead>
      <tr className="text-center">
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <th colSpan="2" />
        <th colSpan={actualYears.length} style={{ backgroundColor: 'lightgrey' }}>Actual Data</th>
        <th colSpan={forecastYears}>Forecast Data</th>
      </tr>
      <tr className="text-center">
        <th>Forecast Type</th>
        <th>Metric</th>
        {actualYears.map((year, idx) => (
          <th key={idx} style={{ backgroundColor: 'lightgrey' }}>{year}</th>
        ))}
        {futureYears.map((year, idx) => (
          <th key={idx}>{year}</th>
        ))}
      </tr>
    </thead>
  );
};

export default FinancialCompilation;
