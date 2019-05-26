import React from 'react';
import { Form, Modal, Input } from 'semantic-ui-react';
import { withFormik } from 'formik';
import { compose, graphql } from 'react-apollo';
import { createChannelMutation, allTeamsQuery } from '../graphql/team';

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
      { props: { toggle, teamId, mutate }, setSubmitting },
    ) => {
      const {
        data: {
          createChannel: { ok },
        },
      } = await mutate({
        variables: { teamId, name: values.name },
        update: (
          proxy,
          {
            data: {
              // eslint-disable-next-line no-shadow
              createChannel: { ok, channel },
            },
          },
        ) => {
          if (ok) {
            const data = proxy.readQuery({ query: allTeamsQuery });
            const currentTeam = data.allTeams.indexOf(
              data.allTeams.find(team => team.id === teamId),
            );
            data.allTeams[currentTeam].channels.push(channel);
            proxy.writeQuery({
              query: allTeamsQuery,
              data,
            });
          }
        },
      });
      if (ok) {
        toggle();
        setSubmitting(false);
      }
    },
  }),
)(AddChannelModal);
