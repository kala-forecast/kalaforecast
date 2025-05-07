import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { Alert, Col, Container, Row, Form } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { defineMethod } from '../../api/base/BaseCollection.methods';
import { UserProfiles } from '../../api/user/UserProfileCollection';

/**
 * SignUp component is similar to signin component, but we create a new user instead.
 */
const SignUp = () => {
  const [error, setError] = useState('');
  const [redirectToReferer, setRedirectToRef] = useState(false);

  /*
  const [role, setRole] = useState('');

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  */

  const schema = new SimpleSchema({
    email: String,
    firstName: String,
    lastName: String,
    role: {
      type: String,
      allowedValues: ['ADMIN', 'USER', 'ANALYST', 'AUDITOR', 'EXECUTIVE'],
    },
    password: String,
  });
  const bridge = new SimpleSchema2Bridge(schema);

  /* Handle SignUp submission. Create user account and a profile entry, then redirect to the home page. */
  const submit = (doc) => {
    const collectionName = UserProfiles.getCollectionName();
    const definitionData = doc;
    // create the new UserProfile
    defineMethod.callPromise({ collectionName, definitionData })
      .then(() => {
        // log the new user in.
        const { email, password } = doc;
        Meteor.loginWithPassword(email, password, (err) => {
          if (err) {
            setError(err.reason);
          } else {
            setError('');
            setRedirectToRef(true);
          }
        });
      })
      .catch((err) => {
        console.error('Signup error: ', err);
        setError(err.reason);
      });
  };

  /* Display the signup form. Redirect to add page after successful registration and login. */
  // if correct authentication, redirect to page instead of signup screen
  if (redirectToReferer) {
    return <Navigate to="/landing" />;
  }

  return (
    <Container id={PAGE_IDS.SIGN_UP} fluid className="p-0 vh-100">
      <Row className="h-100 g-0">
        {/* Left side */}
        <Col
          md={6}
          className="d-flex flex-column justify-content-center align-items-center text-black"
          style={{
            backgroundImage: 'url("/images/spire-signup.jpg")',
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
            <h1 className="mb-3 kala-title">Create an account.</h1>
            <p>
              Already have an account?&nbsp;
              <Link to="/signin">Login here</Link>.
            </p>
            {error !== '' && (
              <Alert variant="danger" className="mt-3 text-center">
                <Alert.Heading>Registration failed</Alert.Heading>
                {error}
              </Alert>
            )}
            <AutoForm schema={bridge} onSubmit={(data) => submit(data)}>
              <TextField id={COMPONENT_IDS.SIGN_UP_FORM_FIRST_NAME} name="firstName" placeholder="First name" />
              <TextField id={COMPONENT_IDS.SIGN_UP_FORM_LAST_NAME} name="lastName" placeholder="Last name" />
              <TextField id={COMPONENT_IDS.SIGN_UP_FORM_EMAIL} name="email" placeholder="E-mail address" />
              <TextField id={COMPONENT_IDS.SIGN_UP_FORM_PASSWORD} name="password" placeholder="Password" type="password" />
              <TextField id={COMPONENT_IDS.SIGN_UP_FORM_ROLE_TEXT} name="role" placeholder="Role: ADMIN, ANALYST, etc." />
              { /* Commented out for testing, Form.Group does not submit role value for some reason.
                <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Select
                  id={COMPONENT_IDS.SIGN_UP_FORM_ROLE}
                  name="role"
                  required
                  value={role}
                  onChange={handleRoleChange}
                >
                  <option value="">Select a Role</option>
                  <option value="analyst">Analyst</option>
                  <option value="executive">Executive</option>
                  <option value="auditor">Auditor</option>
                </Form.Select>
              </Form.Group>
              */ }
              <ErrorsField />
              <SubmitField id={COMPONENT_IDS.SIGN_UP_FORM_SUBMIT} className="text-center pt-2" disabled={false} />
            </AutoForm>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
