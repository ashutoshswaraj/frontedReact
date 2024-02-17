import React from "react";
import "../../css/style.css";
import SideNav from "../Auth/SideNavbar";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import defaultUser from "../../img/users/default.jpg";
import SpinnerLoader from "../Spinner/Spinner";
const SingleUserme = ({ user }) => {
  const [loader, setLoader] = useState(true);
  const [userData, setUserdata] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [userName, setUserName] = useState("");

  const [currentPWD, setCurrentPwd] = useState("");
  const [confirmPWD, setConfirmPWD] = useState("");
  const [newPWD, setNewPWD] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    UserData();
  }, []);
  const UserData = async () => {
    setLoader(false);
    try {
      const response = await axiosPrivate.get(`users/me`);
      if (response.status === 200) {
        if (response.data.data[0] !== undefined) {
          console.log(response.data.data[0].photo, "response.data.data.photo");
          setUserdata(response.data.data);
          setPhoto(response.data.data[0].photo);
        }

        setUserName(response.data.data[0].name);
      }
    } catch (err) {}
    setLoader(true);
  };
  const changeProfile = async (e) => {
    const formData = new FormData();
    formData.append("photo", e.target.files[0]);
    // formData.append("user_id", userId);
    setPhoto(URL.createObjectURL(e.target.files[0]));

    try {
      const response = await axiosPrivate.post("/users/imageUpload", formData, {
        headers: {
          accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      setPhoto(response.data.data.photoURL);
      console.log(response, "photoressss");
    } catch (err) {}
  };

  const postUserdata = async () => {
    const postData = {
      photo: photo,
      name: userName,
    };
    try {
      const response = await axiosPrivate.patch(
        "/users/updateMe",
        JSON.stringify(postData),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log(response, "photoressss");
    } catch (err) {}
  };

  const updatePassword = async () => {
    const postData = {
      passwordCurrent: currentPWD,
      password: newPWD,
      passwordConfirm: confirmPWD,
    };
    try {
      const response = await axiosPrivate.patch(
        "/users/updatepassword",
        JSON.stringify(postData),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log(response, "ressssssssss");
    } catch (err) {}
  };
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
  return (
    <>
      <div
        style={{
          display: "flex",
        }}
      >
        <SideNav userData={userData} />
        {loader ? (
          <>
            <div className="user-view__content">
              <div className="user-view__form-container">
                <h2 className="heading-secondary ma-bt-md">
                  Your account settings
                </h2>
                {userData.map((userItem) => (
                  <>
                    <form method="HTTP_METHOD" enctype="multipart/form-data">
                      <div className="form__group">
                        <label htmlFor="name" className="form__label">
                          Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          defaultValue={userItem.name}
                          required
                          name="name"
                          className="form__input"
                          onChange={(e) => {
                            setUserName(e.target.value);
                          }}
                        />
                      </div>
                      <div className="form__group ma-bt-md">
                        <label htmlFor="email" className="form__label">
                          Email address
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={userItem.email}
                          required
                          name="email"
                          className="form__input"
                        />
                      </div>
                      <div className="form__group form__photo-upload">
                        <img
                          className="form__user-photo"
                          width={"250px"}
                          src={photo === null ? defaultUser : photo}
                          alt="User photo"
                        />

                        <label htmlFor="photo" className="upload-btn">
                          Upload your photo
                        </label>
                        <input
                          id="photo"
                          name="photo"
                          type="file"
                          onChange={changeProfile}
                          accept="image/*"
                          style={{ display: "none" }}
                        />
                      </div>
                      <div className="form__group right">
                        <button
                          className="btn btn--small btn--green"
                          onClick={(e) => {
                            e.preventDefault();
                            postUserdata();
                          }}
                        >
                          Save settings
                        </button>
                      </div>
                    </form>
                  </>
                ))}
              </div>
              <hr className="line" />
              <div className="user-view__form-container">
                <h2 className="heading-secondary ma-bt-md">Password change</h2>
                <form
                  className="form form-user-password"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="form__group">
                    <label htmlFor="password-current" className="form__label">
                      Current password
                    </label>
                    <input
                      id="password-current"
                      type="password"
                      placeholder="••••••••"
                      required
                      minLength="8"
                      className="form__input"
                      defaultValue={currentPWD}
                      onChange={(e) => {
                        setCurrentPwd(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form__group">
                    <label htmlFor="password" className="form__label">
                      New password
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
                      <p className="form__error-message">
                        Passwords do not match
                      </p>
                    )}
                  </div>
                  <div className="form__group right">
                    <button
                      className="btn btn--small btn--green btn--save-password"
                      onClick={(e) => {
                        e.preventDefault();
                        console.log(photo, "ooooooooooo");
                        updatePassword();
                      }}
                    >
                      Save password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        ) : (
          <SpinnerLoader />
        )}
      </div>
    </>
  );
};

export default SingleUserme;
