import React from 'react';
import { Container, Col } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => {
  return (
    <footer className="footer mt-auto">
      <Container className="py-2">
        <Col className="text-center">
          Department of Information and Computer Sciences <br />
          University of Hawaii<br />
          Honolulu, HI 96822 <br />
          <a href="https://kala-forecast.github.io/">GitHub Page</a>
        </Col>
      </Container>
    </footer>
  );
};

export default Footer;
