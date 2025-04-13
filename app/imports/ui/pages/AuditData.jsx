/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { Container, Table, Row, Col, Form } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

const FinancialCompilation = () => {

  const incomeStatementData = [
    { id: 1, title: 'Net Sales', AuditData: [131345, 142341, 150772],
      expandableRows: [
        { title: 'Revenue', AuditData: [131345, 142341, 150772] },
      ],
    },
    { id: 2, title: 'Cost of Goods Sold', AuditData: [49123, 53254, 57310],
      expandableRows: [
        { id: 3, title: 'Cost of Contracting', AuditData: [48456, 52587, 56643] },
        { id: 4, title: 'Overhead', AuditData: [667, 667, 667] },
      ],
    },
    { id: 5, title: 'Gross Profit', AuditData: [82222, 89087, 93462] },
    { id: 6, title: 'Gross Margin %', AuditData: [62.6, 62.6, 62.0] },
    { id: 7, title: 'Total Operating Expenses', AuditData: [],
      expandableRows: [
        { id: 8, title: 'Salaries and Benefits', AuditData: [] },
        { id: 9, title: 'Rent and Overhead', AuditData: [] },
        { id: 10, title: 'Depreciation and Amortization', AuditData: [] },
        { id: 11, title: 'Interest', AuditData: [] },
      ],
    },
    { id: 12, title: 'Operating Expenses %', AuditData: [] },
    { id: 13, title: 'Profit (loss) from Operations', AuditData: [] },
    { id: 14, title: 'Profit (loss) from Operations %', AuditData: [] },
    { id: 15, title: 'Total Other Income (expense)', AuditData: [],
      expandableRows: [
        { id: 16, title: 'Interest Income', AuditData: [] },
        { id: 17, title: 'Interest Expense', AuditData: [] },
        { id: 18, title: 'Gain (loss) on disposal of assets', AuditData: [] },
        { id: 19, title: 'Other income (expense)', AuditData: [] },
      ],
    },
    { id: 20, title: 'Total other income (expense) %', AuditData: [] },
    { id: 21, title: 'Income (loss) before income taxes', AuditData: [] },
    { id: 22, title: 'Pre-tax income %', AuditData: [] },
    { id: 23, title: 'Net Income (loss)', AuditData: [],
      expandableRows: [
        { id: 24, title: 'Income taxes', AuditData: [] },
      ],
    },
    { id: 25, title: 'Net Income (loss) %', AuditData: [] },
  ];

  const assetsData = [
    { id: 26, title: 'Total Current Assets', AuditData: [131345, 142341, 150772],
      expandableRows: [
        { id: 27, title: 'Cash and cash equivalents', AuditData: [] },
        { id: 28, title: 'Accounts receivable', AuditData: [] },
        { id: 29, title: 'Inventory', AuditData: [] },
      ],
    },
    { id: 30, title: 'Total Long-Term Assets', AuditData: [],
      expandableRows: [
        { id: 31, title: 'Property, plant, and equipment', AuditData: [] },
        { id: 32, title: 'Investment', AuditData: [] },
      ],
    },
    { id: 33, title: 'TOTAL ASSETS', AuditData: [] },
  ];

  const liabilitiesEquityData = [
    { id: 34, title: 'Total Current Liabilities (due within 1 year)', AuditData: [],
      expandableRows: [
        { id: 35, title: 'Accounts payable', AuditData: [] },
        { id: 36, title: 'Debt Service', AuditData: [] },
        { id: 37, title: 'Taxes payable', AuditData: [] },
      ],
    },
    { id: 38, title: 'Total Long-term Liabilities (due after one year)', AuditData: [],
      expandableRows: [
        { id: 39, title: 'Debt service', AuditData: [] },
        { id: 40, title: 'Loans payable', AuditData: [] },
      ],
    },
    { id: 41, title: 'Total Liabilities', AuditData: [] },
    { id: 42, title: 'Total Stockholder\'s Equity', AuditData: [],
      expandableRows: [
        { id: 43, title: 'Equity Capital', AuditData: [] },
        { id: 44, title: 'Retained Earnings', AuditData: [] },
      ],
    },
    { id: 45, title: 'TOTAL LIABILITIES AND EQUITY', AuditData: [] },
  ];

  const renderTable = (dataset) => (
    <>
      {dataset.map((row) => (
        <React.Fragment key={row.id}>
          {/* Main row */}
          <tr>
            <th>
              {row.title}
            </th>
            {row.AuditData.map((cell, cellIndex) => (
              <th key={cellIndex}>
                <Form.Control
                  type="number"
                  size="sm"
                  width="auto"
                  defaultValue={cell}
                  min="0"
                />
              </th>
            ))}
          </tr>

          {/* Render each hidden row if this row is expanded */}
          {row.expandableRows &&
                        row.expandableRows.map((expandable, index) => (
                          <tr key={index}>
                            <td>{expandable.title}</td>
                            {expandable.AuditData.map((cell, cellIndex) => (
                              <td key={cellIndex}>
                                <Form.Control
                                  type="number"
                                  size="sm"
                                  width="auto"
                                  defaultValue={cell}
                                  min="0"
                                />
                              </td>
                            ))}
                          </tr>
                        ))}
        </React.Fragment>
      ))}
    </>
  );

  return (
    <Container id={PAGE_IDS.FINANCIAL_COMPILATION} className="py-3" align="center">
      <h1>Audit Data</h1>
      <Row>
        <Col style={{ width: '50%' }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th colSpan="4" className="text-center" style={{ backgroundColor: 'lightblue' }}>INCOME STATEMENT</th>
              </tr>
              <Header />
            </thead>
            <tbody>
              {renderTable(incomeStatementData)}
            </tbody>
          </Table>
        </Col>
        <Col style={{ width: '50%' }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th colSpan="4" className="text-center" style={{ backgroundColor: 'lightblue' }}>BALANCE SHEET</th>
              </tr>
              <Header />
            </thead>
            <tbody>
              <tr>
                <th colSpan="4" className="text-center" style={{ backgroundColor: 'lightgrey' }}>ASSETS</th>
              </tr>
              {renderTable(assetsData)}
              <tr>
                <th colSpan="4" className="text-center" style={{ backgroundColor: 'lightgrey' }}>LIABILITIES AND EQUITY</th>
              </tr>
              {renderTable(liabilitiesEquityData)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>

  );
};

const Header = () => (
  <tr className="text-center">
    <th>Audit Data</th>
    <th>2022</th>
    <th>2023</th>
    <th>2024</th>
  </tr>
);

export default FinancialCompilation;
