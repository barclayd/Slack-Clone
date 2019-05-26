import React from 'react';
import { Form, Modal, Input, Message } from 'semantic-ui-react';
import { withFormik } from 'formik';
import { compose, graphql } from 'react-apollo';
import { addTeamMemberMutation } from '../graphql/team';
import normaliseErrors from '../helpers/normaliseErrors';

const InvitePeopleModal = ({
  open,
  toggle,
  values,
  handleBlur,
  isSubmitting,
  handleChange,
  handleSubmit,
  touched,
  errors,
}) => (
  <Modal open={open} closeIcon onClose={toggle}>
    <Modal.Header>Invite People</Modal.Header>
    <Modal.Content>
      {touched.email && errors.email ? (
        <Message
          error
          header="There were some errors with adding inviting the specified user"
          list={errors.email}
        />
      ) : null}
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
      { props: { toggle, teamId, mutate }, setErrors, resetForm, setSubmitting },
    ) => {
      const {
        data: {
          addTeamMember: { ok, errors },
        },
      } = await mutate({
        variables: {
          teamId,
          email: values.email,
        },
      });
      if (ok) {
        toggle();
        resetForm();
      } else {
        setSubmitting(false);
        setErrors(normaliseErrors(errors));
      }
    },
  }),
)(InvitePeopleModal);
