import Donation from './components/donate/Donation';
import RegisterR from './components/login/register/RegisterR';
import RegisterD from './components/login/register/RegisterD';
import Profile from './components/login/Profile';
import Profile2 from './components/login/Profile2';
import LoginR from './components/login/LoginR';
import LoginD from './components/login/LoginD';
import NavBar from './components/navbar/Navbar';
import Home from './components/home/Home';
import React from 'react';
import Receive from './components/receive/Receive';
import Success from './components/success/Success';
import { useState } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"
import Description from './components/description/Description';

function App() {
  const [isRLoggedIn, setisRLoggedIn] = useState(false);
  const [isDLoggedIn, setisDLoggedIn] = useState(false);
  return (
    <Router>
      <NavBar isRLoggedIn={isRLoggedIn} setisRLoggedIn={setisRLoggedIn} isDLoggedIn={isDLoggedIn} setisDLoggedIn={setisDLoggedIn}/>
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
        <Route exact path="/donate" element={<Donation/>}></Route>
        <Route exact path="/descript" element={<Description/>}></Route>
        <Route exact path="/receive" element={<Receive/>}></Route>
        <Route exact path="/success" element={<Success />}></Route>
        <Route exact path="/loginR" element={<LoginR isRLoggedIn={isRLoggedIn} setisRLoggedIn={setisRLoggedIn} isDLoggedIn={isDLoggedIn} setisDLoggedIn={setisDLoggedIn}/>}></Route>
        <Route exact path="/loginD" element={<LoginD isRLoggedIn={isRLoggedIn} setisRLoggedIn={setisRLoggedIn} isDLoggedIn={isDLoggedIn} setisDLoggedIn={setisDLoggedIn}/>}></Route>
        <Route exact path="/registerR" element={<RegisterR isRLoggedIn={isRLoggedIn} setisRLoggedIn={setisRLoggedIn} isDLoggedIn={isDLoggedIn} setisDLoggedIn={setisDLoggedIn}/>}></Route>
        <Route exact path="/registerD" element={<RegisterD isRLoggedIn={isRLoggedIn} setisRLoggedIn={setisRLoggedIn} isDLoggedIn={isDLoggedIn} setisDLoggedIn={setisDLoggedIn}/>}></Route>
        <Route exact path="/success" element={<Success/>}></Route>
        <Route exact path="/profile" element={<Profile isRLoggedIn={isRLoggedIn} setisRLoggedIn={setisRLoggedIn} isDLoggedIn={isDLoggedIn} setisDLoggedIn={setisDLoggedIn}/>}></Route>
        <Route exact path="/profile2" element={<Profile2 isRLoggedIn={isRLoggedIn} setisRLoggedIn={setisRLoggedIn} isDLoggedIn={isDLoggedIn} setisDLoggedIn={setisDLoggedIn}/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
