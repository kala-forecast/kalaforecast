import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Container, Table, Form, Row, Col, Card, Dropdown } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';
import { WorkpaperS1, WorkpaperS2, WorkpaperS3 } from '../../api/workpapers/Workpapers';

// config for input fields
const fieldConfigs = {
  S1: [
    { label: 'Present Value ($)', field: 'presentValue' },
    { label: 'Interest Rate (%)', field: 'interestRate', step: '0.1' },
    { label: 'Monthly Contribution (%)', field: 'monthlyContribution', step: '0.1', min: 0, max: 100 },
    { label: 'Term (Years)', field: 'termYears', min: 1 },
  ],
  S2: [
    { label: '% Decrease in Revenues', field: 'revenueDecreasePercent', step: '0.01' },
    { label: 'Base Revenue ($)', field: 'baseRevenue' },
    { label: 'Forecast Years', field: 'forecastYears', min: 1 },
  ],
};

// workpapers and their scenario names
const initialWorkpapers = {
  S1: { ...WorkpaperS1, inputs: { ...WorkpaperS1.inputs, scenarioName: WorkpaperS1.name } },
  S2: { ...WorkpaperS2, inputs: { ...WorkpaperS2.inputs, scenarioName: WorkpaperS2.name } },
  S3: { ...WorkpaperS3, inputs: { ...WorkpaperS3.inputs, scenarioName: WorkpaperS3.name } },
};

// render input fields for which workpaper is chosen
const InputForm = ({ selectedWorkpaper, inputs, handleInputChange }) => {
  const id = selectedWorkpaper.id;
  const isBold = ['S1', 'S2', 'S3'].includes(id);
  return (
    <Form>
      {isBold && (
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label style={{ fontWeight: 'bold' }}>Scenario Name</Form.Label>
              <Form.Control
                type="text"
                value={inputs.scenarioName}
                onChange={(e) => handleInputChange('scenarioName', e.target.value)}
                size="sm"
              />
            </Form.Group>
          </Col>
        </Row>
      )}
      {id === 'S3' ? (
        <Row>
          {inputs.expenses.map((expense, index) => (
            <Col md={3} key={expense.year} className="mb-3">
              <Form.Group>
                <Form.Label style={isBold ? { fontWeight: 'bold' } : {}}>
                  {expense.year} Expense ($)
                </Form.Label>
                <Form.Control
                  type="number"
                  value={expense.amount}
                  onChange={(e) => handleInputChange(null, e.target.value, index)}
                  size="sm"
                />
              </Form.Group>
            </Col>
          ))}
        </Row>
      ) : (
        fieldConfigs[id] &&
        fieldConfigs[id].map(({ label, field, ...rest }) => {
          let fieldValue;
          if (rest.type === 'date') {
            fieldValue = inputs[field] ? new Date(inputs[field]).toISOString().split('T')[0] : '';
          } else {
            fieldValue = inputs[field];
          }
          return (
            <Row className="mb-3" key={field}>
              <Col md={6}>
                <Form.Group>
                  <Form.Label style={isBold ? { fontWeight: 'bold' } : {}}>
                    {label}
                  </Form.Label>
                  <Form.Control
                    type={rest.type || 'number'}
                    value={fieldValue}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    size="sm"
                    {...rest}
                  />
                </Form.Group>
              </Col>
            </Row>
          );
        })
      )}
    </Form>
  );
};

