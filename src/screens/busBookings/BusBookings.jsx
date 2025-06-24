import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../../components/NavbarPassenger/Navbar";
import "./busBookings.css";
import PassangerDetails from "../../components/passangerDetails/PassangerDetails";
import { jwtDecode } from "jwt-decode";

const BusBookings = () => {
  const [bookings, setBookings] = useState([]);

  
  useEffect(() => {
    // Retrieve the token from local storage
    const token = JSON.parse(localStorage.getItem("bustoken"));
    const decodedToken = jwtDecode(token);
    const busId = decodedToken._id;


    if (token) {
      // Decode the token to get the user ID
      console.log(token)
      // Fetch bookings using the user ID
      axios
        .get(`http://localhost:4000/busbook/getbusBookings/${busId}`)
        .then((response) => {
          if (response.data.success) {
            setBookings(response.data.bookings);
          }
        })
        .catch((error) => {
          console.error("There was an error fetching the bookings!", error);
        });
    }
  }, []);

  return (
    <div>
      <NavBar />
      <div
        className="bus_details_main_container"
        style={{
          paddingTop: "20px",
          backgroundColor: "#e0e0e0",
          height: "100%",
          padding: "20px 100px 0px",
        }}>
        <div className="d-flex justify-content-center">
          <div
            style={{
              width: "760px",
              backgroundColor: "white",
              padding: "30px 40px",
              borderRadius: "5px",
              fontSize: "20px",
            }}>
            <div className="d-flex justify-content-center">
              <div
                className="row align-items-center container-fluid"
                style={{
                  height: "45px",
                  color: "#353434dd",
                  backgroundColor: "#aaa",
                  fontSize: "16px",
                  fontWeight: "bold",
                  borderRadius: "4px",
                }}>
                <div className="col-4 text-center">
                  <div>User Name</div>
                </div>
                <div className="col-2 text-center">
                  <div>Seat No</div>
                </div>
                <div className="col-3">
                  <div>From</div>
                </div>
                <div className="col-3">
                  <div>To</div>
                </div>
              </div>
            </div>
            {bookings.map((booking, index) => (
              <PassangerDetails key={index} booking={booking} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusBookings;
