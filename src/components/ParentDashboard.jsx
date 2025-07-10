import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "../styles/nav.css";

const ParentDashboard = () => {
  const navigate = useNavigate();
  const [parent, setParent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [age, setAge] = useState("");
  const [allowedGrades, setAllowedGrades] = useState([]);
  const [isSaved, setIsSaved] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    academicYear: "",
    grade: "",
    gender: "",
  });

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  useEffect(() => {
    const parentId = localStorage.getItem("parentId");
    if (!parentId) {
      Swal.fire("Unauthorized", "Please login first.", "error").then(() =>
        navigate("/dps-login")
      );
      return;
    }

    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/dashboard/parent/${parentId}`)
      .then((res) => res.json())
      .then((data) => setParent(data))
      .catch(() => Swal.fire("Error", "Failed to load data", "error"));
  }, [showForm]);

  const handleLogout = () => {
    localStorage.clear();
    Swal.fire("Logged Out", "You have been successfully logged out.", "success").then(() =>
      navigate("/dps-login")
    );
  };

  const handleAddChildClick = () => {
    setShowForm(true);
    setFormData({
      firstName: "",
      middleName: "",
      lastName: "",
      dob: "",
      academicYear: "",
      grade: "",
      gender: "",
    });
    setAge("");
    setAllowedGrades([]);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitWithPayment = () => {
    const { firstName, lastName, academicYear, dob, grade, gender } = formData;
    if (!firstName || !lastName || !academicYear || !dob || !grade || !gender) {
      Swal.fire("Missing Fields", "Please fill all required fields", "warning");
      return;
    }

    Swal.fire({
      title: "Confirm Registration & Payment",
      html: `
        <ul class="list-group text-start">
          <li class="list-group-item d-flex justify-content-between">Application Fee <strong>₹1000</strong></li>
          <li class="list-group-item d-flex justify-content-between">Convenience Fee <strong>₹50</strong></li>
          <li class="list-group-item d-flex justify-content-between bg-success text-white">Total <strong>₹1050</strong></li>
        </ul>
        <br>Click "Confirm" to proceed.`,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Confirm & Pay",
    }).then((result) => {
      if (result.isConfirmed) {
        const { students, ...cleanParent } = parent;

        const requestBody = {
          ...formData,
          age,
          paymentCompleted: true,
          parent: cleanParent,
        };

        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        })
          .then(async (res) => {
            const data = await res.json();
            if (res.ok) {
              Swal.fire("✅ Success", "Child registered successfully!", "success");
              setShowForm(false);
            } else {
              Swal.fire("❌ Error", data.error || "Something went wrong", "error");
            }
          })
          .catch(() => Swal.fire("❌ Error", "Failed to save student", "error"));
      }
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-2 bg-dark text-white min-vh-100 p-3">
          <h4 className="text-white mb-4">👨‍👩‍👧 Parent Portal</h4>
          <ul className="nav flex-column">
            <li className="nav-item mb-2"><button className="btn btn-outline-light w-100">🏠 Dashboard</button></li>
            <li className="nav-item mb-2"><button className="btn btn-outline-light w-100">📋 My Children</button></li>
            <li className="nav-item mb-2"><button className="btn btn-outline-light w-100" onClick={handleAddChildClick}>➕ Add Child</button></li>
            <li className="nav-item mb-2"><button className="btn btn-outline-light w-100">👤 Profile</button></li>
            <li className="nav-item mb-2"><button className="btn btn-outline-light w-100">📄 Application Status</button></li>
            <li className="nav-item mb-2"><button className="btn btn-outline-light w-100">📘 Student Academics</button></li>
            <li className="nav-item mb-2"><button className="btn btn-outline-light w-100">📢 Announcements</button></li>
            <li className="nav-item mb-2"><button className="btn btn-outline-light w-100">📞 Help / Support</button></li>
            <li className="nav-item mt-3"><button className="btn btn-danger w-100" onClick={handleLogout}>🚪 Logout</button></li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="col-md-10 p-4">
          <h2 className="text-center mb-4">Parent & Student Dashboard</h2>

          {parent && (
            <div className="card shadow mb-4">
              <div className="card-header bg-dark text-white">
                <h5>Welcome, {parent.fatherName} & {parent.motherName}</h5>
                <small>Email: {parent.fatherEmail || parent.motherEmail} | Phone: {parent.fatherPhone}</small>
                
              </div>
              <div className="card-body">
                <h6>Children:</h6>
                <table className="table table-bordered">
                  <thead>
                    <tr><th>Name</th><th>DOB</th><th>Grade</th><th>Gender</th><th>Payment</th></tr>
                  </thead>
                  <tbody>
                    {parent.students.map((s, i) => (
                      <tr key={i}>
                        <td>{s.firstName} {s.lastName}</td>
                        <td>{s.dob}</td>
                        <td>{s.grade}</td>
                        <td>{s.gender}</td>
                        <td>{s.paymentCompleted ? "✅ Paid" : "❌ Pending"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button className="btn btn-primary mt-3" onClick={handleAddChildClick}>➕ Add Another Child</button>
              </div>
            </div>
          )}

          {/* Add Child Modal */}
          {showForm && (
            <div className="modal show d-block" tabIndex="-1">
              <div className="modal-dialog modal-lg mt-5">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Register New Child</h5>
                    <button type="button" className="btn-close" onClick={() => setShowForm(false)}></button>
                  </div>
                  <div className="modal-body">
                    <div className="row g-3">
                      {/* Fields */}
                      {["firstName", "middleName", "lastName"].map((field, i) => (
                        <div className="col-md-4" key={i}>
                          <label className="form-label">{field.replace("Name", " Name")} {field !== "middleName" && <span className="text-danger">*</span>}</label>
                          <input name={field} className="form-control" value={formData[field]} onChange={handleChange} />
                        </div>
                      ))}

                      <div className="col-md-4">
                        <label className="form-label">Academic Year <span className="text-danger">*</span></label>
                        <select className="form-select" name="academicYear" value={formData.academicYear} onChange={handleChange}>
                          <option value="">Select</option>
                          <option value="2025-26">2025-26</option>
                        </select>
                      </div>

                      <div className="col-md-4">
                        <label className="form-label">DOB <span className="text-danger">*</span></label>
                        <input type="date" className="form-control" onChange={handleDobChange} max={getTodayDate()} />
                      </div>

                      <div className="col-md-4">
                        <label className="form-label">Age <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" value={age} readOnly />
                      </div>

                      <div className="col-md-4">
                        <label className="form-label">Grade <span className="text-danger">*</span></label>
                        <select className="form-select" name="grade" value={formData.grade} onChange={handleChange}>
                          <option value="">Select</option>
                          {allowedGrades.length > 0 ? allowedGrades.map((g) => (
                            <option key={g} value={`${g}th`}>{g}th</option>
                          )) : <option disabled>No eligible grade</option>}
                        </select>
                      </div>

                      <div className="col-md-4">
                        <label className="form-label">Gender <span className="text-danger">*</span></label>
                        <select className="form-select" name="gender" value={formData.gender} onChange={handleChange}>
                          <option value="">Select</option>
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
                    <button className="btn btn-success" onClick={handleSubmitWithPayment}>Confirm & Pay ₹1050</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
