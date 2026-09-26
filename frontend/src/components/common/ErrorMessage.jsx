import React from "react";
import "./Common.css";

function ErrorMessage({ message, onDismiss }) {
  if (!message) return null;

  return (
    <div className="alert alert-error" role="alert">
      <span>⚠️ {message}</span>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#b91c1c",
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

export default ErrorMessage;
