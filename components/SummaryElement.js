import React from "react";
import PropTypes from "prop-types";

const SummaryElement = ({ partType, activeParts }) => {
  const part = activeParts.find((part) => part.type === partType);
  return <label className="flex justify-between py-1 text-sm border-b border-dark-gray">
    <span className="capitalize">{partType}</span>
    <output className="font-medium">
      {part?.name}
    </output>
  </label>;
};

SummaryElement.propTypes = {
  partType: PropTypes.string,
  activeParts: PropTypes.arrayOf(PropTypes.object)
};

export default SummaryElement;
