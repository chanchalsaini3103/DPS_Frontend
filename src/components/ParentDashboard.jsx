import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import "../styles/nav.css";
const ParentDashboard = () => {
  const navigate = useNavigate();
  const [parent, setParent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [age, setAge] = useState("");
  const [allowedGrades, setAllowedGrades] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    academicYear: "",
    grade: "",
    gender: "",
  });

  useEffect(() => {
    const parentId = localStorage.getItem("parentId");
    if (!parentId) {
      Swal.fire("Unauthorized", "Please login first.", "error").then(() => {
        navigate("/dps-login");
      });
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
  };

  const handleDobChange = (e) => {
    const inputDate = new Date(e.target.value);
    const today = new Date();
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
      title: "Payment Summary",
      html: `
        <ul class="list-group">
          <li class="list-group-item d-flex justify-content-between">Application Fee <strong>₹1000</strong></li>
          <li class="list-group-item d-flex justify-content-between">Convenience Fee <strong>₹50</strong></li>
          <li class="list-group-item d-flex justify-content-between bg-success text-white">Total <strong>₹1050</strong></li>
        </ul>
        <br>Click "Confirm" to proceed with registration.`,
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

    <>
    
   <div className="dps-top-navbar d-flex justify-content-between align-items-center px-4 py-2 bg-light shadow">
  {/* Left: Logo + School Name */}
  <div className="d-flex align-items-center">
    <img src="/dps-logo.png" alt="DPS Logo" className="nav-logo me-2" style={{ height: "40px" }} />
    <span className="school-name fs-5 fw-bold">Delhi Public School</span>
  </div>

  {/* Right: Logout Button */}
  <button className="btn btn-danger" onClick={handleLogout}>
    Logout
  </button>
</div>

    
    <div className="container mt-4">
       

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-center w-100">Parent & Student Dashboard</h2>

      </div>

      {parent && (
        <div className="card mb-4 shadow">
          <div className="card-header bg-success text-white">
            <h5>{parent.fatherName} & {parent.motherName}</h5>
            <small>Email: {parent.fatherEmail || parent.motherEmail} | Phone: {parent.fatherPhone}</small>
          </div>
          <div className="card-body">
            <h6>Children:</h6>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>DOB</th>
                  <th>Grade</th>
                  <th>Gender</th>
                  <th>Payment</th>
                </tr>
              </thead>
              <tbody>
                {parent.students.map((student, i) => (
                  <tr key={i}>
                    <td>{student.firstName} {student.lastName}</td>
                    <td>{student.dob}</td>
                    <td>{student.grade}</td>
                    <td>{student.gender}</td>
                    <td>{student.paymentCompleted ? "✅ Paid" : "❌ Pending"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="btn btn-primary mt-2" onClick={handleAddChildClick}>
              ➕ Add Another Child
            </button>
          </div>
        </div>
      )}

      {showForm && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg mt-5">

            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Child</h5>
                <button type="button" className="btn-close" onClick={() => setShowForm(false)}></button>
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-4">
                    <label className="form-label">First Name *</label>
                    <input type="text" name="firstName" className="form-control" value={formData.firstName} onChange={handleChange} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Middle Name</label>
                    <input type="text" name="middleName" className="form-control" value={formData.middleName} onChange={handleChange} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Last Name *</label>
                    <input type="text" name="lastName" className="form-control" value={formData.lastName} onChange={handleChange} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Academic Year *</label>
                    <select className="form-select" name="academicYear" value={formData.academicYear} onChange={handleChange}>
                      <option value="">Select</option>
                      <option value="2025-26">2025-26</option>
                      
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">DOB *</label>
                    <input type="date" className="form-control" onChange={handleDobChange} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Age</label>
                    <input type="text" className="form-control" value={age} readOnly />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Grade *</label>
                    <select className="form-select" name="grade" value={formData.grade} onChange={handleChange}>
                      <option value="">Select</option>
                      {allowedGrades.length > 0 ? (
                        allowedGrades.map((g) => <option key={g} value={`${g}th`}>{g}th</option>)
                      ) : (
                        <option disabled>No eligible grade</option>
                      )}
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Gender *</label>
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
    </>
  );
};

export default ParentDashboard;
