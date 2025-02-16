import React, { useEffect, useState } from 'react';
import { Container, Table, Col, Row } from 'react-bootstrap';
import 'chart.js/auto'; // changed to just import everything instead
import { Line } from 'react-chartjs-2';
import Papa from 'papaparse';
import { PAGE_IDS } from '../utilities/PageIDs';

/**
 * This pretty much is just a line graph test for now
 * @returns a graph using placeholder data, will change to imported data imported and mapped from the FC and SM later
 */

async function returnParsedFile() {
  const testCSV = '/csvdata/testData.csv';
  const fetchCSV = await fetch(testCSV);
  const csvData = await fetchCSV.text();

  // parsing the csv file to json, auto formatting rows and columns
  return new Promise((resolve) => {
    Papa.parse(csvData, {
      header: true,
      complete: (result) => resolve(result.data),
    });
  });
}

const GraphPlaceholder = () => {

  const [forecastData, setForecastData] = useState({
    forecastEquityDifferences: [],
    mostAffectedYear: '',
    leastAffectedYear: '',
  });

  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  // csv fetch on component mount
  useEffect(() => {
    async function fetchAndSetCSV() {
      try {
        // using the parsed csv file as formatted json for making the chart
        const parsedData = await returnParsedFile();
        // had to do this filter to fix weird NaN values in the row arrays after parsing, might find a better solution later
        const validData = parsedData.filter(row => !Number.isNaN(parseFloat(row.GoodForecast)) && !Number.isNaN(parseFloat(row.StressTestForecast)));
        const years = validData.map(row => row.Year);
        const goodForecast = validData.map(row => parseFloat(row.GoodForecast));
        const stressTestForecast = validData.map(row => parseFloat(row.StressTestForecast));

        // calculation variables
        const forecastEquityDifferencesValue = goodForecast.map((forecast, index) => Math.abs(forecast - stressTestForecast[index]));
        const mostAffectedYearValue = years[forecastEquityDifferencesValue.indexOf(Math.max(...forecastEquityDifferencesValue))];
        const leastAffectedYearValue = years[forecastEquityDifferencesValue.indexOf(Math.min(...forecastEquityDifferencesValue))];

        setForecastData({
          forecastEquityDifferences: forecastEquityDifferencesValue,
          mostAffectedYear: mostAffectedYearValue,
          leastAffectedYear: leastAffectedYearValue,
        });

        // setting the chart data for use in the Line component later
        setChartData({
          labels: years,
          datasets: [
            {
              label: 'Predicted Forecast',
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
              borderWidth: 1,
              data: goodForecast,
            },
            {
              label: 'Stress Test Forecast',
              backgroundColor: 'rgba(255,99,132,0.4)',
              borderColor: 'rgba(255,99,132,1)',
              borderWidth: 1,
              data: stressTestForecast,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching CSV:', error);
      }
    }
    fetchAndSetCSV();
  }, []);

  /* Commenting out the placeholder data for now, leaving it here for reference:

  const goodForecast = [267841, 277037, 280277, 275052, 277455, 277595, 276701, 277250, 277182, 277044, 277159, 277128];

  // random subtraction amount placeholder for variety
  const stressTestForecast = goodForecast.map(value => value - 200 ** (1 + Math.random()));
  const years = ['2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033', '2034', '2035', '2036'];

  // random jumbo for finding year stuff
  const forecastEquityDifferences = goodForecast.map((forecast, index) => Math.abs(forecast - stressTestForecast[index]));
  const mostAffectedYear = years[forecastEquityDifferences.indexOf(Math.max(...forecastEquityDifferences))];
  const leastAffectedYear = years[forecastEquityDifferences.indexOf(Math.min(...forecastEquityDifferences))];

  */

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
            }
            return label;
          },
        },
      },
    },

    scales: {
      x: {
        ticks: {
          font: {
            size: 12,
            weight: 'bold', // set to bold cuz normal font too hard to see
          },
          padding: 10, // padding so the value ticks don't smash into the graph/x label
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
            )}`; // y-axis currency formatting
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
          <Line data={chartData} options={options} />
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
                  <td style={{ backgroundColor: 'rgba(207, 119, 119, 0.58)' }}>Most affected year: {forecastData.mostAffectedYear}</td>
                  <td>Potential loss: {Math.floor(Math.max(...forecastData.forecastEquityDifferences)).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  })}
                  </td>
                </tr>
                <tr>
                  <td style={{ backgroundColor: 'rgba(116, 199, 109, 0.8)' }}>Least affected year: {forecastData.leastAffectedYear}</td>
                  <td>Potential loss: {Math.floor(Math.min(...forecastData.forecastEquityDifferences)).toLocaleString('en-US', {
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
