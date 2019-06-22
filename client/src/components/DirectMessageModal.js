import React from 'react';
import Downshift from 'downshift';
import { Form, Modal, Input } from 'semantic-ui-react';

const items = [
  { value: 'apple' },
  { value: 'pear' },
  { value: 'orange' },
  { value: 'grape' },
  { value: 'banana' },
];

const DirectMessageModal = ({ open, toggle }) => (
  <Modal open={open} closeIcon onClose={toggle}>
    <Modal.Header>Add new Direct Message</Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Field>
          <Downshift
            onChange={selection => alert(`You selected ${selection.value}`)}
            itemToString={item => (item ? item.value : '')}
          >
            {({
              getInputProps,
              getItemProps,
              getLabelProps,
              getMenuProps,
              isOpen,
              inputValue,
              highlightedIndex,
              selectedItem,
            }) => (
              <div>
                <label {...getLabelProps()}>Enter a fruit</label>
                <Input
                  name="name"
                  fluid
                  label="User"
                  placeholder="Search users..."
                  {...getInputProps()}
                />
                <ul {...getMenuProps()}>
                  {isOpen
                    ? items
                      .filter(
                        item =>
                          !inputValue || item.value.includes(inputValue),
                      )
                      .map((item, index) => (
                        <li
                          {...getItemProps({
                            key: item.value,
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
                          {item.value}
                        </li>
                      ))
                    : null}
                </ul>
              </div>
            )}
          </Downshift>
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

export default DirectMessageModal;
