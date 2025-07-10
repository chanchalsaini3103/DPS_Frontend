import React, { useState } from "react";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/StudentDetailsForm.css"; 

const DeclarationPage = ({ goToPrevStep, studentData, parentData, goToNextStep }) => {
  const [checked, setChecked] = useState(false);

  const handleProceed = () => {
    if (!checked) {
      Swal.fire({
        icon: "warning",
        title: "Declaration Required",
        text: "Please agree to the declaration before proceeding.",
        confirmButtonText: "OK",
      });
      return;
    }
    goToNextStep();
  };

  return (
    <div className="student-form-container">
      <h4 className="student-form-title text-primary mb-4">Declaration Summary</h4>

      <div className="mb-4">
        <h5>Student Details</h5>
        <ul className="list-group">
          <li className="list-group-item"><strong>Name:</strong> {studentData.firstName} {studentData.middleName} {studentData.lastName}</li>
          <li className="list-group-item"><strong>DOB:</strong> {studentData.dob}</li>
          <li className="list-group-item"><strong>Age:</strong> {studentData.age}</li>
          <li className="list-group-item"><strong>Grade:</strong> {studentData.grade}</li>
          <li className="list-group-item"><strong>Gender:</strong> {studentData.gender}</li>
        </ul>
      </div>

    
      <div className="mb-4">
        <h5>Parent Details</h5>
        <ul className="list-group">
          <li className="list-group-item">
            <strong>Father:</strong> {parentData.fatherName} | {parentData.fatherEmail} | {parentData.fatherPhone}
          </li>
          <li className="list-group-item">
            <strong>Mother:</strong> {parentData.motherName} | {parentData.motherEmail} | {parentData.motherPhone}
          </li>
        </ul>
      </div>

      <div className="form-check mt-4">
        <input className="form-check-input" type="checkbox" id="agree" onChange={(e) => setChecked(e.target.checked)} />
        <label className="form-check-label" htmlFor="agree">
          I confirm that the above information is true and I agree to the declaration terms.
        </label>
      </div>

      
      <div className="d-flex justify-content-center gap-3 mt-4">
        <button type="button" className="btn btn-secondary" onClick={goToPrevStep}>Previous</button>
        <button type="button" className="btn btn-success" onClick={handleProceed}>
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default DeclarationPage;
