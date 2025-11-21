const mongoose = require("mongoose");

const TodoModel = require("../models/todoModel");
const UserModel = require("../models/userModel");

// GET TODO
const getTodos = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({
                success: false,
                message: "Invalid User ID format",
            });
        }

        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "No user found with this ID",
            });
        }

        const todos = await TodoModel.find({ createdBy: id }).lean();
        if (todos.length === 0) {
            return res.status(200).send({
                success: true,
                message: "You have no tasks yet",
                todos: [],
            });
        }

        return res.status(200).send({
            success: true,
            message: "Your tasks",
            todos,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: "Error in Get Todos API",
            error: error.message,
        });
    }
};

// CREATE TODO
const createTodo = async (req, res) => {
    try {
        const { title, description, createdBy } = req.body;

        // Basic field validation
        if (!title || !description || !createdBy) {
            return res.status(400).json({
                success: false,
                message: "Please provide title, description, and createdBy",
            });
        }

        // Check if createdBy is a valid MongoDB ObjectId (assuming Mongoose)
        if (!mongoose.Types.ObjectId.isValid(createdBy)) {
            return res.status(400).json({
                success: false,
                message: "Invalid createdBy ID",
            });
        }

        // Optionally check if the user exists (if you have a User model)
        const userExists = await UserModel.findById(createdBy);
        if (!userExists) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Create and save new todo
        const todo = new TodoModel({ title, description, createdBy });
        const result = await todo.save();

        return res.status(201).json({
            success: true,
            message: "Your task has been created successfully",
            result,
        });

    } catch (error) {
        console.error("Error creating todo:", error.message);
        return res.status(500).json({
            success: false,
            message: "Error in create task API",
        });
    }
};

// UPDATE TODO
const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({
                success: false,
                message: "Invalid Task ID format",
            });
        }

        const todo = await TodoModel.findByIdAndUpdate(id, req.body, { new: true });

        if (!todo) {
            return res.status(404).send({
                success: false,
                message: "No task found with this ID",
            });
        }

        return res.status(200).send({
            success: true,
            message: "Task updated successfully!",
            todo,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: "Error in Update Todo API",
            error: error.message,
        });
    }
};


// DELETE TODO
const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).send({
                success: false,
                message: "Task ID is required",
            });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({
                success: false,
                message: "Invalid Task ID format",
            });
        }

        const todo = await TodoModel.findByIdAndDelete(id);

        if (!todo) {
            return res.status(404).send({
                success: false,
                message: "No task found with this ID",
            });
        }

        return res.status(200).send({
            success: true,
            message: "Your task has been deleted successfully!",
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: "Error in Delete Todo API",
            error: error.message,
        });
    }
};

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };