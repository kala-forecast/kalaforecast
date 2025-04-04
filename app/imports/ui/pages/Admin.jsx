import React from 'react';
import {
  Container, Row, Col, Button, Card,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PAGE_IDS } from '../utilities/PageIDs';

/**
 * User management card component with compact height
 * @returns {React.ReactElement} Card with user management options
 */
const AdminUserCard = () => (
  <Card border="success" className="shadow-sm">
    <Card.Header as="h5" className="py-2">User Management</Card.Header>
    <Card.Body className="py-2">
      <p className="mb-2">You can create, delete, or modify users here.</p>
      <div className="d-grid gap-2">
        <p className="mb-3" />
        <Button as={Link} to="/signup" variant="primary" size="sm" className="py-1">Create New User</Button>
        <Button variant="primary" size="sm" className="py-1">Delete or Modify Existing User</Button>
      </div>
    </Card.Body>
  </Card>
);

const AdminDatabaseCard = () => (
  <Card border="danger" className="shadow-sm">
    <Card.Header as="h5" className="py-2">Database Management</Card.Header>
    <Card.Body className="py-2">
      <p className="mb-2">You can access and modify database information, accessibility, and more here.</p>
      <div className="d-grid gap-2">
        <Button as={Link} to="/manage-database" variant="primary" size="sm" className="py-1">Access Database</Button>
      </div>
    </Card.Body>
  </Card>
);

// Admin dashboard page that provides administrator functionality
const Admin = () => (
  <Container id={PAGE_IDS.ADMIN} className="py-4">
    <Row className="mb-4">
      <Col className="text-center">
        <h2 className="admin-title">Welcome to the Administrator Dashboard!</h2>
      </Col>
    </Row>

    <Row className="justify-content-center">
      <Col xs={11} sm={9} md={7} lg={5} xl={3}>
        <AdminUserCard />
      </Col>
      <Col xs={11} sm={9} md={7} lg={5} xl={3}>
        <AdminDatabaseCard />
      </Col>
    </Row>

  </Container>
);

export default Admin;
