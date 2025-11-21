import React, { useEffect, useState } from "react";
import Navbar from "../../components/Layout/Navbar";
import TodoServices from "../../Services/TodoServices";
import Spinner from "../../components/Spinner";

const TodoList = () => {
  const [todoStatus, setTodosStatus] = useState("");
  const [filteredTask, setFilteredTask] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allTask, setAllTask] = useState([]);

  // Get user todos
  const userData = JSON.parse(localStorage.getItem("todoapp"));
  const id = userData && userData?.user?.id;

  const getUserTask = async () => {
    setLoading(true);
    try {
      const { data } = await TodoServices.getTodos(id);
      setAllTask(data?.todos || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const incomplete = allTask?.filter((item) => item?.isCompleted === false);
    const completed = allTask?.filter((item) => item?.isCompleted === true);
    if (todoStatus === "incomplete") {
      setFilteredTask(incomplete);
    } else if (todoStatus === "completed") {
      setFilteredTask(completed);
    }
    getUserTask();
  }, [todoStatus]);
  
  return (
    <>
      <Navbar />
      <div className="filter-container">
        <h4>Filter Todos by</h4>
        <div className="filter-group">
          <select
            className="form-select"
            value={todoStatus}
            onChange={(e) => setTodosStatus(e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="incomplete">Incomplete</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {loading && <Spinner />}

      <div className="card-container">
        {filteredTask.length === 0 ? (
          <h1 className="no-task">No task found</h1>
        ) : (
          filteredTask.map((task) => (
            <div
              className="card border-primary mb-3 mt-3"
              style={{ maxWidth: "18rem" }}
              key={task._id || task.id}
            >
              <div className="card-header">
                <div className="chead">
                  <h6>{task.title.substring(0, 10)}</h6>
                  <h6
                    className={
                      task.isCompleted ? "task-cmp" : "task-inc"
                    }
                  >
                    {task.isCompleted ? "Completed" : "Incomplete"}
                  </h6>
                </div>
              </div>
              <div className="card-body">
                <h6 style={{ fontWeight: "bold" }}>{task.title}</h6>
                <p className="card-text">{task.description}</p>
                <h6>Date: {task.createdAt.substring(0, 10)}</h6>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default TodoList;
