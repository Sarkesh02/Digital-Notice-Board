import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./index.css";

const darkMode =
  localStorage.getItem("darkMode");

document.body.className =
  darkMode === "true"
    ? "dark"
    : "light";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);