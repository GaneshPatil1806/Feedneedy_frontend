import './Home.css'
import Footer from '../footer/Footer'
import Carousel from '../carousel/Carousel';
import RD from '../rd/RD'
import Description from '../description/Description'
import AOS from 'aos';
import 'aos/dist/aos.css';
import React, { useEffect } from 'react';
import mihir from "../images/mihir.jpg";
import atharva from "../images/atharva.jpg";
import ganesh from "../images/ganesh.jpg";
import vishal from "../images/vishal.jpg"
import jaju from "../images/jaju.jpg"

const Home = () => {

  useEffect(()=>{
    AOS.init();
  },[])
 
  return (
    <div clasName="Home">

      <div clasName="container1">
        <Carousel />
      </div>

      <div className="container2" data-aos="flip" id="section2">
        <RD/>
      </div>

      <div className="container3" id="section3">
        <Description />
      </div>
      <div className="team-section">
        <h1>OUR TEAM </h1>
        <div className="team_members">
          <div class="card" >
            <div class="img-container">
              <img src={atharva} alt="" />
            </div>
            <h3>Atharva Litake</h3>
            <p>UI AND UX</p>
            <div class="icons">
              <a href=""><i class="fa-brands fa-twitter"></i></a>
              <a href=""><i class="fa-brands fa-linkedin"></i></a>
              <a href=""><i class="fa-brands fa-github"></i></a>
              <a href=""><i class="fa-brands fa-facebook"></i></a>
            </div>
        </div>
        <div class="card" >
            <div class="img-container">
              <img src={ganesh} alt="" />
            </div>
            <h3>Ganesh Patil</h3>
            <p>FRONTEND DEVELOPER</p>
            <div class="icons">
              <a href=""><i class="fa-brands fa-twitter"></i></a>
              <a href=""><i class="fa-brands fa-linkedin"></i></a>
              <a href=""><i class="fa-brands fa-github"></i></a>
              <a href=""><i class="fa-brands fa-facebook"></i></a>
            </div>
        </div>
        <div class="card" >
            <div class="img-container">
              <img src={vishal} alt="" />
            </div>
            <h3>Vishal Kuwar</h3>
            <p>FRONTEND DEVELOPER</p>
            <div class="icons">
              <a href=""><i class="fa-brands fa-twitter"></i></a>
              <a href=""><i class="fa-brands fa-linkedin"></i></a>
              <a href=""><i class="fa-brands fa-github"></i></a>
              <a href=""><i class="fa-brands fa-facebook"></i></a>
            </div>
        </div>
        </div>
        <div className="team_members2">
        <div class="card" >
            <div class="img-container">
              <img src={jaju} alt="" />
            </div>
            <h3>Pranav Jaju</h3>
            <p>BACKEND DEVELOPER</p>
            <div class="icons">
              <a href=""><i class="fa-brands fa-twitter"></i></a>
              <a href=""><i class="fa-brands fa-linkedin"></i></a>
              <a href=""><i class="fa-brands fa-github"></i></a>
              <a href=""><i class="fa-brands fa-facebook"></i></a>
            </div>
        </div>
        <div class="card" >
            <div class="img-container">
              <img src={mihir} alt="" />
            </div>
            <h3>Mihir Deshpande</h3>
            <p>BACKEND DEVELOPER</p>
            <div class="icons">
              <a href=""><i class="fa-brands fa-twitter"></i></a>
              <a href=""><i class="fa-brands fa-linkedin"></i></a>
              <a href=""><i class="fa-brands fa-github"></i></a>
              <a href=""><i class="fa-brands fa-facebook"></i></a>
            </div>
        </div>
        </div>
      </div>
      <div className="container5">
        <Footer />
      </div>

    </div >
  );
}

export default Home;