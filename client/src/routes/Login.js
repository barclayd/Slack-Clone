import React, { Component } from 'react';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import {
  Button, Container, Form, Header, Message, Segment,
} from 'semantic-ui-react';

const loginQuery = gql`
  query($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      refreshToken
      errors {
        path
        message
      }
    }
  }
`;

class Login extends Component {
  constructor(props) {
    super(props);

    extendObservable(this, {
      email: '',
      password: '',
      errors: {},
    });
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this[name] = value;
  };

  onSubmit = async (client) => {
    const { email, password, props: { history } } = this;

    const { data } = await client.query({
      query: loginQuery,
      variables: { email, password },
    });

    const {
      ok, token, refreshToken, errors,
    } = data.login;

    if (ok) {
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      history.push('/');
    } else {
      const validationErrors = {};
      errors.forEach(({ path, message }) => {
        validationErrors[`${path}Error`] = message;
      });
      this.errors = validationErrors;
    }
  };

  render() {
    const {
      email, password, onChange, onSubmit, errors: { emailError, passwordError },
    } = this;

    return (
      <Container text>
        <Header as="h2">Login</Header>
        <Segment inverted>
          {(emailError || passwordError) && (
            <Message
              error
              header="There were some errors with logging you in to your account"
              list={[emailError, passwordError].filter(
                err => err,
              )}
            />
          )}
          <Form inverted>
            <Form.Group widths="equal">
              <Form.Input
                name="email"
                icon="envelope"
                iconPosition="left"
                fluid
                label="Email"
                type="email"
                placeholder="Email"
                value={email}
                error={!!emailError}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Field>
              <Form.Input
                name="password"
                icon="key"
                iconPosition="left"
                fluid
                label="Password"
                type="password"
                placeholder="Password"
                value={password}
                error={!!passwordError}
                onChange={onChange}
              />
            </Form.Field>
            <ApolloConsumer>
              {client => (
                <Button type="submit" onClick={() => onSubmit(client)}>
                  Submit
                </Button>
              )}
            </ApolloConsumer>
          </Form>
        </Segment>
      </Container>
    );
  }
}

export default observer(Login);
