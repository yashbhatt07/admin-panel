import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import Routes from "./routes";

import "./index.css";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
    <Routes />
  </BrowserRouter>,
  // </React.StrictMode>,
);
