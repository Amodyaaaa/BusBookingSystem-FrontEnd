import React, { useState } from "react";
import "./passangerDetails.css"
const PassangerDetails = ({booking, onClick}) => {
  return (
    <div
      onClick={onClick}
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
          <div className="col-3">
            <div>{`${booking.passenger.firstName} ${booking.passenger.lastName}`}</div>
          </div>
          <div className="col-1 text-center">
            <div>{booking.seatNumber}</div>
          </div>
          <div className="col-2">
            <div>{booking.startPlace}</div>
          </div>
          <div className="col-2">
            <div>{booking.endPlace}</div>
          </div>
          <div className="col-2">
            <div>{new Date(booking.bookingDate).toLocaleDateString()}</div>
          </div>
          <div className="col-2">
            <div>{new Date(booking.bookingDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassangerDetails;
