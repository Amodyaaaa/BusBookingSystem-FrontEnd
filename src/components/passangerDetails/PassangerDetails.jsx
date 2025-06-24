import React, { useState } from "react";
import "./passangerDetails.css"
const PassangerDetails = ({booking}) => {
  return (
    <div
      onClick={() => console.log("user clicked")}
      className="container-fluid mt-1 bus_details_container"
      style={{ padding: "0" }}>
      <div className="d-flex justify-content-center">
        <div
          className="row align-items-center container-fluid"
          style={{
            height: "45px",
            color: "#353434dd",
            fontSize: "15px",
            borderBottom: "1px solid #959595",
            borderRadius: "4px",
          }}>
          <div className="col-4">
            <div>{`${booking.passenger.firstName} ${booking.passenger.lastName}`}</div>
          </div>
          <div className="col-2 text-center">
            <div>{booking.seatNumber}</div>
          </div>
          <div className="col-3">
            <div>{booking.startPlace}</div>
          </div>
          <div className="col-3">
            <div>{booking.endPlace}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassangerDetails;
