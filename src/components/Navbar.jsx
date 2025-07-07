import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/Navbar.css";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { FaRegFileAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import schoolImage from "/schoolimg.png";
const images = [
  "/images/kid1.jpg",
  "/images/kid1.jpg",
  "/images/kid1.jpg",
  "/images/kid1.jpg",
  "/images/kid1.jpg",
];

import {
  FaTrophy,
  FaBookOpen,
  FaChalkboardTeacher,
  FaFutbol,
  FaHandshake,
} from "react-icons/fa";
import CounterSection from "./CounterSection";
import ImageCarousel from "./ImageCarousel";
import EnquiryForm from "./EnquiryForm";

const AppNavbar = () => {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
 const handleApplyClick = () => {
    navigate('/register');
  };
  
  return (
    <div className="dps-wrapper">
      <div className="dps-nav-row">
        <div className="dps-logo-container">
          <Link to="/">
            <img
              src="/dps-logo.png"
              alt="Delhi Public School"
              className="dps-logo"
              style={{ cursor: "pointer" }}
            />
          </Link>
          <div className="dps-logo-text">
            <div>Delhi</div>
            <div>Public</div>
            <div>School</div>
          </div>
        </div>

        <div className="dps-right-content">
          <div className="dps-top-buttons">
            <button
              className="dps-btn inquiry"
              onClick={() => setShowForm(!showForm)}
            >
              <FaRegFileAlt style={{ marginRight: "5px" }} />
              INQUIRY FORM
            </button>
            {showForm && (
              <div className="enquiry-modal-overlay">
                <div className="enquiry-modal-content">
                  <button
                    className="close-btn"
                    onClick={() => setShowForm(false)}
                  >
                    ✕
                  </button>
                  <EnquiryForm />
                </div>
              </div>
            )}

            <Link
              to="/dps-login"
              className="dps-btn login"
              style={{ textDecoration: "none", color: "white" }}
            >
              <FaUser style={{ marginRight: "5px" }} />
              PARENT LOGIN
            </Link>
          </div>

          <Navbar expand="lg" className="dps-navbar">
            <Container fluid>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="dps-nav-links">
                  <Nav.Link href="/">HOME</Nav.Link>
                  <NavDropdown title="ABOUT DPS" id="nav-about">
                    <NavDropdown.Item>Vision</NavDropdown.Item>
                    <NavDropdown.Item>Faculty</NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="CURRICULUM" id="nav-curriculum">
                    <NavDropdown.Item>CBSE</NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="SCHOOLS" id="nav-schools">
                    <NavDropdown.Item>Primary</NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="BEYOND ACADEMICS" id="nav-beyond">
                    <NavDropdown.Item>Sports</NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="TEACHING & LEARNING" id="nav-teaching">
                    <NavDropdown.Item>Methodology</NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="ADMISSIONS" id="nav-admissions">
                    <NavDropdown.Item>Process</NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link href="#">LOCATE US</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      </div>
      <div className="marquee-bar">
        <div className="marquee-text">
          Admissions open for Classes I & X for the academic session 2025–26.
        </div>
      </div>
      <div className="hero-image-container">
        <img src="/dps.jpg" alt="Delhi Public School" className="hero-image" />

        <div className="hero-text-overlay">
          <h1 className="hero-heading">Welcome to Delhi Public School</h1>
          <p className="hero-quote">
            “True learning begins with curiosity and grows through awareness and
            understanding.”
          </p>
        </div>
      </div>
      <section className="welcome-container">
        <div className="image-container">
          <img src={schoolImage} alt="Delhi Public School" />
        </div>
        <div className="text-container">
          <h2>
            <span className="welcome-blue">Welcome to</span> <br />
            <span className="school-red">Delhi Public School</span>
          </h2>
          <p className="subtitle">
            A Center of Excellence – Inspiring Every Student to Achieve More
          </p>
          <p className="description">
            At Delhi Public School, we are committed to a holistic educational
            experience that goes beyond textbooks—nurturing young minds to
            become lifelong learners, critical thinkers, and compassionate
            global citizens.
          </p>
          <div className="read-more">
            <div className="red-bar"></div>
            <a href="#">Read More &rarr;</a>
          </div>
        </div>
      </section>

      <section className="info-grid-wrapper">
        <div className="info-grid">
          {/* Achievements */}
          <div className="info-card tall-card">
            <FaTrophy className="icon" />
            <h3>Achievements</h3>
            <p>
              Delhi Public School has consistently achieved academic excellence,
              with students securing top ranks in national and international
              examinations such as IIT-JEE, NEET, Olympiads, and SAT. Numerous
              alumni have earned scholarships and admissions into Ivy League
              universities, top UK institutions, and renowned Indian colleges.
              DPS students have also excelled in MUNs, debates, science fairs,
              and innovation challenges, bringing home accolades from countries
              like the USA, Japan, Australia, Singapore, and Germany.
            </p>
          </div>

          {/* CBSE Curriculum */}
          <div className="info-card">
            <FaChalkboardTeacher className="icon" />
            <h3>CBSE Curriculum</h3>
            <p>
              DPS is affiliated with CBSE, promoting a curriculum that develops
              analytical thinking, moral values, and creativity for all-round
              excellence.
            </p>
          </div>

          {/* Co-curricular */}
          <div className="info-card tall-card">
            <FaBookOpen className="icon" />
            <h3>Co-curricular Activities</h3>
            <p>
              DPS believes in the all-round development of its students through
              a wide spectrum of co-curricular activities. These include
              performing arts like music, dance, and drama; fine arts such as
              painting and sculpture; and literary clubs for debate, elocution,
              and creative writing. Students also engage in clubs like Robotics,
              Astronomy, Eco Club, and Coding. Regular events like Cultural Day,
              Science Exhibition, and Heritage Week foster teamwork, confidence,
              and leadership skills that complement their academic journey.
            </p>
          </div>

          {/* Sports */}
          <div className="info-card">
            <FaFutbol className="icon" />
            <h3>Sports</h3>
            <p>
              Wide variety of sports like Football, Basketball, Athletics & more
              to foster physical fitness, discipline, and team spirit.
            </p>
          </div>
        </div>
      </section>
      <CounterSection />
      <ImageCarousel />

      <div className="apply-footer-wrapper">
        {/* Apply Now Banner */}
        <section className="apply-banner">
          <div className="apply-content">
            <h2>Apply Now</h2>
            <p>
              Take the first step towards a brighter future. Apply today and
              embark on a journey of discovery, growth, and success with our
              school.
            </p>
          </div>
          <button className="apply-button" onClick={handleApplyClick}>
            Apply Now →
          </button>
        </section>

        {/* Footer Section */}
        <footer className="footer-section">
          <div className="footer-container">
            <div className="footer-column">
              <h3>
                Delhi <br />
                Public School
              </h3>
              <p>
                Nyati Estate Rd, Nyati County, Mohammed Wadi
                <br />
                Autadwadi Handewadi, Maharashtra 411060
              </p>
              <p>📞 +91 020 26522100</p>
              <p>✉️ dps@example.com</p>
            </div>

            <div className="footer-column">
              <h4>Key Links</h4>
              <ul>
                <li>
                  <a href="#">Admissions</a>
                </li>
                <li>
                  <a href="#">Online Enquiry</a>
                </li>
                <li>
                  <a href="#">MySchoolOne</a>
                </li>
                <li>
                  <a href="#">MaiaLearning</a>
                </li>
                <li>
                  <a href="#">ManageBac</a>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <iframe
                title="map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.338282158687!2d73.90735087416472!3d18.55904838254432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c15c50ea2f3f%3A0x132f41f4a13d74c2!2sSymbiosis%20International%20School!5e0!3m2!1sen!2sin!4v1719854050757!5m2!1sen!2sin"
                width="100%"
                height="200"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </footer>
      </div>
      {/* Bottom Footer */}
      <div className="bottom-footer">
        <p>
          © 2025 Delhi Public School. Developed with{" "}
          <span className="heart">❤️</span>
        </p>
        <div className="social-icons">
          <span className="follow-text">Follow us</span>
          <a href="#">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#">
            <i className="fab fa-pinterest-p"></i>
          </a>
          <a href="#">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AppNavbar;
