const express = require('express');
const router = express.Router();

const todoController = require('../controllers/todoController');
const authMiddleware = require('../middlewares/authMiddleware');

// GET TODO
router.get('/index/:id', authMiddleware, todoController.getTodos);

// CREATE TODO
router.post('/create', authMiddleware, todoController.createTodo);

// UPDATE TODO
router.patch("/update/:id", authMiddleware, todoController.updateTodo);

//DELEET TODO
router.delete("/delete/:id", authMiddleware, todoController.deleteTodo);


module.exports = router;
