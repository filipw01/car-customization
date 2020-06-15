import React, { useState } from "react";
import { contrast } from "chroma-js";
import PropTypes from "prop-types";

const CarColorButton = ({ color, state, clickHandler }) => {
  const [contrastColor] = useState(() => {
    if (contrast("#fff", color) + 1 > contrast("#000", color)) {
      return "white";
    }
    return "black";
  });
  return (
    <button
      style={{ backgroundColor: color }}
      onClick={clickHandler}
      className={`flex justify-end px-1 py-1 border rounded-md color-button border-transparent mx-between-2  ${
        state === "active" ? `border-${contrastColor}` : ""
      }`}
    >
      {state === "active" && (
        <svg
          className="w-3"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 11 9"
        >
          <path
            stroke={contrastColor}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M1 3.5l3.5 4L10 1"
          />
        </svg>
      )}
      <style jsx>{`
        .color-button {
          min-width: 3rem;
          min-height: 2rem;
        }
      `}</style>
    </button>
  );
};

CarColorButton.propTypes = {
  color: PropTypes.string.isRequired,
  state: PropTypes.oneOf(["active", "inactive", "disabled"]),
  clickHandler: PropTypes.func,
};

export default CarColorButton;
