import React, { useState, useEffect } from 'react';
import Cards from '../cards/Cards';
import './Receive.css';
import appVars from '../../config/config';

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
        if(searchTerm === '') {
          response = await fetch(`${appVars.backUrl}/find`);
        } else {
          response = await fetch(`${appVars.backUrl}/find/${searchTerm}`);
        }
  
        if (response.ok) {
          const responseData = await response.text();
          const jsonData = JSON.parse(responseData);
          setData(jsonData);
          setError(null);
        } else {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
      } catch (error) {
        setError(`Error: ${error.message}`);
      }
    };

    fetchData();
  }, [searchTerm]);

  return (
    <div className="receive_page">
      <div className='search search_input'>
        <div className="search_input mt-4">
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
        {error ? (
          <p>Error fetching data: {error}</p>
        ) : (
          data.map((item) => (
            <Cards
              key={item._id}
              name={item.name}
              expiryDate={item.expiryDate}
              Item={item.tag}
              shop={item.providerId.name}
              quantity={item.quantity}
              add={item.providerId.address}
              mobile={item.providerId.mobile}
              email={item.providerId.email}
            />
          ))
        )}
      </div>
    </div>
  );
}