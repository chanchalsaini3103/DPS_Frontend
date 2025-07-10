import React, { useState } from "react";
import "../styles/Register.css";
import StudentDetailsForm from "./StudentDetailsForm";
import ParentDetailsForm from "./ParentDetailsForm";
import DeclarationPage from "./DeclarationPage";
import PaymentPage from "./PaymentPage";
import Swal from "sweetalert2";
import Footer from "./Footer";
import { Link } from "react-router-dom"; 


const Register = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [parentType, setParentType] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [timer, setTimer] = useState(0);
  const [resendCount, setResendCount] = useState(0);
  const [otpVerified, setOtpVerified] = useState(false);
  const [step, setStep] = useState("INTRODUCTION");

  const [studentData, setStudentData] = useState({});
  const [parentData, setParentData] = useState({});

  const handlePrev = () => {
    const steps = ["INTRODUCTION", "STUDENT DETAILS", "PARENT INFORMATION", "DECLARATION", "PAYMENT"];
    const currentIndex = steps.indexOf(step);
    if (currentIndex > 0) setStep(steps[currentIndex - 1]);
  };

const validateInputs = () => {
  const phoneRegex = /^[789]\d{9}$/;
  if (!email.endsWith("@gmail.com")) {
    alert("Email must be a valid @gmail.com address.");
    return false;
  }
  if (!phoneRegex.test(phone)) {
    alert("Phone number must start with 9, 8, or 7 and be exactly 10 digits.");
    return false;
  }
  if (!parentType) {
    alert("Please select Father or Mother.");
    return false;
  }
  return true;
};

const handleNext = () => {
  if (step === "INTRODUCTION") {
    if (!showOtp) {
      if (!validateInputs()) return;

      fetch(`${import.meta.env.VITE_API_BASE_URL}/api/check-parent?email=${email}&phone=${phone}&type=${parentType}`)
        .then(res => res.json())
        .then(data => {
          if (data.exists) {
            Swal.fire(
              "Already Registered",
              "This email and mobile number are already registered. Please log in using your credentials.",
              "warning"
            );
          } else {
            const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
            setGeneratedOtp(newOtp);
            Swal.fire({
              title: "OTP Sent!",
              text: `Your OTP is: ${newOtp}`,
              icon: "info",
              confirmButtonText: "OK",
            });
            setShowOtp(true);
            setTimer(45);
            setResendCount(0);
          }
        })
        .catch(() => Swal.fire("Error", "Something went wrong while checking registration", "error"));
    } else {
      if (!otpVerified) {
        Swal.fire("Error", "Please verify the OTP before proceeding.", "error");
      } else {
        setStep("STUDENT DETAILS");
      }
    }
  }
};



  const handleVerifyOtp = () => {
    if (otp === generatedOtp) {
      setOtpVerified(true);
      Swal.fire("OTP Verified!", "You can now proceed to the next step.", "success");
    } else {
      Swal.fire("Invalid OTP", "Please enter the correct OTP.", "error");
    }
  };

  const handleResendOtp = () => {
    if (resendCount >= 3) {
      alert("You have reached the maximum resend limit.");
      return;
    }
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    alert("New OTP: " + newOtp);
    setTimer(45);
    setResendCount((prev) => prev + 1);
  };

  return (
    <div className="register-page">
    
      <div className="register-header">
        <img src="/dps-logo.png" alt="DPS Logo" className="register-logo" />
        <div className="register-school-info">
          <h2>DELHI PUBLIC SCHOOL</h2>
          <p>
            Nyati Estate Rd, Mohammed Wadi, Pune<br />
            Maharashtra 411060<br />
            Email: dps@example.com<br />
            Phone: 020 26522100 / +91 7821820239
          </p>
        </div>
        <Link to="/" className="back-to-home">← Back to Home</Link>
      </div>

      <div className="register-progress-container">
        {["INTRODUCTION", "STUDENT DETAILS", "PARENT INFORMATION", "DECLARATION", "PAYMENT"].map((item) => (
          <div key={item} className={`register-step ${step === item ? "active" : ""}`}>
            {item}
          </div>
        ))}
      </div>

     
      {step === "INTRODUCTION" && (
        <div className="register-form-box">
          <h3 className="form-title">INTRODUCTION</h3>
          <p>Dear Parents,</p>
  <p>Thank you for your interest in Delhi Public School.</p>
  <p>The Application Form is for parents interested in being part of the Delhi Public School.</p>

  <ol>
    <li>The submission of the Application Form does <strong>not</strong> imply an admission of your child to the school.</li>
    <li>The Application Form should be complete in all respects, and the information provided should be true.</li>
    <li>After submission, parents will receive an acknowledgement. If not received, check spam or email <a href="mailto:dps@example.com">dps@example.com</a>.</li>
    <li>One Application Form per child is required.</li>
    <li>The Application Form is divided into  sections.</li>
    <li>It can be saved and accessed later via email link.</li>
    <li>Admission is based on records, achievements, and grade level.</li>
    <li>Each form is valid for 1 year from submission date.</li>
    <li>Incomplete forms will not be accepted.</li>
    <li>Use <strong>N/A</strong> for questions that do not apply.</li>
  </ol>

          <div className="radio-group">
            <p>Select Parent Type</p>
            <label><input type="radio" name="parentType" onChange={() => setParentType("Father")} /> Father</label>
            <label><input type="radio" name="parentType" onChange={() => setParentType("Mother")} /> Mother</label>
          </div>

          <div className="form-inputs">
            <input type="email" placeholder="Email ID" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder="Mobile Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>

          {showOtp && (
            <div className="row g-2 mt-3">
              <div className="col-md-6">
                <input type="text" className="form-control" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
              </div>
              <div className="col-md-3">
                <button className="btn btn-outline-primary w-100" onClick={handleVerifyOtp}>Verify OTP</button>
              </div>
              <div className="col-md-3 small text-muted">
                {timer > 0 ? (
                  <span>Resend in {timer}s</span>
                ) : resendCount < 3 ? (
                  <span className="text-primary" role="button" onClick={handleResendOtp} style={{ cursor: "pointer" }}>
                    Resend OTP
                  </span>
                ) : (
                  <span className="text-danger">Resend limit reached</span>
                )}
              </div>
            </div>
          )}

          <div className="form-actions mt-3">
            <button className="next-btn" onClick={handleNext}>Next</button>
          </div>
        </div>
      )}

      {step === "STUDENT DETAILS" && (
        <StudentDetailsForm goToNextStep={() => setStep("PARENT INFORMATION")} goToPrevStep={handlePrev} saveStudentData={setStudentData} />
      )}

      {step === "PARENT INFORMATION" && (
        <ParentDetailsForm selectedParentType={parentType} parentEmail={email} parentPhone={phone} goToNextStep={() => setStep("DECLARATION")} goToPrevStep={() => setStep("STUDENT DETAILS")} saveParentData={setParentData} />
      )}

      {step === "DECLARATION" && (
        <DeclarationPage studentData={studentData} parentData={parentData} goToNextStep={() => setStep("PAYMENT")} goToPrevStep={() => setStep("PARENT INFORMATION")} />
      )}

      {step === "PAYMENT" && (
        <PaymentPage studentData={studentData} parentData={parentData} goToPrevStep={() => setStep("DECLARATION")} />
      )}

      <Footer />
    </div>
  );
};

export default Register;
