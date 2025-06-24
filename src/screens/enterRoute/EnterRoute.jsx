import React, { useEffect, useState } from "react";
import NavbarBus from "../../components/NavbarBus/NavbarBus";
import "./EnterRoute.css";
import MyBookingModal from "../../components/MyBookingModal";
import TextInput from "../../components/TextInput/TextInput";
import Button from "../../components/Button/Button";
import { FiPlus } from "react-icons/fi";
import AddPlaceModal from "../../components/AddPlaceModal";
import background from "../../assets/images/bushomebackground.jpg"; 
import axios from "axios";


const EnterRoute = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [segments, setSegments] = React.useState([]);
  const [routeNo, setRouteNo] = React.useState("");
  const [routeNoError, setRouteNoError] = React.useState("");
  const [fixedRouteNo, setFixedRouteNo] = React.useState("");
  const [feePerKm, setFeePerKm] = useState("");
  const [feePerKmError, setFeePerKmError] = useState("");


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
        console.log(response.data.busRoot.root_number);
        setFixedRouteNo(response.data.busRoot.root_number);
        setSegments(response.data.busRoot.segments);
      } 
    } catch (error) {
      
    }
  };
  useEffect(() => {
    getRouteData();
  }, []);

  const saveRouteNo = () => {
    let hasError = false;
  
    if (routeNo === "") {
      setRouteNoError("Enter Route No");
      hasError = true;
    }
  
    if (feePerKm === "" || isNaN(feePerKm) || parseFloat(feePerKm) <= 0) {
      setFeePerKmError("Enter valid fee per km");
      hasError = true;
    }
  
    if (hasError) return;
  
    setFixedRouteNo(routeNo);
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
    
    {/* Page content */}
    <div style={{ position: "relative", zIndex: 2 }}>
      <AddPlaceModal
        routeNo={fixedRouteNo}
        show={modalShow}
        onHide={() => setModalShow(false)}
        segments={segments}
        setSegments={setSegments}
      />
      
      <NavbarBus />
      
      <div
        className="bus_details_main_container"
        style={{
          paddingTop: "20px",
          padding: "20px 5vw",
        }}
      >
        <div className="d-flex justify-content-center">
          <div
            style={{
              maxWidth: "760px",
              width: "100%",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
              <div className=" d-flex justify-content-center ">
                <div style={{ fontSize: "20px" }} className=" fw-bold">
                  Bus Route
                </div>
              </div>
              {fixedRouteNo === "" && (
                <div className="d-flex align-items-center gap-3 justify-content-center enter-route-input-group">
                  <div style={{display:'flex', flexDirection:'row', gap:'1rem'}}>
                    <TextInput
                      onFocus={() => setRouteNoError("")}
                      errorMessage={routeNoError}
                      type="text"
                      value={routeNo}
                      onChange={(value) => setRouteNo(value)}
                      placeholder="Enter Bus Route No"
                    />
                    <TextInput
                      onFocus={() => setFeePerKmError("")}
                      errorMessage={feePerKmError}
                      type="text"
                      value={feePerKm}
                      onChange={(value) => setFeePerKm(value)}
                      placeholder="Fee per 1km"
                    />
                  </div>
                  <div style={{ height: "36px", width: "80px" }}>
                    <Button text="Save" type="1" onClick={saveRouteNo} />
                  </div>
                </div>
              )}

              {fixedRouteNo !== "" && (
                <div className="  text-center d-flex gap-2 justify-content-center">
                  <div className=" fw-bold"> Route No : </div>{" "}
                  <div> {fixedRouteNo}</div>
                </div>
              )}
              {fixedRouteNo && (
                <div className=" d-flex justify-content-center align-items-center mt-2 mb-2">
                  <div className=" fw-bold ">Segments of the bus route</div>
                </div>
              )}
              {segments.map((segment) => (
                <div
                  className=" row justify-content-evenly segment-row"
                  style={{
                    height: "50px",
                    backgroundColor: "#d5d3d3",
                    borderRadius: "5px",
                    marginBottom: "5px",
                  }}>
                  <div className=" col-6">
                    <div className=" d-flex gap-2">
                      <div className=" fw-bold">Start :</div>
                      <div>{segment.start_place}</div>
                    </div>
                    <div className=" d-flex gap-2">
                      <div className=" fw-bold">Distance :</div>
                      <div>{segment.distance}</div>
                    </div>
                  </div>
                  <div className=" col-6">
                    <div className=" d-flex gap-2">
                      <div className=" fw-bold">End :</div>
                      <div>{segment.end_place}</div>
                    </div>
                    <div className=" d-flex gap-2">
                      <div className=" fw-bold">Travel Time :</div>
                      <div>{segment.travel_time}</div>
                    </div>
                  </div>
                </div>
              ))}
              {fixedRouteNo && (
                <div className=" d-flex justify-content-center align-items-center my-2">
                  {" "}
                  <div
                    className=" d-flex justify-content-center align-items-center fw-bold routeAddButton"
                    onClick={() => setModalShow(true)}
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: "#aaa",
                      borderRadius: "50%",
                      fontSize: "24px",
                      color: "#0f2d52",
                    }}>
                    <FiPlus />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default EnterRoute;
