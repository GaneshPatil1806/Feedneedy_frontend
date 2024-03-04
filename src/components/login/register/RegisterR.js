import React, { useState } from "react";
import "./Register.css";
import { useNavigate, NavLink } from "react-router-dom";
import useUser, { UserContext } from "../../../context/UserContext";
import appVars from "../../../config/config";

const RegisterR = () => {
    const navigate = useNavigate();
    const [formErrors, setFormErrors] = useState({});
    const [userDetails, setUserDetails] = useState({
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
            ...userDetails,
            [name]: value,
        });
    };

    const {user,setUser} = useUser();
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
                    setUserDetails((prevuserDetails) => ({
                        ...prevuserDetails,
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
        const errors = validateForm(userDetails);
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            try {
                const response = await fetch(`${appVars.backUrl}/registerR`, {
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
                    }
                    else{
                        localStorage.setItem('user', JSON.stringify({ isLoggedIn: 'R', token: data.token }));
                        setUser({ isLoggedIn: 'R', token: data.token });
                        navigate("/receive");
                    }
                } else {
                    const errorData = await response.json();
                    throw new Error(errorData.error);
                }
            } catch (error) {
                setFormErrors({ backendError: error.message });
            }
        }
    };

    return (
        <UserContext.Provider value={user}>
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
                            value={userDetails.name}
                        />
                        <p className="errors name">{formErrors.name}</p>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            onChange={changeHandler}
                            value={userDetails.email}
                        />
                        <p className="errors email">{formErrors.email}</p>
                        <input
                            type="text"
                            name="mobile"
                            id="mobile"
                            placeholder="Mobile Number"
                            onChange={changeHandler}
                            value={userDetails.mobile}
                        />
                        <p className="errors phone">{formErrors.mobile}</p>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            onChange={changeHandler}
                            value={userDetails.password}
                        />
                        <p className="errors pass">{formErrors.password}</p>
                        <input
                            type="password"
                            name="cpassword"
                            id="cpassword"
                            placeholder="Confirm Password"
                            onChange={changeHandler}
                            value={userDetails.cpassword}
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
        </UserContext.Provider>
    );
};

export default RegisterR;