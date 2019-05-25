import React from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import { withFormik } from 'formik';
import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';

const AddChannelModal = ({
  open,
  toggle,
  values,
  handleBlur,
  isSubmitting,
  handleChange,
  handleSubmit,
}) => (
  <Modal open={open} closeIcon onClose={toggle}>
    <Modal.Header>Create a new Channel</Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Field>
          <Form.Input
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            name="name"
            fluid
            label="Channel name"
            placeholder="Channel 1..."
          />
        </Form.Field>
        <Form.Group widths="equal">
          <Button
            fluid
            color="red"
            type="submit"
            disabled={isSubmitting}
            onClick={toggle}
          >
            Cancel
          </Button>
          <Button
            fluid
            secondary
            type="submit"
            disabled={isSubmitting}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Form.Group>
      </Form>
    </Modal.Content>
  </Modal>
);

const createChannelMutation = gql`
  mutation($teamId: Int!, $name: String!) {
    createChannel(teamId: $teamId, name: $name)
  }
`;

export default compose(
  graphql(createChannelMutation),
  withFormik({
    mapPropsToValues: () => ({ name: '' }),
    handleSubmit: async (
      values,
      { props: { toggle, teamId, mutate }, setSubmitting },
    ) => {
      const {
        data: { createChannel },
      } = await mutate({
        variables: { teamId, name: values.name },
      });
      if (createChannel) {
        toggle();
        setSubmitting(false);
      }
    },
  }),
)(AddChannelModal);
