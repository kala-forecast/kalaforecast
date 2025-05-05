/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { Container, Table, Row, Col, Form } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

const FinancialCompilation = () => {
  const [incomeStatementData, setIncomeStatementData] = useState([
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
    { id: 7, title: 'Total Operating Expenses', AuditData: [52589, 52564, 52930],
      expandableRows: [
        { id: 8, title: 'Salaries and Benefits', AuditData: [24040, 24096, 24460] },
        { id: 9, title: 'Rent and Overhead', AuditData: [10840, 11091, 11114] },
        { id: 10, title: 'Depreciation and Amortization', AuditData: [16610, 16411, 16367] },
        { id: 11, title: 'Interest', AuditData: [1100, 967, 989] },
      ],
    },
    { id: 12, title: 'Operating Expenses %', AuditData: [34.4, 33.8, 33.6] },
    { id: 13, title: 'Profit (loss) from Operations', AuditData: [52589, 52564, 52930] },
    { id: 14, title: 'Profit (loss) from Operations %', AuditData: [34.4, 33.8, 33.6] },
    { id: 15, title: 'Total Other Income (expense)', AuditData: [35668, 37705, 37733],
      expandableRows: [
        { id: 16, title: 'Interest Income', AuditData: ['-', '-', '-'] },
        { id: 17, title: 'Interest Expense', AuditData: ['-', '-', '-'] },
        { id: 18, title: 'Gain (loss) on disposal of assets', AuditData: ['-', '-', '-'] },
        { id: 19, title: 'Other income (expense)', AuditData: ['-', '-', '-'] },
      ],
    },
    { id: 20, title: 'Total other income (expense) %', AuditData: ['-', '-', '-'] },
    { id: 21, title: 'Income (loss) before income taxes', AuditData: ['-', '-', '-'] },
    { id: 22, title: 'Pre-tax income %', AuditData: [23.3, 24.3, 23.9] },
    { id: 23, title: 'Net Income (loss)', AuditData: [16.6, 17.2, 17.0],
      expandableRows: [
        { id: 24, title: 'Income taxes', AuditData: ['-', '-', '-'] },
      ],
    },
    { id: 25, title: 'Net Income (loss) %', AuditData: ['-', '-', '-'] },
  ]);

  const [assetsData, setAssetsData] = useState([
    { id: 26, title: 'Total Current Assets', AuditData: [131345, 142341, 150772],
      expandableRows: [
        { id: 27, title: 'Cash and cash equivalents', AuditData: [188111, 189577, 189079] },
        { id: 28, title: 'Accounts receivable', AuditData: [7074, 7243, 7286] },
        { id: 29, title: 'Inventory', AuditData: [10566, 10813, 10907] },
      ],
    },
    { id: 30, title: 'Total Long-Term Assets', AuditData: [62089, 69404, 73005],
      expandableRows: [
        { id: 31, title: 'Property, plant, and equipment', AuditData: [38756, 38293, 38190] },
        { id: 32, title: 'Investment', AuditData: [23333, 31111, 34815] },
      ],
    },
    { id: 33, title: 'TOTAL ASSETS', AuditData: [267841, 277037, 280277] },
  ]);

  const [liabilitiesEquityData, setLiabilitiesEquityData] = useState([
    { id: 34, title: 'Total Current Liabilities (due within 1 year)', AuditData: [14169, 14167, 13687],
      expandableRows: [
        { id: 35, title: 'Accounts payable', AuditData: [5283, 5406, 5453] },
        { id: 36, title: 'Debt Service', AuditData: [5000, 5000, 5000] },
        { id: 37, title: 'Taxes payable', AuditData: [3887, 3761, 3234] },
      ],
    },
    { id: 38, title: 'Total Long-term Liabilities (due after one year)', AuditData: [58333, 66111, 69815],
      expandableRows: [
        { id: 39, title: 'Debt service', AuditData: [15000, 15000, 15000] },
        { id: 40, title: 'Loans payable', AuditData: [43333, 51111, 54815] },
      ],
    },
    { id: 41, title: 'Total Liabilities', AuditData: [72503, 80278, 83502] },
    { id: 42, title: "Total Stockholder's Equity", AuditData: [195338, 196759, 196775],
      expandableRows: [
        { id: 43, title: 'Equity Capital', AuditData: [170000, 170000, 170000] },
        { id: 44, title: 'Retained Earnings', AuditData: [25338, 26759, 26775] },
      ],
    },
    { id: 45, title: 'TOTAL LIABILITIES AND EQUITY', AuditData: [267841, 277037, 280277] },
  ]);

  const handleInputChange = (sectionSetter, sectionData, rowId, cellIndex, isExpandable = false, expandableIndex = null) => (e) => {
    const value = e.target.value.trim() === '' ? '-' : e.target.value;
    const updatedData = sectionData.map((row) => {
      if (row.id === rowId) {
        if (isExpandable && expandableIndex !== null) {
          const updatedExpandableRows = row.expandableRows.map((expRow, idx) => {
            if (idx === expandableIndex) {
              const updatedAuditData = [...expRow.AuditData];
              updatedAuditData[cellIndex] = value;
              return { ...expRow, AuditData: updatedAuditData };
            }
            return expRow;
          });
          return { ...row, expandableRows: updatedExpandableRows };
        }
        const updatedAuditData = [...row.AuditData];
        updatedAuditData[cellIndex] = value;
        return { ...row, AuditData: updatedAuditData };

      }
      return row;
    });

    sectionSetter(updatedData);
  };

  const renderTable = (dataset, setDataset) => (
    <>
      {dataset.map((row) => (
        <React.Fragment key={row.id}>
          <tr>
            <th>{row.title}</th>
            {row.AuditData.map((cell, cellIndex) => (
              <th key={cellIndex}>
                <Form.Control
                  type="text"
                  size="sm"
                  value={cell}
                  onChange={handleInputChange(setDataset, dataset, row.id, cellIndex)}
                />
              </th>
            ))}
          </tr>
          {row.expandableRows && row.expandableRows.map((expandable, index) => (
            <tr key={index}>
              <td>{expandable.title}</td>
              {expandable.AuditData.map((cell, cellIndex) => (
                <td key={cellIndex}>
                  <Form.Control
                    type="text"
                    size="sm"
                    value={cell}
                    onChange={handleInputChange(setDataset, dataset, row.id, cellIndex, true, index)}
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
              {renderTable(incomeStatementData, setIncomeStatementData)}
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
              {renderTable(assetsData, setAssetsData)}
              <tr>
                <th colSpan="4" className="text-center" style={{ backgroundColor: 'lightgrey' }}>LIABILITIES AND EQUITY</th>
              </tr>
              {renderTable(liabilitiesEquityData, setLiabilitiesEquityData)}
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
