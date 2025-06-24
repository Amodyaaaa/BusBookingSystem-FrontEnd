import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavbarPassenger/Navbar";
import "./busDetails.css";
import Button from "./../../components/Button/Button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { MdOutlineLocationOn } from "react-icons/md";
import background from "../../assets/images/background.jpeg";

const BusDetails = () => {
  const { id } = useParams();
  const [busData, setBusData] = useState({});
  const [segments, setSegments] = useState([]);
  const [currentLocation, setCurrentLocation] = useState({});
  
  const getBusDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/bus/getBusLocationbyBusID/${id}`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      if (response.data.success) {
        setBusData(response.data.bus)
        setSegments(response.data.bus.segments.segments); 
        setCurrentLocation(response.data.latestArrival);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBusDetails();
  }, [id]);
  const navigate = useNavigate();

    const timeOptions = { hour: "2-digit", minute: "2-digit" };
  return (
    
    <div>
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
          }}>
          <div className=" d-flex justify-content-center">
            {" "}
            <div
              style={{
                width: "660px",
                backgroundColor: "white",
                padding: "30px 40px",
                borderRadius: "5px",
                fontSize: "20px",
                zIndex:2,
              }}>
              <div className=" d-flex justify-content-center">
                <div style={{ fontSize: "24px", fontWeight: "bold" }}>
                  {busData.Bus_name}
                </div>
              </div>
              <div className=" d-flex gap-3">
                <div style={{ fontWeight: "bold" }}>From :</div>
                <div>{segments[0]?.start_place}</div>
              </div>
              <div className=" d-flex gap-3">
                <div style={{ fontWeight: "bold" }}>To :</div>
                <div>{segments[segments.length - 1]?.end_place}</div>
              </div>
              <div className=" d-flex gap-3">
                <div style={{ fontWeight: "bold" }}>Starting time :</div>
                <div>
                  {new Date(busData.segments?.start_time).toLocaleString(
                    undefined,
                    timeOptions
                  )}
                </div>
              </div>
              <div className=" d-flex justify-content-center">
                <div style={{ fontSize: "24px", fontWeight: "bold" }}>
                  Location Segments
                </div>
              </div>
              {segments.map((segment, index) => (
                <div key={index} className="row my-1">
                  <div className=" col-4 text-center ">
                    {segment.start_place}
                  </div>
                  <div className=" col-1 text-center">-</div>

                  <div className=" col-4 text-center ">
                    {" "}
                    {segment.end_place}
                  </div>
                  <div className=" col-3 text-center">
                    {segment?._id === currentLocation?.segmentId && (
                      <MdOutlineLocationOn
                        style={{ fontSize: "22px", color: "#0f2d52" }}
                      />
                    )}
                  </div>
                </div>
              ))}
              {!currentLocation && (
                <div
                  className=" text-center"
                  style={{ color: "red", fontSize: "15px" }}>
                  The bus has not confirmed its current location yet
                </div>
              )}
              <div className=" d-flex justify-content-center mt-3">
                <div style={{ width: "130px" }}>
                  {" "}
                  <Button
                    type="1"
                    text="Book a Seat"
                    onClick={() => navigate(`/bookingSeat/${id}`)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusDetails;
