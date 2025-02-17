import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Navbar, Nav, NavDropdown, Image } from 'react-bootstrap';
import { BoxArrowRight, CloudDownload } from 'react-bootstrap-icons';
import { ROLE } from '../../api/role/Role';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

const NavBar = () => {
  // useTracker connects Meteor data to React components.
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  return (
    <Navbar className="navbar" expand="lg">
      <Container>
        <Navbar.Brand id={COMPONENT_IDS.NAVBAR_LANDING_PAGE} as={NavLink} to="/">
          <Image src="/images/spire-logo.png" alt="Spire Logo" width="140px" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={COMPONENT_IDS.NAVBAR_COLLAPSE} />
        <Navbar.Collapse id={COMPONENT_IDS.NAVBAR_COLLAPSE}>
          <Nav className="me-auto justify-content-start">
            {currentUser ? ([
              <Nav.Link id={COMPONENT_IDS.NAVBAR_STRESS_TEST_MODEL} as={NavLink} to="/stress-test" key="stress-test" className="mx-1">Stress Test</Nav.Link>,
              <Nav.Link id={COMPONENT_IDS.NAVBAR_SUSTAINABILITY_MODEL} as={NavLink} to="/sustainability-model" key="sustainability-model" className="mx-1">Sustainability Model</Nav.Link>,
              <NavDropdown id={COMPONENT_IDS.NAVBAR_WORKPAPERS_DROPDOWN} title="Workpapers" key="workpapers-dropdown" className="mx-1">
                <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_EDIT_WORKPAPER} as={NavLink} to="/edit-workpaper" key="edit-workpaper">Edit Workpaper</NavDropdown.Item>
                <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_WORKPAPERS} as={NavLink} to="/workpapers" key="view-workpapers">View Workpapers</NavDropdown.Item>
              </NavDropdown>,
              <Nav.Link id={COMPONENT_IDS.NAVBAR_GRAPH_PLACEHOLDER} as={NavLink} to="/graph-placeholder" key="graph-placeholder" className="mx-1">Graph Placeholder</Nav.Link>,
            ]) : ''}
            {Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]) ? ([
              <Nav.Link id={COMPONENT_IDS.NAVBAR_LIST_STUFF_ADMIN} as={NavLink} to="/admin" key="admin">Admin</Nav.Link>,
              <NavDropdown id={COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN} title="Manage" key="manage-dropdown">
                <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN_DATABASE} as={NavLink} to="/manage-database" key="manage-database">
                  <CloudDownload /> Database
                </NavDropdown.Item>
              </NavDropdown>,
            ]) : ''}
          </Nav>
          <Nav className="justify-content-end">
            {currentUser !== '' && (
              <NavDropdown id={COMPONENT_IDS.NAVBAR_CURRENT_USER} title={currentUser}>
                <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_SIGN_OUT} as={NavLink} to="/signout">
                  <BoxArrowRight className="me-2" /> Sign out
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
