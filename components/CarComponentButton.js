import React from "react";
import PropTypes from "prop-types";
import ReactTooltip from "react-tooltip";
import { motion } from "framer-motion";

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
    <motion.div
      whileHover={{ y: state === "inactive" ? -2 : 0 }}
      whileTap={{ scale: state === "disabled" ? 1 : 1.05 }}
    >
      <span data-tip={tooltipText} data-tip-disable={!disabled}>
        <button
          disabled={disabled}
          aria-selected={state === "active"}
          role="option"
          className={`uppercase mx-1 my-1 py-2 px-4 border border-white rounded-md
          part-button text-sm font-medium transition-colors duration-200 ${additionalClassNames}`}
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
    </motion.div>
  );
};

CarComponentButton.propTypes = {
  name: PropTypes.string.isRequired,
  state: PropTypes.oneOf(["active", "inactive", "disabled"]),
  clickHandler: PropTypes.func,
  mouseOverHandler: PropTypes.func,
};

export default CarComponentButton;
