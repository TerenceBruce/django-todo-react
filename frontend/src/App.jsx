import React, { useState, useEffect, Component } from "react";
import CustomModal from "./components/Modal";
import axios from "axios";
import AddTodo from "./components/AddTodo"
const App = () => {
  const [viewCompleted, setViewCompleted] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const [show, setShow] = useState(false);
  const [activeItem, setActiveItem] = useState({
    title: "",
    description: "",
    completed: false,
  });

  useEffect(() => {
    refreshList();
  }, []);

  const refreshList = () => {
    
    axios
      .get("http://localhost:8000/api/todos/")
      .then((res) => setTodoList(res.data))
      .catch((err) => console.log(err));
  };

  const toggle = () => {
    
    setShow(!show);
  };

  const handleSubmit = (item) => {
    toggle();
    
    if (item.id) {
      axios
        .put(`http://localhost:8000/api/todos/${item.id}/`, item)
        .then((res) => refreshList());
      return;
    }
    axios
      .post("http://localhost:8000/api/todos/", item)
      .then((res) => refreshList());
  };

  const handleDelete = (item) => {
    
    axios
      .delete(`http://localhost:8000/api/todos/${item.id}/`)
      .then((res) => refreshList());
  };

  const createItem = () => {
    
    const item = { title: "", description: "", completed: false };
    setActiveItem(item);
    setShow(!show);
   
  };

  const editItem = (item) => {
   
    setActiveItem(item);
    setShow(!show);
    
  };

  const displayCompleted = (status) => {
    if (status) {
      return setViewCompleted(true);
    }
    return setViewCompleted(false);
  };

  const renderTabList = () => {
    return (
      <div className="nav nav-tabs">
        <span
          onClick={() => displayCompleted(true)}
          className={viewCompleted ? "nav-link active" : "nav-link"}
        >
          Complete
        </span>
        <span
          onClick={() => displayCompleted(false)}
          className={viewCompleted ? "nav-link" : "nav-link active"}
        >
          Incomplete
        </span>
      </div>
    );
  };


  const renderItems = () => {
    const newItems = todoList.filter(
      (item) => item.completed === viewCompleted
    );

    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${viewCompleted ? "completed-todo" : ""}`}
          title={item.description}
        >
          {item.title} <br />
          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
          <br />
          {item.description}
          <br />
          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
          <br />
        </span>
        <span>
          <button
            className="btn btn-secondary mr-2"
            onClick={() => editItem(item)}
          >
            Edit
          </button>
          <button className="btn btn-danger" onClick={() => handleDelete(item)}>
            Delete
          </button>
        </span>
      </li>
    ));
  };


  return (
    <main className="content">
      <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
      <div className="row ">
        <div className="col-md-6 col-sm-10 mx-auto p-0">
          <div className="card p-3">
            <div className="">
              <button onClick={createItem} className="btn btn-primary">
                Add task
              </button>

              <AddTodo
                handleshow={show}
                activeItem={activeItem}
                toggle={toggle}
                onSave={handleSubmit}
              />
            </div>
            {renderTabList()}
            <ul className="list-group list-group-flush">{renderItems()}</ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;
