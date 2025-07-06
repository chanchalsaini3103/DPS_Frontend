import React, { useState } from "react";
import "../styles/DpsLoginPage.css";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const DPSLoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://your-backend-url.com/api/login", {
        method: "POST",
        credentials: "include", // for session cookie or with JWT if needed
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Optional: handle token if using JWT
        // const data = await response.json();
        // localStorage.setItem("token", data.token);

        navigate("/dashboard");
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred. Try again.");
    }
  };

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
        <div className="dps-left-banner">
          <img src="/dps.jpg" alt="School Kids" className="banner-img" />
          <div className="banner-text">
            <p>Empowering students to thrive and lead with purpose</p>
            <p>Our holistic approach fosters academic excellence, values, and life skills, creating a vibrant environment where students flourish.</p>
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

        <div className="dps-right-login">
          <img src="/dps-logo.png" alt="DPS Logo" className="dps-logo" />
          <h3>Sign In!</h3>
          <p className="subtext">Login to the portal with your credentials</p>
          <form className="login-form" onSubmit={handleLogin}>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <div className="login-links">
              <a href="#" className="forgot-link">Forgot Password</a>
              <Link to="/register" className="register-link">Register</Link>
            </div>
            <button className="login-btn" type="submit">Sign In</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default DPSLoginPage;
