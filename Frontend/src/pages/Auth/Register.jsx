import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AuthStyles.css";
import AuthServices from "../../Services/AuthServices";
import toast from 'react-hot-toast';
import ErrorMessage from "../../Utils/ErrorMessage";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  //register function
  const registerHandler = async (e) => {
    try {
      e.preventDefault();
      const data = { username, email, password };
      const res = await AuthServices.registerUser(data);
      console.log(res.data);
      toast.success(res.data.message);
      navigate("/login");
      // localStorage.setItem("todoapp", JSON.stringify(res.data));
      console.log(res.data);
    } catch (err) {
      toast.error(ErrorMessage(err));
      console.log(err);
    }
  };

  return (
    <div className="form-container">
      <div className="form">
        <div className="fa-circle-user">
          <i className="fa-solid"></i>
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-bottom">
          <p className="text-center">
            If you have account! please login &nbsp;
            <Link to="/login">Login</Link>
          </p>
          <button type="submit" className="login-btn" onClick={registerHandler}>
            REGISTER <i className="fa fa-user-plus" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register