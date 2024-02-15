import React, { useState, useContext } from "react";
// Import Axios
import { useNavigate, useLocation } from "react-router-dom";
import Authcontext from "../context/AuthProvider";
import axios from "../api/axios";

const Signup = () => {
  const { setAuth } = useContext(Authcontext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const signupUrl = "users/signup";
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [confirmPWD, setConfirmPWD] = useState("");
  const [newPWD, setNewPWD] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const handleNewPasswordChange = (e) => {
    setNewPWD(e.target.value);
    // Check if passwords match when the new password changes
    setPasswordsMatch(e.target.value === confirmPWD);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPWD(e.target.value);
    // Check if passwords match when the confirm password changes
    setPasswordsMatch(newPWD === e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
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
      password: newPWD,
      name: userName,
      passwordConfirm: confirmPWD,
    };

    try {
      const response = await axios.post(signupUrl, JSON.stringify(postData), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      const { accessToken, refreshToken } = response.data;
      console.log(response, "uuuuuuuuuuuuu");
      setAuth({ email, newPWD, accessToken, refreshToken });

      localStorage.setItem("persist", true);
      localStorage.setItem("token", refreshToken);
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login-form">
      <h2 className="heading-secondary ma-bt-lg">Create your account</h2>
      <form className="form">
        <div className="form__group">
          <label htmlFor="name" className="form__label">
            Name
          </label>
          <input
            id="name"
            type="text"
            defaultValue={userName}
            required
            placeholder="Name"
            name="name"
            className="form__input"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </div>
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
            type="password"
            placeholder="••••••••"
            required
            minLength="8"
            className="form__input"
            onChange={handleNewPasswordChange}
            defaultValue={newPWD}
          />
        </div>
        <div className="form__group ma-bt-lg">
          <label htmlFor="password-confirm" className="form__label">
            Confirm password
          </label>
          <input
            id="password-confirm"
            type="password"
            placeholder="••••••••"
            required
            minLength="8"
            className={`form__input ${
              passwordsMatch ? "" : "form__input--error"
            }`}
            onChange={handleConfirmPasswordChange}
            defaultValue={confirmPWD}
          />
          {!passwordsMatch && (
            <p className="form__error-message">Passwords do not match</p>
          )}
        </div>
        <div className="form__group">
          <button className="btn btn--green" onClick={handleLogin}>
            Signup
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
