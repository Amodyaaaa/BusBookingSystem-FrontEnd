// MyBookings.js
import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavbarPassenger/Navbar";
import "./myBookings.css";
import BusDetails from "../../components/busDetails/BusDetails";
import MyBookingModal from "../../components/MyBookingModal";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import background from "../../assets/images/background.jpeg";

const MyBookings = () => {
  const [modalShow, setModalShow] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);


  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : null;
  const id = decodedToken ? decodedToken._id : null;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/busbook/getBookings/${id}`
        );
        if (response.data.success) {
          console.log("Response", response.data);
          setBookings(response.data.bookings);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
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
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          zIndex: 1,
        }}
      />

      <div style={{ position: "relative", zIndex: 2 }}>
        <MyBookingModal show={modalShow} onHide={() => setModalShow(false)} booking={selectedBooking}/>
        <NavBar />
        <div className="bus_details_main_container mybookings-container">
          <div className="d-flex justify-content-center">
            <div className="booking-card-container">
              <div className="d-flex justify-content-center">
                <div className="row align-items-center container-fluid header-row">
                  <div className="col-4 text-center">
                    <div>Bus Name</div>
                  </div>
                  <div className="col-2 text-center">
                    <div>Seats</div>
                  </div>
                  <div className="col-3">
                    <div>From</div>
                  </div>
                  <div className="col-3">
                    <div>To</div>
                  </div>
                </div>
              </div>
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <BusDetails
                    key={booking._id}
                    busName={booking.busId.Bus_name}
                    seatNumber={booking.seatNumber}
                    startPlace={booking.startPlace}
                    endPlace={booking.endPlace}
                    onClick={() => {
                      setSelectedBooking(booking);
                      setModalShow(true)
                    }}
                  />
                ))
              ) : (
                <div className="text-center mt-4 fw-bold" style={{color:'#555'}}>
                  No bookings found.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
