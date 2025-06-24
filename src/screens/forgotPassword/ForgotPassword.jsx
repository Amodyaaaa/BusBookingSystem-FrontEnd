import React, { useState, useEffect } from "react";
import logo from "./../../assets/images/bus.png";
import TextInput from "../../components/TextInput/TextInput";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";

const ForgotPassword = () => {
  const [counter, setCounter] = useState(120);
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    if (counter > 0) {
      const timer = setInterval(() => {
        setCounter((prevCounter) => prevCounter - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [counter]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "#eaeaea", height: "100vh" }}>
      <div
        style={{
          width: "400px",
          height: "400px",
          backgroundColor: "white",
          borderRadius: "10px",
          padding: "20px",
        }}>
        <div className="d-flex justify-content-center">
          <img src={logo} style={{ width: "130px" }} alt="" />
        </div>
        <div style={{ fontSize: "14px" }}>
          An email has been sent to you. Please enter the OTP number. The OTP
          will expire within 2 minutes.
        </div>
        <div
          style={{
            fontSize: "14px",
            textAlign: "center",
            marginTop: "20px",
            color: "gray",
          }}>
          OTP will expire in: {formatTime(counter)}
        </div>
        <div className=" d-flex justify-content-center mt-3">
          <div style={{ width: "200px" }}>
            {" "}
            <TextInput
              type="password"
              icon={"lock"}
              placeholder="Enter OTP"
              value={otp}
              onChange={(value) => setOtp(value)}
            />
          </div>
        </div>
        <div className=" d-flex justify-content-center"> <div style={{width:"150px"}} className=" mt-3">
          <Button
            loading={false}
            type={"1"}
            text="Verify"
            onClick={() => console.log("df")}
          />
        </div></div>
       
        <div className=" mt-4 d-flex justify-content-center">
          {" "}
          <span className="small">Do you not have an account?</span>
          <span
            className="small fw-bold ms-1 login_register_navigate_btn"
            onClick={() => navigate("/signUp")}>
            Sign Up
          </span>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
