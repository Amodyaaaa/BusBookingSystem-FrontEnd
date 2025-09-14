import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavbarPassenger/Navbar";
import "./seatBookingPage.css";
import Button from "../../components/Button/Button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import background from "../../assets/images/background.jpeg";

const SeatBookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [busData, setBusData] = useState({});
  const [busLocations, setBusLocations] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [startPlace, setStartPlace] = useState("");
  const [endPlace, setEndPlace] = useState("");


  const findAvailability = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/busbook/checkAvailableSeats`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          },
          params: {
            busId: id,
            bookingDate: "05-06-2024",
          },
        }
      );
      if (response.data.success) {
        console.log("🚀 ~ getBusDetails ~ response.data:", response.data);
        // Handle available seats data if needed
      } else {
        console.error("Failed to find availability");
      }
    } catch (error) {
      console.error("Error finding availability:", error);
    }
  };

  const getBusDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/bus/getBusLocationbyBusID/${id}`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          },
        }
      );
      if (response.data.success) {
        setBusData(response.data.bus);
      } else {
        console.error("Failed to get bus details");
      }
    } catch (error) {
      console.error("Error getting bus details:", error);
    }
  };

  const getBusPlaces = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/bus/getLocations/${id}`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          },
        }
      );
      if (response.data.success) {
        setBusLocations(response.data?.bus?.places || []);
      } else {
        console.error("Failed to get bus locations");
      }
    } catch (error) {
      console.error("Error getting bus locations:", error);
    }
  };

  useEffect(() => {
    getBusDetails();
    getBusPlaces();
  }, [id]);

  const handleBookSeats = () => {
    const seatCount = selectedSeats.length;
    const seatNumbers = selectedSeats.map((seat) => seat + 1);
    navigate(`/paymentForm?seatcount=${seatCount}&busId=${id}&startPlace=${startPlace}&endPlace=${endPlace}&seats=${seatNumbers.join(",")}`);
  };

  const handleSeatSelection = (index) => {
    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(index)) {
        return prevSelectedSeats.filter((seat) => seat !== index);
      } else {
        return [...prevSelectedSeats, index];
      }
    });
  };


  const totalSeats = busData.seat_count || 0;
  const lastRowSeats = totalSeats > 5 ? 5 : totalSeats;
  const mainSeats = totalSeats > 5 ? totalSeats - 5 : 0;

  const cards = Array.from({ length: totalSeats });

  // Split main seats into rows of 5 (3 left + 2 right)
  const rows = [];
  for (let i = 0; i < mainSeats; i += 5) {
    rows.push(cards.slice(i, i + 5));
  }


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
      <NavBar />
      <div
        className="bus_details_main_container"
        style={{
          paddingTop: "20px",
          height: "100%",
          padding: "20px 100px 0px",
        }}
      >
        <div className="d-flex justify-content-center">
          <div
            style={{
              width: "760px",
              backgroundColor: "rgb(255,255,255,0.9)",
              padding: "25px 40px",
              borderRadius: "8px",
              zIndex: 2 
            }}
          >
            <div className="d-flex justify-content-center fw-bold" style={{ fontSize: "20px" }}>
              Book a Seat
            </div>
            <div className="d-flex gap-4 justify-content-center align-items-center mt-2">
              <div>
                <select
                  style={{
                    width: "180px",
                    height: "38px",
                    margin: "5px 0",
                    borderRadius: "5px",
                    border: "1px solid #c2c2c2",
                    color: "gray",
                    fontSize: "15px",
                  }}
                  defaultValue=""
                  onChange={(e) => setStartPlace(e.target.value)}
                >
                  <option style={{ color: "gray" }} value="" disabled hidden>
                    Start Place
                  </option>
                  {busLocations.map((location, index) => (
                    <option key={index} value={location} style={{ color: "black" }}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <select
                  style={{
                    width: "180px",
                    height: "38px",
                    margin: "5px 0",
                    borderRadius: "5px",
                    border: "1px solid #c2c2c2",
                    color: "gray",
                    fontSize: "15px",
                  }}
                  defaultValue=""
                  onChange={(e) => setEndPlace(e.target.value)}
                >
                  <option style={{ color: "gray" }} value="" disabled hidden> {/* selected */}
                    End Place
                  </option>
                  {busLocations.map((location, index) => (
                    <option key={index} value={location} style={{ color: "black" }}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ width: "180px" }}>
                <Button onClick={findAvailability} type="1" text="Find Available Seats" />
              </div>
            </div>
            {/* <div className="d-flex justify-content-center mt-3">
              <div className="seats_container">
                {cards.map((_, index) => (
                  <div
                    key={index}
                    className="d-flex justify-content-center align-items-center"
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: "#d1d6d7",
                      position: "relative",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedSeats.includes(index)}
                      onChange={() => handleSeatSelection(index)}
                      style={{ scale: "1.4" }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "-10px",
                        fontSize: "12px",
                      }}
                    >
                      {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div> */}

            <div className="d-flex justify-content-center mt-3">
              <div className="d-flex flex-column gap-2">
                {/* Last row at the TOP */}
                {lastRowSeats > 0 && (
                  <div className="d-flex justify-content-center gap-3 mb-3">
                    {cards.slice(mainSeats, mainSeats + lastRowSeats).map((_, i) => {
                      const seatNumber = mainSeats + i;
                      return (
                        <div
                          key={seatNumber}
                          className="d-flex justify-content-center align-items-center"
                          style={{
                            width: "40px",
                            height: "40px",
                            backgroundColor: "#d1d6d7",
                            position: "relative",
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={selectedSeats.includes(seatNumber)}
                            // disabled={selectedSeats.length === 1 && !selectedSeats.includes(seatNumber)} // disable other seats
                            onChange={() => handleSeatSelection(seatNumber)}
                            style={{ scale: "1.4" }}
                          />
                          <div style={{ position: "absolute", top: "-10px", fontSize: "12px" }}>
                            {seatNumber + 1}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Main rows from bottom to top */}
                {rows
                  .slice()
                  .reverse()
                  .map((row, rowIndex) => {
                    const realRowIndex = rows.length - 1 - rowIndex;
                    return (
                      <div
                        key={realRowIndex}
                        className="d-flex gap-5 justify-content-center"
                      >
                        {/* Left side (3 seats) */}
                        <div className="d-flex gap-2">
                          {row.slice(0, 3).map((_, i) => {
                            const seatNumber = realRowIndex * 5 + i;
                            return (
                              <div
                                key={seatNumber}
                                className="d-flex justify-content-center align-items-center"
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  backgroundColor: "#d1d6d7",
                                  position: "relative",
                                }}
                              >
                                <input
                                  type="checkbox"
                                  checked={selectedSeats.includes(seatNumber)}
                                  // disabled={selectedSeats.length === 1 && !selectedSeats.includes(seatNumber)} // disable other seats
                                  onChange={() => handleSeatSelection(seatNumber)}
                                  style={{ scale: "1.4" }}
                                />
                                <div
                                  style={{
                                    position: "absolute",
                                    top: "-10px",
                                    fontSize: "12px",
                                  }}
                                >
                                  {seatNumber + 1}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Right side (2 seats) */}
                        <div className="d-flex gap-2">
                          {row.slice(3, 5).map((_, i) => {
                            const seatNumber = realRowIndex * 5 + 3 + i;
                            return (
                              <div
                                key={seatNumber}
                                className="d-flex justify-content-center align-items-center"
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  backgroundColor: "#d1d6d7",
                                  position: "relative",
                                }}
                              >
                                <input
                                  type="checkbox"
                                  checked={selectedSeats.includes(seatNumber)}
                                  // disabled={selectedSeats.length === 1 && !selectedSeats.includes(seatNumber)} // disable other seats
                                  onChange={() => handleSeatSelection(seatNumber)}
                                  style={{ scale: "1.4" }}
                                />
                                <div
                                  style={{
                                    position: "absolute",
                                    top: "-10px",
                                    fontSize: "12px",
                                  }}
                                >
                                  {seatNumber + 1}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>



            <div className="d-flex mt-2 justify-content-center">
              <div style={{ width: "100px", marginTop:'2rem'}}>
                <Button type="1" text="Book" onClick={handleBookSeats} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatBookingPage;
