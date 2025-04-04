import React, { useState, useMemo } from 'react';
import { Container, Table, Form, Row, Col, Card } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

const WorkPapers = () => {
  // Default values assignment, destructured with the set variables
  const [presentValue, setPresentValue] = useState(50000); // Starting value
  const [interestRate, setInterestRate] = useState(4.2); // Starting interest rate
  const [termInYears, setTermInYears] = useState(10); // Starting term
  const [monthlyContribution, setMonthlyContribution] = useState(100.0); // Starting monthly contribution (reinvested interest)
  const [yearRange, setYearRange] = useState([1, 30]); // Default range of years (updated to 30 years)

  function calculateFD(pV, iR, tIY, rRate, yR) {
    const [startYear, endYear] = yR; // Updates start and end year
    const decimalInterestRate = iR / 100; // Converts interest rate to decimal
    const reinvestmentFraction = rRate / 100; // Converts reinvestment rate percentage to decimal
    const results = []; // Used for output

    let currentBalance = pV; // Current balance to protect present value

    // Iterate over range of years from startYear to endYear
    for (let year = startYear; year <= endYear; year++) {
      const interestEarned = currentBalance * decimalInterestRate; // Current interest
      const reinvestedContribution = interestEarned * reinvestmentFraction; // Portion of interest reinvested
      const newBalance = currentBalance + reinvestedContribution; // New balance after reinvestment
      // Update row per iteration
      results.push({
        year,
        balance: currentBalance,
        reinvestedContribution,
        interestEarned,
        interestPlusBalance: newBalance,
      });
      currentBalance = newBalance;
    }
    return results;
  }

  function calculateResidualEffects(rRate, pV, tIY, forecastYears) {
    const baseMonthlyContribution = 1000; // Monthly contribution
    const effectiveMonthlyContribution = baseMonthlyContribution * (rRate / 100); // Based on reinvestment rate
    const yearlyContribution = effectiveMonthlyContribution * 12; // Calculate yearly contribution
    const factor = (pV / 50000 + tIY / 10) / 2; // Adjust residual effects based on stress effects
    const initialResidualPrincipal = yearlyContribution * 0.075 * factor; // Starting principal
    const residualContribution = yearlyContribution * 0.07815 * factor; // Residual annual contribution
    const residualRate = 6.02; // Annual return rate for residual effects
    const results = []; // Used for output
    let currentPrincipal = initialResidualPrincipal;
    let cumulativeInterestsLost = 0;
    // Iterate over forecast years starting from 2025
    for (let i = 1; i <= forecastYears; i++) {
      const year = 2025 + i - 1;
      const interestEarned = currentPrincipal * (residualRate / 100);
      cumulativeInterestsLost += interestEarned;
      results.push({
        year,
        principal: Math.round(currentPrincipal),
        annualReturnRate: residualRate,
        forecastYears: i,
        totalInterestsLost: Math.round(cumulativeInterestsLost),
      });
      currentPrincipal = currentPrincipal + interestEarned + residualContribution;
    }
    return results;
  }
  // Table data collects the data of the values and is used to occupy the table
  const tableData = useMemo(
    // Call Calculate Financial Data function with the 5 variables
    () => calculateFD(presentValue, interestRate, termInYears, monthlyContribution, yearRange),
    [presentValue, interestRate, termInYears, monthlyContribution, yearRange],
  );
  const residualForecastYears = 12; // Forecast for 12 years
  const residualData = useMemo(
    // Call Residual Effects function with stress effects values and forecast years
    () => calculateResidualEffects(monthlyContribution, presentValue, termInYears, residualForecastYears),
    [monthlyContribution, presentValue, termInYears, residualForecastYears],
  );

  return (
    <Container id={PAGE_IDS.WORKPAPERS} className="py-4">
      <Card>
        <Card.Header className="py-2">Stress Effects</Card.Header>
        <Card.Body className="py-2" style={{ height: '275px', overflowY: 'auto' }}>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Present Value</Form.Label>
                  <Form.Control
                    type="number"
                    value={presentValue}
                    onChange={(e) => setPresentValue(Number(e.target.value))}
                    min={0}
                    style={{ width: '100%' }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-1">
                  <Form.Label>Interest Rate</Form.Label>
                  <Form.Control
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    min={0}
                    max={100}
                    style={{ width: '100%' }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-1">
                  <Form.Label>Monthly Contribution (% reinvested interest)</Form.Label>
                  <Form.Control
                    type="number"
                    value={monthlyContribution}
                    onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                    min={0}
                    max={100}
                    step="0.1"
                    style={{ width: '100%' }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-1">
                  <Form.Label>Term (Years)</Form.Label>
                  <Form.Control
                    type="number"
                    value={termInYears}
                    onChange={(e) => setTermInYears(Number(e.target.value))}
                    min={1}
                    style={{ width: '100%' }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={8}>
                <Form.Group className="mb-2">
                  <Form.Label>Year Range</Form.Label>
                  <Row>
                    <Col>
                      <Form.Control
                        type="number"
                        value={yearRange[0]}
                        onChange={(e) => setYearRange([Number(e.target.value), yearRange[1]])}
                        min={1}
                        style={{ width: '100%' }}
                      />
                    </Col>
                    <Col xs="auto" className="d-flex align-items-center">
                      to
                    </Col>
                    <Col>
                      <Form.Control
                        type="number"
                        value={yearRange[1]}
                        // Allow empty input so it doesn't force 0
                        onChange={(e) => setYearRange([yearRange[0], e.target.value === '' ? '' : Number(e.target.value)])}
                        // On blur, reset empty value to 30
                        onBlur={(e) => {
                          if (e.target.value === '') setYearRange([yearRange[0], 30]);
                        }}
                        min={yearRange[0]}
                        style={{ width: '100%' }}
                      />
                    </Col>
                  </Row>
                  <Form.Text className="text-muted">
                    Start and end years for the table
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      <br />

      <Card>
        <Card.Header className="py-2">Financial Projection</Card.Header>
        <Card.Body className="py-2">
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead className="bg-primary text-white">
                <tr>
                  <th>Year</th>
                  <th>Balance</th>
                  <th>Yearly Contribution</th>
                  <th>Interest Earned</th>
                  <th>Interest + Balance</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row) => (
                  <tr key={row.year}>
                    <td>{row.year}</td>
                    <td>{`$${Math.round(row.balance).toLocaleString()}`}</td>
                    <td>$ -</td>
                    <td>{`$${Math.round(row.interestEarned).toLocaleString()}`}</td>
                    <td>{`$${Math.round(row.interestPlusBalance).toLocaleString()}`}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      <br />

      <Card>
        <Card.Header className="py-2">Residual Effects</Card.Header>
        <Card.Body className="py-2" style={{ height: '575px', overflowY: 'auto' }}>
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead className="bg-primary text-white">
                <tr>
                  <th>Year</th>
                  <th>Principal</th>
                  <th>Annual Return Rate</th>
                  <th>Years</th>
                  <th>Interests Lost</th>
                </tr>
              </thead>
              <tbody>
                {residualData.map((row) => (
                  <tr key={row.year}>
                    <td>{row.year}</td>
                    <td>{`$${row.principal.toLocaleString()}`}</td>
                    <td>{`${row.annualReturnRate.toFixed(2)}%`}</td>
                    <td>{row.forecastYears}</td>
                    <td>{row.totalInterestsLost.toLocaleString()}</td>
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
export default WorkPapers;
