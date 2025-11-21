import React, { useState } from "react";
import EditTodo from "../EditTodo";
import toast from "react-hot-toast";
import TodoServices from "../../Services/TodoServices";
import ErrorMessage from "../../Utils/ErrorMessage";

const Card = ({ allTask, getUserTask }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    //handle edit
    const handleEdit = (task) => {
        setSelectedTask(task);
        setShowModal(true);
    };

    //hanlde delete
    const handleDelete = async (id) => {
        try {
            await TodoServices.deleteTodo(id);
            toast.success("task Deleted Succesfully");
            getUserTask();

        } catch (error) {
            console.log(error);
            toast.error(ErrorMessage(error));
        }
    };
    
    return (
        <>
            <div className="card-container">
                {allTask?.map((task) => (
                    <div
                        key={task._id} // ✅ Key is now on the top-level element
                        className="card border-primary mb-3 mt-3"
                        style={{ maxWidth: "17.5rem" }}
                    >
                        <div className="card-header">
                            <div className="chead">
                                <h6>{task?.title.substring(0, 30)}</h6>
                                <h6
                                    className={
                                        task?.isCompleted ? "task-cmp" : "task-inc"
                                    }
                                >
                                    {task?.isCompleted ? "Completed" : "Incomplete"}
                                </h6>
                            </div>
                        </div>

                        <div className="card-body">
                            <h6 style={{ fontWeight: "bold" }}>{task?.title}</h6>
                            <p className="card-text">{task?.description}</p>
                            <h6>Date : {task?.createdAt.substring(0, 10)}</h6>
                        </div>

                        <div className="card-footer bg-transparent border-primary">
                            <button
                                className="btn btn-warning"
                                title="Edit Task"
                                onClick={() => handleEdit(task)}
                            >
                                <i className="fa-solid fa-pen-to-square"></i>
                            </button>

                            <button
                                className="btn btn-danger ms-2"
                                title="Delete Task"
                                onClick={() => handleDelete(task?._id)}
                            >
                                <i className="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* ✅ Render modal only once, outside the map */}
            {showModal && (
                <EditTodo
                    task={selectedTask}
                    setShowModal={setShowModal}
                    getUserTask={getUserTask}
                />
            )}
        </>
    );
};

export default Card;