import React, { useState, useMemo } from 'react';
import { Container, Table, Form, Row, Col, Card, Dropdown } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';
import {
  WorkpaperS1,
  WorkpaperS2,
  WorkpaperS3,
  WorkpaperS4,
  WorkpaperS5,
  WorkpaperS5A,
  WorkpaperS5B,
} from '../../api/workpapers/Workpapers';

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
  S4: [
    { label: 'Operating Expense Increase (%)', field: 'operatingExpensePercent', step: '0.1' },
  ],
  S5: [
    { label: 'Present Value ($)', field: 'presentValue' },
    { label: 'Interest Rate (%)', field: 'interestRate', step: '0.1' },
    { label: 'Term (Years)', field: 'termYears', min: 1 },
    { label: 'Monthly Contribution (%)', field: 'monthlyContribution', step: '0.1', min: 0, max: 100 },
    { label: 'Fully Funded (%)', field: 'fullyFunded' },
  ],
  S5A: [
    { label: 'Loan Amount ($)', field: 'loanAmount' },
    { label: 'Annual Interest Rate (%)', field: 'annualInterestRate', step: '0.01', max: 100 },
    { label: 'Loan Period (Years)', field: 'loanPeriodYears', min: 1 },
    { label: 'Start Date', field: 'startDate', type: 'date' },
  ],
  S5B: [
    { label: 'Loan Amount ($)', field: 'loanAmount' },
    { label: 'Annual Interest Rate (%)', field: 'annualInterestRate', step: '0.01', max: 100 },
    { label: 'Loan Period (Years)', field: 'loanPeriodYears', min: 1 },
    { label: 'Start Date', field: 'startDate', type: 'date' },
  ],
};

const initialWorkpapers = {
  S1: { ...WorkpaperS1, inputs: { ...WorkpaperS1.inputs, scenarioName: WorkpaperS1.name } },
  S2: { ...WorkpaperS2, inputs: { ...WorkpaperS2.inputs, scenarioName: WorkpaperS2.name } },
  S3: { ...WorkpaperS3, inputs: { ...WorkpaperS3.inputs, scenarioName: WorkpaperS3.name } },
  S4: { ...WorkpaperS4, inputs: { ...WorkpaperS4.inputs, scenarioName: WorkpaperS4.name } },
  S5: { ...WorkpaperS5, inputs: { ...WorkpaperS5.inputs, scenarioName: WorkpaperS5.name } },
  S5A: { ...WorkpaperS5A },
  S5B: { ...WorkpaperS5B },
};

