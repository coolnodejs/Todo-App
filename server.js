const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const todoRoutes = require('./routes/todoRoutes');
const connectDB = require('./config/db');

const cors = require('cors');

// .env config
dotenv.config();

// DB Connection
connectDB();

const app = express();

// middelware
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173", // allow requests from your frontend
    credentials: true                // if you're using cookies/auth headers
}));

// Route
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/todo', todoRoutes);

// Port
const PORT = process.env.PORT || 8000;

// listen
app.listen(PORT, () => {
    console.log(`App listening on Port ${PORT}!`);
});