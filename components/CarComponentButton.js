import React from "react";
import PropTypes from "prop-types";

const CarComponentButton = ({ name, state, clickHandler }) => {
  let additionalClassNames = "";
  switch (state) {
    case "active":
      additionalClassNames = "bg-white text-black";
      break;
    case "disabled":
      additionalClassNames = "line-through";
      break;
  }
  return (
    <button
      className={`uppercase py-2 px-4 border border-white rounded-md part-button text-sm mx-between-2 ${additionalClassNames}`}
      onClick={clickHandler}
    >
      {name}
    </button>
  );
};
CarComponentButton.propTypes = {
  name: PropTypes.string.isRequired,
  state: PropTypes.oneOf(["active", "inactive", "disabled"]),
  clickHandler: PropTypes.func,
};

export default CarComponentButton;
