import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import moment from 'moment';

const Tasks = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const url = "/api/v1/tasks/index";
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => setTasks(res))
      .catch(() => navigate("/"));
  }, []);

  const allTasks = tasks.map((task, index) => (
    <div key={index} className="col-md-6 col-lg-4">
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">{task.title}</h5>
          <p>{task.description}</p>
          <p>
            Due Date: {moment(task.due_date).format('DD-MMM-YYYY')}
          </p>
          <p>Status: {task.status}</p>
          <Link to={`/tasks/${task.id}/edit`} className="btn custom-button">
            Edit Task
          </Link>
          <Link to={`/task/${task.id}`} className="btn custom-button">
            View Task
          </Link>
        </div>
      </div>
    </div>
  ));
  const noTask = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        No tasks yet. Why not <Link to="/new_task">create one</Link>
      </h4>
    </div>
  );

  return (
    <>
      <section className="jumbotron jumbotron-fluid text-center">
        <div className="container py-5">
          <h1 className="display-4">Task Listing</h1>
        </div>
      </section>
      <div className="py-5">
        <main className="container">
          <div className="text-end mb-3">
            <Link to="/task" className="btn btn-primary">
              Create New Task
            </Link>
          </div>
          <div className="row">
            {tasks.length > 0 ? allTasks : noTask}
          </div>
          <Link to="/" className="btn btn-link">
            Home
          </Link>
        </main>
      </div>
    </>
  );
};

export default Tasks;