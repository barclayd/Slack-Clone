import React, { Component } from 'react';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {
  Button, Container, Form, Header, Message, Segment,
} from 'semantic-ui-react';

class CreateTeam extends Component {
  constructor(props) {
    super(props);

    extendObservable(this, {
      name: '',
      errors: {},
    });
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this[name] = value;
  };

  onSubmit = async () => {
    const { name, props: { history, mutate } } = this;

    let response = null;

    try {
      response = await mutate({
        variables: {
          name,
        },
      });
    } catch (err) {
      history.push('/login');
      return;
    }

    const {
      ok, errors,
    } = response.data.createTeam;

    if (ok) {
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
      name, onChange, onSubmit, errors: { nameError },
    } = this;

    return (
      <Container text>
        <Header as="h2">Create New Team</Header>
        <Segment inverted>
          {nameError && (
            <Message
              error
              header="There were some errors with creating a new team"
              list={[nameError].filter(
                err => err,
              )}
            />
          )}
          <Form inverted>
            <Form.Group widths="equal">
              <Form.Input
                name="name"
                icon="pencil alternate"
                iconPosition="left"
                fluid
                label="Name of Team"
                type="Name"
                placeholder="Team Name"
                value={name}
                error={!!nameError}
                onChange={onChange}
              />
            </Form.Group>
            <Button type="submit" onClick={onSubmit}>
                  Submit
            </Button>
          </Form>
        </Segment>
      </Container>
    );
  }
}

const createTeamMutation = gql`
 mutation($name:String!) {
  createTeam (
    name: $name
  ) {
    ok
    errors {
      path
      message
    }
  }
}
`;

export default graphql(createTeamMutation)(observer(CreateTeam));
