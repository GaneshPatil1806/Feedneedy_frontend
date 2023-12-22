import React, { useState, useEffect } from "react";
import './Profile.css';
import logo from '../images/itachi.jpg';

const Profile = () => {
    const [data1, setData1] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData1();
    }, []);

    const fetchData1 = async () => {
        try {
            const response = await fetch(`/viewProfile`);
            if (response.ok) {
                const responseData = await response.json();
                setData1(responseData);
                setError(null);
                console.log(responseData);
            } else {
                // Handle non-ok response status
                setError(`Failed to fetch data. Status: ${response.status}`);
            }
        } catch (error) {
            setError(error.message);
            console.error(error);
        }
    };

    return (
        <div className="profile">
            {error && (
                <div className="error-message">
                    <p>Error: {error}</p>
                </div>
            )}
            <div className="image">
                <img src={logo} alt="Profile" />
            </div>
            <div className="card-struct">
                <h5 className="card-title">Profile</h5>
                {!error && (
                    <p>
                        Name: {data1.name} <br />
                        <hr />
                        Mobile: {data1.mobile} <br />
                        <hr />
                        Gmail: {data1.email} <br />
                        <hr />
                    </p>
                )}
            </div>
        </div>
    );
};

export default Profile;