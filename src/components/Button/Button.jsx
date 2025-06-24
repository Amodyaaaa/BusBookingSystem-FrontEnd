import { useState, CSSProperties } from "react";
import DotLoader from "react-spinners/DotLoader";
import "./button.css";
const Button = ({ type, text, onClick, loading }) => {
  let [color, setColor] = useState("#ffffff");
  return (
    <div onClick={onClick} className={type == "1" ? "button-1" : "button-2"}>
      {loading ?( <DotLoader
        color={color}
        loading={loading}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
        speedMultiplier={2}
      />): (<div> {text}</div>) }
     
     
    </div>
  );
};

export default Button;