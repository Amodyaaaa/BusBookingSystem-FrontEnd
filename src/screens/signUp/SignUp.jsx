import React, { useEffect, useState } from "react";
import "./SignUp.css";
import TextInput from "../../components/TextInput/TextInput";
import Button from "../../components/Button/Button";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "./../../assets/images/bus.png";
import { toast, Zoom } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");



  const [loading, setLoading] = useState(false);
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [genderError, setGenderError] = useState("");



  const signUpButtonClicked = async () => {
    if (!firstName) {
      setFirstNameError("Enter first name");
    } else if (!lastName) {
      setLastNameError("Enter last name");
    } else if (!email) {
      setEmailError("Enter email");
    } else if (!validator.isEmail(email)) {
      setEmailError("Enter valid email");
    } else if (!phoneNumber) {
      setPhoneNumberError("Enter phone number");
    } else if (!validator.isMobilePhone(phoneNumber)) {
      setPhoneNumberError("Enter valid phone number");
    } else if (!password) {
      setPasswordError("Enter password");
    } else if (!validator.isLength(password, { min: 8 })) {
      setPasswordError("Password must be at least 8 characters long");
    } else if (!gender) {
      setGenderError("Please select your gender");
    } else {
      setLoading(true);
      await axios
        .post("http://localhost:4000/passanger/addPassanger", {
          firstName,
          lastName,
          email,
          gender,
          phoneNumber,
          password,
        })
        .then((res) => {
          if (res.data.success) {
            localStorage.setItem(
              "token",
              JSON.stringify(res.data.
                passangertoken)
            );
            console.log(res.data)
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
            setTimeout(() => {
              navigate("/")
            },2000)
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
            // navigate("/home");
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
                <h2 className="header2 mb-2">Passenger Sign Up</h2>
                <div className="d-flex justify-content-center">
                  <img src={logo} style={{ width: "130px" }} alt="" />
                </div>
                <span className="small">Already have an account ?</span>
                <span
                  className="small fw-bold ms-1 login_register_navigate_btn"
                  onClick={() => navigate("/signIn")}
                  style={{ textDecoration: "underline" }}>
                  Sign In
                </span>

                <div className="d-flex justify-content-between">
                  <div style={{ width: "49%" }}>
                    <TextInput
                      type={"text"}
                      icon={"profile"}
                      placeholder={"First name"}
                      value={firstName}
                      onChange={(value) => setFirstName(value)}
                      errorMessage={firstNameError}
                      onFocus={() => setFirstNameError("")}
                    />
                  </div>
                  <div style={{ width: "49%" }}>
                    <TextInput
                      type={"text"}
                      icon={"profile"}
                      placeholder={"Last name"}
                      value={lastName}
                      onChange={(value) => setLastName(value)}
                      errorMessage={lastNameError}
                      onFocus={() => setLastNameError("")}
                    />
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
                    type={"text"}
                    icon={"lock"}
                    placeholder={"Phone Number"}
                    value={phoneNumber}
                    onChange={(value) => setPhoneNumber(value)}
                    errorMessage={phoneNumberError}
                    onFocus={() => setPhoneNumberError("")}
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
                <div
                  className="mt-2"
                  style={{ display: "flex", alignItems: "center" }}>
                  <input
                    onChange={(e) => setGender(e.target.value)}
                    onFocus={() => setGenderError("")}
                    type="radio"
                    value="male"
                    name="gender"
                    style={{ width: "18px", height: "18px" }}
                  />
                  <label
                    style={{
                      marginLeft: "8px",
                      marginRight: "20px",
                      fontSize: "14px",
                    }}>
                    Male
                  </label>
                  <input
                    onChange={(e) => setGender(e.target.value)}
                    onFocus={() => setGenderError("")}
                    type="radio"
                    value="female"
                    name="gender"
                    style={{ width: "18px", height: "18px" }}
                  />
                  <label style={{ marginLeft: "8px", fontSize: "14px" }}>
                    Female
                  </label>
                  {genderError && (
                    <div
                      style={{
                        fontSize: "14px",
                        color: "red",
                        marginLeft: "20px",
                      }}>
                      {genderError}
                    </div>
                  )}
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

export default SignUp;
