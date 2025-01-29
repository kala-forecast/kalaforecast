/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import {
  Container,
  Form,
  Button,
  Table,
} from 'react-bootstrap';

const EditWorkpaper = () => {
  const [scenarioName, setScenarioName] = useState('');

  // Sets temporary data in table for 2 rows
  const [lineItems, setLineItems] = useState([
    {
      id: 1,
      year: 2025,
      timePeriod: 'Q1',
      balance: 10000,
      yearlyContribution: 1000,
      valueOfInvestment: 11000,
      estimatedInterest: 5,
    },
    {
      id: 2,
      year: 2026,
      timePeriod: 'Q2',
      balance: 12000,
      yearlyContribution: 1000,
      valueOfInvestment: 13000,
      estimatedInterest: 5,
    },
  ]);

  // Handle changes to line item
  const handleLineItemChange = (id, field, newValue) => {
    setLineItems((prevItems) => prevItems.map((item) => {
      if (item.id === id) {
        if (
          ['year', 'balance', 'yearlyContribution', 'valueOfInvestment', 'estimatedInterest']
            .includes(field)
        ) {
          return { ...item, [field]: Number(newValue) };
        }
        return { ...item, [field]: newValue };
      }
      return item;
    }));
  };

  // Add new row; fill in with temporary values
  const handleAddRow = () => {
    const newId =
      lineItems.length > 0 ? Math.max(...lineItems.map((i) => i.id)) + 1 : 1;
    const newItem = {
      id: newId,
      year: 2027,
      timePeriod: '',
      balance: 0,
      yearlyContribution: 0,
      valueOfInvestment: 0,
      estimatedInterest: 0,
    };
    setLineItems((prevItems) => [...prevItems, newItem]);
  };

  // Remove a row by ID
  const handleRemoveRow = (id) => {
    setLineItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <Container className="py-3" align="center">
      <Form.Group className="mb-4" controlId="scenarioName" style={{ maxWidth: '400px', width: '100%' }}>
        <Form.Label>Scenario Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ex: 30% drop in return rate of investment"
          value={scenarioName}
          onChange={(e) => setScenarioName(e.target.value)}
        />
      </Form.Group>

      <div className="mb-4">
        <Button variant="outline-primary" className="m-2">Stress Test 1</Button>
        <Button variant="outline-primary" className="m-2">Stress Test 2</Button>
        <Button variant="outline-primary" className="m-2">Stress Test 3</Button>
      </div>
      <Table striped bordered hover style={{ maxWidth: '95%' }}>
        <thead>
          <tr className="text-center">
            <th>Year</th>
            <th>Time Period</th>
            <th>Balance</th>
            <th>Yearly Contribution</th>
            <th>Value of Investment</th>
            <th>Estimated Interest (%)</th>
          </tr>
        </thead>
        <tbody>
          {lineItems.map((item) => (
            <tr key={item.id}>
              {/* Year */}
              <td>
                <Form.Control
                  type="number"
                  aria-label={`Year for row ${item.id}`}
                  value={item.year}
                  onChange={(e) => handleLineItemChange(item.id, 'year', e.target.value)}
                />
              </td>

              {/* Handle row for time period */}
              <td>
                <Form.Control
                  type="text"
                  placeholder="e.g. Q1, Q2"
                  aria-label={`Time Period for row ${item.id}`}
                  value={item.timePeriod}
                  onChange={(e) => handleLineItemChange(item.id, 'timePeriod', e.target.value)}
                />
              </td>

              {/* Handle row for balance */}
              <td>
                <Form.Control
                  type="number"
                  aria-label={`Balance for row ${item.id}`}
                  value={item.balance}
                  onChange={(e) => handleLineItemChange(item.id, 'balance', e.target.value)}
                />
              </td>

              {/* Handle row for yearly contribution */}
              <td>
                <Form.Control
                  type="number"
                  aria-label={`Yearly Contribution for row ${item.id}`}
                  value={item.yearlyContribution}
                  onChange={(e) => handleLineItemChange(item.id, 'yearlyContribution', e.target.value)}
                />
              </td>

              {/* Handle row for value of investment */}
              <td>
                <Form.Control
                  type="number"
                  aria-label={`Value of Investment for row ${item.id}`}
                  value={item.valueOfInvestment}
                  onChange={(e) => handleLineItemChange(item.id, 'valueOfInvestment', e.target.value)}
                />
              </td>

              {/* Handle row for estimated interest */}
              <td>
                <Form.Control
                  type="number"
                  aria-label={`Estimated Interest for row ${item.id}`}
                  value={item.estimatedInterest}
                  onChange={(e) => handleLineItemChange(item.id, 'estimatedInterest', e.target.value)}
                />
              </td>

              {/* Remove a row */}
              <td className="text-center">
                <Button
                  variant="danger"
                  type="button"
                  onClick={() => handleRemoveRow(item.id)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add a row */}
      <Button variant="primary" onClick={handleAddRow}>
        Add Row
      </Button>
    </Container>
  );
};

export default EditWorkpaper;
