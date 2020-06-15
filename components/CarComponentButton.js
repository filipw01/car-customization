import React from "react";
import PropTypes from "prop-types";
import ReactTooltip from "react-tooltip";

const CarComponentButton = ({ name, state, clickHandler, tooltipText }) => {
  let additionalClassNames = "";
  switch (state) {
    case "active":
      additionalClassNames = "bg-white text-black";
      break;
    case "disabled":
      additionalClassNames = "line-through";
      break;
  }
  const disabled = state === "disabled";
  return (
    <div>
      <span data-tip={tooltipText} data-tip-disable={!disabled}>
        <button
          disabled={disabled}
          className={`uppercase py-2 px-4 border border-white rounded-md part-button text-sm ${additionalClassNames}`}
          onClick={!disabled ? clickHandler : null}
        >
          {name}
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
CarComponentButton.propTypes = {
  name: PropTypes.string.isRequired,
  state: PropTypes.oneOf(["active", "inactive", "disabled"]),
  clickHandler: PropTypes.func,
  mouseOverHandler: PropTypes.func,
};

export default CarComponentButton;
