import React from "react";
import "./About.css";
import Navbar from "../../components/NavbarPassenger/Navbar";
import background from "../../assets/images/background.jpeg";

const About = () => {
  return (
    <div
      className="about-page-wrapper"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <div className="overlay"></div>
      <Navbar />
      <div
        className="about-container"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="about-description">
          <div className="about-left">
            <h2>About Us</h2>
            <p className="about p1">
              To contribute to a more effective and user-friendly public
              transport system, reducing congestion and promoting better urban
              living. Join us on our journey to revolutionize the way people
              experience bus travel.
            </p>
          </div>

          <div className="about-right">
            <h2>Our Vision</h2>
            <p>
              Our vision is to empower passengers and transit operators with
              reliable information, ultimately making bus services more
              efficient, attractive, and accessible.
            </p>
            <br /> <br />
            <h2>Our Mission</h2>
            <p>
              Our mission is to revolutionize public transportation by
              developing a comprehensive solution that enhances the efficiency
              and reliability of bus services. By integrating GPS tracking and
              predictive analytics
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
