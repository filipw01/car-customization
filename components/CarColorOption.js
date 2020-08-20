import React from "react";
import PropTypes from "prop-types";
import CarOption from "./CarOption";
import useContrastColor from "../utils/useContrastColor";

const CarColorOption = ({ color, state, clickHandler, tooltipText }) => {
  const contrastColor = useContrastColor(color);

  return (
    <CarOption
      state={state}
      label={color}
      clickHandler={clickHandler}
      tooltipText={tooltipText}
      buttonClassName="flex justify-end px-1 py-1 mx-1 my-1 border rounded-md
                       color-button border-transparent mx-between-2"
      buttonStyle={{
        backgroundColor: color,
        borderColor: state === "active" ? contrastColor : "transparent"
      }}>
      {state === "active" ? (
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
      ) : null}
      {state === "disabled" ? (
        <svg
          className="self-center h-4 mx-auto"
          viewBox="0 0 9 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke={contrastColor}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M1 1L4.5 4.5M4.5 4.5L1 8M4.5 4.5L8 8M4.5 4.5L8 1"
          />
        </svg>
      ) : null}
      <style jsx>{`
            .color-button {
              min-width: 3rem;
              min-height: 2rem;
            }
          `}</style>
    </CarOption>
  );
};

CarColorOption.propTypes = {
  color: PropTypes.string.isRequired,
  state: PropTypes.oneOf(["active", "inactive", "disabled"]),
  clickHandler: PropTypes.func,
  tooltipText: PropTypes.string
};

export default CarColorOption;

