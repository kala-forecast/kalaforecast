import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaGithub } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';

/**
 * Footer component at the bottom of every page.
 * Also has auto scroll-to-top and link to GitHub page by clicking the icon.
 */
const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-light text-muted py-3 mt-auto">
      <Container>

        <Row className="justify-content-center mb-1">
          <Col xs="auto" className="text-center">
            <Button
              variant="link"
              onClick={scrollToTop}
              className="text-muted p-0 d-flex flex-column align-items-center"
            >
              <FontAwesomeIcon icon={faAngleUp} size="lg" />
              <small>Back to top</small>
            </Button>
          </Col>
        </Row>

        <Row className="justify-content-center mb-1">
          <Col xs="auto" className="text-center">
            <small>
              University of Hawaii at Mānoa
              <br />
              Department of Information &amp; Computer Sciences
            </small>
          </Col>
        </Row>

        <Row className="justify-content-center align-items-center">
          <Col xs="auto" className="d-flex align-items-center justify-content-center">
            <div
              className="me-2"
              style={{
                backgroundImage: 'url("/images/uhm_ics.png")',
                width: '22px',
                height: '22px',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
              }}
            />
            <a
              id="project-webpage"
              href="https://kala-forecast.github.io/"
              className="text-muted d-inline-block me-2"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Our GitHub Page"
            >
              <FaGithub style={{ fontSize: '22px' }} />
            </a>
            <div
              style={{
                backgroundImage: 'url("/images/uhm.png")',
                width: '24px',
                height: '24px',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
              }}
            />
          </Col>
        </Row>

      </Container>
    </footer>
  );
};

export default Footer;
