import React from 'react';
import { Container, Table, Col, Row } from 'react-bootstrap';
import { Chart as ChartJS } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { PAGE_IDS } from '../utilities/PageIDs';

/**
 * This pretty much is just a line graph test for now
 * @returns a graph using placeholder data, will change to imported data imported and mapped from the FC and SM later
 */

const GraphPlaceholder = () => {
  const goodForecast = [267841, 277037, 280277, 275052, 277455, 277595, 276701, 277250, 277182, 277044, 277159, 277128];

  // random subtraction amount placeholder for variety
  const stressTestForecast = goodForecast.map(value => value - 200 ** (1 + Math.random()));
  const years = ['2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033', '2034', '2035', '2036'];

  // random jumbo for finding year stuff
  const forecastEquityDifferences = goodForecast.map((forecast, index) => Math.abs(forecast - stressTestForecast[index]));
  const mostAffectedYear = years[forecastEquityDifferences.indexOf(Math.max(...forecastEquityDifferences))];
  const leastAffectedYear = years[forecastEquityDifferences.indexOf(Math.min(...forecastEquityDifferences))];

  const data = {
    labels: years,
    datasets: [
      {
        label: 'Predicted forecast',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        data: goodForecast,
      },
      {
        label: 'Stress test forecast',
        backgroundColor: 'rgba(255,99,132,0.4)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        data: stressTestForecast,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 12,
            weight: 'bold', // set to bold cuz normal font too hard to see
          },
          padding: 10, // padding so the value ticks dont smash into the graph/x label
        },
        title: {
          font: {
            size: 15,
            weight: 'bold', // set to bold cuz normal font too hard to see
            padding: 20,
          },
          display: true,
          text: 'Forecast years',
        },
      },
      y: {
        ticks: {
          callback: function (value) {
            return `${value.toLocaleString(
              'en-US',
              {
                style: 'currency',
                currency: 'USD',
              },
            )}`; // y axis currency formatting
          },
          min: 0,
          maxTicksLimit: 6,
        },
        title: {
          font: {
            size: 15,
            weight: 'bold', // set to bold cuz normal font too hard to see
          },
          display: true,
          text: 'Total liabilities and equity ($)',
          padding: 20,
        },
      },
    },
  };

  return (
    <Container id={PAGE_IDS.GRAPH_PLACEHOLDER} className="py-3" align="center">
      <Row>
        <Col>
          <Line data={data} options={options} />
        </Col>
        <Container className="p-5">
          <Col md={4}>
            <h2>Data analytics</h2>
            <Table striped bordered hover>
              <tbody>
                <th className="p-2">
                  Year data
                </th>
                <th className="p-2">
                  Equity data
                </th>
                <tr>
                  <td style={{ backgroundColor: 'rgba(207, 119, 119, 0.58)' }}>Most affected year: {mostAffectedYear}</td>
                  <td>Potential loss: {Math.floor(Math.max(...forecastEquityDifferences)).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  })}
                  </td>
                </tr>
                <tr>
                  <td style={{ backgroundColor: 'rgba(116, 199, 109, 0.8)' }}>Least affected year: {leastAffectedYear}</td>
                  <td>Potential loss: {Math.floor(Math.min(...forecastEquityDifferences)).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  })}
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Container>
      </Row>
    </Container>
  );
};

export default GraphPlaceholder;
