import React, { Component } from 'react';
// prettier-ignore
import {
  Container, Header, Form, Segment, Button,
} from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
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
    const { username, email, password } = this.state;
    const { mutate } = this.props;
    const response = await mutate({
      variables: {
        username,
        email,
        password,
      },
    });
    console.log(response);
  };

  render() {
    // prettier-ignore
    const {
      username, email, password, terms,
    } = this.state;
    const { onChange, onCheck, onSubmit } = this;

    return (
      <Container text>
        <Header as="h2">Register</Header>
        <Segment inverted>
          <Form inverted>
            <Form.Group widths="equal">
              <Form.Input
                name="username"
                icon="user"
                iconPosition="left"
                fluid
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
    register(username: $username, email: $email, password: $password)
  }
`;

export default graphql(registerMutation)(Register);
