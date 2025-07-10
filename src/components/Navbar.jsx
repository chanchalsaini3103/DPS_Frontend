import React, { useState } from "react";
import "../styles/Navbar.css";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { FaRegFileAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

import EnquiryForm from "./EnquiryForm";
import HeroPage from "./HeroPage";

const AppNavbar = () => {
  const [showForm, setShowForm] = useState(false);
 

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
                <div className="enquiry-overlay-backdrop">
                  <div className="enquiry-overlay-content">
                    <button
                      className="enquiry-close-btn"
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
                    <Nav.Link href="/">ABOUT DPS</Nav.Link>
              
                    <Nav.Link href="#">CURRICULUM</Nav.Link>
                
                    <NavDropdown title="SCHOOLS" id="nav-schools">
                      <NavDropdown.Item>Delhi PS</NavDropdown.Item>
                      <NavDropdown.Item>Pune PS</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="BEYOND ACADEMICS" id="nav-beyond">
                      <NavDropdown.Item>Sports</NavDropdown.Item>
                      <NavDropdown.Item>Music</NavDropdown.Item>
                      
                    </NavDropdown>
                     <Nav.Link href="#">TEACHING & LEARNING</Nav.Link>
                     <Nav.Link href="#">ADMISSIONS</Nav.Link>
                   
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
