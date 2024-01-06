import React, { useState, useEffect } from "react";
import './Login.css'
import { useNavigate, NavLink } from "react-router-dom";
import Donorlog from "../images/Donorlog.png";

const LoginD = ({ isRLoggedIn, setisRLoggedIn, isDLoggedIn, setisDLoggedIn }) => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [user, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...user,
      [name]: value,
    });
  };

  const validateForm = (values) => {
    const errors = {};
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    const errors = validateForm(user);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch("https://pbl2023.onrender.com/loginD", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        if (response.ok) {
          const data = await response.json();
          const token = data.token;
          console.log("inside login ",token);
          if (data.error) {
            throw new Error(data.error);
          } else {
            setisDLoggedIn(true);
            // Store the token in localStorage or a secure cookie
            localStorage.setItem('token', token);
            navigate("/donate");
          }
        } else {
          const errorData = await response.text();
          throw new Error(errorData);
        }
      } catch (error) {
        setFormErrors({ backendError: error.message });
      }
    }
  };

  useEffect(() => {
    if (isDLoggedIn) {
      navigate("/donate");
    }

    if(isRLoggedIn){
      fetch("/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      setisRLoggedIn(false);
      window.alert("You have been logged out Receiver!");
      navigate("/loginD");
    }
  }, [isDLoggedIn, isRLoggedIn, setisRLoggedIn, navigate]);

  return (
    <div className="login-box">
      {!isDLoggedIn ? (
        <>
          <div className="login-image">
            <img src={Donorlog} alt="" />
          </div>
          <div className="LoginContainer">
            <form>
              <h1>Login</h1>
              {formErrors.backendError && (
                <p className="error-message">{formErrors.backendError}</p>
              )}
              <label>
                E-MAIL&nbsp;<i className="fa-solid fa-envelope"></i>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={changeHandler}
                value={user.email}
              />
              {formErrors.email && (
                <p className="pass">{formErrors.email}</p>
              )}
              <label>
                PASSWORD&nbsp;<i className="fa-solid fa-key"></i>
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={changeHandler}
                value={user.password}
              />
              <p className="password">{formErrors.password}</p>
              <button type="submit" onClick={loginHandler}>
                Login &nbsp;<i className="fa-solid fa-right-to-bracket"></i>
              </button>{" "}
              <br></br>
              <div className="link_next">
                <NavLink to="/registerD" className="link_next">
                  Not yet registered? Register Now
                </NavLink>
              </div>
            </form>
          </div>
        </>
      ) : (
        null // Render nothing when the user is already logged in
      )}
    </div>
  );
};

export default LoginD;