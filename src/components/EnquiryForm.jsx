import React, { useState } from "react";
import "../styles/EnquiryForm.css"; // Optional: for custom styles

const EnquiryForm = () => {
  const [formData, setFormData] = useState({
    academicYear: "2025 - 26",
    school: "",
    firstName: "",
    lastName: "",
    relation: "",
    email: "",
    countryCode: "+91 (India)",
    contactNumber: "",
    grade: "",
    query: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting form:", formData);
   fetch(`${import.meta.env.VITE_API_BASE_URL}/api/enquiry`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(formData),
})
      .then((res) => {
        if (res.ok) alert("✅ Enquiry submitted!");
        else alert("❌ Failed to submit");
      })
      .catch((err) => alert("❌ Error: " + err.message));
  };

  return (
    <div className="container mt-4 p-4 border rounded bg-light">
      <h4>Admission Inquiry</h4>
      <form onSubmit={handleSubmit}>

        <div className="row mb-3">
          <div className="col-md-6">
            <label>Academic Year*</label>
            <input className="form-control" value={formData.academicYear} readOnly />
          </div>
          <div className="col-md-6">
            <label>Choose your School*</label>
            <select name="school" className="form-control" value={formData.school} onChange={handleChange} required>
              <option value="">Select School</option>
              <option value="Pune DPS">Pune DPS</option>
              <option value="Delhi DPS">Delhi DPS</option>
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label>First Name*</label>
            <input name="firstName" type="text" className="form-control" required value={formData.firstName} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label>Last Name*</label>
            <input name="lastName" type="text" className="form-control" required value={formData.lastName} onChange={handleChange} />
          </div>
        </div>

        <div className="mb-3">
          <label>I am*</label><br />
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="relation" value="Father" onChange={handleChange} required />
            <label className="form-check-label">Father</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="relation" value="Mother" onChange={handleChange} />
            <label className="form-check-label">Mother</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="relation" value="Guardian" onChange={handleChange} />
            <label className="form-check-label">Guardian</label>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label>Email*</label>
            <input name="email" type="email" className="form-control" required value={formData.email} onChange={handleChange} />
          </div>
          <div className="col-md-3">
            <label>Country Code*</label>
            <input name="countryCode" className="form-control" value={formData.countryCode} readOnly />
          </div>
          <div className="col-md-3">
            <label>Contact Number*</label>
            <input name="contactNumber" type="tel" className="form-control" required value={formData.contactNumber} onChange={handleChange} />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label>Grade*</label>
            <select name="grade" className="form-control" value={formData.grade} onChange={handleChange} required>
              <option value="">Select Grade</option>
              <option value="Nursery">Nursery</option>
              <option value="LKG">LKG</option>
              <option value="UKG">UKG</option>
              <option value="Class 1">Class 1</option>
              <option value="Class 2">Class 2</option>
              <option value="Class 3">Class 3</option>
              {/* Add more grades as needed */}
            </select>
          </div>
          <div className="col-md-6">
            <label>Query</label>
            <textarea name="query" className="form-control" rows={3} value={formData.query} onChange={handleChange} placeholder="Add Remarks"></textarea>
          </div>
        </div>

        <button className="btn btn-primary w-100">Submit Form</button>
      </form>
    </div>
  );
};

export default EnquiryForm;
