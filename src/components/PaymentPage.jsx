import React from "react";
import "../styles/Register.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";

const PaymentPage = ({ goToPrevStep }) => {
  const handlePayment = () => {
    Swal.fire({
      title: "Confirm Payment",
      text: "Are you sure you want to proceed to payment?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Proceed",
    }).then((result) => {
      if (result.isConfirmed) {
        // You can replace this with actual API call to save data in DB
        setTimeout(() => {
          Swal.fire("Payment Successful!", "Your registration is complete.", "success");
        }, 1000);
      }
    });
  };

  return (
    <div className="register-form-box">
      <h3 className="form-title text-primary">PAYMENT</h3>

      <div className="payment-summary">
        <p className="text-muted">
          Please confirm the registration fee below and proceed to make your payment securely.
        </p>

        <div className="payment-details border p-4 rounded bg-light">
          <h5 className="mb-4">Registration Fee</h5>
          <ul className="list-group mb-3">
            <li className="list-group-item d-flex justify-content-between">
              <span>Application Processing Fee</span>
              <strong>₹ 1000</strong>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Online Convenience Fee</span>
              <strong>₹ 50</strong>
            </li>
            <li className="list-group-item d-flex justify-content-between bg-success text-white">
              <span>Total</span>
              <strong>₹ 1050</strong>
            </li>
          </ul>

          <div className="text-center">
            <button type="button" className="btn btn-secondary me-3" onClick={goToPrevStep}>
              Previous
            </button>

            <button className="btn btn-primary btn-lg" onClick={handlePayment}>
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
