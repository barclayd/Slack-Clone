import React, { Component } from 'react';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import {
  Button, Container, Form, Header, Segment,
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
    });
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this[name] = value;
  };

  onSubmit = async (client) => {
    const { email, password } = this;
    const { history } = this.props;

    const { data } = await client.query({
      query: loginQuery,
      variables: { email, password },
    });

    const {
      ok, token, refreshToken,
    } = data.login;

    if (ok) {
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      history.push('/');
    }
  };

  render() {
    const {
      email, password, onChange, onSubmit,
    } = this;

    return (
      <Container text>
        <Header as="h2">Login</Header>
        <Segment inverted>
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
