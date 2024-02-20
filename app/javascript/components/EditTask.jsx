import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from 'moment';

const EditTask = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({title: "",});
  const [status, setStatus] = useState("");
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

  useEffect(() => {
    const url = `/api/v1/tasks/${params.id}/edit`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => setTask(response))
      .catch(() => navigate("/tasks"));
  }, [params.id]);

  const onSubmit = (event) => {
    event.preventDefault();
    const url = `/api/v1/tasks/${params.id}/update`;

    if (status.length == 0 || due_date.length == 0)
      return;
debugger
    const body = {
      status: status,
      due_date: due_date,
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "PATCH",
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
            Edit task.
          </h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="title">Task Status</label>
              <input
                type="text"
                name="status"
                id="taskStatus"
                value={status}
                className="form-control"
                required
                onChange={(event) => onChange(event, setStatus)}
              />
            </div>
            <div className="form-group">
                <label htmlFor="due_date">Due Date</label>
                <input
                    id="due_date"
                    name="due_date"
                    className="form-control"
                    value={due_date}
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

export default EditTask;