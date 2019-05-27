import React from 'react';
import styled from 'styled-components';
import { withFormik } from 'formik';
import { graphql, compose } from 'react-apollo';
import { Input } from 'semantic-ui-react';
import { createMessageMutation } from '../graphql/message';

const SendMessageWrapper = styled.div`
  grid-column: 3;
  grid-row: 3;
  padding: 20px;
`;

const ENTER_KEY = 13;

const SendMessage = ({
  channelName,
  values,
  handleBlur,
  isSubmitting,
  handleChange,
  handleSubmit,
}) => (
  <SendMessageWrapper>
    <Input
      name="message"
      onBlur={handleBlur}
      onChange={handleChange}
      value={values.message}
      fluid
      placeholder={`Message #${channelName}`}
      onKeyDown={(e) => {
        if (e.keyCode === ENTER_KEY && !isSubmitting) {
          handleSubmit(e);
        }
      }}
    />
  </SendMessageWrapper>
);

export default compose(
  graphql(createMessageMutation),
  withFormik({
    mapPropsToValues: () => ({ message: '' }),
    handleSubmit: async (
      values,
      { props: { channelId, mutate }, resetForm },
    ) => {
      if (!values.message || !values.message.trim()) {
        resetForm(false);
        return;
      }
      const {
        data: { createMessage },
      } = await mutate({
        variables: {
          channelId,
          text: values.message,
        },
      });
      if (createMessage) {
        resetForm();
      }
    },
  }),
)(SendMessage);
