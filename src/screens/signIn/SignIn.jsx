import React, { useEffect, useState } from "react";
import "./SignIn.css";
import TextInput from "../../components/TextInput/TextInput";
import Button from "../../components/Button/Button";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "./../../assets/images/bus.png";
import { toast, Zoom } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const signUpButtonClicked = async () => {
    if (!email) {
      setEmailError("Enter email");
    } else if (!validator.isEmail(email)) {
      setEmailError("Enter valid email");
    } else if (!password) {
      setPasswordError("Enter password");
    } else if (!validator.isLength(password, { min: 8 })) {
      setPasswordError("Password must be at least 8 characters long");
    } else {
      setLoading(true);
      await axios
        .post("http://localhost:4000/passanger/login", {
          email,
          password,
        })
        .then((res) => {
          if (res.data.success) {
            localStorage.setItem("token", JSON.stringify(res.data.
              passangertoken));
            console.log(res.data.token);
            toast.success("Login successful", {
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

            setTimeout(() => {
              navigate("/");
            }, 2000);
          } else {
            console.log(res.data.result.message);
            toast.error(res.data.result.message, {
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
        })
        .catch((err) => {
          console.log(err);

          if (err.response.data.success === false) {
            toast.error(err.response.data.error, {
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
            toast.error("Error. Please try again", {
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
        })
        .finally(() => {
          setTimeout(() => {
            setLoading(false);
          }, 3000);
        });
    }
  };

  return (
    <div className="signUpPage">
      <div className="boxContainer">
        <div className="imageContainer">
          <div className="imageBox">
            <div className="imgContainerText">
              <h2 className="whiteH2">Login to your account</h2>
              <p className="signUpPageText">
                Book your bus tickets instantly with our seamless and reliable
                online booking system.
              </p>
              <div className=" d-flex justify-content-center align-items-center">
                <div
                  className="loginPageToggleButton"
                  onClick={() => navigate("/signInBus")}
                  style={{
                    width: "210px",
                    borderRadius: "20px",
                    height: "35px",
                    padding: "5px 10px",
                    backgroundColor: "white",
                    color: "#0f2d52",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}>
                  Login as bus
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="signInBox">
          <div className="d-flex" style={{ height: "480px" }}>
            <div style={{ padding: "30px" }} className=" w-100">
              <div>
                <h2 className="header2 mb-2">Passenger Login </h2>
                <div className=" d-flex justify-content-center">
                  {" "}
                  <img src={logo} style={{ width: "130px" }} alt="" />
                </div>
                <span className="small">Do you not have an account?</span>
                <span
                  className="small fw-bold ms-1 login_register_navigate_btn"
                  onClick={() => navigate("/signUp")}>
                  Sign Up
                </span>

                <div className=" mt-2">
                  <TextInput
                    type={"email"}
                    icon={"mail"}
                    placeholder={"Email"}
                    value={email}
                    onChange={(value) => setEmail(value)}
                    errorMessage={emailError}
                    onFocus={() => setEmailError("")}
                  />
                </div>
                <div className=" mt-2">
                  <TextInput
                    type={"password"}
                    icon={"lock"}
                    placeholder={"Password"}
                    value={password}
                    onChange={(value) => setPassword(value)}
                    errorMessage={passwordError}
                    onFocus={() => setPasswordError("")}
                  />
                </div>
                <span
                  className="small  ms-1 login_register_navigate_btn"
                  style={{ textDecoration: "underline" }}
                  onClick={() => navigate("/forgotPassword")}>
                  Forgot password
                </span>
                <div className=" mt-5">
                  <Button
                    loading={loading}
                    type={"1"}
                    text="Sign In"
                    onClick={signUpButtonClicked}
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

export default SignUp;
