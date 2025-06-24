import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavbarPassenger/Navbar";
import SearchBar from "../../components/searchBar/SearchBar";
import "./home.css";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import background from "../../assets/images/background.jpeg";
import { IoMdArrowDropdown } from "react-icons/io"; // Import the down arrow icon

const Home = () => {
  const navigate = useNavigate();
  const [buses, setBuses] = useState([]);
  const [searchText, setSearchText] = useState("");

  const getBussesData = async () => {
    try {
      console.log("Search Text : ", searchText);
      const response = await axios.get(
        `http://localhost:4000/bus/getAllBusesPagination?search=${searchText}`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      if (response.data.success) {
        setBuses(response.data.buses);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBussesData();
  }, [searchText]);

  const timeOptions = { hour: "2-digit", minute: "2-digit" };

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
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the color and opacity as needed
          zIndex: 1,
        }}
      />
      <div style={{ position: "relative", zIndex: 2 }}>
        <NavBar />
        <div className="bus_details_main_container" style={{ paddingTop: "20px" }}>
          <div className="searchbar-container d-flex justify-content-center mb-3">
            <SearchBar setSearchText={setSearchText} />
          </div>
          <div className="d-flex justify-content-center" >
            <div className="bus_card_container" style={{ marginTop: "50px" }}>
              {buses.map((bus, index) => (
                <div
                  onClick={() => navigate(`/busDetails/${bus._id}`)}
                  key={index}
                  className="home_bus_card"
                  style={{
                    width: "250px",
                    height: "200px",
                    cursor: "pointer",
                    padding: "20px",
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent white background
                    transition: "transform 0.2s ease-in-out",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <div className="d-flex justify-content-center fw-bold text-center mb-4" style={{ fontSize: "18px", color: "#333" }}>
                    {bus.Bus_name}
                  </div>
                  <div className="d-flex flex-column" style={{ fontSize: "14px", color: "#555" }}>
                    <div className="d-flex justify-content-between mb-1">
                      <span className="fw-bold">From:</span>
                      <span>{bus.busRootId?.segments[0]?.start_place}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-1">
                      <span className="fw-bold">To:</span>
                      <span>{bus.busRootId?.segments[bus.busRootId?.segments.length - 1]?.end_place}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className="fw-bold">Start Time:</span>
                      <span>{new Date(bus.busRootId?.start_time).toLocaleString(undefined, timeOptions)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="fixed-bottom-line">
          <div className="news-ticker">
            <span>Latest News: New bus routes added, check them out now! | Special discounts available | Book your tickets today!  | Be Safe!| Please get Ticket!| Book your tickets today!</span>

          </div>
        </div>
      </div>
    </div>
  );
};


export default Home;
