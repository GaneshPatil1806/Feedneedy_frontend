import React, { useState, useEffect } from 'react';
import Cards from '../cards/Cards';
import './Receive.css';

export default function Receive() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if(searchTerm===''){ response = await fetch(`/find`);}
        else{ response = await fetch(`/find/${searchTerm}`);}
  
        if (response.ok) {
          const responseData = await response.text();
          const jsonData = JSON.parse(responseData);
          setData(jsonData);
          setError(null);
          console.log(jsonData);
        } else {
          throw new Error(`Error fetching data. Status: ${response.status}`);
        }
      } catch (error) {
        setError(error.message);
        console.error(error);
      }
    };

    fetchData();
  }, [searchTerm]);

  return (
    <div className="receive_page">
      {error && (
        <div className="error-message">
          <p>Error: {error}</p>
        </div>
      )}

      <div className='search'>
        <div className="search_input">
          <input
            type="search"
            placeholder='Search Here'
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="search_button">
          <button>Search&nbsp;&nbsp;<i className="fa-solid fa-magnifying-glass"></i></button>
        </div>
      </div>
      <div className="cards-content">
        {data.map((item) => (
          <Cards
            key={item._id} // Ensure each item has a unique key
            name={item.name}
            expiryDate={item.expiryDate}
            Item={item.tag}
            shop={item.providerId.name}
            quantity={item.quantity}
            add={item.providerId.address}
            mobile={item.providerId.mobile}
            email={item.providerId.email}
          />
        ))}
      </div>
    </div>
  );
}