import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./HomePage";

export default function App({ name }) {
	return (
    <div className="center">
      <HomePage />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
  <React.StrictMode>
    <App name="Nadir"/>
  </React.StrictMode>
);
