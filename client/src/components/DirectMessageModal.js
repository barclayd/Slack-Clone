import React from 'react';
import Downshift from 'downshift';
import { Form, Modal, Input } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import { getTeamMembersQuery } from '../graphql/team';

const DirectMessageModal = ({
  open,
  toggle,
  data: { loading, getTeamMembers },
}) => (
  <Modal open={open} closeIcon onClose={toggle}>
    <Modal.Header>Add new Direct Message</Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Field>
          {!loading && (
            <Downshift
              onChange={selection => console.log(selection.username)}
              itemToString={item => (item ? item.username : '')}
            >
              {({
                getInputProps,
                getItemProps,
                getMenuProps,
                isOpen,
                inputValue,
                highlightedIndex,
                selectedItem,
              }) => (
                <div>
                  <Input
                    name="name"
                    fluid
                    label="User"
                    placeholder="Search users..."
                    {...getInputProps()}
                  />
                  <div {...getMenuProps()}>
                    {isOpen
                      ? getTeamMembers
                        .filter(
                          item =>
                            !inputValue || item.username.includes(inputValue),
                        )
                        .map((item, index) => (
                          <div
                            style={{ border: '1px solid #ccc' }}
                            {...getItemProps({
                              key: item.id,
                              index,
                              item,
                              style: {
                                backgroundColor:
                                    highlightedIndex === index
                                      ? 'lightgray'
                                      : 'white',
                                fontWeight:
                                    selectedItem === item ? 'bold' : 'normal',
                              },
                            })}
                          >
                            {item.username}
                          </div>
                        ))
                      : null}
                  </div>
                </div>
              )}
            </Downshift>
          )}
        </Form.Field>
        <Form.Group widths="equal">
          <Form.Button fluid onClick={toggle}>
            Cancel
          </Form.Button>
        </Form.Group>
      </Form>
    </Modal.Content>
  </Modal>
);

export default graphql(getTeamMembersQuery)(DirectMessageModal);
