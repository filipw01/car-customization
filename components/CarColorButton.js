import React, { useState } from "react";
import { contrast } from "chroma-js";
import PropTypes from "prop-types";
import ReactTooltip from "react-tooltip";

const CarColorButton = ({ color, state, clickHandler, tooltipText }) => {
  const [contrastColor] = useState(() => {
    if (contrast("#fff", color) + 1 > contrast("#000", color)) {
      return "white";
    }
    return "black";
  });
  const disabled = state === "disabled";
  return (
    <div>
      <span data-tip={tooltipText} data-tip-disable={!disabled}>
        <button
          disabled={disabled}
          style={{ backgroundColor: color }}
          onClick={!disabled ? clickHandler : null}
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
          {disabled && (
            <svg
              className="self-center w-1/2 mx-auto"
              viewBox="0 0 9 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke={contrastColor}
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M1 1L4.5 4.5M4.5 4.5L1 8M4.5 4.5L8 8M4.5 4.5L8 1"
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
      </span>
      <ReactTooltip
        backgroundColor="white"
        textColor="black"
        effect="solid"
      ></ReactTooltip>
    </div>
  );
};

CarColorButton.propTypes = {
  color: PropTypes.string.isRequired,
  state: PropTypes.oneOf(["active", "inactive", "disabled"]),
  clickHandler: PropTypes.func,
  tooltipText: PropTypes.string,
};

export default CarColorButton;
