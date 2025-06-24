import React, { useState } from "react";
import { IoSearchOutline, IoCloseOutline, IoCheckmark } from "react-icons/io5";

const SearchBar = (props) => {
  const [searchText, setSearchText] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      props.setSearchText(searchText);
    }
  };

  const searchClose = () => {
    setSearchText("");
    props.setSearchText("");
  };

  return (
    <div
      style={{
        width: "500px",
        borderRadius: "50px",
        height: "50px",
        padding: "0 20px", // Add padding for better alignment
        display: "flex",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.7)" /* Semi-transparent background */

      }}
    >
      <input
        style={{ flex: 1, height: "35px" }}
        type="text"
        className="form-control border-0 shadow-none bg-transparent"
        placeholder="Search Bus"
        aria-describedby="btnGroupAddon2"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div style={{ display: "flex", alignItems: "center" }}>
        {searchText === "" ? (
          <IoSearchOutline size={23} color="gray" />
        ) : (
          <>
            <div
              onClick={searchClose}
              style={{
                cursor: "pointer",
                fontSize: "22px",
                borderRadius: "50%",
                height: "26px",
                padding: "2px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "10px",
              }}
            >
              <IoCloseOutline />
            </div>
            <div
              onClick={() => props.setSearchText(searchText)}
              style={{
                cursor: "pointer",
                fontSize: "22px",
                borderRadius: "50%",
                height: "26px",
                padding: "2px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IoCheckmark />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
