import React from "react";
import "./contact.css";
import { MdLocationPin } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { FaEnvelope } from "react-icons/fa";
import Navbar from "../../components/NavbarPassenger/Navbar";
import background from "../../assets/images/background.jpeg";

const Contact = () => {
  return (
    <div
      className="contact-page-wrapper"
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
      <div className="overlay" />
      <Navbar />
      <div className="contact-container">
        <div className="contact-top">
          <div className="contact-main">
            <h1>Contact Us</h1>
            <p>
              Please let us know if you have a question or want to leave a comment.
            </p>
            <hr />
            <div className="contact-details">
              <h3>Contact Details</h3> <br />
              <p>
                <MdLocationPin style={{ marginRight: "6px" }} />
                Redeye Solution, No.13, Kandy Road, Mawathagama
              </p>
              <br />
              <p>
                <FaPhone style={{ marginRight: "6px" }} /> 037 2297555, 077 7774132</p> <br />
              <p>
                <FaEnvelope style={{ marginRight: "6px" }} />
                srsrisuranga@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
