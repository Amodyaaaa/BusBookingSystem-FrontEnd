import React, { useEffect, useState } from "react";
import NavbarBus from "../../components/NavbarBus/NavbarBus";
import "./indicatePlace.css";
import axios from "axios";
import { toast, Zoom } from "react-toastify";
import background from "../../assets/images/bushomebackground.jpg"; // Adjust the path as needed

const IndicatePlace = () => {
  const [segments, setSegments] = React.useState([]);
  const [currentLocation, setCurrentLocation] = useState("");

  const getRouteData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/busroot/getBusRootBybusId",
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("bustoken")
            )}`,
          },
        }
      );
      if (response.data.success) {
        setSegments(response.data.busRoot.segments);
      }
    } catch (error) {}
  };

  const getCurrentLocation = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/bus/getBusLocation",
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("bustoken")
            )}`,
          },
        }
      );
      if (response.data.success) {
        setCurrentLocation(response.data?.latestArrival?.segmentId);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getRouteData();
    getCurrentLocation();
  }, []);

  const updateBusLocation = async (segment) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/bus/placeConfirm",
        {
          segmentId: segment._id,
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("bustoken")
            )}`,
          },
        }
      );
      if (response.data.success) {
        getCurrentLocation();
        toast.success("Location update successful", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Zoom,
        });
      } else {
        toast.error("Location update failed", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Zoom,
        });
      }
    } catch (error) {
      toast.error("Location update failed", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Zoom,
      });
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
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
          backgroundColor: "rgba(0, 0, 0, 0.3)", // Overlay with transparency
          zIndex: 1,
        }}
      />
      <div style={{ position: "relative", zIndex: 2 }}>
        <NavbarBus />
        <div
          className="bus_details_main_container"
          style={{
            paddingTop: "20px",
            ackgroundColor: "rgba(255,255,255,0.9)",
            padding: "20px 5vw",
            borderRadius: "10px",

          }}
        >
          <div className="d-flex justify-content-center" style={{marginTop:"25px"}}>
            <div
              style={{
                maxWidth: "760px",
                width: "100%",
                backgroundColor: "rgba(255,255,255,0.9)",
                padding: "20px",
                borderRadius: "10px",
              }}
            >
              <div
                className="text-center fw-bold"
                style={{ fontSize: "20px" }}
              >
                Indicate Bus Location
              </div>
              <div className="text-center mb-2">
                Select your current location
              </div>
              {segments.map((segment, index) => (
                <div
                  key={index}
                  className="row my-1"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.8)", // Card background
                    padding: "10px",
                    borderRadius: "5px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    marginBottom: "10px",
                    cursor: "pointer",
                    transition: "transform 0.2s ease-in-out",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.03)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <div className="col-4 text-center fw-bold">
                    {segment.start_place}
                  </div>
                  <div className="col-1 text-center">-</div>
                  <div className="col-4 text-center fw-bold">
                    {segment.end_place}
                  </div>
                  <div className="col-3 text-center">
                    <input
                      checked={currentLocation === segment?._id}
                      style={{ scale: "1.2" }}
                      onChange={() => updateBusLocation(segment)}
                      type="radio"
                      name="a"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndicatePlace;
