import React from 'react';
import '../../../client/landing.css';
import { Image, Row, Col, Card } from 'react-bootstrap';

const LandingGrid = () => (
  <div className="landing-grid py-5 my-5">
    <Row className="g-4 my-5">
      {/* Card 1 */}
      <Col xs={6} md={4}>
        <Card className="card-square">
          <Card.Body>
            <Card.Title>Stress Tests</Card.Title>
            <Image src="/images/stress.png" fluid />
          </Card.Body>
        </Card>
      </Col>

      {/* Card 2 */}
      <Col xs={6} md={4}>
        <Card className="card-square">
          <Card.Body>
            <Card.Title>Sustainability Model</Card.Title>
            <Image src="/images/sustain.png" fluid />
          </Card.Body>
        </Card>
      </Col>
    </Row>

    <Row className="g-4 py-5 my-5">
      {/* Card 3 */}
      <Col xs={6} md={4}>
        <Card className="card-square">
          <Card.Body>
            <Card.Title>Editable Workpapers</Card.Title>
            <Image src="/images/editwp.png" fluid />
          </Card.Body>
        </Card>
      </Col>

      {/* Card 4 */}
      <Col xs={6} md={4}>
        <Card className="card-square">
          <Card.Body>
            <Card.Title>Graph and Visuals</Card.Title>
            <Image src="/images/graph.png" fluid />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </div>
);
export default LandingGrid;
