/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { Container, Button, Table, Tabs, Tab, Row, Col, ToggleButtonGroup, ToggleButton, Modal } from 'react-bootstrap';
import { CaretRightFill, CaretDownFill, GraphUp } from 'react-bootstrap-icons';
import { Line } from 'react-chartjs-2';
import { PAGE_IDS } from '../utilities/PageIDs';

const SustainabilityModel = () => {

  const [expandedRows, setExpandedRows] = useState({});
  const [activeScenarios, setActiveScenarios] = useState({});
  const [selectedChartRow, setSelectedChartRow] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
    20: [0, 0, 0, 0, 0, 3010, 6201, 9585, 13172, 16974, 21006, 25281],
    21: [79, 242, 495, 842, 1289, 1843, 2509, 3295, 4207, 5254, 6443, 7783],
    22: [215, 323, 429, 534, 637, 738, 837, 934, 1027, 1117, 1204, 1287],
    44: [900, 1892, 2982, 4180, 5491, 6926, 8494, 10204, 12067, 14094, 16298, 18691],
    45: [3443, 3495, 3547, 3601, 3655, 3709, 3765, 3821, 3879, 3937, 3996, 4056],
    54: [215, 323, 429, 534, 637, 738, 837, 934, 1027, 1117, 1204, 1287],
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
    { id: 10, title: 'Cost of Goods Sold', data: [53229, 54598, 55046, 54291, 54645, 54660, 54532, 54612, 54602, 54582, 54599, 54594],
      expandableRows: [
        { id: 11, title: 'Cost of Contracting', data: [52562, 53931, 54379, 53624, 53978, 53994, 53865, 53946, 53935, 53915, 53932, 53927] },
        { id: 12, title: 'Overhead', data: [667, 667, 667, 667, 667, 667, 667, 667, 667, 667, 667, 667] },
      ],
    },
    { id: 13, title: 'Gross Profit', data: [94894, 93658, 92624, 91847, 89090, 85550, 80866, 74500, 66548, 56700, 44659, 26327] },
    { id: 14, title: 'Gross Margin %', data: [64.1, 63.2, 62.7, 62.8, 62.0, 61.0, 59.7, 57.7, 54.9, 51.0, 45.0, 32.5] },
    { id: 15, title: 'Total Operating Expenses', data: [52589, 52564, 52930, 52694, 52729, 52785, 52736, 52750, 52757, 52748, 52752, 52752],
      expandableRows: [
        { id: 16, title: 'Salaries and Benefits', data: [24040, 24096, 24460, 24198, 24251, 24303, 24251, 24269, 24274, 24265, 24269, 24269] },
        { id: 17, title: 'Rent and Overhead', data: [10840, 11091, 11114, 11015, 11073, 11067, 11052, 11064, 11061, 11059, 11061, 11060] },
        { id: 18, title: 'Depreciation and Amortization', data: [16610, 16411, 16367, 16463, 16414, 16414, 16430, 16419, 16421, 16424, 16421, 16422] },
        { id: 19, title: 'Interest', data: [1100, 967, 989, 1019, 991, 1000, 1003, 998, 1000, 1000, 1000, 1000] },
        { id: 20, title: 'Scenario 3 - Stress Effect', data: [] },
        { id: 21, title: 'Scenario 4 - Stress Effect', data: [] },
        { id: 22, title: 'Scenario 5 - Stress Effect', data: [] },
      ],
    },
    { id: 23, title: 'Operating Expenses %', data: [34.4, 33.8, 33.6, 32.9, 32.5, 32.0, 31.5, 31.1, 30.6, 30.1, 29.7, 29.3] },
    { id: 24, title: 'Profit (loss) from Operations', data: [52589, 52564, 52930, 52694, 52729, 52785, 52736, 52750, 52757, 52748, 52752, 52752] },
    { id: 25, title: 'Profit (loss) from Operations %', data: [34.4, 33.8, 33.6, 32.9, 32.5, 32.0, 31.5, 31.1, 30.6, 30.1, 29.7, 29.3] },
    // { id: 26, title: 'Total Other Income (expense)', data: [],
    //   expandableRows: [
    //     { id: 27, title: 'Interest Income', data: [] },
    //     { id: 28, title: 'Interest Expense', data: [] },
    //     { id: 29, title: 'Gain (loss) on disposal of assets', data: [] },
    //     { id: 30, title: 'Other income (expense)', data: [] },
    //   ],
    // },
    // { id: 31, title: 'Total other income (expense) %', data: [] },
    { id: 32, title: 'Income (loss) before income taxes', data: [35668, 37705, 37733, 37035, 37491, 37419, 37315, 37408, 37381, 37368, 37386, 37378] },
    { id: 33, title: 'Pre-tax income %', data: [23.3, 24.3, 23.9, 23.1, 23.1, 22.7, 22.3, 22.0, 21.7, 21.4, 21.1, 20.7] },
    { id: 34, title: 'Net Income (loss)', data: [25338, 26759, 26775, 26291, 26608, 26558, 26486, 26551, 26532, 26523, 26535, 26530],
      expandableRows: [
        { id: 35, title: 'Income taxes', data: [10330, 10945, 10958, 10744, 10882, 10861, 10829, 10858, 10849, 10845, 10851, 10849] },
      ],
    },
    { id: 36, title: 'Net Income (loss) %', data: [16.6, 17.2, 17.0, 16.4, 16.4, 16.1, 15.8, 15.6, 15.4, 15.2, 14.9, 14.7] },
  ]);

  const [assetsData, setAssetsData] = useState([
    { id: 37, title: 'Total Current Assets', data: [205752, 207633, 207272, 206886, 207264, 207140, 207097, 207167, 207135, 207133, 207145, 207137],
      expandableRows: [
        { id: 38, title: 'Cash and cash equivalents', data: [188111, 189577, 189079, 188922, 189193, 189065, 189060, 189106, 189077, 189081, 189088, 189082] },
        { id: 39, title: 'Accounts receivable', data: [7074, 7243, 7286, 7201, 7243, 7243, 7229, 7239, 7237, 7235, 7237, 7236] },
        { id: 40, title: 'Inventory', data: [10566, 10813, 10907, 10762, 10827, 10832, 10807, 10822, 10820, 10817, 10820, 10819] },
      ],
    },
    { id: 41, title: 'Total Long-Term Assets', data: [62089, 69404, 73005, 68166, 70192, 70454, 69604, 70083, 70047, 69911, 70014, 69991],
      expandableRows: [
        { id: 42, title: 'Property, plant, and equipment', data: [38756, 38293, 38190, 38413, 38299, 38301, 38337, 38312, 38317, 38322, 38317, 38319] },
        { id: 43, title: 'Investment', data: [23333, 31111, 34815, 29753, 31893, 32154, 31267, 31771, 31730, 31589, 31697, 31672] },
        { id: 44, title: 'Scenario 1 - Stress Effect', data: [] },
        { id: 45, title: 'Scenario 2 - Stress Effect', data: [] },
      ],
    },
    { id: 46, title: 'TOTAL ASSETS', data: [267841, 277037, 280277, 275052, 277455, 277595, 276701, 277250, 277182, 277044, 277159, 277128] },
  ]);

  const [liabilitiesEquityData, setLiabilitiesEquityData] = useState([
    { id: 47, title: 'Total Current Liabilities (due within 1 year)', data: [14169, 14167, 13687, 14008, 13954, 13883, 13948, 13928, 13920, 13932, 13927, 13926],
      expandableRows: [
        { id: 48, title: 'Accounts payable', data: [5283, 5406, 5453, 5381, 5413, 5416, 5403, 5411, 5410, 5408, 5410, 5409] },
        { id: 49, title: 'Debt Service', data: [5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000] },
        { id: 50, title: 'Taxes payable', data: [3887, 3761, 3234, 3627, 3540, 3467, 3545, 3517, 3510, 3524, 3517, 3517] },
      ],
    },
    { id: 51, title: 'Total Long-term Liabilities (due after one year)', data: [58333, 66111, 69815, 64753, 66893, 67154, 66267, 66771, 66730, 66589, 66697, 66672],
      expandableRows: [
        { id: 52, title: 'Debt service', data: [15000, 15000, 15000, 15000, 15000, 15000, 15000, 15000, 15000, 15000, 15000, 15000] },
        { id: 53, title: 'Loans payable', data: [43333, 51111, 54815, 49753, 51893, 52154, 51267, 51771, 51730, 51589, 51697, 51672] },
        { id: 54, title: 'Scenario 5 - Stress Effect', data: [] },
      ],
    },
    { id: 55, title: 'Total Liabilities', data: [72503, 80278, 83502, 78761, 80847, 81037, 80215, 80699, 80650, 80521, 80624, 80598] },
    { id: 56, title: 'Total Stockholder\'s Equity', data: [195338, 196759, 196775, 196291, 196608, 196558, 196486, 196551, 196532, 196523, 196535, 196530],
      expandableRows: [
        { id: 57, title: 'Equity Capital', data: [170000, 170000, 170000, 170000, 170000, 170000, 170000, 170000, 170000, 170000, 170000, 170000] },
        { id: 58, title: 'Retained Earnings', data: [25338, 26759, 26775, 26291, 26608, 26558, 26486, 26551, 26532, 26523, 26535, 26530] },
      ],
    },
    { id: 59, title: 'TOTAL LIABILITIES AND EQUITY', data: [267841, 277037, 280277, 275052, 277455, 277595, 276701, 277250, 277182, 277044, 277159, 277128] },
  ]);

  const handleShowChart = (row) => {
    setSelectedChartRow(row);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const updateTotalRows = (rows, totalRow, lastAddition, lastDeduction) => {
    let totalAdditions = Array(12).fill(0);
    let totalDeductions = Array(12).fill(0);

    rows.flatMap(row => row.expandableRows || []).forEach((row) => {
      if (row.id >= (totalRow + 1) && row.id <= lastAddition) {
        totalAdditions = totalAdditions.map((value, i) => value + (row.data[i] || 0));
      }
      if (row.id >= (lastAddition + 1) && row.id <= lastDeduction) {
        totalDeductions = totalDeductions.map((value, i) => value + (row.data[i] || 0));
      }
    });

    const updatedOperatingExpenses = totalAdditions.map((value, i) => value - totalDeductions[i]);

    return rows.map(row => {
      if (row.id === totalRow) {
        return { ...row, data: updatedOperatingExpenses };
      }
      return row;
    });
  };

  // Function to toggle scenario data and update totals
  const toggleScenario = (scenarioId) => {
    setActiveScenarios((prev) => {
      const newState = { ...prev, [scenarioId]: !prev[scenarioId] };

      setIncomeStatementData((prevData) => {
        let updatedData = prevData.map((row) => {
          if (!row.expandableRows) return row;

          const updatedExpandable = row.expandableRows.map((subRow) => {
            if (subRow.id === scenarioId) {
              return {
                ...subRow,
                data: newState[scenarioId] ? scenarioData[scenarioId] : [],
              };
            }
            return subRow;
          });

          return {
            ...row,
            expandableRows: updatedExpandable,
          };
        });
        // Update Net Sales row
        updatedData = updateTotalRows(updatedData, 1, 2, 9);
        // Update Total Operating Expenses row
        updatedData = updateTotalRows(updatedData, 15, 19, 22);

        return updatedData;
      });

      // You can update assets and liabilities separately as before
      setAssetsData((prevData) => {
        let updatedData = prevData.map((row) => {
          if (!row.expandableRows) return row;

          const updatedExpandable = row.expandableRows.map((subRow) => {
            if (subRow.id === scenarioId) {
              return {
                ...subRow,
                data: newState[scenarioId] ? scenarioData[scenarioId] : [],
              };
            }
            return subRow;
          });

          return {
            ...row,
            expandableRows: updatedExpandable,
          };
        });
        // Update total long-term assets
        updatedData = updateTotalRows(updatedData, 41, 43, 45);

        return updatedData;
      });

      setLiabilitiesEquityData((prevData) => {
        let updatedData = prevData.map((row) => {
          if (!row.expandableRows) return row;

          const updatedExpandable = row.expandableRows.map((subRow) => {
            if (subRow.id === scenarioId) {
              return {
                ...subRow,
                data: newState[scenarioId] ? scenarioData[scenarioId] : [],
              };
            }
            return subRow;
          });

          return {
            ...row,
            expandableRows: updatedExpandable,
          };
        });
        // Update total long-term assets
        updatedData = updateTotalRows(updatedData, 51, 53, 54);

        return updatedData;
      });

      return newState;
    });
  };

  const toggleScenarioGroup = (firstID, secondID) => {
    toggleScenario(firstID);
    toggleScenario(secondID);
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
            <td className="text-end">
              <GraphUp
                className="text-primary"
                role="button"
                onClick={() => handleShowChart(row)}
                style={{ cursor: 'pointer' }}
              />
            </td>
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
              onChange={() => toggleScenarioGroup(3, 44)}
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
              onChange={() => toggleScenarioGroup(5, 45)}
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
              onChange={() => toggleScenarioGroup(7, 20)}
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
              onChange={() => toggleScenarioGroup(8, 21)}
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
            <ToggleButton
              id="tbg-check-9"
              value={1}
              variant="outline-success"
              onChange={() => toggleScenarioGroup(22, 54)}
            >
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
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedChartRow?.title} Forecast</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedChartRow && (
            <Line
              data={{
                labels: ['2025', '2026', '2027', ...Array.from({ length: 8 }, (_, i) => 2028 + i)],
                datasets: [
                  {
                    label: selectedChartRow.title,
                    data: selectedChartRow.data,
                    borderColor: 'rgba(75,192,192,1)',
                    fill: false,
                    tension: 0.3,
                  },
                ],
              }}
              options={{ responsive: true }}
            />
          )}
        </Modal.Body>
      </Modal>
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
