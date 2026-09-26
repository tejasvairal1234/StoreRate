import React from "react";
import "./Common.css";

function Loading({ message = "Loading data..." }) {
  return (
    <div className="loading-container">
      <div className="spinner" />
      <span>{message}</span>
    </div>
  );
}

export default Loading;