const inlineStyles = (
  <style>
    {`
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

const InputForm = ({ selectedWorkpaper, inputs, handleInputChange }) => {
  const id = selectedWorkpaper.id;
  const isBold = ['S1', 'S2', 'S3', 'S4', 'S5'].includes(id);
  const [selectedYearIdx, setSelectedYearIdx] = useState(0);

  return (
    <Form>
      {isBold && (
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label style={{ fontWeight: 'bold' }}>Scenario Name</Form.Label>
              <Form.Control
                type="text"
                size="sm"
                value={inputs.scenarioName}
                onChange={e => handleInputChange('scenarioName', e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
      )}

      {id === 'S3' ? (
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label style={{ fontWeight: 'bold' }}>Year</Form.Label>
              <Form.Control
                as="select"
                size="sm"
                value={selectedYearIdx}
                onChange={e => setSelectedYearIdx(Number(e.target.value))}
              >
                {inputs.expenses.map((exp, idx) => (
                  <option key={exp.year} value={idx}>
                    {exp.year}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label style={{ fontWeight: 'bold' }}>Expense ($)</Form.Label>
              <Form.Control
                type="number"
                size="sm"
                min={0}
                value={inputs.expenses[selectedYearIdx].amount}
                onChange={e => handleInputChange(null, e.target.value, selectedYearIdx)}
              />
            </Form.Group>
          </Col>
        </Row>
      ) : (
        (fieldConfigs[id] || []).map(({ label, field, ...rest }) => {
          let controlValue = inputs[field];
          if (rest.type === 'date') {
            controlValue = inputs[field]
              ? new Date(inputs[field]).toISOString().split('T')[0]
              : '';
          }
          return (
            <Row className="mb-3" key={field}>
              <Col md={6}>
                <Form.Group>
                  <Form.Label style={isBold ? { fontWeight: 'bold' } : {}}>{label}</Form.Label>
                  <Form.Control
                    {...rest}
                    type={rest.type || 'number'}
                    size="sm"
                    value={controlValue}
                    onChange={e => handleInputChange(field, e.target.value)}
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

const TableSection = ({ headers, data, renderRow, maxHeight }) => (
  <Card className="mt-4">
    <Card.Header className="modern-card-header">{headers.title}</Card.Header>
    <Card.Body style={{ maxHeight, overflowY: 'auto' }}>
      <Table striped bordered hover responsive className="modern-table table-sm">
        <thead className="bg-dark text-white">
          <tr>
            {headers.cols.map((col, i) => <th key={i}>{col}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => <tr key={i}>{renderRow(row)}</tr>)}
        </tbody>
      </Table>
    </Card.Body>
  </Card>
);

const getResultsConfig = (id) => {
  const configs = {
    S1: { cols: ['Year', 'Balance', 'Contribution', 'Interest Earned', 'New Balance'], title: 'Financial Projection' },
    S2: { cols: ['Year', 'Total Revenue', 'Decrease in Revenue'], title: 'Revenue Impact' },
    S3: { cols: ['Year', 'Increase in Expenses'], title: 'Expense Impact' },
    S4: { cols: ['Year', 'Base Expense', 'Increase', 'New Total'], title: 'Operating Expense Impact' },
    S5: {
      cols: ['Year', 'Balance', 'Contribution', 'Interest Earned', 'Loan Payment', 'Principal Payment', 'New Balance'],
      title: 'Debt Service Analysis',
    },
  };
  return configs[id] || { cols: [], title: '' };
};

const WorkPapers = () => {
  const [workpapers, setWorkpapers] = useState(initialWorkpapers);
  const [selectedWorkpaper, setSelectedWorkpaper] = useState(workpapers.S1);
  const initInputs = structuredClone(selectedWorkpaper.inputs);
  if (['S1', 'S2', 'S3', 'S4', 'S5'].includes(selectedWorkpaper.id)) {
    initInputs.scenarioName = selectedWorkpaper.name;
  }
  const [inputs, setInputs] = useState(initInputs);

  const updateWorkpaperInputs = newInputs => {
    setInputs(newInputs);
    setWorkpapers(prev => ({
      ...prev,
      [selectedWorkpaper.id]: {
        ...prev[selectedWorkpaper.id],
        inputs: newInputs,
        name: newInputs.scenarioName || prev[selectedWorkpaper.id].name,
      },
    }));
    setSelectedWorkpaper(prev => ({
      ...prev,
      inputs: newInputs,
      name: newInputs.scenarioName || prev.name,
    }));
  };

  const handleInputChange = (field, value, index) => {
    let newInputs;
    if (selectedWorkpaper.id === 'S3') {
      newInputs = {
        ...inputs,
        expenses: inputs.expenses.map((e, i) => (i === index ? { ...e, amount: Math.abs(parseFloat(value)) || 0 } : e)),
      };
    } else if (['S5A', 'S5B'].includes(selectedWorkpaper.id)) {
      newInputs = { ...inputs, [field]: field === 'startDate' ? new Date(value) : parseFloat(value) || 0 };
    } else {
      newInputs = { ...inputs, [field]: field === 'scenarioName' ? value : parseFloat(value) || 0 };
    }
    updateWorkpaperInputs(newInputs);
  };

  const stressData = useMemo(
    () => selectedWorkpaper.calculations.stressEffects(inputs),
    [inputs, selectedWorkpaper],
  );
  const loanData = useMemo(
    () => (['S5A', 'S5B'].includes(selectedWorkpaper.id)
      ? selectedWorkpaper.calculations.stressEffects(inputs)
      : null
    ),
    [inputs, selectedWorkpaper],
  );
  const residualData = useMemo(() => {
    if (['S5A', 'S5B'].includes(selectedWorkpaper.id)) {
      return selectedWorkpaper.calculations.residualEffects(loanData);
    }
    if (selectedWorkpaper.id === 'S5') {
      return selectedWorkpaper.calculations.residualEffects(stressData, inputs);
    }
    return selectedWorkpaper.calculations.residualEffects(stressData);
  }, [stressData, loanData, selectedWorkpaper, inputs]);

  const headerTitle = ['S1', 'S2', 'S3', 'S4', 'S5'].includes(selectedWorkpaper.id)
    ? 'Stress Effects'
    : 'Input Parameters';

  const handleWorkpaperChange = wp => {
    setSelectedWorkpaper(wp);
    const newInputs = structuredClone(wp.inputs);
    if (['S1', 'S2', 'S3', 'S4', 'S5'].includes(wp.id)) {
      newInputs.scenarioName = wp.name;
    }
    setInputs(newInputs);
  };

  const renderResultsRow = row => {
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
    if (id === 'S4') {
      return (
        <>
          <td>{row.year}</td>
          <td>${row.totalExpense?.toLocaleString()}</td>
          <td>${row.increaseInExpenses?.toLocaleString()}</td>
          <td>${row.newTotal?.toLocaleString()}</td>
        </>
      );
    }
    if (id === 'S5') {
      return (
        <>
          <td>{row.year}</td>
          <td>${row.balance?.toLocaleString()}</td>
          <td>${row.yearlyContribution?.toLocaleString()}</td>
          <td>${row.interestEarned?.toLocaleString()}</td>
          <td>${row.loanPayment?.toLocaleString()}</td>
          <td>${row.principalPayment?.toLocaleString()}</td>
          <td>${row.newBalance?.toLocaleString()}</td>
        </>
      );
    }
    return null;
  };

  return (
    <Container id={PAGE_IDS.WORKPAPERS} className="py-4">
      {inlineStyles}
      <Dropdown className="mb-4">
        <Dropdown.Toggle variant="outline-primary">
          {selectedWorkpaper.name}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {Object.keys(workpapers).map(key => (
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

      {!['S5A', 'S5B'].includes(selectedWorkpaper.id) && (
        <TableSection
          headers={getResultsConfig(selectedWorkpaper.id)}
          data={stressData}
          renderRow={renderResultsRow}
          maxHeight="400px"
        />
      )}

      {['S5A', 'S5B'].includes(selectedWorkpaper.id) && (
        <TableSection
          headers={{
            cols: ['#', 'Payment Date', 'Beginning Balance', 'Payment', 'Principal', 'Interest', 'Ending Balance'],
            title: 'Loan Amortization Schedule',
          }}
          data={loanData?.schedule || []}
          renderRow={payment => (
            <>
              <td>{payment.paymentNumber}</td>
              <td>{payment.paymentDate.toLocaleDateString()}</td>
              <td>${payment.beginningBalance.toFixed(2)}</td>
              <td>${payment.payment.toFixed(2)}</td>
              <td>${payment.principal.toFixed(2)}</td>
              <td>${payment.interest.toFixed(2)}</td>
              <td>${payment.endingBalance.toFixed(2)}</td>
            </>
          )}
          maxHeight="600px"
        />
      )}

      {['S5A', 'S5B'].includes(selectedWorkpaper.id) && (
        <TableSection
          headers={{
            cols: ['Year', 'Total Interest', 'Average Monthly Interest'],
            title: 'Annual Interest Summary',
          }}
          data={residualData}
          renderRow={row => (
            <>
              <td>{row.year}</td>
              <td>${row.totalInterest.toFixed(2)}</td>
              <td>${row.averageMonthlyInterest.toFixed(2)}</td>
            </>
          )}
          maxHeight="300px"
        />
      )}

      {!['S5A', 'S5B'].includes(selectedWorkpaper.id) && (
        <TableSection
          headers={{
            cols: ['Year', 'Principal', 'Return Rate', 'Forecast Year', 'Cumulative Interest Lost'],
            title: 'Residual Effects',
          }}
          data={residualData}
          renderRow={row => (
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
      )}
    </Container>
  );
};

export default WorkPapers;
