import React, { useState } from "react";
import {Button,Modal,Form,FormGroup} from "react-bootstrap";

import "/src/MyModal.css";

function AddTodo(props) {
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
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Todo
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Add todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button color="success" onClick={() => onSave(activeItem)}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddTodo;
