import React from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';

export default ({ open, toggle }) => (
  <Modal open={open} closeIcon onClose={toggle}>
    <Modal.Header>Create a new Channel</Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Field>
          <Form.Input fluid label="Channel name" placeholder="Channel 1..." />
        </Form.Field>
        <Form.Group widths="equal">
          <Button fluid color="red" type="submit">
            Cancel
          </Button>
          <Button fluid secondary type="submit">
            Submit
          </Button>
        </Form.Group>
      </Form>
    </Modal.Content>
  </Modal>
);
