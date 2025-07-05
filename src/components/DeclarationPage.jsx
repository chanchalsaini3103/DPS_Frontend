import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const DeclarationPage = ({ studentData, parentData, goToNextStep }) => {
  const handleProceed = () => {
    if (!studentData.firstName || !parentData.fatherName) {
      alert("Please complete and save student and parent details first.");
      return;
    }
    goToNextStep();
  };

  return (
    <div className="container mt-4 mb-5 p-4 border rounded shadow-sm">
      <h4 className="text-primary mb-3">Declaration Summary</h4>

      <div className="mb-4">
        <h5>Student Details:</h5>
        <ul className="list-group">
          <li className="list-group-item">
            <strong>Name:</strong> {studentData.firstName} {studentData.middleName} {studentData.lastName}
          </li>
          <li className="list-group-item"><strong>DOB:</strong> {studentData.dob}</li>
          <li className="list-group-item"><strong>Age:</strong> {studentData.age}</li>
          <li className="list-group-item"><strong>Grade:</strong> {studentData.grade}</li>
          <li className="list-group-item"><strong>Gender:</strong> {studentData.gender}</li>
        </ul>
      </div>

      <div className="mb-4">
        <h5>Parent Details:</h5>
        <ul className="list-group">
          <li className="list-group-item">
            <strong>Father:</strong> {parentData.fatherName} | {parentData.fatherEmail} | {parentData.fatherPhone}
          </li>
          <li className="list-group-item">
            <strong>Mother:</strong> {parentData.motherName} | {parentData.motherEmail} | {parentData.motherPhone}
          </li>
        </ul>
      </div>

      <div className="alert alert-info">
        <p className="mb-0">
          I hereby declare that the information provided is true and correct to the best of my knowledge and belief.
        </p>
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-success btn-lg" onClick={handleProceed}>
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default DeclarationPage;
