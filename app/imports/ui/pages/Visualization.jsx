import React, { useEffect, useState } from 'react';
import { Container, Col, Row, Form } from 'react-bootstrap';
import 'chart.js/auto'; // changed to just import everything instead
import { Line } from 'react-chartjs-2';
import { PAGE_IDS } from '../utilities/PageIDs';

/**
 * This pretty much is just a line graph test for now
 * @returns a graph using placeholder data, will change to imported data imported and mapped from the FC and SM later
 */

const Visualization = () => {

  const graphData = [
    { id: 0, title: 'Net Sales', data: [153034, 155329, 157659, 160024, 162424, 164861, 167334, 169844, 172391, 174977, 177602, 180266] },
    { id: 1, title: 'Cost of Goods Sold', data: [53229, 54598, 55046, 54291, 54645, 54660, 54532, 54612, 54602, 54582, 54599, 54594] },
    { id: 2, title: 'Gross Profit', data: [94894, 93658, 92624, 91847, 89090, 85550, 80866, 74500, 66548, 56700, 44659, 26327] },
    { id: 3, title: 'Total Operating Expenses', data: [52589, 52564, 52930, 52694, 52729, 52785, 52736, 52750, 52757, 52748, 52752, 52752] },
    { id: 4, title: 'Profit (loss) from Operations', data: [52589, 52564, 52930, 52694, 52729, 52785, 52736, 52750, 52757, 52748, 52752, 52752] },
    { id: 5, title: 'Income (loss) before income taxes', data: [35668, 37705, 37733, 37035, 37491, 37419, 37315, 37408, 37381, 37368, 37386, 37378] },
    { id: 6, title: 'Net Income (loss)', data: [25338, 26759, 26775, 26291, 26608, 26558, 26486, 26551, 26532, 26523, 26535, 26530] },
    { id: 7, title: 'Total Current Assets', data: [205752, 207633, 207272, 206886, 207264, 207140, 207097, 207167, 207135, 207133, 207145, 207137] },
    { id: 8, title: 'Total Long-Term Assets', data: [62089, 69404, 73005, 68166, 70192, 70454, 69604, 70083, 70047, 69911, 70014, 69991] },
    { id: 9, title: 'TOTAL ASSETS', data: [267841, 277037, 280277, 275052, 277455, 277595, 276701, 277250, 277182, 277044, 277159, 277128] },
    { id: 10, title: 'Total Current Liabilities (due within 1 year)', data: [14169, 14167, 13687, 14008, 13954, 13883, 13948, 13928, 13920, 13932, 13927, 13926] },
    { id: 11, title: 'Total Long-term Liabilities (due after one year)', data: [58333, 66111, 69815, 64753, 66893, 67154, 66267, 66771, 66730, 66589, 66697, 66672] },
    { id: 12, title: 'Total Liabilities', data: [72503, 80278, 83502, 78761, 80847, 81037, 80215, 80699, 80650, 80521, 80624, 80598] },
    { id: 13, title: 'Total Stockholder\'s Equity', data: [195338, 196759, 196775, 196291, 196608, 196558, 196486, 196551, 196532, 196523, 196535, 196530] },
    { id: 14, title: 'TOTAL LIABILITIES AND EQUITY', data: [267841, 277037, 280277, 275052, 277455, 277595, 276701, 277250, 277182, 277044, 277159, 277128] },
  ];

  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  const [goodForecast, setGoodForecast] = useState();

  const [yLabel, setYLabel] = useState();

  const years = ['2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033', '2034', '2035', '2036'];

  useEffect(() => {
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
      ],
    });
  }, [goodForecast]);

  const changeGraph = (rowID) => {
    setGoodForecast(graphData[rowID].data);
    setYLabel(graphData[rowID].title);
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
          text: yLabel,
          padding: 20,
        },
      },
    },

  };

  return (
    <Container id={PAGE_IDS.GRAPH_PLACEHOLDER} className="py-3" align="center">
      <Row>
        <Col width="auto" md="3" align="left">
          <Form>
            {graphData.map((dataset) => (
              <div>
                <Form.Check
                  label={dataset.title}
                  name="dataset-selection"
                  type="radio"
                  id={dataset.id}
                  onClick={() => changeGraph(dataset.id)}
                />
              </div>
            ))}
          </Form>
        </Col>
        <Col style={{ height: '350px' }}>
          <Line data={chartData} options={{ ...options, maintainAspectRatio: false }} />
        </Col>
      </Row>
    </Container>
  );
};

export default Visualization;
