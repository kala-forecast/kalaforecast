/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { Container, Button, Table, Tabs, Tab, Form, InputGroup, Modal } from 'react-bootstrap';
import { CaretRightFill, CaretDownFill, PlusCircle, DashCircle, GraphUp } from 'react-bootstrap-icons';
import { Line } from 'react-chartjs-2';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { PAGE_IDS } from '../utilities/PageIDs';
import '../../../client/style.css';
import { FinancialRecords } from '../../api/financial/FinancialRecords';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);
const subscription = Meteor.subscribe('FinancialRecords');


if (subscription.ready()) {
  console.log('Subscription ready!');
} else {
  console.log('Subscription still loading...');
}

const FinancialCompilation = () => {
  const auditData = useTracker(() => FinancialRecords.find({}, { sort: { id: 1 } }).fetch(), []);
  console.log('Audit data from mongoDB: ', auditData);
  const incomeStatementData = auditData.filter((item) => item.id < 30); // Everything before Total Current Assets
  const balanceSheetData = auditData.filter((item) => item.id >= 30); // Everything from Total Current Assets onward

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
    const idsWithPercent = [7, 16, 18, 24, 26, 29];

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
      const allValues = [...row.auditData];

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
      const allValues = [...row.auditData];
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
        data: [...selectedChartRow.auditData, ...generateForecastData(selectedChartRow)],
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
    ],
  };

  const renderTable = (dataset) => (
    <>
      {dataset
        .filter(row => row.auditData && row.auditData.length >= 3)
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

              {row.auditData.map((cell, idx) => (
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

            {expandedRows[row.id] && row.expandableRows.filter(expandableRows => expandableRows.auditData && expandableRows.auditData.length >= 3).map((expandable) => (
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
                {expandable.auditData.map((cell, idx) => (
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
                      ...selectedChartRow.auditData,
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