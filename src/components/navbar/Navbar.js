import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import appVars from '../../config/config';
import useUser from '../../context/UserContext';
import toast, { Toaster } from 'react-hot-toast';

const NavBar = () => {
  const navigate = useNavigate();
  const { user,setUser } = useUser();

  function Logout() {
    let url = `${appVars.backUrl}/D/logout`;
    if(user.isLoggedIn === 'R'){
      url = `${appVars.backUrl}/R/logout`;
    }

    localStorage.removeItem('user');

    fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user?.token}`
      },
    }).then((res) => {
      toast.success("Logged Out Successfully!");
      setUser()
      navigate('/')
    }).catch(() => {
      toast.error("LogOut Failed!")
    })
  }

  return (
    <>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark">
      <Toaster/>
        <div className="container-fluid">
          <span className="navbar-brand" to="/">
            FeedNeedy
          </span>
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
                <a className="nav-link active" href="/descript">
                  About
                </a>
              </li>
              <li className="nav-item">
                { user && user.isLoggedIn === 'R' &&
                  <Link className="nav-link active" to="/profile">
                    Profile
                  </Link> } 

                { user && user.isLoggedIn === 'D' && <Link className="nav-link active" to="/profile2">
                    Profile
                  </Link> }
              </li>
            </ul>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                {user && user.token ? (
                  <button type="button" className="btn btn-success" onClick={Logout}>
                    Logout
                  </button>
                ) : (
                  <button type="button" className="btn btn-success">
                    Login
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;