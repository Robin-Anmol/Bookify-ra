import React from "react";
import "./Labelinput.css";
function Labelinput(props) {
  const { text, setState, state, date = false } = props;

  return (
    <label>
      <small>{text}</small>
      <input
        type={date ? "date" : "text"}
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder={text}
      />
    </label>
  );
}
export default Labelinput;
