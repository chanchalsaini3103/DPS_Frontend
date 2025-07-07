import React, { useState, useEffect } from "react";
import "../styles/DpsLoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "./Footer";

const DPSLoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [timer, setTimer] = useState(0);
  const [resendCount, setResendCount] = useState(0);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const validateInputs = () => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!email.endsWith("@gmail.com")) {
      Swal.fire("Invalid Email", "Only @gmail.com emails are allowed.", "warning");
      return false;
    }
    if (!phoneRegex.test(phone)) {
      Swal.fire("Invalid Phone", "Phone must be exactly 10 digits.", "warning");
      return false;
    }
    return true;
  };

  const handleSendOtp = async () => {
    if (!validateInputs()) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/verify-parent?email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}`
      );

      const data = await res.json();

      if (res.ok) {
        const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedOtp(newOtp);
        setOtpSent(true);
        setTimer(45);
        setResendCount(0);

        Swal.fire({
          title: "OTP Sent",
          text: `Your OTP is: ${newOtp}`,
          icon: "info",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Not Found",
          text: data.error || "Email or phone not registered.",
          icon: "error",
        });
      }
    } catch (err) {
      console.error("Error verifying user:", err);
      Swal.fire("Error", "Something went wrong while checking registration.", "error");
    }
  };

  const handleResendOtp = () => {
    if (resendCount >= 3) {
      Swal.fire("Limit Reached", "Maximum resend attempts exceeded.", "error");
      return;
    }
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    setResendCount(resendCount + 1);
    setTimer(45);

    Swal.fire({
      title: "New OTP Sent",
      text: `Your new OTP is: ${newOtp}`,
      icon: "info",
      confirmButtonText: "OK",
    });
  };

  const handleVerifyOtp = async () => {
    if (otp === generatedOtp) {
      setOtpVerified(true);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/parent/find-by-email-phone?email=${email}&phone=${phone}`
        );

        const data = await res.json();
        if (res.ok) {
          const parent = data.parent;
          const loggedInAs = data.loggedInAs;

          localStorage.setItem("parentId", parent.parentId);
          localStorage.setItem("parentName", `${parent.fatherName} & ${parent.motherName}`);
          localStorage.setItem("loggedInAs", loggedInAs);

          Swal.fire("Success", "OTP Verified. Redirecting to dashboard.", "success").then(() => {
            navigate("/dashboard");
          });
        } else {
          Swal.fire("Error", "Parent data not found after verification.", "error");
        }
      } catch (err) {
        console.error("Error fetching parent:", err);
        Swal.fire("Error", "Could not load parent data.", "error");
      }
    } else {
      Swal.fire("Incorrect OTP", "Please enter the correct OTP.", "error");
    }
  };

  return (
    <> <div className="dps-login-page-wrapper">
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
          <img src="/dpsslogin.png" alt="School Kids" className="banner-img" />
        </div>

        <div className="dps-right-login">
          <img src="/dps-logo.png" alt="DPS Logo" className="dps-logo" />
          <h3>OTP Login</h3>
          <p className="subtext">Login using Email & Phone Number</p>

          <form className="login-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required />

            {!otpSent && (
              <button className="login-btn" type="button" onClick={handleSendOtp}>
                Send OTP
              </button>
            )}

            {otpSent && (
              <>
                <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
                <div className="otp-controls">
                  <button type="button" className="login-btn" onClick={handleVerifyOtp}>Verify & Login</button>
                  {timer > 0 ? (
                    <p className="text-muted mt-2">Resend in {timer}s</p>
                  ) : resendCount < 3 ? (
                    <p className="text-primary mt-2" style={{ cursor: "pointer" }} onClick={handleResendOtp}>Resend OTP</p>
                  ) : (
                    <p className="text-danger mt-2">Resend limit reached</p>
                  )}
                </div>
              </>
            )}

            <div className="login-links">
              <Link to="/register" className="login-btn text-center w-100">Register</Link>
            </div>
          </form>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
};

export default DPSLoginPage;
