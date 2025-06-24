import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import logo from "../../assets/images/bus.png";
import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import Swal from 'sweetalert2';
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [passangerName, setPassangerName] = useState('');
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(!open);
  };

  const getMenuStyle = (open) => {
    if (document.documentElement.clientWidth <= 980) {
      return { left: open ? 0 : "-100%" };
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      const id = decoded._id; // Adjust this based on the actual structure of your token
      axios.get(`http://localhost:4000/passanger/getPassengerById/${id}`)
        .then(response => {
          setPassangerName(response.data.passenger.firstName + " " + response.data.passenger.lastName);
        })
        .catch(error => {
          console.error("There was an error fetching the passenger data!", error);
        });
    }
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out of your account!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        navigate("/signIn"); // Redirect to login page
      }
    });
  };

  return (
    <div>
      <section className="navbar-container">
        <div className="logo">
          <Link to={"/"}>
            <img src={logo} width={150} alt="Bus Logo" />
          </Link>
        </div>

        {/* Nav links */}
        <div className="nav-links" style={getMenuStyle(open)}>
          <NavLink to="/" className="nav-link" onClick={handleOpen}>
            Home
          </NavLink>
          <NavLink to="/myBookings" className="nav-link" onClick={handleOpen}>
            My Bookings
          </NavLink>
          <NavLink to="/AboutUs" className="nav-link" onClick={handleOpen}>
            About
          </NavLink>
          <NavLink to="/Contact" className="nav-link" onClick={handleOpen}>
            Contact
          </NavLink>
          <NavLink to="/profile" className="nav-link" onClick={handleOpen}>
            Profile
          </NavLink>
          <div className="nav-link" onClick={handleLogout}>
            Logout
          </div>

          {/* Username inside menu for small screens */}
          <div className="navbar-username-mobile">
            {passangerName} <br /> Passenger
          </div>
        </div>

        {/* Hamburger menu button */}
        <div className="nav-link-btn" onClick={handleOpen}>
          {!open ? (
            <IoMenu size={30} color="#fff" />
          ) : (
            <IoMdClose size={30} color="#231541" />
          )}
        </div>

        {/* Username top right for large screens */}
        <div className="navbar-username">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: '1.2em', fontWeight: 'bold', color: 'black' }}>{passangerName}</span>
            <span style={{ fontSize: '0.7em', fontWeight: 'bold', color: 'black' }}>Passenger</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Navbar;
