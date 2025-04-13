import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Navbar, Nav, NavDropdown, Image } from 'react-bootstrap';
import { BoxArrowRight, PersonFill } from 'react-bootstrap-icons';
import { ROLE } from '../../api/role/Role';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
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
              <Nav.Link id={COMPONENT_IDS.NAVBAR_FINANCIAL_COMPILATION} as={NavLink} to="/financial-compilation" key="financial-compilation">Financial Compilation</Nav.Link>,
              <Nav.Link id={COMPONENT_IDS.NAVBAR_STRESS_TEST_MODEL} as={NavLink} to="/stress-test" key="stress-test">Stress Test</Nav.Link>,
              <Nav.Link id={COMPONENT_IDS.NAVBAR_SUSTAINABILITY_MODEL} as={NavLink} to="/sustainability-model" key="sustainability-model">Sustainability Model</Nav.Link>,
              <NavDropdown
                title="Workpapers"
                id={COMPONENT_IDS.NAVBAR_WORKPAPERS}
                key="workpapers"
              >
                <NavDropdown.Item
                  as={NavLink}
                  to="/workpapers"
                  key="workpaper1"
                >
                  Work Paper 1
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={NavLink}
                  to="/workpaper2"
                  key="workpaper2"
                >
                  Work Paper 2
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={NavLink}
                  to="/workpaper3"
                  key="workpaper3"
                >
                  Work Paper 3
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={NavLink}
                  to="/workpaper4"
                  key="workpaper4"
                >
                  Work Paper 4
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={NavLink}
                  to="/workpaper5"
                  key="workpaper5"
                >
                  Work Paper 5
                </NavDropdown.Item>
              </NavDropdown>,
              <Nav.Link id={COMPONENT_IDS.NAVBAR_VISUALIZATION} as={NavLink} to="/visualization" key="visualization">Visualization</Nav.Link>,
            ]) : ''}
            {Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN, ROLE.EXECUTIVE]) ? (
              [<Nav.Link id={COMPONENT_IDS.NAVBAR_LIST_STUFF_ADMIN} as={NavLink} to="/admin" key="admin">Admin</Nav.Link>,
                <Nav.Link id={COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN_DATABASE} as={NavLink} to="/manage-database" key="executive">Manage Database</Nav.Link>]
            ) : ''}
            {Roles.userIsInRole(Meteor.userId(), [ROLE.AUDITOR]) ? (
              [<Nav.Link id={COMPONENT_IDS.NAVBAR_AUDIT_DATA} as={NavLink} to="/audit-data" key="audit-data">Audit Data</Nav.Link>]
            ) : ''}
          </Nav>
          <Nav className="justify-content-end">
            {currentUser === '' ? (
              <NavLink id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN_SIGN_IN} as={NavLink} to="/signin" key="sign-in"><PersonFill className="me-2" />Login</NavLink>
            ) : (
              <NavDropdown id={COMPONENT_IDS.NAVBAR_CURRENT_USER} title={currentUser}>
                <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_SIGN_OUT} as={NavLink} to="/signout"><BoxArrowRight className="me-2" /> Sign out</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
