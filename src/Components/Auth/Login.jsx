import React, { useState, useContext } from "react";
// Import Axios
import { useNavigate, useLocation } from "react-router-dom";
import Authcontext from "../context/AuthProvider";
import axios from "../api/axios";

const LoginForm = () => {
  const { setAuth } = useContext(Authcontext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const LoginUrl = "users/login";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  // admin@natours.io

  const handleLogin = async (e) => {
    e.preventDefault();
    // "proxy": "http://localhost:8000/api/v1",
    // Specify the URL for the POST request
    const apiUrl = "/users/login";

    // Create the data object to be sent in the request body
    const postData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(LoginUrl, JSON.stringify(postData), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      const { accessToken, refreshToken } = response.data;
      console.log(response, "uuuuuuuuuuuuu");
      setAuth({ email, password, accessToken, refreshToken });

      localStorage.setItem("persist", true);
      localStorage.setItem("token", refreshToken);
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
    }

    console.log("Login button clicked");
  };

  return (
    <div className="login-form">
      <h2 className="heading-secondary ma-bt-lg">Log into your account</h2>
      <form className="form">
        <div className="form__group">
          <label className="form__label" htmlFor="email">
            Email address
          </label>
          <input
            id="email"
            className="form__input"
            type="email"
            placeholder="you@example.com"
            required
            defaultValue={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="form__group ma-bt-md">
          <label className="form__label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            className="form__input"
            type="password"
            placeholder="••••••••"
            required
            minLength="8"
            defaultValue={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="form__group">
          <button className="btn btn--green" onClick={handleLogin}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
