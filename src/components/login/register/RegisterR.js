import React, { useEffect, useState } from "react";
import "./Register.css";
import { useNavigate, NavLink } from "react-router-dom";

const RegisterR = ({ isRLoggedIn, setisRLoggedIn,isDLoggedIn, setisDLoggedIn }) => {
    const navigate = useNavigate();
    const [formErrors, setFormErrors] = useState({});
    const [user, setUserDetails] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
        cpassword: "",
        latitude: 0,
        longitude: 0,
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

        if (!values.name) {
            errors.name = "Name is required";
        } else if (values.name.length < 4) {
            errors.name = "Name must be at least 4 characters";
        }

        if (!values.email) {
            errors.email = "Email is required";
        } else if (!regex.test(values.email)) {
            errors.email = "Invalid email format";
        }

        if (!values.mobile) {
            errors.mobile = "Mobile number is required";
        } else if (values.mobile.length !== 10) {
            errors.mobile = "Mobile number must be 10 digits";
        }

        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 4) {
            errors.password = "Password must be at least 4 characters";
        } else if (values.password.length > 10) {
            errors.password = "Password cannot exceed 10 characters";
        }

        if (!values.cpassword) {
            errors.cpassword = "Confirm Password is required";
        } else if (values.cpassword !== values.password) {
            errors.cpassword = "Confirm password and password should be the same";
        }

        return errors;
    };

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

    const signupHandler = async (e) => {
        e.preventDefault();
        await getLocation();
        const errors = validateForm(user);
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            try {
                const response = await fetch("/registerR", {
                    method: "POST",
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
                    }
                    localStorage.setItem('token', token);
                    setisRLoggedIn(true);
                    navigate("/receive");
                } else {
                    const errorData = await response.json();
                    throw new Error(errorData.error);
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
          fetch("/logout", {
            method: "POST",
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
            {!isRLoggedIn && (
                <div className="register_f">
                    <div className="RegisterContainer">
                        <div className="register_form">
                            <form autoComplete="off">
                                <h1>Create your account</h1>
                                {formErrors.backendError && <p className="errors error">{formErrors.backendError}</p>}
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Name"
                                    onChange={changeHandler}
                                    value={user.name}
                                />
                                 <p className="errors name">{formErrors.name}</p>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    onChange={changeHandler}
                                    value={user.email}
                                />
                                <p className="errors email">{formErrors.email}</p>
                                <input
                                    type="text"
                                    name="mobile"
                                    id="mobile"
                                    placeholder="Mobile Number"
                                    onChange={changeHandler}
                                    value={user.mobile}
                                />
                                 <p className="errors phone">{formErrors.mobile}</p>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    onChange={changeHandler}
                                    value={user.password}
                                />
                                <p className="errors pass">{formErrors.password}</p>
                                <input
                                    type="password"
                                    name="cpassword"
                                    id="cpassword"
                                    placeholder="Confirm Password"
                                    onChange={changeHandler}
                                    value={user.cpassword}
                                />
                                <p className="errors pass">{formErrors.cpassword}</p>
                                <button type="submit" onClick={signupHandler}>
                                    Register &nbsp;<i className="fa-sharp fa-solid fa-address-card"></i>
                                </button>
                            </form>
                            <NavLink to="/loginR" className="link_next">
                                Already registered? Login
                            </NavLink>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default RegisterR;