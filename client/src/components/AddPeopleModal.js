import React from 'react';
import { Form, Modal, Input } from 'semantic-ui-react';
import { withFormik } from 'formik';
import { compose, graphql } from 'react-apollo';
import { addTeamMemberMutation } from '../graphql/team';

const InvitePeopleModal = ({
  open,
  toggle,
  values,
  handleBlur,
  isSubmitting,
  handleChange,
  handleSubmit,
}) => (
  <Modal open={open} closeIcon onClose={toggle}>
    <Modal.Header>Invite People</Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Field>
          <Input
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            name="email"
            type="email"
            fluid
            label="Email"
            placeholder="Please enter an email..."
          />
        </Form.Field>
        <Form.Group widths="equal">
          <Form.Button fluid disabled={isSubmitting} onClick={toggle}>
            Cancel
          </Form.Button>
          <Form.Button
            type="submit"
            color="black"
            fluid
            disabled={isSubmitting}
            onClick={handleSubmit}
          >
            Add User
          </Form.Button>
        </Form.Group>
      </Form>
    </Modal.Content>
  </Modal>
);

export default compose(
  graphql(addTeamMemberMutation),
  withFormik({
    mapPropsToValues: () => ({ email: '' }),
    handleSubmit: async (
      values,
      { props: { toggle, teamId, mutate }, setSubmitting },
    ) => {
      const {
        data: {
          createChannel: { ok },
        },
      } = await mutate({
        variables: {
          teamId,
          email: values.email,
        },
      });
      if (ok) {
        toggle();
        setSubmitting(false);
      }
    },
  }),
)(InvitePeopleModal);
