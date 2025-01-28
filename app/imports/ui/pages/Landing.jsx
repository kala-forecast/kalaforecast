import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';
import LandingCarousel from '../components/LandingCarousel';
import { useTracker } from 'meteor/react-meteor-data';

/* A simple static component to render some text for the landing page. */
const Landing = () => {
  const { currentUser } = useTracker(() => ({
      currentUser: Meteor.user() ? Meteor.user().username : '',
    }), []);

  return (
  <Container id={PAGE_IDS.LANDING} className="py-4">
    <Row className="align-middle text-center">
      <Col xs={4}>
        <Image roundedCircle src="/images/kala-forcast-logo.png" width="65%" />
      </Col>
      <Col xs={8} className="landing d-flex flex-column justify-content-center">
        <h1 className="py-4">Welcome to Kālā Forecast!</h1>
        <h6 className="py-1">Kālā Forecast intends to provide a user-friendly and integrated framework for fiscal sustainability models.</h6>
        <h6 className="py-1">This web based platform will provide information on sustainability models, stress tests, financial compilations, and modeled scenarios, as well a dashboard that displays forecasting outcome charts.</h6>
      </Col>
      { currentUser === '' ? ([
        <hr className="my-5"/>,
        <h2 className="my-5">Create an account or log-in to begin</h2>
      ]) : (
        <LandingCarousel />
      )}
    </Row>
  </Container>
  )
};

export default Landing;
