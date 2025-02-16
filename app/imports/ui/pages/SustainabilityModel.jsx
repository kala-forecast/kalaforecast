/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Container, Button, Table, Tabs, Tab } from 'react-bootstrap';
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

const SustainabilityModel = () => (
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
            <tr>
              <th>Revenue</th>
            </tr>
            <tr className="text-danger">
              <td className="text-end">Scenario 1 - Stress Effect</td>
            </tr>
            <tr>
              <td className="text-end">Scenario 1 - Residual Effect</td>
            </tr>
            <tr>
              <td className="text-end">Scenario 2 - Stress Effect</td>
            </tr>
            <tr>
              <td className="text-end">Scenario 2 - Residual Effect</td>
            </tr>
            <tr>
              <td className="text-end">Scenario 3 - Residual Effect</td>
            </tr>
            <tr>
              <td className="text-end">Scenario 4 - Residual Effect</td>
            </tr>
            <tr>
              <td className="text-end">Scenario 5 - Residual Effect</td>
            </tr>
            <tr>
              <th>Net Sales</th>
            </tr>
            <tr>
              <th>Cost of Goods Sold:</th>
            </tr>
            <tr>
              <td>Cost of Contracting</td>
            </tr>
            <tr>
              <td>Overhead</td>
            </tr>
            <tr>
              <th>Cost of Goods Sold</th>
            </tr>
            <tr>
              <th>Gross Profit</th>
            </tr>
            <tr>
              <th className="text-end">Gross Margin %</th>
            </tr>
            <tr>
              <th>Operating Expenses</th>
            </tr>
            <tr>
              <td>Salaries and benefits</td>
            </tr>
            <tr>
              <td>Rent and Overhead</td>
            </tr>
            <tr>
              <td>Depreciation and Amortization</td>
            </tr>
            <tr>
              <td>Interest</td>
            </tr>
            <tr>
              <td className="text-end">Scenario 3 - Stress Effect</td>
            </tr>
            <tr>
              <td className="text-end">Scenario 4 - Stress Effect</td>
            </tr>
            <tr>
              <td className="text-end">Scenario 5 - Stress Effect</td>
            </tr>
            <tr>
              <th>Total operating expenses</th>
            </tr>
            <tr>
              <th className="text-end">Operating expenses %</th>
            </tr>
            <tr>
              <th>Profit (loss) from operations</th>
            </tr>
            <tr>
              <th className="text-end">Profit (loss) from operations %</th>
            </tr>
            <tr>
              <th>Other income (expense):</th>
            </tr>
            <tr>
              <td>Interest income</td>
            </tr>
            <tr>
              <td>Interest expenses</td>
            </tr>
            <tr>
              <td>Gain (loss) on disposal of assets</td>
            </tr>
            <tr>
              <td>Other income (expense)</td>
            </tr>
            <tr>
              <th className="text-end">Total other income (expense) %</th>
            </tr>
            <tr>
              <th>Income (loss) before income taxes</th>
            </tr>
            <tr>
              <th className="text-end">Pre-tax income %</th>
            </tr>
            <tr>
              <td>Income taxes</td>
            </tr>
            <tr>
              <th>Net income (loss)</th>
            </tr>
            <tr>
              <th className="text-end">Net income (loss) %</th>
            </tr>

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

export default SustainabilityModel;
