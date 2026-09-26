import React, { useState } from "react";
import "./Common.css";

function RatingStars({
  value = 0,
  onChange,
  readOnly = false,
  size = 18,
}) {
  const [hoverValue, setHoverValue] = useState(null);

  const displayValue = hoverValue !== null ? hoverValue : Math.round(value);

  return (
    <div
      className={`star-rating ${!readOnly ? "interactive" : ""}`}
      onMouseLeave={() => !readOnly && setHoverValue(null)}
      title={`${value} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star-rating-star ${star <= displayValue ? "filled" : ""}`}
          style={{ fontSize: `${size}px` }}
          onClick={() => {
            if (!readOnly && onChange) {
              onChange(star);
            }
          }}
          onMouseEnter={() => {
            if (!readOnly) {
              setHoverValue(star);
            }
          }}
          role={!readOnly ? "button" : undefined}
          aria-label={`${star} star`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default RatingStars;
