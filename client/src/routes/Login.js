import React, { Component } from 'react';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import {
  Button, Container, Form, Header, Segment,
} from 'semantic-ui-react';

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

  onSubmit = () => {
    const { email, password } = this;
    console.log(email, password);
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
            <Button type="submit" onClick={onSubmit}>
              Submit
            </Button>
          </Form>
        </Segment>
      </Container>
    );
  }
}

export default observer(Login);
