import React from "react";
import "../styles/Footer.css"; // Create this CSS file for styling
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <footer className="footer text-center py-3">
      <div className="bottom-footer">
        <p className="mb-2">
          © 2025 Delhi Public School. Developed with{" "}
          <span className="heart">❤️</span> 
        </p>

        <div className="social-icons d-flex justify-content-center align-items-center gap-3">
          <span className="follow-text me-2">Follow us</span>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
  <i className="fab fa-facebook-f"></i>
</a>

<a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
  <i className="fab fa-instagram"></i>
</a>

<a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
  <i className="fab fa-twitter"></i>
</a>

<a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer">
  <i className="fab fa-pinterest-p"></i>
</a>

<a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
  <i className="fab fa-linkedin-in"></i>
</a>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
