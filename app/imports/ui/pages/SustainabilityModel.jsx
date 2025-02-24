/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { Container, Button, Table, Tabs, Tab } from 'react-bootstrap';
import { CaretRightFill, CaretDownFill } from 'react-bootstrap-icons';
import { PAGE_IDS } from '../utilities/PageIDs';

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

const SustainabilityModel = () => {

  const [expandedRows, setExpandedRows] = useState({});

  const toggleRow = (rowId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  };

  const incomeStatementData = [
    { id: 1, title: 'Net Sales', data: [],
      expandableRows: [
        { title: 'Revenue', data: [] },
        { title: 'Scenario 1 - Stress Effect', data: [] },
        { title: 'Scenario 1 - Residual Effect', data: [] },
        { title: 'Scenario 2 - Stress Effect', data: [] },
        { title: 'Scenario 2 - Residual Effect', data: [] },
        { title: 'Scenario 3 - Stress Effect', data: [] },
        { title: 'Scenario 4 - Stress Effect', data: [] },
        { title: 'Scenario 4 - Residual Effect', data: [] },
      ],
    },
    { id: 2, title: 'Cost of Goods Sold', data: [],
      expandableRows: [
        { title: 'Cost of Contracting', data: [] },
        { title: 'Overhead', data: [] },
      ],
    },
    { id: 3, title: 'Gross Profit', data: [] },
    { id: 4, title: 'Gross Margin %', data: [] },
    { id: 5, title: 'Total Operating Expenses', data: [],
      expandableRows: [
        { title: 'Salaries and Benefits', data: [] },
        { title: 'Rent and Overhead', data: [] },
        { title: 'Depreciation and Amortization', data: [] },
        { title: 'Interest', data: [] },
        { title: 'Scenario 3 - Stress Effect', data: [] },
        { title: 'Scenario 4 - Stress Effect', data: [] },
        { title: 'Scenario 5 - Stress Effect', data: [] },
      ],
    },
    { id: 6, title: 'Operating Expenses %', data: [] },
    { id: 7, title: 'Profit (loss) from Operations', data: [] },
    { id: 8, title: 'Profit (loss) from Operations %', data: [] },
    { id: 9, title: 'Total Other Income (expense)', data: [],
      expandableRows: [
        { title: 'Interest Income', data: [] },
        { title: 'Interest Expense', data: [] },
        { title: 'Gain (loss) on disposal of assets', data: [] },
        { title: 'Other income (expense)', data: [] },
      ],
    },
    { id: 10, title: 'Total other income (expense) %', data: [] },
    { id: 11, title: 'Income (loss) before income taxes', data: [] },
    { id: 12, title: 'Pre-tax income %', data: [] },
    { id: 13, title: 'Net Income (loss)', data: [],
      expandableRows: [
        { title: 'Income taxes', data: [] },
      ],
    },
    { id: 14, title: 'Net Income (loss) %', data: [] },
  ];

  return (
    <Container id={PAGE_IDS.SUSTAINABILITY_MODEL} className="py-3" align="center">
      <Button variant="outline-primary" className="m-3">Stress Test 1</Button>
      <Button variant="outline-primary" className="m-3">Stress Test 2</Button>
      <Button variant="outline-primary" className="m-3">Stress Test 2</Button>
      <Button variant="outline-primary" className="m-3">Stress Test 3</Button>
      <Button variant="outline-primary" className="m-3">Stress Test 4</Button>
      <Button variant="outline-primary" className="m-3">Stress Test 5</Button>
      <Button variant="outline-primary" className="m-3">Stress Test 5A</Button>
      <Button variant="outline-primary" className="m-3">Stress Test 5B</Button>
      <Tabs
        defaultActiveKey="income-statement"
        className="mb-3"
        justify
      >
        <Tab eventKey="income-statement" title="Income Statement" default>
          <Table striped bordered hover>
            <Header />
            <tbody>
              {incomeStatementData.map((row) => (
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
                  </tr>

                  {/* Render each hidden row if this row is expanded */}
                  {expandedRows[row.id] &&
              row.expandableRows &&
              row.expandableRows.map((expandable, index) => (
                <tr key={index}>
                  <td>{expandable.title}</td>
                </tr>
              ))}
                </React.Fragment>
              ))}
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="balance-sheet" title="Balance Sheet">
          <Table striped bordered hover>
            <Header />
            <tbody>
              <tr>
                <th colSpan="13" className="text-center">ASSETS</th>
              </tr>
              <tr>
                <th>Current Assets</th>
              </tr>
              <tr>
                <td>Cash and cash equivalents</td>
              </tr>
              <tr>
                <td>Accounts receivable</td>
              </tr>
              <tr>
                <td>Inventory</td>
              </tr>
              <tr>
                <td className="text-end">Scenario 3 - Stress Effect</td>
              </tr>
              <tr>
                <td className="text-end">Scenario 4 - Stress Effect</td>
              </tr>
              <tr>
                <th>Total Current Assets</th>
              </tr>
              <tr>
                <th>Long-term Assets</th>
              </tr>
              <tr>
                <td>Property, plant, and equipment</td>
              </tr>
              <tr>
                <td>Investment</td>
              </tr>
              <tr>
                <td className="text-end">Scenario 1 - Stress Effect</td>
              </tr>
              <tr>
                <td className="text-end">Scenario 2 - Stress Effect</td>
              </tr>
              <tr>
                <th>Total long-term Assets</th>
              </tr>
              <tr>
                <th>TOTAL ASSETS</th>
              </tr>
              <tr>
                <th colSpan="13" className="text-center">LIABILITIES AND EQUITY</th>
              </tr>
              <tr>
                <th>Current Liabilities (due within 1 year)</th>
              </tr>
              <tr>
                <td>Accounts payable</td>
              </tr>
              <tr>
                <td>Debt service</td>
              </tr>
              <tr>
                <td>Taxes payable</td>
              </tr>
              <tr>
                <th>Total Current Liabilities</th>
              </tr>
              <tr>
                <th>Long-term Liabilities (due after 1 year)</th>
              </tr>
              <tr>
                <td>Debt service</td>
              </tr>
              <tr>
                <td>Loans payable</td>
              </tr>
              <tr>
                <td className="text-end">Scenario 5 - Stress Effect</td>
              </tr>
              <tr>
                <th>Total Long-term Liabilities</th>
              </tr>
              <tr>
                <th>Total Liabilities</th>
              </tr>
              <tr>
                <th>Stockholder's Equity</th>
              </tr>
              <tr>
                <td>Equity Capital</td>
              </tr>
              <tr>
                <td>Retained earnings</td>
              </tr>
              <tr>
                <th>Total Stockholder's Equity</th>
              </tr>
              <tr>
                <th>TOTAL LIABILITIES AND EQUITY</th>
              </tr>
            </tbody>
          </Table>
        </Tab>
      </Tabs>
    </Container>

  );
};

export default SustainabilityModel;
