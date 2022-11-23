import React from "react";
import Icon from "../../../Icon/Icon";
import Socialicon from "../../../Socialicon/Socialicon";

function About() {
  const style = {
    color: " var(--theme-color)",
    fontWeight: "bold",
    textDecoration: "underline",
  };
  return (
    <div className="about">
      <h2>About</h2>
      <div className="overflow">
        <div>
          <h3 style={{ marginBottom: "10px" }}>Terms of Services</h3>
          <p>
            By using Bookify, you agree to our{" "}
            <a
              style={style}
              href="https://www.google.com/search?q=google&rlz=1C1CHBF_enCA941CA941&oq=google&aqs=chrome..69i57j35i39l2j0i433j69i60l3j69i65.1733j0j7&sourceid=chrome&ie=UTF-8"
              target="__blank"
            >
              Terms of Service.
            </a>
          </p>
        </div>
        <div style={{ marginTop: "10px" }}>
          <h3>Follow Us On</h3>
          <div className="socialshare">
            <Socialicon
              icon="fab fa-facebook"
              link="https://www.facebook.com/anmol.gangwar.73594/"
            />
            <Socialicon
              icon="fab fa-instagram"
              link="https://www.facebook.com/anmol.gangwar.73594/"
            />
            <Socialicon
              icon="fab fa-linkedin"
              link="https://www.facebook.com/anmol.gangwar.73594/"
            />
            <Socialicon
              icon="fab fa-github"
              link="https://github.com/Robin-Anmol"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default About;
