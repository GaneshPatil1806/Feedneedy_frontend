import React, { useState, useEffect } from "react";
import "./Login.css";
import { useNavigate, NavLink } from "react-router-dom";
import Rlog from "../images/Receiverlog.png";
import appVars from "../../config/config";

const LoginR = ({ isRLoggedIn, setisRLoggedIn,isDLoggedIn, setisDLoggedIn }) => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [user, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const getLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserDetails((prevUser) => ({
            ...prevUser,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }));
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...user,
      [name]: value,
    });
  };

  const validateForm = (values) => {
    const error = {};
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      error.email = "Email is required";
    } else if (!regex.test(values.email)) {
      error.email = "Please enter a valid email address";
    }
    if (!values.password) {
      error.password = "Password is required";
    }
    return error;
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    getLocation();
    const errors = validateForm(user);
    setFormErrors(errors);
  
    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch("https://pbl2023.onrender.com/loginR", {
          method: "POST",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        if (response.ok) {
          const data = await response.json();
          const token = data.token;
          if (data.error) {
            throw new Error(data.error);
          } else {
            setisRLoggedIn(true);
            localStorage.setItem('token', token);
            navigate("/receive");
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
    if (isRLoggedIn) {
      navigate("/receive");
    }

    if(isDLoggedIn){
      fetch(`${appVars.backUrl}/logout`, {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
      });
      setisDLoggedIn(false);
      window.alert("You have been logged out Donater!");
      navigate("/loginR");
    }
  }, [isRLoggedIn,isDLoggedIn,setisDLoggedIn, navigate]);

  return (
    <>
    {!isRLoggedIn?(<><div className="login-box">
      <div className="login-image">
        <img src={Rlog} alt="" />
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
              {formErrors.email && <p className="pass">{formErrors.email}</p>}
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
                <NavLink to="/registerR" className="link_next">
                  Not yet registered? Register Now
                </NavLink>
              </div>
            </form>
      </div>
    </div></>):null}
    </>
  );
};
export default LoginR;
