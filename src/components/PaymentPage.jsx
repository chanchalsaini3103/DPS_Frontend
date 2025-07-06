import React from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const PaymentPage = ({ studentData, parentData, goToPrevStep }) => {
  const navigate = useNavigate();

  const handlePayment = () => {
    Swal.fire({
      title: "Confirm Payment",
      text: "Are you sure you want to proceed to payment?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Proceed",
    }).then((result) => {
      if (result.isConfirmed) {
        const requestBody = {
          ...studentData,
          paymentCompleted: true,
          parent: parentData,
        };

        console.log("Sending to backend:", requestBody);

        fetch("http://localhost:8081/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        })
          .then(async (res) => {
            const data = await res.json();
            if (res.ok) {
              Swal.fire({
                title: "✅ Success",
                text: data.message || "Payment successful",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
              });

              // Redirect to login after 3 seconds
              setTimeout(() => {
                navigate("/dps-login");
              }, 3000);
            } else {
              Swal.fire("❌ Failed", data.error || "Something went wrong", "error");
            }
          })
          .catch((err) => {
            console.error("❌ Registration failed:", err);
            Swal.fire("❌ Error", "Registration failed", "error");
          });
      }
    });
  };

  return (
    <div className="register-form-box">
      <h3 className="form-title text-primary">PAYMENT</h3>
      <div className="payment-summary">
        <ul className="list-group mb-3">
          <li className="list-group-item d-flex justify-content-between">
            <span>Application Processing Fee</span> <strong>₹ 1000</strong>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span>Online Convenience Fee</span> <strong>₹ 50</strong>
          </li>
          <li className="list-group-item d-flex justify-content-between bg-success text-white">
            <span>Total</span> <strong>₹ 1050</strong>
          </li>
        </ul>
        <div className="text-center">
          <button className="btn btn-secondary me-3" onClick={goToPrevStep}>
            Previous
          </button>
          <button className="btn btn-primary btn-lg" onClick={handlePayment}>
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
