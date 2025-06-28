import React, { useEffect, useState } from 'react';
import './NavbarBus.css';
import { NavLink, useLocation,useNavigate } from 'react-router-dom';
import logo from "../../assets/images/bus.png";
import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Swal from 'sweetalert2';

const NavbarBus = () => {
  const [open, setOpen] = useState(false);
  const [busName, setBusName] = useState('');
  const location = useLocation();
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
    const token = localStorage.getItem("bustoken");
    if (token) {
      const decoded = jwtDecode(token);
      const id = decoded._id; // Adjust this based on the actual structure of your token
      axios.get(`http://localhost:4000/bus/getBusById/${id}`)
        .then(response => {
          setBusName(response.data.bus.Bus_name);
        })
        .catch(error => {
          console.error("There was an error fetching the bus data!", error);
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
          <img src={logo} width={150} alt="Bus Logo" />
        </div>
        <div className="nav-links" style={getMenuStyle(open)}>
        
          <NavLink
            to="/indicatePlace"
            className="nav-link"
            onClick={handleOpen}>
            My Location
          </NavLink>
          <NavLink to="/enterRoute" className="nav-link" onClick={handleOpen}>
            My Route
          </NavLink>
          <NavLink to="/addPayment" className="nav-link" onClick={handleOpen}>
            Payment Details
          </NavLink>
          <NavLink to="/busBookings" className="nav-link" onClick={handleOpen}>
            Bookings
          </NavLink>
          <div className="nav-link" onClick={handleLogout}>
            Logout
          </div>
        </div>
        <div className="nav-link-btn" onClick={handleOpen}>
          {!open ? (
            <IoMenu size={30} color="#ffffff" />
          ) : (
            <IoMdClose size={30} color="#ffffff" />
          )}
        </div>
        {document.documentElement.clientWidth > 980 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', position: 'absolute', right: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: '1.2em', fontWeight: 'bold', color: 'black' }}>{busName}</span>
              <span style={{ fontSize: '0.7em', fontWeight: 'bold', color: 'black' }}>Bus</span>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default NavbarBus;
