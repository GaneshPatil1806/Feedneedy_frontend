import React from "react";
import "./Cards.css";
import appVars from "../../config/config";
import axios from "axios";

function Cards1(props) {
  let { name, quantity, expiryDate, Item, shop, add, mobile,id } = props;

  const handleDelete = (e) => {
    e.preventDefault();
    axios.delete(`${appVars.backUrl}/DeleteFood/${id}`, {

      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },

    })
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
          <button type="button" className="" onClick={handleDelete}>
            DELETE &nbsp;&nbsp;<i class="fa-solid fa-trash"></i>
          </button>
        </div>
    </div>
  );
}

export default Cards1;
