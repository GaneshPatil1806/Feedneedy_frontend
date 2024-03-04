import React, { useState, useEffect } from "react";
import './Profile.css';
import appVars from "../../config/config";
import useUser from "../../context/UserContext";
import axios from "axios";

const Profile = () => {
    const [data1, setData] = useState([]);
    const [error, setError] = useState(null);
    const {user} = useUser();

    const fetchData1 = async () => {
        try {
            if(user){
                axios.get(`${appVars.backUrl}/viewProfile`, {
                    headers: {
                      'Authorization': `Bearer ${user?.token}`,
                    },
                    withCredentials: true,
                  })
                    .then((res) =>setData(res.data)) 
                    .catch(() => {
                      setError('Failed to fetch data. Please try again.');
                    });
            }
        } catch (error) {
            setError(`Error: ${error.message}`);
            console.error(`Error: ${error.message}`);
        }
    };

    useEffect(() => {
        fetchData1();
    }, []);

    return (
        <div className="profile">
        <h5 className="card-title">Profile</h5>
        {error ? (
            <p>Error loading profile data: {error}</p>
        ) : (
            <div className="card">
                Name: {data1.name} <br />
                <hr />
                Address: {data1.address} <br />
                <hr />
                Mobile: {data1.mobile} <br />
                <hr />
                Gmail: {data1.email} <br />
                <hr />
            </div>
        )}
    </div>
    );
};

export default Profile;