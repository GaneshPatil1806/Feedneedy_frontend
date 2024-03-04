import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <div>
      <footer className="footer_div text-center text-lg-start  text-muted">
        <section className="">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <i className="fas fa-gem me-3 "></i>FeedNeedy
                </h6>
                <p>
                  FeedNeedy is a charity based website that solves food wastage
                  problem by bring Ngo's & Food donars on a same platform
                  thereby creating a proper ecosystem
                </p>
              </div>
              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
                <p>
                  <a href="home.html" className="text-reset">
                    Home
                  </a>
                </p>
                <p>
                  <a href="#first" className="text-reset">
                    Donate
                  </a>
                </p>
                <p>
                  <a href="#second" className="text-reset">
                    About
                  </a>
                </p>
              </div>
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  <i className="fa fa-home me-3 t"></i> Pict , Pune -
                  411037
                </p>
                <p>
                  <i className="fa fa-envelope me-3 "></i>
                  feedNeedy@gmail.com
                </p>
                <p>
                  <i className="fa fa-phone me-3"></i> + 82370-95572
                </p>
                <p>
                  <i className="fa fa-print me-3 "></i> + 82370-95572{" "}
                </p>
              </div>
            </div>
          </div>
        </section>
      </footer>
    </div>
  );
}
