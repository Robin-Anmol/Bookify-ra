import React from "react";

function Limitbtn(props) {
  const { setLimit, state, text } = props;

  return (
    <div className="buttns">
      <button
        onClick={() => setLimit((prev) => prev + 15)}
        className="bannerBtn"
      >
        {text}
      </button>
    </div>
  );
}
export default Limitbtn;
