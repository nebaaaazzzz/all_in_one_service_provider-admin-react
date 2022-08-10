import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

/* this for configuring axios in global scope*/
import axios from "axios";
axios.defaults.baseURL = "http://192.168.43.136:5000";
/* */

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
