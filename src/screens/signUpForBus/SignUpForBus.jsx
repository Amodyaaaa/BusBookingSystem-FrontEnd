import React, { useEffect, useState } from "react";
import "./SignUp.css";
import TextInput from "../../components/TextInput/TextInput";
import Button from "../../components/Button/Button";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "./../../assets/images/bus.png";
import { toast, Zoom } from "react-toastify";

const SignUpForBus = () => {
  const navigate = useNavigate();
  const [busName, setBusName] = useState("");
  const [seatCount, setSeatCount] = useState("");
  const [numberPlate, setNumberPlate] = useState("");
  const [registerProvince, setRegisterProvince] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  
  const [busNameError, setBusNameError] = useState("");
  const [seatCountError, setSeatCountError] = useState("");
  const [numberPlateError, setNumberPlateError] = useState("");
  const [registerProvinceError, setRegisterProvinceError] = useState("");
  const [startPlaceError, setStartPlaceError] = useState("");
  const [endPlaceError, setEndPlaceError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const signUpButtonClicked = async () => {
    if (!busName) {
      setBusNameError("Enter bus name");
    } else if (!numberPlate) {
      setNumberPlateError("Enter registration number");
    } else if (!seatCount) {
      setSeatCountError("Enter seat count");
    } else if (!registerProvince) {
      setRegisterProvinceError("Enter province");
    } else if (!validator.isEmail(email)) {
      setEmailError("Enter valid email");
    }  else if (!password) {
      setPasswordError("Enter password");
    } else if (!validator.isLength(password, { min: 8 })) {
      setPasswordError("Password must be at least 8 characters long");
    }  else {
      setLoading(true);
      await axios
        .post("http://localhost:4000/bus/addBus", {
          Bus_name: busName,
          seat_count: seatCount,
          bus_type: "2*2",
          number_plate: numberPlate,
          register_province: registerProvince,
          email,
          password,
        })
        .then((res) => {
          if (res.data.success) {
            localStorage.setItem("bustoken", JSON.stringify(res.data.bustoken));
            toast.success("Registration successful", {
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
            toast.error(res.err, {
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
          setTimeout(() => {
            navigate("/enterRoute");
          }, 2000);
        })
        .catch((err) => {
          console.log(err.response.data);
          console.log(err.response.data.error);
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
            toast.error("Registration error. Please try again", {
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
              <h2 className="whiteH2">Create your account</h2>
              <p className="signUpPageText">
                Book your bus tickets instantly with our seamless and reliable
                online booking system.
              </p>
            </div>
          </div>
        </div>
        <div className="signInBox">
          <div className="d-flex" style={{ height: "480px" }}>
            <div style={{ padding: "30px" }} className="w-100">
              <div>
                <h2 className="header2 mb-2">Bus Sign Up</h2>

                <span className="small">Already have an account ?</span>
                <span
                  className="small fw-bold ms-1 login_register_navigate_btn"
                  onClick={() => navigate("/signInBus")}
                  style={{ textDecoration: "underline" }}>
                  Sign In
                </span>

                <div className="mt-2">
                  <TextInput
                    type={"text"}
                    icon={"profile"}
                    placeholder={"Bus Name"}
                    value={busName}
                    onChange={(value) => setBusName(value)}
                    errorMessage={busNameError}
                    onFocus={() => setBusNameError("")}
                  />
                </div>
                <div className="mt-2">
                  <TextInput
                    type={"text"}
                    placeholder={"Registration Number (number plate)"}
                    value={numberPlate}
                    onChange={(value) => setNumberPlate(value)}
                    errorMessage={numberPlateError}
                    onFocus={() => setNumberPlateError("")}
                  />
                </div>
                <div className="d-flex justify-content-between">
                  <div style={{ width: "49%" }}>
                    <TextInput
                      type={"number"}
                      placeholder={"Seat count"}
                      value={seatCount}
                      onChange={(value) => setSeatCount(value)}
                      errorMessage={seatCountError}
                      onFocus={() => setSeatCountError("")}
                    />
                  </div>
                  <div style={{ width: "49%" }}>
                    {registerProvinceError && (
                      <div className="errorMessageShow">
                        {registerProvinceError}
                      </div>
                    )}
                    <select
                      className={registerProvinceError ? "inputLineError" : ""}
                      name="province"
                      onChange={(e) => setRegisterProvince(e.target.value)}
                      onFocus={() => setRegisterProvinceError("")}
                      style={{
                        width: "100%",
                        height: "38px",
                        margin: "5px 0",
                        borderRadius: "5px",
                        border: "1px solid #c2c2c2",
                        color: "gray",
                        fontSize: "15px",
                      }}>
                      <option
                        style={{ color: "gray" }}
                        value=""
                        disabled
                        selected
                        hidden>
                        Province
                      </option>
                      <option value="central" style={{ color: "black" }}>
                        Central Province
                      </option>
                      <option value="eastern" style={{ color: "black" }}>
                        Eastern Province
                      </option>
                      <option value="north-central" style={{ color: "black" }}>
                        North Central Province
                      </option>
                      <option value="northern" style={{ color: "black" }}>
                        Northern Province
                      </option>
                      <option value="north-western" style={{ color: "black" }}>
                        North Western Province
                      </option>
                      <option value="sabaragamuwa" style={{ color: "black" }}>
                        Sabaragamuwa Province
                      </option>
                      <option value="southern" style={{ color: "black" }}>
                        Southern Province
                      </option>
                      <option value="uva" style={{ color: "black" }}>
                        Uva Province
                      </option>
                      <option value="western" style={{ color: "black" }}>
                        Western Province
                      </option>
                    </select>
                  </div>
                </div>
                <div className="mt-2">
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
                <div className="mt-2">
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

                <div className="mt-4">
                  <Button
                    loading={loading}
                    type={"1"}
                    text="Sign Up"
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

export default SignUpForBus;
