import React from "react";
import logo from "./../images/logo.png";
import "./Description.css";

export default function Description() {
  return (
    <div className="aboutUs-section mt-5 " id="abt">
      <div className="logo-section">
        <img src={logo} className="logo logo2" alt="..." />
      </div>
      <div className="about-content">
        <h1>FEEDNEEDY</h1>
        <p>
          FeedNeedy is a charity website that aims towards minimizing food
          wastages. The main motto of our website is to create an ecosystem
          between food donors and receivers and eradicate hunger problem. This
          can be achieved with the help of Ngo's and various non-profitable
          organizations. On FeedNeedy, you can enlist the food-items you want to
          donate, which are then visible to the Ngo's nearby. This indeed
          connects a link between food donor and receiver.
        </p>
      </div>
    </div>
  );
}
