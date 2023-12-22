import React, { useState, useEffect } from "react";
import "./Donation.css";
import Cards1 from "../cards/Cards1";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";

const Donation = () => {
  const [data, setData] = useState([])
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [user, setUserDetails] = useState({
    name: '',
    expiryDate: Date,
    quantity: Number,
    tag: '',
  })

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...user,
      [name]: value,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    try {
      const response = await fetch(`/SeeItems`);
      if (response.ok) {
        const responseData = await response.json();
        setData(responseData);
        setError(null);
        console.log(responseData);
      } else {
        throw new Error('Error fetching data');
      }
    } catch (error) {
      setError('Failed to fetch data. Please try again.');
      console.log(error);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check for errors
    if (user.quantity <= 0) {
      setError('Quantity must be a positive number');
      return;
    }
  
    const currentDate = new Date();
    const selectedDate = new Date(user.expiryDate);
  
    if (selectedDate <= currentDate) {
      setError('Expiry date should be in the future');
      return;
    }
  
    try {
      const response = await fetch('/AddItem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
  
      if (!response.ok) {
        throw new Error('Error donating food');
      }
  
      fetchData();
      navigate('/success');
    } catch (error) {
      setError(error.message);
    }
  };
  

  return (
    <div className="main_container">
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
                value={user.name}
                placeholder="Food name"
                onChange={changeHandler}
              />
            </div>
            <div className="input_group">
              <label htmlFor="expiryDate">Expiry Date</label>
              <br />
              <input
                type="Date"
                name="expiryDate"
                id="expiryDate"
                value={user.expiryDate}
                onChange={changeHandler}
              />
            </div>
            <div className="input_group">
              <label htmlFor="quantity">Quantity</label>
              <br />
              <input
                type="Number"
                name="quantity"
                id="quantity"
                value={user.quantity}
                placeholder="No of People it can feed"
                onChange={changeHandler}
              />
            </div>
            <div className="input_group">
              <label htmlFor="tag">Food Item</label>
              <br />
              <input
                type="text"
                name="tag"
                id="tag"
                value={user.tag}
                placeholder="e.g.Curry,Chapati"
                onChange={changeHandler}
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
          {data.map((item) => (
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