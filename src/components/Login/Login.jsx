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
          <div className="login flex box-shadow-br">
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
                  <span style={{ marginLeft: "5px" }}>Name</span>
                  <input
                    required
                    type="text"
                    name="fullname"
                    placeholder="full name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>

                <label>
                  <span style={{ marginLeft: "5px" }}>Email</span>
                  <input
                    required
                    type="email"
                    value={email}
                    placeholder="book@mail.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <p className="errormsgLogin">{emailError}</p>
                </label>
                <label>
                  <span style={{ marginLeft: "5px" }}>Password</span>
                  <input
                    required
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <p className="errormsgLogin">{passwordError}</p>
                </label>
                {hasAccount ? (
                  <div className="btnContainer">
                    <button className="themeBtn" onClick={handleLogin}>
                      {determineLoading()}
                    </button>
                    <div className="flex">
                      <Link
                        exact
                        style={{ marginTop: "10px", color: "#ff0505" }}
                        to="/forgotpassword"
                        className="forgotPasswordButton"
                      >
                        Forgot your password?
                      </Link>
                      <small style={{ marginTop: "10px" }}>
                        Don't have an account?
                        <span
                          style={{
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
                      style={{ marginBottom: "10px" }}
                      onClick={handleSignup}
                    >
                      Register
                    </button>
                    <div className="flexrow">
                      <small>
                        Already have an account?
                        <span
                          onClick={() => setHasAccount(!hasAccount)}
                          style={{ cursor: "pointer" }}
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
