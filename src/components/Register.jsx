import React, { useState, useEffect } from "react";
import "../styles/Register.css";
import StudentDetailsForm from "./StudentDetailsForm";
import ParentDetailsForm from "./ParentDetailsForm";
import DeclarationPage from "./DeclarationPage";
import PaymentPage from "./PaymentPage";
import Swal from "sweetalert2"; // at top of file
import Footer from "./Footer";

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

 useEffect(() => {
  if (step === "PAYMENT") {
  const requestBody = {
    ...studentData,
    parent: parentData,
  };

  fetch("http://localhost:8082/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  })

      .then((res) => {
        if (!res.ok) throw new Error("Failed to save data");
        return res.json();
      })
      .then((data) => {
        console.log("Saved to DB:", data);
        alert("Data saved to database successfully!");
      })
      .catch((err) => {
        console.error(err);
        alert("Something went wrong while saving data.");
      });
  }
}, [step]);
const handlePrev = () => {
  const steps = ["INTRODUCTION", "STUDENT DETAILS", "PARENT INFORMATION", "DECLARATION", "PAYMENT"];
  const currentIndex = steps.indexOf(step);
  if (currentIndex > 0) {
    setStep(steps[currentIndex - 1]);
  }
};


  const validateInputs = () => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!email.endsWith("@gmail.com")) {
      alert("Email must be a valid @gmail.com address.");
      return false;
    }
    if (!phoneRegex.test(phone)) {
      alert("Phone number must be exactly 10 digits.");
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
      const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(newOtp);
      
      // Show SweetAlert with OTP
      Swal.fire({
        title: "OTP Sent!",
        text: `Your OTP is: ${newOtp}`,
        icon: "info",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });

      setShowOtp(true);
      setTimer(45);
      setResendCount(0);
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
    Swal.fire({
      icon: "success",
      title: "OTP Verified!",
      text: "You can now proceed to the next step.",
      timer: 2000,
      showConfirmButton: false,
    });
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
            Nyati Estate Rd, Nyati County, Mohammed Wadi, Pune, Autadwadi Handewadi,<br />
Maharashtra 411060 <br />
            E-mail: <a href="mailto:dps@example.com">dps@example.com</a><br />
            Phone: 020 26522100 / +91 7821820239
          </p>
        </div>
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
          <p className="form-note">Dear Parents</p>
          <p className="form-note">Thank you for your interest in Delhi Public School.</p>

          <ol className="form-instructions">
            <li>The Application Form is for parents interested in being part of the Symbiosis International School.</li>
            <li>The submission of the Application Form does not imply an admission of your child to the school.</li>
            <li>The Application Form should be complete in all respects, and the information provided should be true.</li>
            <li>After submission, parents will receive an acknowledgement. If not received, check spam or email <strong>admissionsinfo@sis.ac.in</strong></li>
            <li>One Application Form per child is required.</li>
            <li>The Application Form is divided into 3 sections.</li>
            <li>It can be saved and accessed later via email link.</li>
            <li>Admission is based on records, achievements & grade level.</li>
            <li>Each form is valid for 1 year from submission date.</li>
            <li>Incomplete forms will not be accepted.</li>
            <li>Use N/A for questions that don't apply.</li>
          </ol>

          <div className="radio-group">
            <p>Please provide your Email ID and Mobile Number</p>
            <label><input type="radio" name="parentType" onChange={() => setParentType("Father")} /> Father</label>
            <label><input type="radio" name="parentType" onChange={() => setParentType("Mother")} /> Mother</label>
          </div>

          <div className="form-inputs">
            <input type="email" placeholder="Email ID" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder="Mobile Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
{showOtp && (
  <div className="row g-2 align-items-center mt-3">
    <div className="col-md-6">
      <input
        type="text"
        className="form-control"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
    </div>
    <div className="col-md-3">
      <button className="btn btn-outline-primary w-100" onClick={handleVerifyOtp}>
        Verify OTP
      </button>
    </div>
    <div className="col-md-3 text-muted small">
      {timer > 0 ? (
        <span className="text-secondary">Resend in {timer}s</span>
      ) : resendCount < 3 ? (
        <span
          className="text-primary"
          role="button"
          style={{ cursor: "pointer" }}
          onClick={handleResendOtp}
        >
          Resend OTP
        </span>
      ) : (
        <span className="text-danger">Resend limit reached</span>
      )}
    </div>
  </div>
)}


          <div className="form-actions">
            <button className="next-btn" onClick={handleNext}>Next</button>
          </div>
        </div>
      )}

      {step === "STUDENT DETAILS" && (
        <StudentDetailsForm
  goToNextStep={() => setStep("PARENT INFORMATION")}
  goToPrevStep={handlePrev}
  saveStudentData={(data) => setStudentData(data)}
/>

      )}

      {step === "PARENT INFORMATION" && (
        <ParentDetailsForm
          selectedParentType={parentType}
          parentEmail={email}
          parentPhone={phone}
          goToPrevStep={() => setStep("STUDENT DETAILS")}
          goToNextStep={() => setStep("DECLARATION")}
          saveParentData={(data) => setParentData(data)}
        />
      )}

      {step === "DECLARATION" && (
        <DeclarationPage
          studentData={studentData}
          parentData={parentData}
           goToPrevStep={() => setStep("PARENT INFORMATION")}
          goToNextStep={() => setStep("PAYMENT")}
        />
      )}

      {step === "PAYMENT" && (
        <PaymentPage
        
        studentData={studentData}
  parentData={parentData}
  goToPrevStep={() => setStep("DECLARATION")}
        />
        
      )}
      <Footer />
    </div>
  );
};

export default Register;
