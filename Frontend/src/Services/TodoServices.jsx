import axios from "axios";

const API_URL = "http://localhost:8080/api/v1";

// get user token
// const user = JSON.parse(localStorage.getItem("todoapp"));

// //default auth header
// axios.defaults.headers.common["Authorization"] = `bearer ${user.token}`;

const stored = localStorage.getItem("todoapp");
const user = stored ? JSON.parse(stored) : null;

// default auth header
axios.defaults.headers.common["Authorization"] = user?.token
    ? `Bearer ${user.token}`
    : "";



//Get USER TODOS
const getTodos = (id) => {
    return axios.get(`${API_URL}/todo/index/${id}`);
};

//CRETE TODO
const createTodo = (data) => {
    return axios.post(`${API_URL}/todo/create`, data);
};

//UPDATE TODO
const updateTodo = (id, data) => {
    return axios.patch(`${API_URL}/todo/update/${id}`, data);
};

//DELETE TODO
const deleteTodo = (id) => {
    return axios.delete(`${API_URL}/todo/delete/${id}`);
};

const TodoServices = { getTodos, createTodo, updateTodo, deleteTodo };

export default TodoServices;