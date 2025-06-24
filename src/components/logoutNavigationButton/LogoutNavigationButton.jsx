import React from "react";
import AdminPhoto from "./../../assets/images/Admin.png";
import { useNavigate } from "react-router-dom";
const LogoutNavigationButton = ({ setShowLogOut }) => {
  const navigate = useNavigate();

  const clickLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <div style={{ position: "relative", zIndex: "1000" }}>
      <div
        onClick={() => setShowLogOut(false)}
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          zIndex: "0",
          backgroundColor: "rgba(91, 91, 91, 0.238)",
        }}></div>
      <div
        style={{
          position: "absolute",
          right: "20px",
          top: "50px",
          zIndex: "1",
          backgroundColor: "white",
          height: "150px",
          width: "230px",
          borderRadius: "5px",
          border: "1px solid rgb(251, 223, 223)",
        }}>
        <div className="d-flex align-items-center justify-content-center pt-3">
          <img
            style={{ height: "40px", marginRight: "12px" }}
            src={AdminPhoto}
            alt="Admin"
          />
          <div style={{ fontWeight: "600" }}>DMS Admin</div>
        </div>
        <div className="d-flex justify-content-center align-items-center mt-4">
          <div onClick={clickLogOut}  className="custom-button">
            Log Out
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutNavigationButton;
