/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { Container, Button, Table, Tabs, Tab, Form, InputGroup, Modal } from 'react-bootstrap';
import { CaretRightFill, CaretDownFill, PlusCircle, DashCircle, GraphUp } from 'react-bootstrap-icons';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { PAGE_IDS } from '../utilities/PageIDs';
import '../../../client/style.css';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const FinancialCompilation = () => {
  const auditData = [
    { id: 1, title: 'Net Sales', AuditData: Object.freeze([131345, 142341, 150772]), expandableRows: [
      { id: 100, title: 'Revenue', AuditData: [131345, 142341, 150772] }] },
    { id: 2, title: 'Cost of Goods Sold', AuditData: [49123, 53254, 57310], expandableRows: [
      { id: 3, title: 'Cost of Contracting', AuditData: [48456, 52587, 56643] },
      { id: 4, title: 'Overhead', AuditData: [667, 667, 667] },
    ],
    },
    { id: 5, title: 'Gross Profit', AuditData: [82222, 89087, 93462] },
    { id: 6, title: 'Gross Margin %', AuditData: [62.6, 62.6, 62.0] },
    { id: 7, title: 'Total Operating Expenses', AuditData: [52589, 52564, 52930], expandableRows: [
      { id: 8, title: 'Salaries and Benefits', AuditData: [24040, 24096, 24460] },
      { id: 9, title: 'Rent and Overhead', AuditData: [10840, 11091, 11114] },
      { id: 10, title: 'Depreciation and Amortization', AuditData: [16610, 16411, 16367] },
      { id: 11, title: 'Interest', AuditData: [1100, 967, 989] },
      { id: 12, title: 'Scenario 3 - Stress Effect', AuditData: [] },
      { id: 13, title: 'Scenario 4 - Stress Effect', AuditData: [] },
      { id: 14, title: 'Scenario 5 - Stress Effect', AuditData: [] },
    ],
    },
    { id: 15, title: 'Operating Expenses %', AuditData: [34.4, 33.8, 33.6] },
    { id: 16, title: 'Profit (loss) from Operations', AuditData: [52589, 52564, 52930] },
    { id: 17, title: 'Profit (loss) from Operations %', AuditData: [34.4, 33.8, 33.6] },
    { id: 18, title: 'Total Other Income (expense)', AuditData: [], expandableRows: [
      { id: 19, title: 'Interest Income', AuditData: [] },
      { id: 20, title: 'Interest Expense', AuditData: [] },
      { id: 21, title: 'Gain (loss) on disposal of assets', AuditData: [] },
      { id: 22, title: 'Other income (expense)', AuditData: [] },
    ],
    },
    { id: 23, title: 'Total other income (expense) %', AuditData: [] },
    { id: 24, title: 'Income (loss) before income taxes', AuditData: [35668, 37705, 37733] },
    { id: 25, title: 'Pre-tax income %', AuditData: [23.3, 24.3, 23.9] },
    { id: 26, title: 'Net Income (loss)', AuditData: [25338, 26759, 26775], expandableRows: [
      { id: 27, title: 'Income taxes', AuditData: [10330, 10945, 10958] },
    ],
    },
    { id: 28, title: 'Net Income (loss) %', AuditData: [16.6, 17.2, 17.0] },

    { id: 29, title: 'Total Current Assets', AuditData: [205752, 207633, 207272], expandableRows: [
      { id: 30, title: 'Cash and cash equivalents', AuditData: [188111, 189577, 189079] },
      { id: 31, title: 'Accounts receivable', AuditData: [7074, 7243, 7286] },
      { id: 32, title: 'Inventory', AuditData: [10566, 10813, 10907] },
    ],
    },
    { id: 33, title: 'Total Long-Term Assets', AuditData: [62089, 69404, 73005], expandableRows: [
      { id: 34, title: 'Property, plant, and equipment', AuditData: [38756, 38293, 38190] },
      { id: 35, title: 'Investment', AuditData: [23333, 31111, 34815] },
      { id: 36, title: 'Scenario 1 - Stress Effect', AuditData: [] },
      { id: 37, title: 'Scenario 2 - Stress Effect', AuditData: [] },
    ],
    },
    { id: 38, title: 'TOTAL ASSETS', AuditData: [267841, 277037, 280277] },

    { id: 39, title: 'Total Current Liabilities (due within 1 year)', AuditData: [14169, 14167, 13687], expandableRows: [
      { id: 40, title: 'Accounts payable', AuditData: [5283, 5406, 5453] },
      { id: 41, title: 'Debt Service', AuditData: [5000, 5000, 5000] },
      { id: 42, title: 'Taxes payable', AuditData: [3887, 3761, 3234] },
    ],
    },
    { id: 43, title: 'Total Long-term Liabilities (due after one year)', AuditData: [58333, 66111, 69815], expandableRows: [
      { id: 44, title: 'Debt service', AuditData: [15000, 15000, 15000] },
      { id: 45, title: 'Loans payable', AuditData: [43333, 51111, 54815] },
      { id: 46, title: 'Scenario 5 - Stress Effect', AuditData: [] },
    ],
    },
    { id: 47, title: 'Total Liabilities', AuditData: [72503, 80278, 83502] },
    { id: 48, title: 'Total Stockholder\'s Equity', AuditData: [195338, 196759, 196775], expandableRows: [
      { id: 49, title: 'Equity Capital', AuditData: [170000, 170000, 170000] },
      { id: 50, title: 'Retained Earnings', AuditData: [25338, 26759, 26775] },
    ],
    },
    { id: 51, title: 'TOTAL LIABILITIES AND EQUITY', AuditData: [267841, 277037, 280277] },
  ];
  const incomeStatementData = auditData.filter((item) => item.id < 29); // Everything before Total Current Assets
  const balanceSheetData = auditData.filter((item) => item.id >= 29); // Everything from Total Current Assets onward

  const [expandedRows, setExpandedRows] = useState({});
  const [forecastYears, setForecastYears] = useState(8);
  const [selectedChartRow, setSelectedChartRow] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const defaultMultiplier = 1.5;

  const generateInitialState = (data) => {
    const options = {};
    const inputs = {};
    data.forEach((row) => {
      options[row.id] = 'option1';
      inputs[row.id] = defaultMultiplier;

      row.expandableRows?.forEach((subRow) => {
        options[subRow.id] = 'option1';
        inputs[subRow.id] = defaultMultiplier;
      });
    });
    return { options, inputs };
  };

  const { options: initialOptions, inputs: initialInputs } = generateInitialState([
    ...incomeStatementData, ...balanceSheetData,
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

  const handleShowChart = (row) => {
    setSelectedChartRow(row);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  const handleAddYear = () => setForecastYears(prev => prev + 1);
  const handleRemoveYear = () => setForecastYears(prev => Math.max(1, prev - 1));

  const formatValue = (id, value) => {
    const idsWithPercent = [6, 15, 23, 25, 28];

    if (idsWithPercent.includes(id)) {
      return `${value.toFixed(1)}%`;
    }
    return new Intl.NumberFormat().format(value);
  };

  const generateForecastData = (row) => {
    const option = selectedOptions[row.id];
    const multiplier = percentageInputs[row.id];

    if (option === 'option1') {
      const forecasts = [];
      const allValues = [...row.AuditData];

      for (let i = 0; i < forecastYears; i++) {
        const recentData = allValues.slice(-3);
        const sum = recentData.reduce((acc, val) => acc + val, 0);
        const avg = sum / recentData.length;
        forecasts.push(Math.round(avg));
        allValues.push(avg);
      }

      return forecasts;
    }

    if (option === 'option2') {
      const forecasts = [];
      const allValues = [...row.AuditData];
      let lastValue = allValues[allValues.length - 1];

      for (let i = 0; i < forecastYears; i++) {
        lastValue *= (1 + multiplier / 100);
        forecasts.push(Math.round(lastValue));
      }

      return forecasts;
    }

    return Array(forecastYears).fill('');
  };

  const chartData = selectedChartRow && {
    labels: ['2022', '2023', '2024', ...Array.from({ length: forecastYears }, (_, i) => 2025 + i)],
    datasets: [
      {
        label: selectedChartRow.title,
        data: [...selectedChartRow.AuditData, ...generateForecastData(selectedChartRow)],
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
    ],
  };

  const renderTable = (dataset) => (
    <>
      {dataset
        .filter(row => row.AuditData && row.AuditData.length >= 3)
        .map((row) => (
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
                        step="0.1"
                        style={{ width: '40px' }}
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
                  <th key={idx} className="centered-cell" style={{ backgroundColor: 'lightgrey' }}>
                    {formatValue(row.id, cell)}
                  </th>
                ))}

              {generateForecastData(row).map((cell, idx) => (
                  <th key={idx} className="centered-cell">
                    {formatValue(row.id, cell)}
                  </th>
              ))}
              <td className="text-end">
                <GraphUp
                  className="text-primary"
                  role="button"
                  onClick={() => handleShowChart(row)}
                  style={{ cursor: 'pointer' }}
                />
              </td>
            </tr>

            {expandedRows[row.id] && row.expandableRows.filter(expandableRows => expandableRows.AuditData && expandableRows.AuditData.length >= 3).map((expandable) => (
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
                          step="0.1"
                          style={{ width: '40px' }}
                        />
                        <InputGroup.Text size="sm">%</InputGroup.Text>
                      </InputGroup>
                    )}
                  </Form>
                </td>
                <td>{expandable.title}</td>
                {expandable.AuditData.map((cell, idx) => (
                  <td key={idx} className="centered-cell" style={{ backgroundColor: 'lightgrey' }}>{formatValue(row.id, cell)}</td>
                ))}
                {generateForecastData(expandable).map((cell, idx) => (
                  <td key={idx} className="centered-cell">{formatValue(row.id, cell)}</td>
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
        <Tab eventKey="income-statement" title="Income Statement" style={{ border: '1px solid #628fca' }}>
          <Table striped bordered hover className="mb-0">
            <Header forecastYears={forecastYears} />
            <tbody>
              {renderTable(incomeStatementData)}
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="balance-sheet" title="Balance Sheet" style={{ border: '1px solid #628fca' }}>
          <Table striped bordered hover className="mb-0">
            <Header forecastYears={forecastYears} />
            <tbody>
              {renderTable(balanceSheetData)}
            </tbody>
          </Table>
        </Tab>
      </Tabs>
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedChartRow?.title} Forecast</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedChartRow && (
            <Line
              data={{
                labels: ['2022', '2023', '2024', ...Array.from({ length: forecastYears }, (_, i) => 2025 + i)],
                datasets: [
                  {
                    label: selectedChartRow.title,
                    data: [
                      ...selectedChartRow.AuditData,
                      ...generateForecastData(selectedChartRow),
                    ],
                    borderColor: 'rgba(75,192,192,1)',
                    fill: false,
                    tension: 0.3,
                  },
                ],
              }}
              options={{ responsive: true }}
            />
          )}
        </Modal.Body>
      </Modal>
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
        <th style={{ border: '1px solid #628fca' }}>Forecast Type</th>
        <th style={{ border: '1px solid #628fca' }}>Metric</th>
        <th colSpan={actualYears.length} style={{ backgroundColor: 'lightgrey', border: '1px solid #628fca' }}>Actual Data</th>
        <th colSpan={forecastYears} style={{ border: '1px solid #628fca' }}>Forecast Data</th>
        <th />
      </tr>
      <tr className="text-center">
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <th colSpan="2" style={{ backgroundColor: '#628fca' }} />

        {actualYears.map((year, idx) => (
          <th key={idx} style={{ backgroundColor: 'lightgrey', border: '1px solid #628fca' }}>{year}</th>
        ))}
        {futureYears.map((year, idx) => (
          <th key={idx} style={{ backgroundColor: '#628fca' }}>{year}</th>
        ))}
      </tr>
    </thead>
  );
};

export default FinancialCompilation;
