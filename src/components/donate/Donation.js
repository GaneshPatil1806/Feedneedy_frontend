import React, { useState, useEffect } from "react";
import "./Donation.css";
import Cards1 from "../cards/Cards1";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";
import useUser from "../../context/UserContext";
import appVars from "../../config/config";
import axios from "axios";

const Donation = () => {
  const [data, setData] = useState([])
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [foodDetails, setfoodDetails] = useState({
    name: '',
    expiryDate: Date,
    quantity: Number,
    tag: '',
  })
  const {user} = useUser();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setfoodDetails({
      ...foodDetails,
      [name]: value,
    });
  };

  useEffect(() => {
    if (user) {
      axios.get(`${appVars.backUrl}/SeeItems`, {
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
  }, [user]);  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (foodDetails.quantity <= 0) {
      setError('Quantity must be a positive number');
      return;
    }

    const currentDate = new Date();
    const selectedDate = new Date(foodDetails.expiryDate);

    if (selectedDate <= currentDate) {
      setError('Expiry date should be in the future');
      return;
    }

    try {
      const token = user.token;
      const response = await fetch(`${appVars.backUrl}/AddItem`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(foodDetails),
      });

      if (!response.ok) {
        throw new Error('Error donating food');
      }else{
        navigate('/success');
      }
    } catch (error) {
      setError(error.message);
    }
  };

 
  return (
    <div className="main_container mt-5">
      <div className="DonationContainer">
        <div className="logo-section">
          <img src={logo} alt="..." />
        </div>

        <div className="inputcontainer">
          <h1>Donation page</h1>
          <form autoComplete="off">
            <div className="input_group">
              <label htmlFor="name">Food name</label>
              <br />
              <input
                type="text"
                name="name"
                id="name"
                value={foodDetails.name}
                placeholder="Food name"
                onChange={changeHandler}
                required={true}
              />
            </div>
            <div className="input_group">
              <label htmlFor="expiryDate">Expiry Date</label>
              <br />
              <input
                type="Date"
                name="expiryDate"
                id="expiryDate"
                value={foodDetails.expiryDate}
                onChange={changeHandler}
                required={true}
              />
            </div>
            <div className="input_group">
              <label htmlFor="quantity">Quantity</label>
              <br />
              <input
                type="Number"
                name="quantity"
                id="quantity"
                value={foodDetails.quantity}
                placeholder="No of People it can feed"
                onChange={changeHandler}
                required={true}
              />
            </div>
            <div className="input_group">
              <label htmlFor="tag">Food Item</label>
              <br />
              <input
                type="text"
                name="tag"
                id="tag"
                value={foodDetails.tag}
                placeholder="e.g.Curry,Chapati"
                onChange={changeHandler}
                required={true}
              />
              <h>{error && <p className="error-message">{error}</p>}</h>
            </div>
            <button className="submit-btn1" type="submit" onClick={handleSubmit}>
              Submit &nbsp;<i class="fa-solid fa-thumbs-up"></i>
            </button>
          </form>
        </div>
      </div>
      <div className="active_donations">
        <div className="heading-active">
          <h1>ACTIVE DONATIONS </h1>
        </div>
        <div className="prev-donations">
        </div>
      </div >
      <div className="cards-content">
        {data && data.map((item) => (
          <Cards1 name={item.name}
            expiryDate={item.expiryDate}
            Item={item.tag}
            shop={item.providerId.name}
            quantity={item.quantity}
            add={item.providerId.address}
            mobile={item.providerId.mobile}
            id={item._id}
          />
        ))}
      </div>

    </div>
  );
};

export default Donation;