import React, { Component } from 'react';
import {
  Container,
  Header,
  Form,
  Segment,
  Button,
  Message,
} from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Register extends Component {
  state = {
    username: '',
    usernameError: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
    terms: false,
  };

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  onCheck = () => {
    this.setState(prevState => ({
      ...prevState,
      terms: !prevState.terms,
    }));
  };

  onSubmit = async () => {
    this.setState({
      usernameError: '',
      emailError: '',
      passwordError: '',
    });
    const { username, email, password } = this.state;
    const { mutate, history } = this.props;
    const response = await mutate({
      variables: {
        username,
        email,
        password,
      },
    });

    const { ok, errors } = response.data.register;

    if (ok) {
      history.push('/login');
    } else {
      const validationErrors = {};
      errors.forEach(({ path, message }) => {
        validationErrors[`${path}Error`] = message;
      });
      this.setState(validationErrors);
    }
  };

  render() {
    const {
      username,
      email,
      password,
      terms,
      usernameError,
      emailError,
      passwordError,
    } = this.state;
    const { onChange, onCheck, onSubmit } = this;

    return (
      <Container text>
        <Header as="h2">Register</Header>
        <Segment inverted>
          {(usernameError || emailError || passwordError) && (
            <Message
              error
              header="There were some errors with creating your account"
              list={[usernameError, emailError, passwordError].filter(
                err => err,
              )}
            />
          )}
          <Form inverted>
            <Form.Group widths="equal">
              <Form.Input
                name="username"
                icon="user"
                iconPosition="left"
                fluid
                error={!!usernameError}
                label="Username"
                placeholder="Username"
                value={username}
                onChange={onChange}
              />
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
            <Form.Checkbox
              label="I agree to the Terms and Conditions"
              checked={terms}
              onChange={onCheck}
            />
            <Button type="submit" onClick={onSubmit}>
              Submit
            </Button>
          </Form>
        </Segment>
      </Container>
    );
  }
}

const registerMutation = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export default graphql(registerMutation)(Register);
