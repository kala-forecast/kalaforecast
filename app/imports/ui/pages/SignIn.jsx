import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import {
  Alert, Col, Container, Row,
} from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, SubmitField, TextField } from 'uniforms-bootstrap5';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

const SignIn = () => {
  const [error, setError] = useState('');
  const [redirect, setRedirect] = useState(false);

  const schema = new SimpleSchema({
    email: String,
    password: String,
  });
  const bridge = new SimpleSchema2Bridge(schema);

  // Handle Signin submission using Meteor's account mechanism
  const submit = (doc) => {
    const { email, password } = doc;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setRedirect(true);
      }
    });
  };

  // Render the signin form.
  // console.log('render', error, redirect);
  // if correct authentication, redirect to page instead of login screen
  // If login is successful, redirect to home page
  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <Container id={PAGE_IDS.SIGN_IN} fluid className="p-0 vh-100">
      <Row className="h-100 g-0">
        {/* Left side */}
        <Col
          md={6}
          className="d-flex flex-column justify-content-center align-items-center text-black"
          style={{
            backgroundImage: 'url("/images/spire-login.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: '2rem',
          }}
        />

        {/* Right side */}
        <Col
          md={6}
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ padding: '2rem' }}
        >
          <div style={{ maxWidth: '350px', width: '100%' }}>
            <h1 className="mb-3 kala-title">Welcome back!</h1>
            <p>
              Don&apos;t have an account?&nbsp;
              <Link to="/signup">Create new account</Link>.
            </p>
            {error !== '' && (
              <Alert variant="danger" className="mt-3 text-center">
                <Alert.Heading>Login failed</Alert.Heading>
                {error}
              </Alert>
            )}

            <AutoForm schema={bridge} onSubmit={(data) => submit(data)}>
              <TextField
                id={COMPONENT_IDS.SIGN_IN_FORM_EMAIL}
                name="email"
                placeholder="E-mail address"
                className="text-field"
              />
              <TextField
                id={COMPONENT_IDS.SIGN_IN_FORM_PASSWORD}
                name="password"
                placeholder="Password"
                type="password"
              />
              <SubmitField
                id={COMPONENT_IDS.SIGN_IN_FORM_SUBMIT}
                className="text-center pt-2"
                label="Login Now"
              />
            </AutoForm>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
