import React from "react";
import "./busDetails.css";

const BusDetails = ({ busName, seatNumber, startPlace, endPlace, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="container-fluid mt-1 bus_details_container p-0"
    >
      <div className="d-flex justify-content-center">
        <div
          className="row align-items-center container-fluid"
          style={{
            height: "45px",
            color: "#353434dd",
            fontSize: "15px",
            borderBottom: "1px solid #959595",
            borderRadius: "4px",
          }}
        >
          <div className="col-4">
            <div>{busName}</div>
          </div>
          <div className="col-2 text-center">
            <div>{seatNumber}</div>
          </div>
          <div className="col-3">
            <div>{startPlace}</div>
          </div>
          <div className="col-3">
            <div>{endPlace}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusDetails;
