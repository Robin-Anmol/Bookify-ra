import React from "react";
import "./Switchdiv.css";

function Switchdiv(props) {
  const { state, setState, fnct, title } = props;

  return (
    <div className="switchdiv">
      <div className="flexrow switchdiv">
        <p>{title}</p>
        <label className="form-switch">
          <input
            type="checkbox"
            checked={state}
            onChange={(e) => {
              setState && setState(e.target.checked);
              fnct && fnct();
            }}
          />
          <i></i>
        </label>
      </div>
    </div>
  );
}
export default Switchdiv;
