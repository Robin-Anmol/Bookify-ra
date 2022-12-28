import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  Redirect,
} from "react-router-dom";
import { db } from "../../Fire";
import firebase from "firebase";
import Forgotpassword from "./Forgotpassword";
import "./Login.css";
function Login(props) {
  const {
    loginwithFacebook,
    loginwithGoogle,
    setlName,
    lname,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    handleSignup,
    hasAccount,
    setHasAccount,
    emailError,
    passwordError,
  } = props;
  function determineLoading() {
    return "Log in";
  }
  return (
    <>
      <Route exact path="/">
        <div className="login-container">
          <div className="login  box-shadow-br">
            <div className="login_main">
              <div className="title">
                <h1 className="flexrow" style={{ alignItems: "center" }}>
                  <img
                    className="mainlogo"
                    src="https://i.imgur.com/y5bNwaF.png"
                    alt=""
                  />
                  {hasAccount ? "Log In" : "Register"}
                </h1>
              </div>
              <div className="inputscontainer">
                <form onSubmit={(e) => e.preventDefault()}>
                  <label style={{ display: hasAccount ? "none" : "flex" }}>
                    <span style={{ marginLeft: "5px", marginBottom: "5px" }}>
                      Name
                    </span>
                    <input
                      style={{
                        borderRadius: "5px",
                        border: "1px solid #808080",
                      }}
                      id="login_input"
                      required
                      type="text"
                      name="fullname"
                      placeholder="full name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </label>

                  <label>
                    <span style={{ marginLeft: "5px", marginBottom: "5px" }}>
                      Email
                    </span>
                    <input
                      style={{
                        borderRadius: "5px",
                        border: "1px solid #808080",
                      }}
                      id="login_input"
                      required
                      type="email"
                      value={email}
                      placeholder="book@mail.com"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <p className="errormsgLogin">{emailError}</p>
                  </label>
                  <label>
                    <span style={{ marginLeft: "5px", marginBottom: "5px" }}>
                      Password
                    </span>
                    <input
                      style={{
                        border: "1px solid #808080",
                        borderRadius: "5px",
                      }}
                      required
                      id="login_input"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <p className="errormsgLogin">{passwordError}</p>
                  </label>
                  {hasAccount ? (
                    <div className="btnContainer">
                      {/* <button
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "1rem 0",
                          width: "100%",
                          fontSize: "1rem",
                          borderRadius: "5px",
                        }}
                        className="themeBtn"
                        onClick={handleLogin}
                      >
                        {determineLoading()}
                      </button> */}

                      <div className="flex">
                        <Link
                          exact
                          style={{ marginTop: "15px", color: "#ff0505" }}
                          to="/forgotpassword"
                          className="forgotPasswordButton"
                        >
                          Forgot your password?
                        </Link>
                        <button
                          style={{
                            marginTop: "10px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "1rem 0",
                            width: "100%",
                            fontSize: "1rem",
                            borderRadius: "5px",
                          }}
                          className="themeBtn"
                          onClick={handleLogin}
                        >
                          {determineLoading()}
                        </button>
                        <div className="mobileLoginWithGoogle">
                          <button
                            className="googleLoginBtn"
                            onClick={loginwithGoogle()}
                          >
                            {" "}
                            <i
                              style={{ color: "#fff", marginRight: "8px" }}
                              className="fab fa-google"
                            ></i>{" "}
                            Login with Google
                          </button>
                        </div>
                        <small style={{ marginTop: "15px" }}>
                          Don't have an account?
                          <span
                            style={{
                              marginLeft: "5px",
                              marginTop: "10px",
                              cursor: "pointer",
                              color: "#056dff",
                            }}
                            onClick={() => setHasAccount(!hasAccount)}
                          >
                            {" "}
                            Register
                          </span>
                        </small>
                      </div>
                    </div>
                  ) : (
                    <div className="btnContainer">
                      <button
                        className="themeBtn"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "1rem 0",
                          width: "100%",
                          fontSize: "1rem",
                          borderRadius: "5px",
                        }}
                        onClick={handleSignup}
                      >
                        Register
                      </button>
                      <div className="mobileLoginWithGoogle">
                        <button
                          className="googleLoginBtn"
                          onClick={loginwithGoogle()}
                        >
                          {" "}
                          <i
                            style={{ color: "#fff", marginRight: "8px" }}
                            className="fab fa-google"
                          ></i>{" "}
                          Login with Google
                        </button>
                      </div>
                      <div className="flexrow">
                        <small style={{ marginTop: "15px" }}>
                          Already have an account?
                          <span
                            onClick={() => setHasAccount(!hasAccount)}
                            style={{
                              marginLeft: "5px",
                              cursor: "pointer",
                              color: "#056dff",
                              cursor: "pointer",
                            }}
                          >
                            {" "}
                            Sign in
                          </span>
                        </small>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
          <div className="loginBanner flex box-shadow-br">
            <div className="img-authbtns">
              <div className="logo br">
                <h2>Welcome to Bookify</h2>
                <span>Browse and Search your favorite books.</span>
              </div>
              <div className="flex abs loginbtns">
                <button
                  className="login-btn gog-btn br sa"
                  onClick={loginwithGoogle()}
                >
                  {" "}
                  <i className="fab fa-google"></i> Login with Google
                </button>
                <button
                  className="login-btn fb-btn br sa"
                  onClick={loginwithFacebook()}
                >
                  <i className="fab fa-facebook"></i> Login with Facebook
                </button>
              </div>
              <img
                className="br"
                src="https://i.imgur.com/3LCNEtH.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </Route>
      <Route exact path="/forgotpassword">
        <Forgotpassword />
      </Route>
    </>
  );
}
export default Login;
