import React from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { PAGE_IDS } from '../utilities/PageIDs';
import LandingCarousel from '../components/LandingCarousel';

const Landing = () => {
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  return (
    <>
      <header
        id={PAGE_IDS.LANDING}
        className="d-flex align-items-center landing-header pb-3"
      >
        <Container>
          <Row className="align-items-center">
            {/* Left side for logo and buttons */}
            <Col md={6} className="text-center pt-4">
              <Image
                roundedCircle
                src="/images/kala-forcast-logo.png"
                width="50%"
                alt="Kālā Forecast Logo"
              />
              <div className="mt-4">
                {!currentUser && (
                  <div>
                    <Button
                      as={Link}
                      to="/signin"
                      variant="primary"
                      size="lg"
                      className="mb-3 btn-minwidth"
                    >
                      Login
                    </Button>
                    <br />
                    <Button
                      as={Link}
                      to="/signup"
                      variant="outline-primary"
                      size="lg"
                      className="btn-minwidth"
                    >
                      Sign Up
                    </Button>
                  </div>
                )}
              </div>
            </Col>
            {/* Right side for brief about section */}
            <Col md={6} className="text-center">
              <div className="mt-4 text-dark">
                <h1 className="py-3 kala-title">
                  Welcome to Kālā Forecast!
                </h1>
                <h5 className="py-2">
                  Kālā Forecast intends to provide a user-friendly and integrated framework for fiscal sustainability models.
                </h5>
                <h5 className="py-2">
                  Our web-based platform provides information on sustainability models, stress tests, financial compilations, and modeled scenarios, as well as a dashboard that displays forecasting outcome charts.
                </h5>
                {/* Text only shows if not logged in */}
                {!currentUser && (
                  <h5 className="py-2">
                    Please log in or sign up to get started!
                  </h5>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </header>

      <section className="blue-background py-2">
        <Container>
          <Row className="justify-content-center">
            <Col md={10} className="text-center">
              <LandingCarousel />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Landing;
