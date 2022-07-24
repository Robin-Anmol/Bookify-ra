import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { db } from "../../../Fire";
function Optionplan(props) {
  const { pro = false } = props;
  const user = firebase.auth().currentUser;
  const [userispro, setUserispro] = useState(false);
  const [mode, setMode] = useState(false);
  useEffect(() => {
    db.collection("users")
      .doc(user.uid)
      .onSnapshot((snap) => {
        setUserispro(snap.data().pro);
      });
  }, [mode]);
  function getProHandler(mode) {
    db.collection("users").doc(user.uid).update({
      pro: mode,
    });
  }

  return (
    <div className="option box-shadow-br">
      <div className="header flex">
        <img src="https://i.imgur.com/y5bNwaF.png" alt="" />
        <h2>
          Bookify <strong>{pro ? "Pro" : "Basic"}</strong>
        </h2>
        <span>{pro ? "$2.99/Month" : "Free"}</span>
      </div>
      <div className="benefits flex">
        <div className="benefitstext flex">
          <span className="optionpro">
            <i className="fal fa-check"></i>
            <span>{pro ? "View premium books" : "View free books"}</span>
          </span>

          <span className="optionpro">
            <i className="fal fa-check"></i>
            <span>
              {pro ? "Post unlimitted books " : "Post up to 50 books"}
            </span>
          </span>

          {pro && (
            <>
              {" "}
              <span className="optionpro">
                <i className="fal fa-check"></i>
                <span>Technical Support</span>
              </span>
            </>
          )}
        </div>
        <div className="probtncont flex">
          {!pro ? (
            <button className={!userispro && pro ? "probtn" : "probtn lightbg"}>
              {!userispro && pro ? "Get Pro" : "Already Active"}
              {!userispro && pro ? (
                <i className="fal fa-shopping-bag"></i>
              ) : (
                <i className="fal fa-check"></i>
              )}
            </button>
          ) : (
            <button
              onClick={
                !userispro
                  ? () => getProHandler(true)
                  : () => getProHandler(false)
              }
              className={!userispro && pro ? "probtn" : "probtn lightbg"}
            >
              {!userispro && pro ? "Get Pro" : "Already Active"}
              {!userispro && pro ? (
                <i className="fal fa-shopping-bag"></i>
              ) : (
                <i className="fal fa-check"></i>
              )}
            </button>
          )}
          <small>
            See{" "}
            <a href="https://www.google.com/search?q=google&rlz=1C1CHBF_enCA941CA941&oq=google&aqs=chrome.0.69i59l3j0i433j69i60l3j69i65.791j0j4&sourceid=chrome&ie=UTF-8">
              Terms of Services
            </a>
          </small>
        </div>
      </div>
    </div>
  );
}
export default Optionplan;
