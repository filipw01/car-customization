import React from "react";
import PropTypes from "prop-types";
import ReactTooltip from "react-tooltip";
import { motion } from "framer-motion";

const CarOption = ({ label, buttonStyle, buttonClassName, state, clickHandler, tooltipText, children }) => {
  const disabled = state === "disabled";
  return (
    <motion.div
      whileHover={{ y: state === "inactive" ? -2 : 0 }}
      whileTap={{ scale: disabled ? 1 : 1.05 }}
    >
      <span data-tip={tooltipText} data-tip-disable={!disabled}>
        <button
          disabled={disabled}
          aria-label={label}
          aria-selected={state === "active"}
          role="option"
          style={buttonStyle ? buttonStyle : null}
          onClick={!disabled ? clickHandler : null}
          className={buttonClassName}
        >
          {children}
        </button>
      </span>
      <ReactTooltip
        backgroundColor="white"
        textColor="black"
        effect="solid"
      />
    </motion.div>
  );
};

CarOption.propTypes = {
  label: PropTypes.string,
  buttonStyle: PropTypes.object,
  buttonClassName: PropTypes.string,
  state: PropTypes.oneOf(["active", "inactive", "disabled"]),
  clickHandler: PropTypes.func,
  tooltipText: PropTypes.string
};

export default CarOption;

