const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
            minlength: [3, "Title must be at least 3 characters long"],
            maxlength: [100, "Title cannot exceed 100 characters"],
        },
        description: {
            type: String,
            required: [true, "Description is required"],
            trim: true,
            maxlength: [500, "Description cannot exceed 500 characters"],
        },
        isCompleted: {
            type: Boolean,
            default: false,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Use singular model name (Mongoose convention)
            required: [true, "CreatedBy (User ID) is required"],
        },
    },
    {
        timestamps: true,
        versionKey: false, // disables __v field
    }
);

// Optional: index for faster queries by user or completion state
todoSchema.index({ createdBy: 1, isCompleted: 1 });

module.exports = mongoose.model("todo", todoSchema);
