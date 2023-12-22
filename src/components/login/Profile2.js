import React, { useState, useEffect } from "react";
import './Profile.css';
import logo from '../images/itachi.jpg';
import Cards1 from "../cards/Cards1";

const Profile = () => {
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
        fetchData1();
    }, []);

    const fetchData1 = async () => {
        try {
            const response = await fetch(`/getProfile`);
            if (response.ok) {
                const responseData = await response.json();
                setData1(responseData);
                setError(null);
                console.log(responseData);
            } else {
                throw new Error(`Failed to fetch data. Status: ${response.status}`);
            }
        } catch (error) {
            setError(error.message);
            console.error(error);
        }
    };

    const fetchData = async () => {
        try {
            const response = await fetch(`/SeeItems`);
            if (response.ok) {
                const responseData = await response.json();
                setData(responseData);
                setError(null);
                console.log(responseData);
            } else {
                throw new Error(`Failed to fetch data. Status: ${response.status}`);
            }
        } catch (error) {
            setError(error.message);
            console.error(error);
        }
    };

    return (
        <>
            {error && (
                <div className="error-message">
                    <p>Error: {error}</p>
                </div>
            )}

            <div className="profile">
                <div className="image">
                    <img src={logo} alt="Profile" />
                </div>
                <div className="card-struct">
                    <h5 className="card-title">Profile</h5>
                    <p>
                        Name: {data1.name || "N/A"} <br />
                        <hr />
                        Address: {data1.address || "N/A"} <br />
                        <hr />
                        Mobile: {data1.mobile || "N/A"} <br />
                        <hr />
                        Gmail: {data1.email || "N/A"} <br />
                        <hr />
                    </p>
                </div>

                <div className="heading-active">
                    <h1>ACTIVE DONATIONS</h1>
                </div>
                <div className="cards-content">
                    {data.length > 0 ? (
                        data.map((item) => (
                            <Cards1
                                key={item._id}
                                name={item.name}
                                expiryDate={item.expiryDate}
                                Item={item.tag}
                                shop={item.providerId.name}
                                quantity={item.quantity}
                                add={item.providerId.address}
                                mobile={item.providerId.mobile}
                                id={item._id}
                            />
                        ))
                    ) : (
                        <p>No active donations found.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Profile;