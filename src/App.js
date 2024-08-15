import Donation from './components/donate/Donation'
import RegisterR from './components/login/register/RegisterR'
import RegisterD from './components/login/register/RegisterD'
import Profile from './components/login/Profile';
import Profile2 from './components/login/Profile2';
import LoginR from './components/login/LoginR'
import LoginD from './components/login/LoginD'
import NavBar from './components/navbar/Navbar';
import Home from './components/home/Home';
import React from 'react';
import Receive from './components/receive/Receive'
import Success from './components/success/Success'
import { useState } from 'react';
import { UserContext } from './context/UserContext'
import Description from './components/description/Description';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"
import { useEffect } from 'react';


function App() {
  const [user, setUser] = useState({
    token:'',
    isLoggedIn:''
  });

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  return (
    <UserContext.Provider value={{user,setUser}}>
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home/>}></Route>
          <Route exact path="/donate" element={<Donation/>}></Route>
          <Route exact path="/descript" element={<Description/>}></Route>
          <Route exact path="/receive" element={<Receive/>}></Route>
          <Route exact path="/success" element={<Success/>}></Route>
          <Route exact path="/loginR" element={<LoginR/>}></Route>
          <Route exact path="/loginD" element={<LoginD/>}></Route>
          <Route exact path="/registerR" element={<RegisterR/>}></Route>
          <Route exact path="/registerD" element={<RegisterD/>}></Route>
          <Route exact path="/success" element={<Success/>}></Route>
          <Route exact path="/profile" element={<Profile/>}></Route>
          <Route exact path="/profile2" element={<Profile2/>}></Route>
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
