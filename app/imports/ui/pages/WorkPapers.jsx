import React, { useState, useMemo } from 'react';
import { Container, Table, Form, Row, Col, Card } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

const WorkPapers = () => {
  // Default values assignment, destructured with the set variables
  const [presentValue, setPresentValue] = useState(50000); // Starting value
  const [interestRate, setInterestRate] = useState(4.2); // Starting interest rate
  const [termInYears, setTermInYears] = useState(10); // Starting term
  const [monthlyContribution, setMonthlyContribution] = useState(1000); // Starting monthly contribution
  const [yearRange, setYearRange] = useState([1, 10]); // Default range of years
  function calculateFD(pV, iR, tIY, mC, yR) {
    const [startYear, endYear] = yR; // Updates start and end year
    const yearlyContribution = mC * 12; // Calculate yearly contribution
    const decimalInterestRate = iR / 100; // Converts interest rate to decimal
    const results = []; // Used for output

    let currentBalance = pV; // Current balance to protect present value

    // Iterate over range of years from startYear to endYear
    for (let year = startYear; year <= endYear; year++) {
      const interestEarned = currentBalance * decimalInterestRate; // Current interest
      const interestPlusBalance = currentBalance + interestEarned; // Current Interest + Balance
      // Update row per iteration
      results.push({
        year,
        balance: currentBalance,
        yearlyContribution,
        interestEarned,
        interestPlusBalance,
      });
      currentBalance = interestPlusBalance + yearlyContribution;
    }

    return results;
  }
  // Table data collects the data of the values and is used to occupy the table
  const tableData = useMemo(() => {
    // useMemo to optimize hooking data
    // Call Calculate Financial Data function with the 5 variables
    return calculateFD(
      presentValue,
      interestRate,
      termInYears,
      monthlyContribution,
      yearRange,
    );
    //
  }, [presentValue, interestRate, termInYears, monthlyContribution, yearRange]);
  // Formats input to limit currency values to 2 decimal points
  // Format currency values

  return (
    <Container id={PAGE_IDS.WORKPAPERS} className="py-4">
      <Card style={{ maxHeight: '350px', overflow: 'auto' }}>
        <Card.Header className="py-2">Stress Effects</Card.Header>
        <Card.Body className="py-2 ">
          <Form>
            <Row>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Present Value</Form.Label>
                  <Form.Control type="number" value={presentValue} onChange={(e) => setPresentValue(Number(e.target.value))} min={0} />
                  <Form.Text className="text-muted">
                    Beginning Balance
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-1">
                  <Form.Label>Interest Rate</Form.Label>
                  <Form.Control type="number" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} min={0} max={100} />
                  <Form.Text className="text-muted">
                    Beginning Interest
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-1">
                  <Form.Label>Monthly Contribution ($)</Form.Label>
                  <Form.Control type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(Number(e.target.value))} min={0} />
                  <Form.Text className="text-muted">
                    Amount added each month
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-1">
                  <Form.Label>Term (Years)</Form.Label>
                  <Form.Control type="number" value={termInYears} onChange={(e) => setTermInYears(Number(e.target.value))} min={1} />
                  <Form.Text className="text-muted">
                    Term In Years
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label>Year Range</Form.Label>
                  <Row>
                    <Col>
                      <Form.Control type="number" value={yearRange[0]} onChange={(e) => setYearRange([Number(e.target.value), yearRange[1]])} min={1} />
                    </Col>
                    <Col xs="auto" className="d-flex align-items-center">
                      to
                    </Col>
                    <Col>
                      <Form.Control type="number" value={yearRange[1]} onChange={(e) => setYearRange([yearRange[0], Number(e.target.value)])} min={yearRange[0]} />
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
      <Card style={{ maxHeight: '850px', overflow: 'auto' }}>
        <Card.Header as="h5">Financial Projection</Card.Header>
        <Card.Body>
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead className="bg-primary text-white">
                <tr>
                  <th scope="col">Year</th>
                  <th scope="col">Balance</th>
                  <th scope="col">Yearly Contribution</th>
                  <th scope="col">Interest Earned</th>
                  <th scope="col">Interest + Balance</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row) => (
                  <tr key={row.year}>
                    <td>{row.year}</td>
                    <td>{row.balance}</td>
                    <td>{row.yearlyContribution}</td>
                    <td>{row.interestEarned}</td>
                    <td>{row.interestPlusBalance}</td>
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
