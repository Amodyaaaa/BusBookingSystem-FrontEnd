import React from "react";
import "./textInput.css";
import { HiOutlineMail } from "react-icons/hi";
import { BsPerson } from "react-icons/bs";
import { FiLock } from "react-icons/fi";
const TextInput = ({
  icon,
  placeholder,
  type,
  errorMessage,
  value,
  onChange,
  onFocus,
}) => {
  const getErrorClass = () => {
    if (errorMessage == undefined) {
      return "inputLine";
    } else if (errorMessage == "") {
      return "inputLine";
    } else {
      return "inputLineError";
    }
  };

  return (
    <div className="inputComponent">
      <div
        className={
          errorMessage && errorMessage != ""
            ? "errorMessageShow"
            : "errorMessageHide"
        }>
        {errorMessage && errorMessage}
      </div>
      <div className={getErrorClass()}>
        {icon === "mail" && <HiOutlineMail className="icon" />}
        {icon === "profile" && <BsPerson className="icon" />}
        {icon === "lock" && <FiLock className="icon" />}

        <input
          style={{marginLeft:"7px",marginRight:"5px"}}
          onFocus={onFocus}
          onChange={(e) => onChange(e.target.value)}
          value={value}
          className="input"
          type={type}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default TextInput;
