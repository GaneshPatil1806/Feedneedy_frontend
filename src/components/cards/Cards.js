import React from "react";
import "./Cards.css";

function Cards(props) {
  let { name, quantity, expiryDate, Item, shop, add, mobile,email } = props;

  function handleAccept(){
    fetch(`/mail/${shop}/${email}/${name}`, {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    window.alert("Food Donations Requested Successfully!!!");
  }

  const short=expiryDate.toString();
  expiryDate=short.slice(0,10);
  return (
    <div className="cards1">
      <div className="card_skeleton">     
        <div className="card-image">
        <i class="fa-solid fa-bowl-rice"></i>
        </div>
        <div className="card_structure">
        <h5 className="card-title"> {name}</h5>
          <p>
            Donor : {shop} <br/>
            <hr></hr>
            Address : {add} <br/>
            <hr></hr>
            Quantity : {quantity}<br></br>
            <hr></hr>
            Expiry Date : {expiryDate}<br/>
            <hr></hr>
            Items: {Item}<br/>
            <hr></hr>
            Mobile : {mobile}<br/>
            <hr></hr>
          </p>
        </div>
      </div>
      <div className="button_accept">
          <button type="button" className="" onClick={handleAccept}>
            Accept &nbsp; <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
    </div>
  );
}

export default Cards;
