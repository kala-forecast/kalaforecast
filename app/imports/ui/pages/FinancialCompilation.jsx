/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { Container, Button, Table, Tabs, Tab, Form, InputGroup } from 'react-bootstrap';
import { CaretRightFill, CaretDownFill } from 'react-bootstrap-icons';
import { PAGE_IDS } from '../utilities/PageIDs';

const FinancialCompilation = () => {

  const [expandedRows, setExpandedRows] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});
  const [percentageInputs, setPercentageInputs] = useState({});

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
    const numericValue = Math.max(0, Math.min(100, Number(value)));
    setPercentageInputs((prev) => ({
      ...prev,
      [rowId]: numericValue,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  const incomeStatementData = [
    { id: 1, title: 'Net Sales', AuditData: [1, 2, 3], ForecastData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      expandableRows: [
        { title: 'Revenue', AuditData: [], ForecastData: [] },
      ],
    },
    { id: 2, title: 'Cost of Goods Sold', AuditData: [], ForecastData: [],
      expandableRows: [
        { id: 3, title: 'Cost of Contracting', AuditData: [], ForecastData: [] },
        { id: 4, title: 'Overhead', AuditData: [], ForecastData: [] },
      ],
    },
    { id: 5, title: 'Gross Profit', AuditData: [], ForecastData: [] },
    { id: 6, title: 'Gross Margin %', AuditData: [], ForecastData: [] },
    { id: 7, title: 'Total Operating Expenses', AuditData: [], ForecastData: [],
      expandableRows: [
        { id: 8, title: 'Salaries and Benefits', AuditData: [], ForecastData: [] },
        { id: 9, title: 'Rent and Overhead', AuditData: [], ForecastData: [] },
        { id: 10, title: 'Depreciation and Amortization', AuditData: [], ForecastData: [] },
        { id: 11, title: 'Interest', AuditData: [], ForecastData: [] },
      ],
    },
    { id: 12, title: 'Operating Expenses %', AuditData: [], ForecastData: [] },
    { id: 13, title: 'Profit (loss) from Operations', AuditData: [], ForecastData: [] },
    { id: 14, title: 'Profit (loss) from Operations %', AuditData: [], ForecastData: [] },
    { id: 15, title: 'Total Other Income (expense)', AuditData: [], ForecastData: [],
      expandableRows: [
        { id: 16, title: 'Interest Income', AuditData: [], ForecastData: [] },
        { id: 17, title: 'Interest Expense', AuditData: [], ForecastData: [] },
        { id: 18, title: 'Gain (loss) on disposal of assets', AuditData: [], ForecastData: [] },
        { id: 19, title: 'Other income (expense)', AuditData: [], ForecastData: [] },
      ],
    },
    { id: 20, title: 'Total other income (expense) %', AuditData: [], ForecastData: [] },
    { id: 21, title: 'Income (loss) before income taxes', AuditData: [], ForecastData: [] },
    { id: 22, title: 'Pre-tax income %', AuditData: [], ForecastData: [] },
    { id: 23, title: 'Net Income (loss)', AuditData: [], ForecastData: [],
      expandableRows: [
        { id: 24, title: 'Income taxes', AuditData: [], ForecastData: [] },
      ],
    },
    { id: 25, title: 'Net Income (loss) %', AuditData: [], ForecastData: [] },
  ];

  const assetsData = [
    { id: 26, title: 'Total Current Assets', AuditData: [], ForecastData: [],
      expandableRows: [
        { id: 27, title: 'Cash and cash equivalents', AuditData: [], ForecastData: [] },
        { id: 28, title: 'Accounts receivable', AuditData: [], ForecastData: [] },
        { id: 29, title: 'Inventory', AuditData: [], ForecastData: [] },
      ],
    },
    { id: 30, title: 'Total Long-Term Assets', AuditData: [], ForecastData: [],
      expandableRows: [
        { id: 31, title: 'Property, plant, and equipment', AuditData: [], ForecastData: [] },
        { id: 32, title: 'Investment', AuditData: [], ForecastData: [] },
      ],
    },
    { id: 33, title: 'TOTAL ASSETS', AuditData: [], ForecastData: [] },
  ];

  const liabilitiesEquityData = [
    { id: 34, title: 'Total Current Liabilities (due within 1 year)', AuditData: [], ForecastData: [],
      expandableRows: [
        { id: 35, title: 'Accounts payable', AuditData: [], ForecastData: [] },
        { id: 36, title: 'Debt Service', AuditData: [], ForecastData: [] },
        { id: 37, title: 'Taxes payable', AuditData: [], ForecastData: [] },
      ],
    },
    { id: 38, title: 'Total Long-term Liabilities (due after one year)', AuditData: [], ForecastData: [],
      expandableRows: [
        { id: 39, title: 'Debt service', AuditData: [], ForecastData: [] },
        { id: 40, title: 'Loans payable', AuditData: [], ForecastData: [] },
      ],
    },
    { id: 41, title: 'Total Liabilities', AuditData: [], ForecastData: [] },
    { id: 42, title: 'Total Stockholder\'s Equity', AuditData: [], ForecastData: [],
      expandableRows: [
        { id: 43, title: 'Equity Capital', AuditData: [], ForecastData: [] },
        { id: 44, title: 'Retained Earnings', AuditData: [], ForecastData: [] },
      ],
    },
    { id: 45, title: 'TOTAL LIABILITIES AND EQUITY', AuditData: [], ForecastData: [] },
  ];

  const renderTable = (dataset) => (
    <>
      {dataset.map((row) => (
        <React.Fragment key={row.id}>
          {/* Main row */}
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
                {/* Show text input if Multiplier is selected */}
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
              {row.expandableRows && row.expandableRows.length > 0 && (
                <Button variant="link" className="p-0 mx-1 border-0 bg-transparent" onClick={() => toggleRow(row.id)}>
                  {expandedRows[row.id] ? <CaretDownFill /> : <CaretRightFill />}
                </Button>
              )}
              {row.title}
            </th>
            {row.AuditData.map((cell, cellIndex) => (
              <td key={cellIndex} style={{ backgroundColor: 'lightgrey' }}>{cell}</td>
            ))}
            {row.ForecastData.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>

          {/* Render each hidden row if this row is expanded */}
          {expandedRows[row.id] &&
                        row.expandableRows &&
                        row.expandableRows.map((expandable, index) => (
                          <tr key={index}>
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
                                {/* Show text input if Multiplier is selected */}
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
                            {expandable.AuditData.map((cell, cellIndex) => (
                              <td key={cellIndex} style={{ backgroundColor: 'lightgrey' }}>{cell}</td>
                            ))}
                            {expandable.ForecastData.map((cell, cellIndex) => (
                              <td key={cellIndex}>{cell}</td>
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
      <Tabs
        defaultActiveKey="income-statement"
        className="mb-3"
        justify
      >
        <Tab eventKey="income-statement" title="Income Statement" default>
          <Table striped bordered hover>
            <Header />
            <tbody>
              {renderTable(incomeStatementData)}
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="balance-sheet" title="Balance Sheet">
          <Table striped bordered hover>
            <Header />
            <tbody>
              <tr>
                <th colSpan="16" className="text-center" style={{ backgroundColor: 'lightblue' }}>ASSETS</th>
              </tr>
              {renderTable(assetsData)}
              <tr>
                <th colSpan="16" className="text-center" style={{ backgroundColor: 'lightblue' }}>LIABILITIES AND EQUITY</th>
              </tr>
              {renderTable(liabilitiesEquityData)}
            </tbody>
          </Table>
        </Tab>
      </Tabs>
    </Container>

  );
};

const Header = () => (
  <thead>
    <tr className="text-center">
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <th colSpan="2"> </th>
      <th colSpan="3" style={{ backgroundColor: 'lightgrey' }}>Actual Data</th>
      <th colSpan="12">Forecast Data</th>
    </tr>
    <tr className="text-center">
      <th>Forecast Type</th>
      <th>Metric</th>
      <th style={{ backgroundColor: 'lightgrey' }}>2022</th>
      <th style={{ backgroundColor: 'lightgrey' }}>2023</th>
      <th style={{ backgroundColor: 'lightgrey' }}>2024</th>
      <th>2025</th>
      <th>2026</th>
      <th>2027</th>
      <th>2028</th>
      <th>2029</th>
      <th>2030</th>
      <th>2031</th>
      <th>2032</th>
      <th>2033</th>
      <th>2034</th>
      <th>2035</th>
      <th>2036</th>
    </tr>
  </thead>
);

export default FinancialCompilation;
