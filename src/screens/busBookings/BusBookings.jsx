import React, { useState, useEffect } from "react";
import axios from "axios";
import NavbarBus from "../../components/NavbarBus/NavbarBus";
import "./busBookings.css";
import PassangerDetails from "../../components/passangerDetails/PassangerDetails";
import { jwtDecode } from "jwt-decode";
import background from "../../assets/images/bushomebackground.jpg"; // ✅ Import background

const BusBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("bustoken"));
    const decodedToken = jwtDecode(token);
    const busId = decodedToken._id;

    if (token) {
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
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        width: "100%",
        position: "relative",
      }}
    >
      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          zIndex: 1,
        }}
      />

      <div style={{ position: "relative", zIndex: 2 }}>
        <NavbarBus />
        <div
          className="bus_details_main_container"
          style={{
            paddingTop: "20px",
            padding: "20px 100px 0px",
          }}
        >
          <div className="d-flex justify-content-center">
            <div
              style={{
                width: "760px",
                backgroundColor: "rgba(255,255,255,0.9)",
                padding: "30px 40px",
                borderRadius: "5px",
                fontSize: "20px",
              }}
            >
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
                  }}
                >
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
    </div>
  );
};

export default BusBookings;
