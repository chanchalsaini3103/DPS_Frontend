import React from "react";
import { FaTrophy, FaBookOpen, FaChalkboardTeacher, FaFutbol } from "react-icons/fa";
import CounterSection from "./CounterSection";
import ImageCarousel from "./ImageCarousel";
import schoolImage from "/schoolimg.png";
import { useNavigate } from "react-router-dom";
import "../styles/HeroPage.css";

const HeroPage = () => {
  const navigate = useNavigate();

  const handleApplyClick = () => {
    navigate("/register");
  };

  return (
    <>
      {/* HERO SECTION */}
      <div className="hero-image-container">
        <img src="/dps.jpg" alt="Delhi Public School" className="hero-image" />
        <div className="hero-text-overlay">
          <h1 className="hero-heading">Welcome to Delhi Public School</h1>
          <p className="hero-quote">
            “True learning begins with curiosity and grows through awareness and understanding.”
          </p>
        </div>
      </div>

      {/* WELCOME SECTION */}
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

      {/* INFO CARDS */}
      <section className="info-grid-wrapper">
        <div className="info-grid">
          <div className="info-card tall-card">
            <FaTrophy className="icon" />
            <h3>Achievements</h3>
            <p>  Delhi Public School has consistently achieved academic excellence,
              with students securing top ranks in national and international
              examinations such as IIT-JEE, NEET, Olympiads, and SAT. Numerous
              alumni have earned scholarships and admissions into Ivy League
              universities, top UK institutions, and renowned Indian colleges.
              DPS students have also excelled in MUNs, debates, science fairs,
              and innovation challenges, bringing home accolades from countries
              like the USA, Japan, Australia, Singapore, and Germany.</p>
          </div>

          <div className="info-card">
            <FaChalkboardTeacher className="icon" />
            <h3>CBSE Curriculum</h3>
            <p>DPS is affiliated with CBSE, promoting a curriculum that develops analytical thinking.</p>
          </div>

          <div className="info-card tall-card">
            <FaBookOpen className="icon" />
            <h3>Co-curricular Activities</h3>
            <p>DPS believes in the all-round development of its students through
              a wide spectrum of co-curricular activities. These include
              performing arts like music, dance, and drama; fine arts such as
              painting and sculpture; and literary clubs for debate, elocution,
              and creative writing. Students also engage in clubs like Robotics,
              Astronomy, Eco Club, and Coding. Regular events like Cultural Day,
              Science Exhibition, and Heritage Week foster teamwork, confidence,
              and leadership skills that complement their academic journey.</p>
          </div>

          <div className="info-card">
            <FaFutbol className="icon" />
            <h3>Sports</h3>
            <p>Variety of sports like football, basketball, and athletics to build physical fitness.</p>
          </div>
        </div>
      </section>

      <CounterSection />
      <ImageCarousel />

      {/* APPLY NOW */}
      <div className="apply-footer-wrapper">
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

        {/* FOOTER */}
        <footer className="footer-section">
          <div className="footer-container">
            <div className="footer-column">
              <h3>Delhi <br /> Public School</h3>
              <p>
                Nyati Estate Rd, Nyati County, Mohammed Wadi<br />
                Pune, Maharashtra 411060
              </p>
              <p>📞 +91 020 26522100</p>
              <p>✉️ dps@example.com</p>
            </div>

            <div className="footer-column">
              <h4>Key Links</h4>
              <ul>
                <li><a href="#">Admissions</a></li>
                <li><a href="#">Online Enquiry</a></li>
                <li><a href="#">MySchoolOne</a></li>
                <li><a href="#">MaiaLearning</a></li>
                <li><a href="#">ManageBac</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <iframe
  title="DPS Pune Map"
  src="https://maps.google.com/maps?q=Delhi%20Public%20School%20Pune%20Nyati%20Estate%20Road%20Mohammed%20Wadi&t=&z=15&ie=UTF8&iwloc=&output=embed"
  width="100%"
  height="300"
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>


            </div>
          </div>
        </footer>
      </div>

      {/* BOTTOM FOOTER */}
      <div className="bottom-footer">
        <p>
          © 2025 Delhi Public School. Developed with <span className="heart">❤️</span>
        </p>
        <div className="social-icons">
          <span className="follow-text">Follow us</span>
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-pinterest-p"></i></a>
          <a href="#"><i className="fab fa-linkedin-in"></i></a>
        </div>
      </div>
    </>
  );
};

export default HeroPage;
