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
    const options = {
      key: "rzp_test_7ntcc6hkj3donX",
      key_secret: "GlkBu1AjzOGwc7YPThcAnE5q",
      amount: 249 * 100,
      currency: "INR",
      name: "Bookify Pro plan ",
      description: "for testing purpose",
      handler: function (response) {
        console.log(response);
        db.collection("users").doc(user.uid).update({
          pro: mode,
          updateAt: new Date(),
        });
      },
      prefill: {
        userId: user?.uid,
        email: user?.email,
        name: user?.displayName,
      },
      notes: {
        address: "Razorpay Corporate office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const pay = new window.Razorpay(options);
    pay.open();
  }

  console.log(user);
  return (
    <div className="option box-shadow-br">
      <div className="header flex">
        <img src="https://i.imgur.com/y5bNwaF.png" alt="" />
        <h2>
          Bookify <strong>{pro ? "Pro" : "Basic"}</strong>
        </h2>
        <span>{pro ? "Rs.249/Month" : "Free"}</span>
      </div>
      <div className="benefits flex">
        <div className="benefitstext flex">
          <span className="optionpro">
            <i className="fal fa-check"></i>
            {pro ? (
              <span>View premium books</span>
            ) : (
              <span>View free books</span>
            )}
          </span>

          <span className="optionpro">
            <i className="fal fa-check"></i>

            {pro ? (
              <span>Post unlimitted books</span>
            ) : (
              <span>Post up to 50 books</span>
            )}
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
            <>
              {!userispro ? (
                <button
                  onClick={() => getProHandler(true)}
                  className={!userispro && pro ? "probtn" : "probtn lightbg"}
                >
                  {!userispro && pro ? "Get Pro" : "Already Active"}
                  {!userispro && pro ? (
                    <i className="fal fa-shopping-bag"></i>
                  ) : (
                    <i className="fal fa-check"></i>
                  )}
                </button>
              ) : (
                <button
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
            </>
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
