import React from "react";
import "./Labelinput.css";
function Labelinput(props) {
  const { text, setState, state, isAddCustom = false, date = false } = props;

  return (
    <label>
      <small style={{ color: isAddCustom ? "#ff7847" : "#000" }}>{text}</small>
      <input
        style={{
          border: `1px solid ${isAddCustom ? "#ff7847" : "#808080"}`,
          marginTop: "8px",
          width: "100%",
          color: "#000",
          fontWeight: "500",
          borderRadius: "4px",

          fontSize: ".9rem",
        }}
        type={date ? "date" : "text"}
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder={text}
      />
    </label>
  );
}
export default Labelinput;
