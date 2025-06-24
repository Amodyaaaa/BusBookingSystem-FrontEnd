import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavbarPassenger/Navbar";
import "./myAccount.css";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import background from "../../assets/images/bushomebackground.jpg"; // Background image

const MyAccount = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : null;
  const id = decodedToken ? decodedToken._id : null;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/passanger/getPassengerById/${id}`);
        setUserData(response.data.passenger);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    if (id) fetchUserData();
  }, [id]);

  const clickLogOut = () => {
    localStorage.removeItem("token");
    navigate("/signIn", { replace: true });
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
      <div style={{ position: "relative", zIndex: 2 }}>
        <NavBar />
          <div className="d-flex justify-content-center">
            <div className="profile-container">
              <div className="text-center fw-bold mb-4" style={{ fontSize: "22px" }}>
                Profile
              </div>
              {userData ? (
                <>
                  <div className="d-flex gap-2 mb-2">
                    <div className="fw-bold">Name:</div>
                    <div>{userData.firstName} {userData.lastName}</div>
                  </div>
                  <div className="d-flex gap-2 mb-2">
                    <div className="fw-bold">Email:</div>
                    <div>{userData.email}</div>
                  </div>
                  <div className="d-flex gap-2 mb-2">
                    <div className="fw-bold">Phone No:</div>
                    <div>{userData.phoneNumber}</div>
                  </div>
                  <div className="d-flex gap-2 mb-4">
                    <div className="fw-bold">Gender:</div>
                    <div>{userData.gender}</div>
                  </div>
                </>
              ) : (
                <div>Loading...</div>
              )}
              <div className="d-flex justify-content-center">
                <div style={{ width: "120px" }}>
                  <Button onClick={clickLogOut} type="1" text="Log Out" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default MyAccount;
