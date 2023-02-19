import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
} from "react-bootstrap";
import "/src/MyModal.css";
export default function CustomModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [activeItem, setActiveItem] = useState(props.activeItem);

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }

    setActiveItem({ ...activeItem, [name]: value });
  };

  const { toggle, onSave } = props;

  return (
    <>
     <Button variant="primary" onClick={handleShow}>
        Add item
      </Button>

    <Modal 
    show={modal} 
    onHide={toggle}
    backdrop="static"
    >
      <ModalHeader>Todo Item</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Form.Label for="todo-title">Title</Form.Label>
            <input
              type="text"
              id="todo-title"
              name="title"
              value={activeItem.title}
              onChange={handleChange}
              placeholder="Enter Todo Title"
            />
          </FormGroup>
          <FormGroup>
            <Form.Label for="todo-description">Description</Form.Label>
            <input
              type="text"
              id="todo-description"
              name="description"
              value={activeItem.description}
              onChange={handleChange}
              placeholder="Enter Todo description"
            />
          </FormGroup>
          <FormGroup check>
            <Form.Label check>
              <input
                type="checkbox"
                name="completed"
                checked={activeItem.completed}
                onChange={handleChange}
              />
              Completed
            </Form.Label>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={() => onSave(activeItem)}>
          Save
        </Button>
      </ModalFooter>
    </Modal>

    </>
  );
}

