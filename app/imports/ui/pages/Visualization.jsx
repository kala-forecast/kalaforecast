import React, { useEffect, useState } from 'react';
import { Container, Col, Row, Form, Button, Card } from 'react-bootstrap';
import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { PAGE_IDS } from '../utilities/PageIDs';
import { useTracker } from 'meteor/react-meteor-data';
import { FinancialRecords } from 'imports/api/financial/FinancialRecords';
import '../../../client/visualization.css';

const forecastYears = 12;
const years = ['2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033', '2034', '2035', '2036'];

// Define your own logic for which titles fall into which category
const INCOME_TITLES = new Set([
  'Net Sales',
  'Cost of Goods Sold',
  'Gross Profit',
  'Total Operating Expenses',
  'Profit (loss) from Operations',
  'Income (loss) before income taxes',
  'Net Income (loss)',
]);

const BALANCE_SHEET_TITLES = new Set([
  'Total Current Assets',
  'Total Long-Term Assets',
  'Total Assets',
  'Total Current Liabilities (due within 1 year)',
  'Total Long-term Liabilities (due after one year)',
  'Total Liabilities',
  "Total Stockholder's Equity",
  'Total Liabilities and Equity',
]);

const Visualization = () => {
  const records = useTracker(() => FinancialRecords.find().fetch(), []);

  const [selectedRows, setSelectedRows] = useState([]);
  const [calculationType, setCalculationType] = useState('option1');
  const [multiplier, setMultiplier] = useState(1.5);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  const generateForecastData = (row) => {
    const allValues = [...row.auditData];

    if (calculationType === 'option1') {
      const forecasts = [];
      for (let i = 0; i < forecastYears; i++) {
        const recent = allValues.slice(-3);
        const avg = recent.reduce((sum, val) => sum + val, 0) / recent.length;
        forecasts.push(Math.round(avg));
        allValues.push(avg);
      }
      return forecasts;
    }

    if (calculationType === 'option2') {
      const forecasts = [];
      let lastValue = allValues[allValues.length - 1];
      for (let i = 0; i < forecastYears; i++) {
        lastValue *= 1 + multiplier / 100;
        forecasts.push(Math.round(lastValue));
      }
      return forecasts;
    }

    return Array(forecastYears).fill('');
  };

  const toggleRowSelection = (row) => {
    setSelectedRows((prev) =>
      prev.find((r) => r.id === row.id)
        ? prev.filter((r) => r.id !== row.id)
        : [...prev, row]
    );
  };

  useEffect(() => {
    if (selectedRows.length === 0) {
      setChartData({ labels: years, datasets: [] });
      return;
    }

    const datasets = selectedRows.map((row) => ({
      label: row.title,
      data: generateForecastData(row),
      borderColor: `hsl(${(row.id * 40) % 360}, 70%, 50%)`,
      backgroundColor: `hsla(${(row.id * 40) % 360}, 70%, 50%, 0.4)`,
      borderWidth: 2,
    }));

    setChartData({ labels: years, datasets });
  }, [selectedRows, calculationType, multiplier]);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            return `${label}: ${value?.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Forecast years',
          font: { size: 14, weight: 'bold' },
        },
        ticks: { font: { size: 12, weight: 'bold' }, padding: 10 },
      },
      y: {
        ticks: {
          callback: (value) =>
            `${value.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}`,
        },
        title: {
          display: true,
          text: 'Forecasted Value',
          font: { size: 14, weight: 'bold' },
          padding: 20,
        },
      },
    },
  };

  const renderRecordCheckboxes = (records) =>
    records.map((record) => (
      <Form.Check
        key={record.id}
        type="checkbox"
        label={record.title}
        id={`row-${record.id}`}
        checked={selectedRows.some((r) => r.id === record.id)}
        onChange={() => toggleRowSelection(record)}
      />
    ));

  const incomeRecords = records.filter((r) => INCOME_TITLES.has(r.title));
  const balanceRecords = records.filter((r) => BALANCE_SHEET_TITLES.has(r.title));

  return (
    <Container id={PAGE_IDS.GRAPH_PLACEHOLDER} className="py-3">
      <Row className="mb-4">
        <Col md={3} className="sidebar my-1">
          <Card className="data-card">
            <Card.Header className="bg-primary text-white">Income Data</Card.Header>
            <Card.Body>{renderRecordCheckboxes(incomeRecords)}</Card.Body>
          </Card>
          <Card className="data-card">
            <Card.Header className="bg-success text-white">Balance Sheet Data</Card.Header>
            <Card.Body>{renderRecordCheckboxes(balanceRecords)}</Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <div className="forecast-options">
            <Form.Check
              inline
              label="Rolling Average"
              name="calc-type"
              type="radio"
              id="option1"
              checked={calculationType === 'option1'}
              onChange={() => setCalculationType('option1')}
            />
            <Form.Check
              inline
              label="Multiplier"
              name="calc-type"
              type="radio"
              id="option2"
              checked={calculationType === 'option2'}
              onChange={() => setCalculationType('option2')}
            />
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => setSelectedRows([])}
              className="clear-all-btn"
            >
              Clear All
            </Button>
          </div>
          {calculationType === 'option2' && (
            <Form.Group controlId="multiplierInput" className="multiplier-input mb-3">
              <Form.Label>Multiplier (%)</Form.Label>
              <Form.Control
                type="number"
                value={multiplier}
                onChange={(e) => setMultiplier(Number(e.target.value))}
                step="0.1"
                min="0"
              />
            </Form.Group>
          )}
          <Col md={9} className="chart-container">
            <Line data={chartData} options={{ ...chartOptions, maintainAspectRatio: false }}/>
          </Col>
        </Col>

      </Row>



    </Container>
  );
};

export default Visualization;
