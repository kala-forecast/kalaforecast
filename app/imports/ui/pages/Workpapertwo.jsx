import React, { useState, useMemo } from 'react';
import { Container, Table, Form, Row, Col, Card } from 'react-bootstrap';

const Workpaper2 = () => {
  const [baseRevenue, setBaseRevenue] = useState(153034);
  const [percentDrop, setPercentDrop] = useState(2.25);
  const [forecastYears, setForecastYears] = useState(12);
  const [returnRate, setReturnRate] = useState(6.02);

  const stressData = useMemo(() => {
    const results = [];
    let revenue = baseRevenue;
    for (let i = 0; i < forecastYears; i++) {
      const year = 2025 + i;
      const decrease = revenue * (percentDrop / 100);
      results.push({
        year,
        revenue: Math.round(revenue),
        decrease: Math.round(decrease),
      });
      revenue += decrease;
    }
    return results;
  }, [baseRevenue, percentDrop, forecastYears]);

  const residualData = useMemo(() => {
    const principalArray = stressData.map(d => d.decrease);
    const results = [];

    for (let i = 0; i < forecastYears; i++) {
      const year = 2025 + i;
      let yearlyLoss = 0;

      for (let j = 0; j <= i; j++) {
        const principal = principalArray[j];
        const years = i - j + 1;
        const interest = principal * Math.pow(1 + returnRate / 100, years) - principal;
        yearlyLoss += interest;
      }

      results.push({
        year,
        principal: principalArray[i],
        interestLost: Math.round(yearlyLoss),
      });
    }

    return results;
  }, [stressData, forecastYears, returnRate]);

  return (
    <Container id="WORKPAPER2" className="py-4">
      {/* Scenario Inputs Section */}
      <Card className="mb-4" >
        <Card.Header >Scenario Inputs</Card.Header>
        <Card.Body style={{ maxHeight: '230px', overflowY: 'auto' }}>
          <Form style={{ marginBottom: 0 }}>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Base Year Revenue</Form.Label>
                  <Form.Control
                    type="number"
                    value={baseRevenue}
                    onChange={(e) => setBaseRevenue(Number(e.target.value))}
                    min={0}
                    style={{ width: '100%' }}
                  />
                </Form.Group>
              </Col>
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
            </Row>
            <Row className="mt-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Forecast Years</Form.Label>
                  <Form.Control
                    type="number"
                    value={forecastYears}
                    onChange={(e) => setForecastYears(Number(e.target.value))}
                    min={1}
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
                  <th>Year</th>
                  <th>Principal</th>
                  <th>Total Interests Lost</th>
                </tr>
              </thead>
              <tbody>
                {residualData.map((row) => (
                  <tr key={row.year}>
                    <td>{row.year}</td>
                    <td>{`$${row.principal.toLocaleString()}`}</td>
                    <td>{`$${row.interestLost.toLocaleString()}`}</td>
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
