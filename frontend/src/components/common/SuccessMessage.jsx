import React from "react";
import "./Common.css";

function SuccessMessage({ message, onDismiss }) {
  if (!message) return null;

  return (
    <div className="alert alert-success" role="alert">
      <span>✓ {message}</span>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#065f46",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          ×
        </button>
      )}
    </div>
  );
}

export default SuccessMessage;
