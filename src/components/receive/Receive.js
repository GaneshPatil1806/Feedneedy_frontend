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
          console.log(jsonData)
        } else {
          throw new Error('Error fetching data');
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [searchTerm]);

  return (
    <div className="receive_page">
      <div className='search'>
        <div className="search_input">
          <input type="search"
           placeholder='Search Here' 
           value={searchTerm}
           onChange={handleSearch}
            />
        </div>
        <div className="search_button">
          <button>Search&nbsp;&nbsp;<i class="fa-solid fa-magnifying-glass"></i></button>
        </div>
      </div>
      <div className="cards-content">
        {data.map((item) => (
            <Cards name={item.name}
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