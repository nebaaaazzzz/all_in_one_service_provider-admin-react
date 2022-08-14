import React, { useRef, useContext, useState } from "react";
import {} from "react";
import axios from "axios";
import { BASEURI } from "./../urls";
const defaultUrl = axios.getUri();
import { useNavigate } from "react-router-dom";
import { UserContext } from "./../App";
function Login() {
  const { setData } = useContext(UserContext);
  const navigate = useNavigate();
  const userNameRef = useRef();
  const passwordRef = useRef();
  const [errMsg, setErrMsg] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASEURI}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: userNameRef.current.value,
          password: passwordRef.current.value,
        }),
      });
      if (response.ok) {
        const token = (await response.json()).token;
        const user = await (
          await fetch(`${BASEURI}/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        ).json();
        setData(user);
        navigate("/");
        localStorage.setItem("token", token);
      } else {
        setErrMsg(await response.json());
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="app app-login p-0">
      <div className="row g-0 app-auth-wrapper">
        <div className="col-12 col-md-7 col-lg-6 auth-main-col text-center p-5">
          <div className="d-flex flex-column align-content-end">
            <div className="app-auth-body mx-auto">
              <div className="app-auth-branding mb-4">
                <a className="app-logo" href="index.html">
                  <img
                    className="logo-icon me-2"
                    style={{ width: 100, height: 100 }}
                    src="assets/images/icon.png"
                    alt="logo"
                  />
                </a>
              </div>
              <h2 className="auth-heading text-center mb-5">
                Log in to Portal
              </h2>
              <div className="auth-form-container text-start">
                <form className="auth-form login-form" onSubmit={handleSubmit}>
                  <div className="email mb-3">
                    <label className="sr-only" htmlFor="signin-email">
                      Email
                    </label>
                    <input
                      ref={userNameRef}
                      id="username"
                      name="signin-email"
                      type="text"
                      className="form-control signin-email"
                      placeholder="phone Number"
                      required="required"
                    />
                  </div>
                  {/*//form-group*/}
                  <div className="password mb-3">
                    <label className="sr-only" htmlFor="signin-password">
                      Password
                    </label>
                    <input
                      ref={passwordRef}
                      id="password"
                      name="signin-password"
                      type="password"
                      className="form-control signin-password"
                      placeholder="Password"
                      required="required"
                    />
                    <div className="extra mt-3 row justify-content-between">
                      <div className="col-6">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue=""
                            id="RememberPassword"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="RememberPassword"
                          >
                            Remember me
                          </label>
                        </div>
                      </div>
                      {/*//col-6*/}
                      <div className="col-6">
                        <div className="forgot-password text-end">
                          <a href="/reset-password">Forgot password?</a>
                        </div>
                      </div>
                      {/*//col-6*/}
                    </div>
                    {/*//extra*/}
                  </div>
                  {/*//form-group*/}
                  <div className="text-center">
                    <button
                      type="submit"
                      style={{
                        backgroundColor: "#0244d0",
                      }}
                      className="btn app-btn-primary w-100 theme-btn mx-auto"
                    >
                      Log In
                    </button>
                  </div>
                </form>
              </div>
              {/*//auth-form-container*/}
            </div>
            {/*//auth-body*/}

            {/*//app-auth-footer*/}
          </div>
          {/*//flex-column*/}
        </div>
        {/*//auth-main-col*/}

        {/*//auth-background-col*/}
      </div>
      {/*//row*/}
    </div>
  );
}

export default Login;
