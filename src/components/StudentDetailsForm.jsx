import React, { useState } from "react";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/StudentDetailsForm.css";

const StudentDetailsForm = ({ goToNextStep, goToPrevStep, saveStudentData }) => {
  const [age, setAge] = useState("");
  const [allowedGrades, setAllowedGrades] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    academicYear: "",
    dob: "",
    grade: "",
    gender: "",
  });

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; 
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsSaved(false);
  };

  const handleDobChange = (e) => {
    const inputDate = new Date(e.target.value);
    const today = new Date();

   
    if (inputDate > today) {
      Swal.fire("Invalid DOB", "Date of Birth cannot be in the future.", "error");
      return;
    }

    let calculatedAge = today.getFullYear() - inputDate.getFullYear();
    if (
      today.getMonth() < inputDate.getMonth() ||
      (today.getMonth() === inputDate.getMonth() && today.getDate() < inputDate.getDate())
    ) {
      calculatedAge--;
    }

    const formattedDob = `${inputDate.getDate().toString().padStart(2, "0")}-${(inputDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${inputDate.getFullYear()}`;
    setFormData((prev) => ({ ...prev, dob: formattedDob }));
    setAge(calculatedAge);
    setIsSaved(false);

    const validGrade = calculatedAge - 5;
    if (validGrade >= 1 && validGrade <= 10) {
      setAllowedGrades([validGrade]);
    } else {
      setAllowedGrades([]);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const { firstName, lastName, academicYear, dob, grade, gender } = formData;
    if (!firstName || !lastName || !academicYear || !dob || !grade || !gender) {
      Swal.fire("Missing Details", "Please fill all required fields", "warning");
      return;
    }
    Swal.fire("Saved", "Student details saved successfully", "success");
    setIsSaved(true);
    saveStudentData({ ...formData, age });
  };

  return (
    <div className="container mt-4 student-form-container shadow-sm">
      <p className="text-danger mb-2">
        <strong>Note:</strong> Please click “Save” before proceeding.
      </p>

      <h4 className="text-primary mb-4">Student Details</h4>

      <form onSubmit={handleSave}>
        <div className="row g-3 mb-3">
          <div className="col-md-4">
            <label className="form-label">
              First Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Middle Name</label>
            <input
              type="text"
              className="form-control"
              name="middleName"
              value={formData.middleName}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">
              Last Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">
              Academic Year <span className="text-danger">*</span>
            </label>
            <select
              className="form-select"
              name="academicYear"
              value={formData.academicYear}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option value="2025-26">2025-26</option>
              <option value="2026-27">2026-27</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">
              Date of Birth <span className="text-danger">*</span>
            </label>
            <input
              type="date"
              className="form-control"
              max={getTodayDate()}
              onChange={handleDobChange}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">
              Age <span className="text-danger">*</span>
            </label>
            <input type="text" className="form-control" value={age} readOnly />
          </div>

          <div className="col-md-4">
            <label className="form-label">
              Grade <span className="text-danger">*</span>
            </label>
            <select
              className="form-select"
              name="grade"
              value={formData.grade}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              {allowedGrades.length > 0 ? (
                allowedGrades.map((g) => (
                  <option key={g} value={`${g}th`}>
                    {g}th
                  </option>
                ))
              ) : (
                <option disabled>No eligible grade</option>
              )}
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">
              Gender <span className="text-danger">*</span>
            </label>
            <select
              className="form-select"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        <div className="d-flex justify-content-center gap-3 mt-4">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={goToPrevStep}
          >
            Previous
          </button>

          <button type="submit" className="btn btn-outline-success">
            Save
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              if (!isSaved) {
                Swal.fire("Unsaved Form", "Please save the form before proceeding.", "warning");
              } else {
                goToNextStep();
              }
            }}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentDetailsForm;
