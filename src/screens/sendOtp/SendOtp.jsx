import React, { useState, useEffect } from "react";
import logo from "./../../assets/images/bus.png";
import TextInput from "../../components/TextInput/TextInput";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";

const SendOtp = () => {
  const [counter, setCounter] = useState(120);
  const [email, setEmail] = useState("");

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
          We will send an OTP to your email address. You can use it to reset
          your password.
        </div>

        <div className=" d-flex justify-content-center mt-3">
          <div style={{ width: "100%" }}>
            {" "}
            <TextInput
              type="email"
              icon={"mail"}
              placeholder="Enter email"
              value={email}
              onChange={(value) => setEmail(value)}
            />
          </div>
        </div>
        <div className=" d-flex justify-content-center">
          {" "}
          <div style={{ width: "150px" }} className=" mt-3">
            <Button
              loading={false}
              type={"1"}
              text="Send"
              onClick={() => console.log("df")}
            />
          </div>
        </div>

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

export default SendOtp;
