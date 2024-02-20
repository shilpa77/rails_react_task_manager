import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Task = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({title: ""});

  useEffect(() => {
    const url = `/api/v1/show/${params.id}`;
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

  const addHtmlEntities = (str) => {
    return String(str).replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  };

  const deleteTask = () => {
    const url = `/api/v1/destroy/${params.id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => navigate("/tasks"))
      .catch((error) => console.log(error.message));
  };

  
  return (
    <div className="">
      <div className="hero position-relative d-flex align-items-center justify-content-center">
        <div className="overlay bg-dark position-absolute" />
        <h1 className="display-4 position-relative text-white">
          {task.title}
        </h1>
      </div>
      <div className="container py-5">
        <div className="row">
          <div className="col-sm-12 col-lg-2">
            <Link to="/tasks" className="btn btn-link">
              Back to tasks
            </Link>
          </div>
          <div className="col-sm-12 col-lg-7">
            <ul className="list-group">
              <div className="row">
                <div className="col-sm-12 col-lg-10">
                  <h5 className="mb-2">Details</h5>
                </div>
                <div className="col-sm-12 col-lg-2">
                  <button
                    type="button"
                    className="btn btn-danger mb-2"
                    onClick={deleteTask}
                  >
                    Delete Task
                  </button>
                </div>
              </div>
              <li className="list-group-item">Description: {task.description}</li>
              <li className="list-group-item">Due Date: {task.due_date}</li>
              <li className="list-group-item">Status: {task.status}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;