import React, { useState } from 'react';
import toast from 'react-hot-toast';
import TodoServices from '../Services/TodoServices';
import ErrorMessage from '../Utils/ErrorMessage';

const EditTodo = ({ task, setShowModal, getUserTask }) => {
    const [title, setTitle] = useState(task?.title);
    const [description, setDescription] = useState(task?.description);
    const [isCompleted, setIsCompleted] = useState(task?.isCompleted);

    const handleClose = () => {
        setShowModal(false);
    };

    const handleSelectChange = (e) => {
        setIsCompleted(e.target.value === "true");
    };

    const handleSubmit = async () => {
        try {
            if (!title || !description) {
                return toast.error("Please provide both title and description!");
            }

            const data = { title, description, isCompleted };
            await TodoServices.updateTodo(task._id, data);

            toast.success("Task updated successfully!");
            setShowModal(false);

            getUserTask();

        } catch (error) {
            console.log(error);
            toast.error(ErrorMessage(error));
        }
    };

    return (
        <>
            {task && (
                <div
                    className="modal"
                    tabIndex="-1"
                    role="dialog"
                    style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Update Task</h5>
                                <button
                                    className="btn-close"
                                    aria-label="close"
                                    onClick={handleClose}
                                ></button>
                            </div>

                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>

                                <div className="form-floating">
                                    <textarea
                                        className="form-control"
                                        id="floatigTextarea"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></textarea>
                                    <label htmlFor="floatigTextarea">Description</label>
                                </div>

                                <div className="my-3">
                                    <select
                                        className="form-select"
                                        value={isCompleted}
                                        onChange={handleSelectChange}
                                    >
                                        <option value="">Select Status</option>
                                        <option value={true}>Completed</option>
                                        <option value={false}>Incomplete</option>
                                    </select>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary btn-sm"
                                    onClick={handleClose}
                                >
                                    CLOSE
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-success btn-sm"
                                    onClick={handleSubmit}
                                >
                                    UPDATE
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default EditTodo;
