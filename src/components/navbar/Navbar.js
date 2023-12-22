import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const NavBar = ({ isRLoggedIn, setisRLoggedIn,isDLoggedIn, setisDLoggedIn }) => {
  const navigate = useNavigate();
  const items = JSON.parse(localStorage.getItem('token'));
  
  function Logout() {
    fetch("/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${items}`
      },
    });
    setisRLoggedIn(false);
    setisDLoggedIn(false);
    navigate("/");
  }

  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Food Donation
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="/">
                  About
                </a>
              </li>
              <li className="nav-item">
                {isRLoggedIn?(<>
                  <Link className="nav-link active" to="/profile">
                  Profile
                </Link></>):<><Link className="nav-link active" to="/profile2">
                  Profile
                </Link></>}
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle active"
                  href="/h"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Login Info
                </a>
                <ul className="dropdown-menu">
                  {(!isRLoggedIn && !isDLoggedIn) ? (
                    <li>
                      <a className="dropdown-item" href="#section2">Login</a>
                    </li>
                  ) : (
                    <li>
                      <button className="dropdown-item" type="button" onClick={Logout}>
                        Logout
                      </button>
                    </li>
                  )}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;