import React from 'react';
import { Form, Modal, Input } from 'semantic-ui-react';
import { withFormik } from 'formik';
import { compose, graphql } from 'react-apollo';
import { createChannelMutation, meQuery } from '../graphql/team';

const closeAndReset = (e, close, reset) => {
  close(e);
  reset();
};

const AddChannelModal = ({
  open,
  toggle,
  values,
  handleBlur,
  isSubmitting,
  handleChange,
  handleSubmit,
  resetForm,
}) => (
  <Modal
    open={open}
    closeIcon
    onClose={e => closeAndReset(e, toggle, resetForm)}
  >
    <Modal.Header>Create a new Channel</Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Field>
          <Input
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
          <Form.Button
            fluid
            disabled={isSubmitting}
            onClick={e => closeAndReset(e, toggle, resetForm)}
          >
            Cancel
          </Form.Button>
          <Form.Button
            type="submit"
            color="black"
            fluid
            disabled={isSubmitting}
            onClick={handleSubmit}
          >
            Create Channel
          </Form.Button>
        </Form.Group>
      </Form>
    </Modal.Content>
  </Modal>
);

export default compose(
  graphql(createChannelMutation),
  withFormik({
    mapPropsToValues: () => ({ name: '' }),
    handleSubmit: async (
      values,
      { props: { toggle, teamId, mutate }, resetForm },
    ) => {
      const {
        data: {
          createChannel: { ok },
        },
      } = await mutate({
        variables: { teamId, name: values.name },
        optimisticResponse: {
          __typename: 'Mutation',
          createChannel: {
            __typename: 'Mutation',
            ok: true,
            channel: {
              __typename: 'Channel',
              id: -1,
              name: values.name,
            },
          },
        },
        update: (
          proxy,
          {
            data: {
              createChannel: { ok: requestOk, channel },
            },
          },
        ) => {
          if (requestOk) {
            const data = proxy.readQuery({ query: meQuery });
            const currentTeam = data.me.teams.indexOf(
              data.me.teams.find(team => team.id === teamId),
            );
            data.me.teams[currentTeam].channels.push(channel);
            proxy.writeQuery({
              query: meQuery,
              data,
            });
          }
        },
      });
      if (ok) {
        toggle();
        resetForm();
      }
    },
  }),
)(AddChannelModal);
