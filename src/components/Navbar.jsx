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
import HeroPage from "./HeroPage";

const AppNavbar = () => {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
 const handleApplyClick = () => {
    navigate('/register');
  };
  
  return (
    <>
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
                    <NavDropdown.Item as={Link} to="/about/vision">Vision</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/about/faculty">Faculty</NavDropdown.Item>
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
          Admissions open for Classes Nursery to I & X for the academic
          session 2025–26.
        </div>
      </div>
      </div>
      <HeroPage />
      </>
  );
};

export default AppNavbar;
