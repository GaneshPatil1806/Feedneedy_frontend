import React from "react";
import logo1 from "./../images/logo1.png";
import logo2 from "./../images/logo2.png";
import "./RD.css";
import { NavLink } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

export default function RD(props) {
  useEffect(()=>{
    AOS.init();
  },[])
  return (
    <div>
      <div className="receive-donate-heading">
        <h1>DONATE AND RECEIVE</h1>
      </div>
      <div className="receive-donate">
        <div className="donate-button" data-aos="flip">
          <NavLink to="/loginD">
            <button>
              <img src={logo1} alt="..." />
            </button>
          </NavLink>

        </div>
        <div className="receive-button" data-aos="flip">
          <NavLink to="/loginR" var="receive"> 
            <button>
              <img src={logo2} alt="..."/>
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
