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

   const phoneRegex = /^[0-9]{10}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 const handleSubmit = (e) => {
  e.preventDefault();

  const phoneRegex = /^[789]\d{9}$/; // Starts with 7, 8, or 9 and has 10 digits
  if (!phoneRegex.test(formData.contactNumber)) {
    alert("❌ Please enter a valid 10-digit mobile number starting with 7, 8, or 9.");
    return;
  }

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
  <label>Academic Year<span className="text-danger">*</span></label>
  <select name="academicYear" className="form-control" value={formData.academicYear} onChange={handleChange} required>
    <option value="2025 - 26">2025 - 26</option>
    <option value="2026 - 27">2026 - 27</option>
  </select>
</div>

          <div className="col-md-6">
            <label>Choose your School<span className="text-danger">*</span></label>
           <select name="school" className="form-control" value={formData.school} onChange={handleChange} required>
  <option value="">Select School</option>
  <option value="Pune DPS">Pune DPS</option>
  <option value="Delhi DPS">Delhi DPS</option>
</select>

          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label>First Name<span className="text-danger">*</span></label>
            <input name="firstName" type="text" className="form-control" required value={formData.firstName} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label>Last Name<span className="text-danger">*</span></label>
            <input name="lastName" type="text" className="form-control" required value={formData.lastName} onChange={handleChange} />
          </div>
        </div>

        <div className="mb-3">
          <label>I am<span className="text-danger">*</span></label><br />
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
            <label>Email<span className="text-danger">*</span></label>
            <input name="email" type="email" className="form-control" required value={formData.email} onChange={handleChange} />
          </div>
          <div className="col-md-3">
            <label>Country Code<span className="text-danger">*</span></label>
            <input name="countryCode" className="form-control" value={formData.countryCode} readOnly />
          </div>
          <div className="col-md-3">
            <label>Contact Number<span className="text-danger">*</span></label>
           <input
  name="contactNumber"
  type="tel"
  className="form-control"
  required
  value={formData.contactNumber}
  onChange={handleChange}
  pattern="[789][0-9]{9}"
  title="Mobile number must be 10 digits and start with 9, 8, or 7"
/>

          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label>Grade<span className="text-danger">*</span></label>
            <select name="grade" className="form-control" value={formData.grade} onChange={handleChange} required>
              <option value="">Select Grade</option>
             
              <option value="Class 1">Class 1</option>
              <option value="Class 2">Class 2</option>
              <option value="Class 3">Class 3</option>
               <option value="Class 4">Class 4</option>
              <option value="Class 5">Class 5</option>
              <option value="Class 6">Class 6</option>
               <option value="Class 7">Class 7</option>
              <option value="Class 8">Class 8</option>
              <option value="Class 9">Class 9</option>
              <option value="Class 10">Class 10</option>

            
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
