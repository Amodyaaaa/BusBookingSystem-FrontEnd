import React, { useState, useEffect } from "react";
import axios from "axios";
import NavbarBus from "../../components/NavbarBus/NavbarBus";
import "./busBookings.css";
import PassangerDetails from "../../components/passangerDetails/PassangerDetails";
import { jwtDecode } from "jwt-decode";
import background from "../../assets/images/bushomebackground.jpg";
import ViewPassengerModal from "../../components/ViewPassengerModal";
import { FaSearch } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";

const BusBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filteredBookings, setFilteredBookings] = useState([]);



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
            setFilteredBookings(response.data.bookings);
          }
        })
        .catch((error) => {
          console.error("There was an error fetching the bookings!", error);
        });
    }
  }, []);

  const handleSearch = () => {
    
    const from = fromDate ? new Date(fromDate + "T00:00:00").getTime() : null;
    const to = toDate ? new Date(toDate + "T23:59:59").getTime() : null;
    console.log("Clicked: ",{from},{to});

    const filtered = bookings.filter((booking) => {
      const bookingDate = new Date(booking.bookingDate).getTime();
      console.log("DB Date: ",{bookingDate});
      if (from && to) {
        return bookingDate >= from && bookingDate <= to;
      } else if (from) {
        return bookingDate >= from;
      } else if (to) {
        return bookingDate <= to;
      } else {
        return true; // no filter applied
      }
    });

    setFilteredBookings(filtered);
  };

  const clearFilters = () => {
    setFromDate(""); 
    setToDate(""); 
    setFilteredBookings(bookings);
  };

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
        <ViewPassengerModal show={modalShow} onHide={() => setModalShow(false)} booking={selectedBooking} />
        <NavbarBus />
        <div
          className="bus_details_main_container"
          style={{
            paddingTop: "20px",
            padding: "20px 100px 0px",
          }}
        >

          <div className="d-flex justify-content-center">
            <div className="bus-details-container">
              {/* Filters */}
              <div className="filters-container">
                <div className="filter-input-wrapper">
                  <label>From</label>
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                </div>

                <div className="filter-input-wrapper">
                  <label>To</label>
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </div>

                <div className="filter-button-wrapper">
                  <label>Search</label>
                  <button onClick={handleSearch}>
                    <FaSearch />
                  </button>
                </div>

                <div className="filter-button-wrapper">
                  <label>Clear</label>
                  <button onClick={clearFilters}>
                    <FaTimes />
                  </button>
                </div>
              </div>
              {/* Filters-End */}

              <div className="d-flex justify-content-center">
                <div className="row align-items-center container-fluid table-header">
                  <div className="col-3 text-center">User Name</div>
                  <div className="col-1 text-center">Seat</div>
                  <div className="col-2">From</div>
                  <div className="col-2">To</div>
                  <div className="col-2">Date</div>
                  <div className="col-2">Time</div>
                </div>
              </div>

              {filteredBookings.map((booking, index) => (
                <PassangerDetails
                  key={index}
                  booking={booking}
                  onClick={() => {
                    setSelectedBooking(booking);
                    setModalShow(true);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusBookings;