InputForm.propTypes = {
  selectedWorkpaper: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  inputs: PropTypes.shape({
    scenarioName: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    expenses: PropTypes.arrayOf(
      PropTypes.shape({
        year: PropTypes.number.isRequired,
        amount: PropTypes.number.isRequired,
      }),
    ),
  }).isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

// render table w/ header and data
const TableSection = ({ headers, data, renderRow, maxHeight }) => (
  <Card className="mt-4">
    <Card.Header className="modern-card-header">{headers.title}</Card.Header>
    <Card.Body style={{ maxHeight, overflowY: 'auto' }}>
      <Table striped bordered hover responsive className="modern-table table-sm">
        <thead className="bg-dark text-white">
          <tr>
            {headers.cols.map((col, i) => (
              <th key={i}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>{renderRow(row)}</tr>
          ))}
        </tbody>
      </Table>
    </Card.Body>
  </Card>
);

TableSection.propTypes = {
  headers: PropTypes.shape({
    title: PropTypes.string.isRequired,
    cols: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  data: PropTypes.array.isRequired,
  renderRow: PropTypes.func.isRequired,
  maxHeight: PropTypes.string,
};

// return table config depending on workpaper ID
const getResultsConfig = (id) => {
  const configs = {
    S1: {
      cols: ['Year', 'Balance', 'Contribution', 'Interest Earned', 'New Balance'],
      title: 'Financial Projection',
    },
    S2: {
      cols: ['Year', 'Total Revenue', 'Decrease in Revenue'],
      title: 'Revenue Impact',
    },
    S3: {
      cols: ['Year', 'Increase in Expenses'],
      title: 'Expense Impact',
    },
  };
  return configs[id] || { cols: [], title: '' };
};

// main component
const WorkPapers = () => {
  const [workpapers, setWorkpapers] = useState(initialWorkpapers);
  const [selectedWorkpaper, setSelectedWorkpaper] = useState(workpapers.S1);
  const initInputs = structuredClone(selectedWorkpaper.inputs);
  if (['S1', 'S2', 'S3'].includes(selectedWorkpaper.id)) {
    initInputs.scenarioName = selectedWorkpaper.name;
  }
  const [inputs, setInputs] = useState(initInputs);

  // update inputs for chosen workpaper and sync state
  const updateWorkpaperInputs = (newInputs) => {
    setInputs(newInputs);
    setWorkpapers((prev) => ({
      ...prev,
      [selectedWorkpaper.id]: {
        ...prev[selectedWorkpaper.id],
        inputs: newInputs,
        name: newInputs.scenarioName || prev[selectedWorkpaper.id].name,
      },
    }));
    setSelectedWorkpaper((prev) => ({
      ...prev,
      inputs: newInputs,
      name: newInputs.scenarioName || prev.name,
    }));
  };

  // manage changes w/ input fields and update them
  const handleInputChange = (field, value, index) => {
    let newInputs;
    if (selectedWorkpaper.id === 'S3') {
      newInputs = {
        ...inputs,
        expenses: inputs.expenses.map((exp, i) => (i === index ? { ...exp, amount: Math.abs(parseFloat(value)) || 0 } : exp)),
      };
    } else {
      newInputs = {
        ...inputs,
        [field]: field === 'scenarioName' ? value : parseFloat(value) || 0,
      };
    }
    updateWorkpaperInputs(newInputs);
  };

  // get stress data using workpapers' stressEffects fxn and current inputs
  const stressData = useMemo(
    () => selectedWorkpaper.calculations.stressEffects(inputs),
    [inputs, selectedWorkpaper],
  );

  // get residual data using the workpapers' residualEffects fxn and stress data
  const residualData = useMemo(
    () => selectedWorkpaper.calculations.residualEffects(stressData),
    [stressData, selectedWorkpaper, inputs],
  );

  const headerTitle = 'Stress Effects';

  // update chosen workpaper and reset inputs respectively when choosing new workpaper
  const handleWorkpaperChange = (wp) => {
    setSelectedWorkpaper(wp);
    const newInputs = structuredClone(wp.inputs);
    if (['S1', 'S2', 'S3'].includes(wp.id)) {
      newInputs.scenarioName = wp.name;
    }
    setInputs(newInputs);
  };

  // render table row for chosen workpaper
  const renderResultsRow = (row) => {
    const id = selectedWorkpaper.id;
    if (id === 'S1') {
      return (
        <>
          <td>{row.year}</td>
          <td>${row.balance?.toLocaleString()}</td>
          <td>${row.yearlyContribution?.toLocaleString()}</td>
          <td>${row.interestEarned?.toLocaleString()}</td>
          <td>${row.newBalance?.toLocaleString()}</td>
        </>
      );
    }
    if (id === 'S2') {
      return (
        <>
          <td>{row.year}</td>
          <td>${row.totalRevenue?.toLocaleString()}</td>
          <td>${row.decreaseInRevenue?.toLocaleString()}</td>
        </>
      );
    }
    if (id === 'S3') {
      return (
        <>
          <td>{row.year}</td>
          <td>${row.increaseInExpenses?.toLocaleString()}</td>
        </>
      );
    }
    return null;
  };

  // styling
  const inlineStyles = (
    <style>{`
      .modern-table {
        font-family: 'Roboto', sans-serif;
        font-size: 0.9rem;
        text-align: center;
      }
      .modern-table th,
      .modern-table td {
        vertical-align: middle;
      }
      .modern-card-header {
        background-color: #628fca;
        color: #fff;
        font-weight: 500;
        text-align: center;
      }
    `}
    </style>
  );

  return (
    <Container id={PAGE_IDS.WORKPAPERS} className="py-4">
      {inlineStyles}
      <Dropdown className="mb-4">
        <Dropdown.Toggle variant="outline-primary">
          {selectedWorkpaper.name}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {Object.keys(workpapers).map((key) => (
            <Dropdown.Item key={key} onClick={() => handleWorkpaperChange(workpapers[key])}>
              {workpapers[key].name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      <Card>
        <Card.Header className="py-2 modern-card-header">{headerTitle}</Card.Header>
        <Card.Body style={{ height: '275px', overflowY: 'auto' }}>
          <InputForm
            selectedWorkpaper={selectedWorkpaper}
            inputs={inputs}
            handleInputChange={handleInputChange}
          />
        </Card.Body>
      </Card>

      <TableSection
        headers={getResultsConfig(selectedWorkpaper.id)}
        data={stressData}
        renderRow={renderResultsRow}
        maxHeight="400px"
      />

      <TableSection
        headers={{
          cols: ['Year', 'Principal', 'Return Rate', 'Forecast Year', 'Cumulative Interest Lost'],
          title: 'Residual Effects',
        }}
        data={residualData}
        renderRow={(row) => (
          <>
            <td>{row.year}</td>
            <td>${row.principal.toLocaleString()}</td>
            <td>{row.annualReturnRate}%</td>
            <td>{row.forecastYear}</td>
            <td>${row.totalInterestsLost.toLocaleString()}</td>
          </>
        )}
        maxHeight="400px"
      />
    </Container>
  );
};

export default WorkPapers;
