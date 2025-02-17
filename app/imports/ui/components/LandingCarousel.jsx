import React from 'react';
import { Image, Row, Col, Card } from 'react-bootstrap';

const LandingCarousel = () => (
  <div className="landing-grid py-3 my-5">
    <Row className="g-4 my-1">
      {/* Card 1 */}
      <Col xs={6} md={4}>
        <Card className="card-square modern-card">
          <Card.Body className="text-center">
            <Card.Title>Stress Tests</Card.Title>
            <Image src="/images/stress.png" fluid className="carousel-image" />
          </Card.Body>
        </Card>
        <div className="card-description text-center mt-2">
          Evaluate various financial stress scenarios to assess risk.
        </div>
      </Col>

      {/* Card 2 */}
      <Col xs={6} md={4}>
        <Card className="card-square modern-card">
          <Card.Body className="text-center">
            <Card.Title>Sustainability Model</Card.Title>
            <Image src="/images/sustain.png" fluid className="carousel-image" />
          </Card.Body>
        </Card>
        <div className="card-description text-center mt-2">
          Project long-term financial performance and trends.
        </div>
      </Col>
    </Row>

    <Row className="g-2 py-1 my-2">
      {/* Card 3 */}
      <Col xs={6} md={4}>
        <Card className="card-square modern-card">
          <Card.Body className="text-center">
            <Card.Title>Editable Workpapers</Card.Title>
            <Image src="/images/editwp.png" fluid className="carousel-image" />
          </Card.Body>
        </Card>
        <div className="card-description text-center mt-2">
          Customize financial models with flexible workpapers and individual scenarios.
        </div>
      </Col>

      {/* Card 4 */}
      <Col xs={6} md={4}>
        <Card className="card-square modern-card">
          <Card.Body className="text-center">
            <Card.Title>Graph and Visuals</Card.Title>
            <Image src="/images/graph.png" fluid className="carousel-image" />
          </Card.Body>
        </Card>
        <div className="card-description text-center mt-2">
          Visualize key metrics with charts and graphs.
        </div>
      </Col>
    </Row>
  </div>
);

export default LandingCarousel;
