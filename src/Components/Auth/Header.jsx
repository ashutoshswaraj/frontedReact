import React from "react";
import "../../css/style.css";
import logo from "../../img/logo-white.png";

import { useNavigate } from "react-router";
import user1 from "../../img/users/user-1.jpg";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import defaultUser from "../../img/users/default.jpg";
const Header = ({ user }) => {
  const [photo, setPhoto] = useState(null);

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const logout = () => {
    setAuth({});
    navigate("/login");
    setAuth({});

    localStorage.removeItem("token");
  };
  useEffect(() => {
    if (auth.accessToken) {
      UserData();
    }
  }, [auth?.accessToken]);
  const UserData = async () => {
    try {
      const response = await axiosPrivate.get(`users/me`);
      console.log(response.data.data.photo, "response.data.data.photo");

      setPhoto(response.data.data[0].photo);
    } catch (err) {}
  };
  return (
    <>
      <header className="header">
        <nav className="nav nav--tours">
          <p
            className="nav__el"
            onClick={() => {
              navigate("/");
            }}
          >
            All tours
          </p>
        </nav>
        <div className="header__logo">
          <img src={logo} alt="Natours logo" />
        </div>
        <nav className="nav nav--user">
          {auth?.accessToken ? (
            <>
              <a
                className="nav__el nav__el--logout"
                onClick={() => {
                  logout();
                }}
              >
                Log out
              </a>
              <p
                className="nav__el"
                onClick={() => {
                  navigate("/me");
                }}
              >
                <img
                  className="nav__user-img"
                  src={photo === null || undefined ? defaultUser : photo}
                  alt={"userPhoto"}
                />
                {/* <span>{user.name.split(" ")[0]}</span> */}
              </p>
            </>
          ) : (
            <>
              <p
                className="nav__el"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Log in
              </p>
              <p
                className="nav__el nav__el--cta"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Sign up
              </p>
            </>
          )}
        </nav>
      </header>
    </>
  );
};

export default Header;
