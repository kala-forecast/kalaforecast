import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { useTracker } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import NotFound from '../pages/NotFound';
import SignUp from '../pages/SignUp';
import SignOut from '../pages/SignOut';
import NavBar from '../components/NavBar';
import SignIn from '../pages/SignIn';
import NotAuthorized from '../pages/NotAuthorized';
import { ROLE } from '../../api/role/Role';
import LoadingSpinner from '../components/LoadingSpinner';
import ManageDatabase from '../pages/ManageDatabase';
import SustainabilityModel from '../pages/SustainabilityModel';
import EditWorkpaper from '../pages/EditWorkpaper';
import StressTest from '../pages/StressTest';
import GraphPlaceholder from '../pages/GraphPlaceholder';
import WorkPapers from '../pages/WorkPapers';
import FinancialCompilation from '../pages/FinancialCompilation';
import AuditData from '../pages/AuditData';
import Admin from '../pages/Admin';
import Visualization from '../pages/Visualization';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
const App = () => {
  const { ready } = useTracker(() => {
    const rdy = Roles.subscription.ready();
    return {
      ready: rdy,
    };
  });
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<AdminProtectedRoute ready={ready}><SignUp /></AdminProtectedRoute>} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/landing" element={<ProtectedRoute><Landing /></ProtectedRoute>} />
          <Route path="/sustainability-model" element={<ProtectedRoute><SustainabilityModel /></ProtectedRoute>} />
          <Route path="/financial-compilation" element={<ProtectedRoute><FinancialCompilation /></ProtectedRoute>} />
          <Route path="/edit-workpaper" element={<ProtectedRoute><EditWorkpaper /></ProtectedRoute>} />
          <Route path="/workpapers" element={<ProtectedRoute><WorkPapers /></ProtectedRoute>} />
          <Route path="/stress-test" element={<ProtectedRoute><StressTest /></ProtectedRoute>} />
          <Route path="/graph-placeholder" element={<ProtectedRoute><GraphPlaceholder /></ProtectedRoute>} />
          <Route path="/visualization" element={<ProtectedRoute><Visualization /></ProtectedRoute>} />
          <Route path="/manage-database" element={<AdminProtectedRoute ready={ready}><ManageDatabase /></AdminProtectedRoute>} />
          <Route path="/audit-data" element={<AuditProtectedRoute ready={ready}><AuditData /></AuditProtectedRoute>} />
          <Route path="/notauthorized" element={<NotAuthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

/*
 * ProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  console.log('ProtectedRoute', isLogged);
  return isLogged ? children : <Navigate to="/signin" />;
};

/**
 * AdminProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ ready, children }) => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  if (!ready) {
    return <LoadingSpinner />;
  }
  const isAdmin = Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]);
  console.log('AdminProtectedRoute', isLogged, isAdmin);
  return (isLogged && isAdmin) ? children : <Navigate to="/notauthorized" />;
};

const AuditProtectedRoute = ({ ready, children }) => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  if (!ready) {
    return <LoadingSpinner />;
  }
  const isAuditor = Roles.userIsInRole(Meteor.userId(), [ROLE.AUDITOR]);
  console.log('AdminProtectedRoute', isLogged, isAuditor);
  return (isLogged && isAuditor) ? children : <Navigate to="/notauthorized" />;
};

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

ProtectedRoute.defaultProps = {
  children: <Landing />,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  ready: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

AdminProtectedRoute.defaultProps = {
  ready: false,
  children: <Landing />,
};

// Require a component and location to be passed to each AuditProtectedRoute.
AuditProtectedRoute.propTypes = {
  ready: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

AuditProtectedRoute.defaultProps = {
  ready: false,
  children: <Landing />,
};

export default App;
