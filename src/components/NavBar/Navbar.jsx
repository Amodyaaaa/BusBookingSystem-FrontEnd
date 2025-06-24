import React, { useState } from "react";
import "./navbar.css";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import Logo from "../../assets/images/bus.png";
import { useNavigate } from "react-router-dom";
import AdminPhoto from "../../assets/images/bus.png";
import LogoutNavigationButton from "../logoutNavigationButton/LogoutNavigationButton";
const NavBar = ({ sidebarOpen }) => {
  const navigate = useNavigate();
  const [showLogOut, setShowLogOut] = useState(false);

  const clickedLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");

    navigate("/login");
  };

return (
    <div className="navContainer ">
      {showLogOut && <LogoutNavigationButton setShowLogOut={setShowLogOut} />}
      <Navbar
        expand="lg"
        className={sidebarOpen ? "nav sidebarOpenNav" : "nav sidebarCloseNav"}
        style={{ height: "50px", position: "fixed", right: "0" }}>
        <Navbar.Brand
          href="#home"
          className="d-flex align-items-center ms-auto">
          <img
            style={{ marginLeft: "30px" }}
            src={Logo}
            alt=" Employee Management System"
            height="32"
            className="d-inline-block align-top"
          />
          <span
            style={{ color: "#6b6b6b", fontWeight: "600" }}
            className="ms-4">
            Document Management System
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto"></Nav>
          <span style={{ color: "#6b6b6b", fontWeight: "600" }}>
            <div style={{ marginRight: "40px", fontWeight: "100" }}>
              <div className="d-flex align-items-center">
                <img
                  onClick={() => setShowLogOut(true)}
                  src={AdminPhoto}
                  alt=""
                  style={{ height: "42px" }}
                />
              </div>
            </div>
          </span>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;