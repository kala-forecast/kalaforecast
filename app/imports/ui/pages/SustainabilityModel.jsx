/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { Container, Button, Table, Tabs, Tab, Row, Col, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import { CaretRightFill, CaretDownFill } from 'react-bootstrap-icons';
import { PAGE_IDS } from '../utilities/PageIDs';

const SustainabilityModel = () => {

  const [expandedRows, setExpandedRows] = useState({});
  const [activeScenarios, setActiveScenarios] = useState({});

  const toggleRow = (rowId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  };

  const scenarioData = {
    3: [900, 1892, 2982, 4180, 5491, 6926, 8494, 10204, 12067, 14094, 16298, 18691],
    4: [54, 226, 587, 1221, 2225, 3705, 5786, 8607, 12324, 17114, 23172, 30721],
    5: [3443, 3495, 3547, 3601, 3655, 3709, 3765, 3821, 3879, 3937, 3996, 4056],
    6: [207, 637, 1307, 2234, 3436, 4934, 6749, 8904, 11421, 14327, 17649, 25294],
    7: [0, 0, 0, 0, 0, 3010, 6201, 9585, 13172, 16974, 21006, 25281],
    8: [79, 242, 495, 842, 1289, 1843, 2509, 3295, 4207, 5254, 6443, 7783],
    9: [227, 582, 1071, 1810, 2594, 3532, 4632, 5900, 7343, 8970, 10786, 12799],
  };

  const [incomeStatementData, setIncomeStatementData] = useState([
    { id: 1, title: 'Net Sales', data: [153034, 155329, 157659, 160024, 162424, 164861, 167334, 169844, 172391, 174977, 177602, 180266],
      expandableRows: [
        { id: 2, title: 'Revenue', data: [153034, 155329, 157659, 160024, 162424, 164861, 167334, 169844, 172391, 174977, 177602, 180266] },
        { id: 3, title: 'Scenario 1 - Stress Effect', data: [] },
        { id: 4, title: 'Scenario 1 - Residual Effect', data: [] },
        { id: 5, title: 'Scenario 2 - Stress Effect', data: [] },
        { id: 6, title: 'Scenario 2 - Residual Effect', data: [] },
        { id: 7, title: 'Scenario 3 - Stress Effect', data: [] },
        { id: 8, title: 'Scenario 4 - Stress Effect', data: [] },
        { id: 9, title: 'Scenario 4 - Residual Effect', data: [] },
      ],
    },
    { id: 10, title: 'Cost of Goods Sold', data: [],
      expandableRows: [
        { id: 11, title: 'Cost of Contracting', data: [] },
        { id: 12, title: 'Overhead', data: [] },
      ],
    },
    { id: 13, title: 'Gross Profit', data: [] },
    { id: 14, title: 'Gross Margin %', data: [] },
    { id: 15, title: 'Total Operating Expenses', data: [],
      expandableRows: [
        { id: 16, title: 'Salaries and Benefits', data: [] },
        { id: 17, title: 'Rent and Overhead', data: [] },
        { id: 18, title: 'Depreciation and Amortization', data: [] },
        { id: 19, title: 'Interest', data: [] },
        { id: 20, title: 'Scenario 3 - Stress Effect', data: [] },
        { id: 21, title: 'Scenario 4 - Stress Effect', data: [] },
        { id: 22, title: 'Scenario 5 - Stress Effect', data: [] },
      ],
    },
    { id: 23, title: 'Operating Expenses %', data: [] },
    { id: 24, title: 'Profit (loss) from Operations', data: [] },
    { id: 25, title: 'Profit (loss) from Operations %', data: [] },
    { id: 26, title: 'Total Other Income (expense)', data: [],
      expandableRows: [
        { id: 27, title: 'Interest Income', data: [] },
        { id: 28, title: 'Interest Expense', data: [] },
        { id: 29, title: 'Gain (loss) on disposal of assets', data: [] },
        { id: 30, title: 'Other income (expense)', data: [] },
      ],
    },
    { id: 31, title: 'Total other income (expense) %', data: [] },
    { id: 32, title: 'Income (loss) before income taxes', data: [] },
    { id: 33, title: 'Pre-tax income %', data: [] },
    { id: 34, title: 'Net Income (loss)', data: [],
      expandableRows: [
        { id: 35, title: 'Income taxes', data: [] },
      ],
    },
    { id: 36, title: 'Net Income (loss) %', data: [] },
  ]);

  const assetsData = [
    { id: 37, title: 'Total Current Assets', data: [],
      expandableRows: [
        { id: 38, title: 'Cash and cash equivalents', data: [] },
        { id: 39, title: 'Accounts receivable', data: [] },
        { id: 40, title: 'Inventory', data: [] },
      ],
    },
    { id: 41, title: 'Total Long-Term Assets', data: [],
      expandableRows: [
        { id: 42, title: 'Property, plant, and equipment', data: [] },
        { id: 43, title: 'Investment', data: [] },
        { id: 44, title: 'Scenario 1 - Stress Effect', data: [] },
        { id: 45, title: 'Scenario 2 - Stress Effect', data: [] },
      ],
    },
    { id: 46, title: 'TOTAL ASSETS', data: [] },
  ];

  const liabilitiesEquityData = [
    { id: 47, title: 'Total Current Liabilities (due within 1 year)', data: [],
      expandableRows: [
        { id: 48, title: 'Accounts payable', data: [] },
        { id: 49, title: 'Debt Service', data: [] },
        { id: 50, title: 'Taxes payable', data: [] },
      ],
    },
    { id: 51, title: 'Total Long-term Liabilities (due after one year)', data: [],
      expandableRows: [
        { id: 52, title: 'Debt service', data: [] },
        { id: 53, title: 'Loans payable', data: [] },
        { id: 54, title: 'Scenario 5 - Stress Effect', data: [] },
      ],
    },
    { id: 55, title: 'Total Liabilities', data: [] },
    { id: 56, title: 'Total Stockholder\'s Equity', data: [],
      expandableRows: [
        { id: 57, title: 'Equity Capital', data: [] },
        { id: 58, title: 'Retained Earnings', data: [] },
      ],
    },
    { id: 59, title: 'TOTAL LIABILITIES AND EQUITY', data: [] },
  ];

  const calculateNetSales = (rows) => {
    // Find the revenue row inside expandableRows
    const revenueRow = rows.flatMap(row => row.expandableRows || []).find(row => row.id === 2);

    if (!revenueRow) return Array(12).fill(0); // Prevent errors if revenue is missing

    let totalDeductions = Array(12).fill(0);

    // Sum all scenario effect rows (they have IDs > 2)
    rows.flatMap(row => row.expandableRows || []).forEach((row) => {
      if (row.id > 2) { // Assuming deductions start at ID 3
        totalDeductions = totalDeductions.map((value, i) => value + (row.data[i] || 0));
      }
    });

    // Subtract deductions from revenue to get Net Sales
    return revenueRow.data.map((value, i) => value - totalDeductions[i]);
  };

  // Function to toggle scenario activation
  const toggleScenario = (scenarioId) => {
    setActiveScenarios((prev) => {
      const newActiveState = { ...prev, [scenarioId]: !prev[scenarioId] }; // Toggle active state

      // Update Income Statement Data separately
      setIncomeStatementData((prevData) => {
        const updatedRows = prevData.map((section) => {
          if (section.expandableRows) {
            return {
              ...section,
              expandableRows: section.expandableRows.map((row) => {
                if (row.id === scenarioId) {
                  return {
                    ...row,
                    data: newActiveState[scenarioId] ? scenarioData[scenarioId] || [] : [],
                  };
                }
                return row;
              }),
            };
          }
          return section;
        });

        // Update Net Sales in the "Net Sales" row (ID = 1)
        return updatedRows.map((section) => {
          if (section.id === 1) {
            return {
              ...section,
              data: calculateNetSales(updatedRows),
            };
          }
          return section;
        });
      });

      return newActiveState; // Correctly return the updated active scenario state
    });
  };

  const renderTable = (dataset) => (
    <>
      {dataset.map((row) => (
        <React.Fragment key={row.id}>
          {/* Main row */}
          <tr>
            <th>
              {row.expandableRows && row.expandableRows.length > 0 && (
                <Button variant="link" className="p-0 mx-1 border-0 bg-transparent" onClick={() => toggleRow(row.id)}>
                  {expandedRows[row.id] ? <CaretDownFill /> : <CaretRightFill />}
                </Button>
              )}
              {row.title}
            </th>
            {row.data.map((cell, cellIndex) => (
              <th key={cellIndex}>{cell}</th>
            ))}
          </tr>

          {/* Render each hidden row if this row is expanded */}
          {expandedRows[row.id] &&
                  row.expandableRows &&
                  row.expandableRows.map((expandable, index) => (
                    <tr key={index}>
                      <td>{expandable.title}</td>
                      {expandable.data.map((cell, cellIndex) => (
                        <td key={cellIndex}>{cell}</td>
                      ))}
                    </tr>
                  ))}
        </React.Fragment>
      ))}
    </>
  );

  return (
    <Container id={PAGE_IDS.SUSTAINABILITY_MODEL} align="center">
      <Row className="pt-3">
        <Col>Stress Test 1</Col>
        <Col>Stress Test 2</Col>
        <Col>Stress Test 3</Col>
        <Col>Stress Test 4</Col>
        <Col>Stress Test 5</Col>
      </Row>
      <Row className="pb-3">
        <Col>
          <ToggleButtonGroup type="checkbox" name="Stress1">
            <ToggleButton
              id="tbg-check-1"
              value={1}
              variant="outline-success"
              checked={!!activeScenarios[3]}
              onChange={() => toggleScenario(3)}
            >
              Stress Effect
            </ToggleButton>
            <ToggleButton
              id="tbg-check-2"
              value={2}
              variant="outline-success"
              checked={!!activeScenarios[4]}
              onChange={() => toggleScenario(4)}
            >
              Residual Effect
            </ToggleButton>
          </ToggleButtonGroup>
        </Col>
        <Col>
          <ToggleButtonGroup type="checkbox" name="Stress2">
            <ToggleButton
              id="tbg-check-3"
              value={1}
              variant="outline-success"
              onChange={() => toggleScenario(5)}
            >
              Stress Effect
            </ToggleButton>
            <ToggleButton
              id="tbg-check-4"
              value={2}
              variant="outline-success"
              onChange={() => toggleScenario(6)}
            >
              Residual Effect
            </ToggleButton>
          </ToggleButtonGroup>
        </Col>
        <Col>
          <ToggleButtonGroup type="checkbox" name="Stress3">
            <ToggleButton
              id="tbg-check-5"
              value={1}
              variant="outline-success"
              onChange={() => toggleScenario(7)}
            >
              Stress Effect
            </ToggleButton>
            <ToggleButton id="tbg-check-6" value={2} variant="outline-success">
              Residual Effect
            </ToggleButton>
          </ToggleButtonGroup>
        </Col>
        <Col>
          <ToggleButtonGroup type="checkbox" name="Stress4">
            <ToggleButton
              id="tbg-check-7"
              value={1}
              variant="outline-success"
              onChange={() => toggleScenario(8)}
            >
              Stress Effect
            </ToggleButton>
            <ToggleButton
              id="tbg-check-8"
              value={2}
              variant="outline-success"
              onChange={() => toggleScenario(9)}
            >
              Residual Effect
            </ToggleButton>
          </ToggleButtonGroup>
        </Col>
        <Col>
          <ToggleButtonGroup type="checkbox" name="Stress5">
            <ToggleButton id="tbg-check-9" value={1} variant="outline-success">
              Stress Effect
            </ToggleButton>
            <ToggleButton id="tbg-check-10" value={2} variant="outline-success">
              Residual Effect
            </ToggleButton>
          </ToggleButtonGroup>
        </Col>
      </Row>
      <Tabs
        defaultActiveKey="income-statement"
        className="mb-3"
        justify
      >
        <Tab eventKey="income-statement" title="Income Statement" default>
          <Table striped bordered hover>
            <Header />
            <tbody>
              {renderTable(incomeStatementData)}
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="balance-sheet" title="Balance Sheet">
          <Table striped bordered hover>
            <Header />
            <tbody>
              <tr>
                <th colSpan="13" className="text-center" style={{ backgroundColor: 'lightblue' }}>ASSETS</th>
              </tr>
              {renderTable(assetsData)}
              <tr>
                <th colSpan="13" className="text-center" style={{ backgroundColor: 'lightblue' }}>LIABILITIES AND EQUITY</th>
              </tr>
              {renderTable(liabilitiesEquityData)}
            </tbody>
          </Table>
        </Tab>
      </Tabs>
    </Container>

  );
};

const Header = () => (
  <thead>
    <tr className="text-center">
      <th>Forecast Year</th>
      <th>2025</th>
      <th>2026</th>
      <th>2027</th>
      <th>2028</th>
      <th>2029</th>
      <th>2030</th>
      <th>2031</th>
      <th>2032</th>
      <th>2033</th>
      <th>2034</th>
      <th>2035</th>
      <th>2036</th>
    </tr>
  </thead>
);

export default SustainabilityModel;
