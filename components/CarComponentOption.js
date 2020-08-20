import React from "react";
import PropTypes from "prop-types";
import CarOption from "./CarOption";

const CarComponentOption = ({ name, state, clickHandler, tooltipText }) => {
  let classNames = `uppercase mx-1 my-1 py-2 px-4 border border-white
  rounded-md part-button text-sm font-medium transition-colors duration-200`;

  if (state === "active") {
    classNames += " bg-white text-black";
  } else if (state === "disabled") {
    classNames += " line-through";
  }

  return (
    <CarOption
      buttonClassName={classNames}
      state={state}
      clickHandler={clickHandler}
      tooltipText={tooltipText}
    >
      {name}
    </CarOption>
  );
};

CarComponentOption.propTypes = {
  name: PropTypes.string.isRequired,
  state: PropTypes.oneOf(["active", "inactive", "disabled"]),
  clickHandler: PropTypes.func,
  tooltipText: PropTypes.string
};

export default CarComponentOption;
