import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NewTask = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [due_date, setDueDate] = useState("");

  const stripHtmlEntities = (str) => {
    return String(str)
      .replace(/\n/g, "<br> <br>")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  };

  const onChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const url = "/api/v1/tasks/create";

    if (title.length == 0 || description.length == 0 || due_date.length == 0)
      return;

    const body = {
      title,
      description,
      due_date,
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => navigate(`/task/${response.id}`))
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">
            Create new task.
          </h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="title">Task title</label>
              <input
                type="text"
                name="title"
                id="taskTitle"
                className="form-control"
                required
                onChange={(event) => onChange(event, setTitle)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                id="taskDescription"
                className="form-control"
                rows="5"
                required
                onChange={(event) => onChange(event, setDescription)}
              />
            </div>
            <div className="form-group">
                <label htmlFor="due_date">Due Date</label>
                <input
                    type="date"
                    id="due_date"
                    name="due_date"
                    className="form-control"
                    required
                    onChange={(event) => onChange(event, setDueDate)}
                />
            </div>
            <button type="submit" className="btn custom-button mt-3">
              Create Task
            </button>
            <Link to="/tasks" className="btn btn-link mt-3">
              Back to tasks
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewTask;