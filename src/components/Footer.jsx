import React from "react";

function Footer() {
  return (
    <footer className="app-footer">
      <div className="container text-center py-3">
        <small className="copyright">
          Designed By <span className="sr-only">love</span>
          <i className="fas fa-heart" style={{ color: "#fb866a" }}></i> by
          <p className="app-link" target="_blank">
            All in One Service Provider
          </p>
        </small>
      </div>
    </footer>
  );
}

export default Footer;
