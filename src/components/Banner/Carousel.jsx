import React, { useState } from "react";
import "./Carousel.css";
function Carousel() {
  const [slide, setSlide] = useState(0);
  return (
    <>
      <div className="bannercreate carousel">
        <img src="https://i.imgur.com/2868wN8.jpg" />
        {/* <img src="https://i.imgur.com/ZBBduP5.png" alt="" /> */}
      </div>
    </>
  );
}
export default Carousel;
