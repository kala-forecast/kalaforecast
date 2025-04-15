import React, { useState, useMemo } from 'react';
import { Container, Table, Form, Row, Col, Card } from 'react-bootstrap';

const Workpaper2 = () => {
  // Even though you might have inputs for percentDrop and returnRate,
  // the total revenues are preset from your spreadsheet.
  const [percentDrop, setPercentDrop] = useState(2.25);
  const [returnRate, setReturnRate] = useState(6.02);

  // Preset total revenue data for each fiscal year
  // (You can adjust these values to match your exact sheet.)
  const presetRevenues = [
    { year: 2025, revenue: 153034 },
    { year: 2026, revenue: 155329 },
    { year: 2027, revenue: 157659 },
    { year: 2028, revenue: 160024 },
    { year: 2029, revenue: 162424 },
    { year: 2030, revenue: 164861 },
    { year: 2031, revenue: 167334 },
    { year: 2032, revenue: 169844 },
    { year: 2033, revenue: 172391 },
    { year: 2034, revenue: 174977 },
    { year: 2035, revenue: 177602 },
    { year: 2036, revenue: 180266 },
  ];

  // Number of forecast years is the length of the preset array.
  const forecastYears = presetRevenues.length;

  // Create the Stress Table by applying the “decrease” function to the preset revenues.
  // Here, the decrease is computed as 2.25% of the preset revenue (as a negative value)
  const stressData = useMemo(() => {
    return presetRevenues.map(({ year, revenue }) => ({
      year,
      revenue,
      decrease: Math.round(revenue * (-percentDrop / 100)),
    }));
  }, [presetRevenues, percentDrop]);

  // Create the Residual Effects Table based on the stressData.
  // For each year, we take the absolute value of the decrease as the principal,
  // then sum the compound lost interest on all losses (including the current year)
  // using the formula:
  //    Interest Lost = principal * ((1 + returnRate/100)^(i - j + 1) - 1)
  // where i = index of current year and j = index of the loss year.
  const residualData = useMemo(() => {
    // Get an array of principal amounts (absolute value of the decrease)
    const principalArray = stressData.map(d => Math.abs(d.decrease));
    const results = [];

    for (let i = 0; i < forecastYears; i++) {
      const year = presetRevenues[i].year;
      let totalInterestLost = 0;

      // Sum compound interest on all losses from year 0 up through the current year.
      // We use i - j + 1 to assume that each loss immediately “ages” one year.
      for (let j = 0; j <= i; j++) {
        const principal = principalArray[j];
        const yearsElapsed = i - j + 1;
        const interest = principal * (Math.pow(1 + returnRate / 100, yearsElapsed) - 1);
        totalInterestLost += interest;
      }

      results.push({
        year,
        principal: principalArray[i],
        totalInterestLost: Math.round(totalInterestLost),
      });
    }

    return results;
  }, [stressData, presetRevenues, forecastYears, returnRate]);

  return (
    <Container id="WORKPAPER2" className="py-4">
      {/* Optional: Scenario Inputs for adjusting the percent drop and return rate */}
      <Card className="mb-4">
        <Card.Header>Scenario Inputs</Card.Header>
        <Card.Body style={{ maxHeight: '150px', overflowY: 'auto' }}>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>% Decrease</Form.Label>
                  <Form.Control
                    type="number"
                    value={percentDrop}
                    step="0.01"
                    onChange={(e) => setPercentDrop(Number(e.target.value))}
                    min={0}
                    max={100}
                    style={{ width: '100%' }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Return Rate (%)</Form.Label>
                  <Form.Control
                    type="number"
                    value={returnRate}
                    step="0.01"
                    onChange={(e) => setReturnRate(Number(e.target.value))}
                    min={0}
                    max={100}
                    style={{ width: '100%' }}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      {/* Stress Effects Table */}
      <Card className="mb-4">
        <Card.Header className="py-2">Stress Effects</Card.Header>
        <Card.Body className="py-2" style={{ maxHeight: '600px', overflowY: 'auto' }}>
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead className="bg-primary text-white">
                <tr>
                  <th>Fiscal Year</th>
                  <th>Total Revenue</th>
                  <th>Decrease in Revenue</th>
                </tr>
              </thead>
              <tbody>
                {stressData.map((row) => (
                  <tr key={row.year}>
                    <td>{row.year}</td>
                    <td>{`$${row.revenue.toLocaleString()}`}</td>
                    <td>{`$${row.decrease.toLocaleString()}`}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      {/* Residual Effects Table */}
      <Card className="mb-4">
        <Card.Header className="py-2">Residual Effects</Card.Header>
        <Card.Body className="py-2" style={{ maxHeight: '600px', overflowY: 'auto' }}>
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead className="bg-primary text-white">
                <tr>
                  <th>Fiscal Year</th>
                  <th>Principal (Lost Revenue)</th>
                  <th>Total Interests Lost</th>
                </tr>
              </thead>
              <tbody>
                {residualData.map((row) => (
                  <tr key={row.year}>
                    <td>{row.year}</td>
                    <td>{`$${row.principal.toLocaleString()}`}</td>
                    <td>{`$${row.totalInterestLost.toLocaleString()}`}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Workpaper2;
