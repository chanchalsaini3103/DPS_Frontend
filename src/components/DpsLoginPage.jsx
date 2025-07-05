import React from "react";
import "../styles/DpsLoginPage.css";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const DPSLoginPage = () => {
  return (
    <>
      <div className="dps-top-navbar">
        <div className="navbar-left">
          <Link to="/" className="back-link">← Back to Home</Link>
        </div>
        <div className="navbar-center">
          <img src="/dps-logo.png" alt="DPS Logo" className="nav-logo" />
          <span className="school-name">Delhi Public School</span>
        </div>
      </div>

      <div className="dps-login-container">
        {/* Left 70% */}
        <div className="dps-left-banner">
          <img src="/dps.jpg" alt="School Kids" className="banner-img" />
          <div className="banner-text">
            <p>Empowering students to thrive and lead with purpose</p>
            <p>
              Our holistic approach fosters academic excellence, values, and life
              skills, creating a vibrant environment where students flourish.
            </p>
            <p><strong>Principal, DPS School</strong></p>
            <div className="social">
              <p>Follow us: @dpsindia</p>
              <div className="icons">
                <FaFacebookF />
                <FaInstagram />
                <FaYoutube />
              </div>
            </div>
          </div>
        </div>

        {/* Right 30% */}
        <div className="dps-right-login">
          <img src="/dps-logo.png" alt="DPS Logo" className="dps-logo" />
          <h3>Sign In!</h3>
          <p className="subtext">Login to the portal with your credentials</p>
          <form className="login-form">
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <div className="login-links">
              <a href="#" className="forgot-link">Forgot Password</a>
              <Link to="/register" className="register-link">Register</Link>
            </div>
            <button className="login-btn">Sign In</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default DPSLoginPage;
