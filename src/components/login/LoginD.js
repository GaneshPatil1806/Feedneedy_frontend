import React, { useState, useEffect } from "react";
import './Login.css'
import { useNavigate, NavLink } from "react-router-dom";
import Donorlog from "../images/Donorlog.png";
import appVars from "../../config/config";
import useUser, { UserContext } from "../../context/UserContext";

const LoginD = () => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const { setUser, user } = useUser();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
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
    const errors = validateForm(userDetails);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch(`${appVars.backUrl}/loginD`, {
          method: "POST",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userDetails),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.error) {
            throw new Error(data.error);
          } else {
            localStorage.setItem('user', JSON.stringify({ isLoggedIn: 'D', token: data.token }));
            setUser({ isLoggedIn: 'D', token: data.token });
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
    if (user && user.isLoggedIn === 'D') {
      navigate("/donate");
    }

    if (user && user.isLoggedIn === 'R') {
        localStorage.removeItem('user');
        setUser({});
        window.alert("You have been logged out Receiver!");
        navigate("/loginD");
    }
  }, [user,navigate,setUser]);
  
  return (
    <UserContext.Provider value={user}>
      <div className="login-box">
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
                  value={userDetails.email}
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
                  value={userDetails.password}
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
      </div>
    </UserContext.Provider>
  );
};

export default LoginD;