import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/StudentDetailsForm.css";

const ParentDetailsForm = ({
  goToNextStep,
  goToPrevStep,
  selectedParentType,
  parentEmail,
  parentPhone,
  saveParentData
}) => {
  const [formData, setFormData] = useState({
    fatherName: "",
    fatherEmail: "",
    fatherPhone: "",
    motherName: "",
    motherEmail: "",
    motherPhone: "",
  });

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (selectedParentType === "Father") {
      setFormData((prev) => ({
        ...prev,
        fatherEmail: parentEmail,
        fatherPhone: parentPhone,
      }));
    } else if (selectedParentType === "Mother") {
      setFormData((prev) => ({
        ...prev,
        motherEmail: parentEmail,
        motherPhone: parentPhone,
      }));
    }
  }, [selectedParentType, parentEmail, parentPhone]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsSaved(false);
  };

  const isValidPhone = (phone) => {
    return /^[789]\d{9}$/.test(phone);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const {
      fatherName, fatherEmail, fatherPhone,
      motherName, motherEmail, motherPhone
    } = formData;

    if (!fatherName || !fatherEmail || !fatherPhone || !motherName || !motherEmail || !motherPhone) {
      Swal.fire("Missing Details", "Please fill all required fields", "warning");
      return;
    }

    if (!isValidPhone(fatherPhone) || !isValidPhone(motherPhone)) {
      Swal.fire("Invalid Phone Number", "Phone number must start with 9, 8, or 7 and contain exactly 10 digits.", "error");
      return;
    }

    Swal.fire("Saved!", "Parent details saved successfully", "success");
    saveParentData(formData);
    setIsSaved(true);
  };

  const handleNext = () => {
    if (!isSaved) {
      Swal.fire("Warning", "Please click 'Save' before proceeding.", "warning");
      return;
    }
    goToNextStep();
  };

  return (
    <div className="student-form-container">
      <p className="student-form-note text-danger mb-3">
        <strong>Note:</strong> Please click “Save” before clicking “Next”.
      </p>

      <h4 className="student-form-title text-primary mb-4">Father Details</h4>
      <form onSubmit={handleSave}>
        <div className="row mb-3">
          <div className="col-md-4">
            <label className="form-label">Name <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="fatherName" value={formData.fatherName} onChange={handleChange} />
          </div>
          <div className="col-md-4">
            <label className="form-label">Email ID <span className="text-danger">*</span></label>
            <input
              type="email"
              className="form-control"
              name="fatherEmail"
              value={formData.fatherEmail}
              onChange={handleChange}
              readOnly={selectedParentType === "Father"}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Mobile No <span className="text-danger">*</span></label>
            <input
              type="text"
              className="form-control"
              name="fatherPhone"
              value={formData.fatherPhone}
              onChange={handleChange}
              readOnly={selectedParentType === "Father"}
            />
          </div>
        </div>

        <h4 className="student-form-title text-primary mb-4 mt-4">Mother Details</h4>
        <div className="row mb-3">
          <div className="col-md-4">
            <label className="form-label">Name <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="motherName" value={formData.motherName} onChange={handleChange} />
          </div>
          <div className="col-md-4">
            <label className="form-label">Email ID <span className="text-danger">*</span></label>
            <input
              type="email"
              className="form-control"
              name="motherEmail"
              value={formData.motherEmail}
              onChange={handleChange}
              readOnly={selectedParentType === "Mother"}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Mobile No <span className="text-danger">*</span></label>
            <input
              type="text"
              className="form-control"
              name="motherPhone"
              value={formData.motherPhone}
              onChange={handleChange}
              readOnly={selectedParentType === "Mother"}
            />
          </div>
        </div>

        <div className="d-flex justify-content-center gap-3 mt-4">
          <button type="button" className="btn btn-secondary" onClick={goToPrevStep}>Previous</button>
          <button type="submit" className="btn btn-outline-success">Save</button>
          <button type="button" className="btn btn-primary" onClick={handleNext}>Next</button>
        </div>
      </form>
    </div>
  );
};

export default ParentDetailsForm;
