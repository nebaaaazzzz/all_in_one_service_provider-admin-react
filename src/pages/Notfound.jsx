import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

function NotFound() {
  return (
    <>
      <Header />
      <div class="app app-404-page">
        <div class="container mb-5">
          <div class="row">
            <div class="col-12 col-md-11 col-lg-7 col-xl-6 mx-auto">
              <div class="app-branding text-center mb-5">
                <a class="app-logo" href="index.html">
                  <img
                    class="logo-icon me-2"
                    src="assets/images/icon.png"
                    alt="logo"
                  />
                  <span class="logo-text">PORTAL</span>
                </a>
              </div>
              <div class="app-card p-5 text-center shadow-sm">
                <h1 class="page-title mb-4">
                  404
                  <br />
                  <span class="font-weight-light">Page Not Found</span>
                </h1>
                <div class="mb-4">
                  Sorry, we can't find the page you're looking for.
                </div>
                <Link class="btn app-btn-primary" to="/">
                  Go to home page
                </Link>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default NotFound;
