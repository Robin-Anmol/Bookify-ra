import React, { useState } from "react";
import Settingsbtn from "../Settings/Settingsbtn";
import Benefitsitem from "./Benefitsitem";
import Optionplan from "./Optionplan";
import "./Pro.css";
function Pro() {
  const getProHandler = () => {
    console.log("dd");
  };

  return (
    <div className="pro">
      <div className="bannerpro rotate">
        <div className="text">
          <h2>Upgrade your Bookify Plan</h2>
          <span>Get pro to view premium content.</span>
        </div>
        <img src="https://i.imgur.com/ZsIGScd.jpg" alt="" />

        <div className="optionscontainer">
          <Optionplan />
          <Optionplan pro={true} />
        </div>
      </div>
      <div className="spacer2"></div>
      <div className="spacer2"></div>
      <div style={{ height: "50px" }}></div>
      <div className="benefitscontainer">
        <div className="benefitstitle">
          <h2 style={{ color: "gray", textAlign: "center" }}>Pro Features</h2>
          <h2 style={{ textAlign: "center", fontSize: "15px", color: "gray" }}>
            Benefits of getting pro
          </h2>
        </div>
        {/* {showpaypal&&<PaypalButtons />} */}
        <div className="flexitems">
          <Benefitsitem
            icon="fal fa-lock-open"
            title="View Premium Post"
            description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa, corrupti."
          />
          <Benefitsitem
            icon="fal fa-paint-brush"
            title="Post Unlimited Books"
            description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa, corrupti.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa, corrupti.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa, corrupti."
          />
          <Benefitsitem
            icon="fal fa-user-headset"
            title="Technical Support"
            description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa, corrupti. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa, corrupti."
          />
        </div>
      </div>
      <div className="bannerpro">
        <div className="text">
          <h2>Get Pro Now</h2>
          <button onClick={getProHandler} className="bannerBtn">
            Get Pro
          </button>
        </div>
        <img src="https://i.imgur.com/2868wN8.jpg" alt="" />

        <div className="optionscontainer"></div>
      </div>
      <div className="spacer2"></div>
    </div>
  );
}
export default Pro;
