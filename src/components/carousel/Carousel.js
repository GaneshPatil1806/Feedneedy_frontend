import React from 'react'
import poster1 from './../images/Carousel1.png';
import poster2 from './../images/Carousel2.png';
import poster3 from './../images/Carousel3.jpg';
import './Carousel.css'

export default function Carousel() {
    return (
        <div>
            <div id="carouselExampleIndicators" className="carousel slide mt-5" data-bs-ride="true">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={poster1} class="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={poster2} class="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={poster3} class="d-block w-100" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}
