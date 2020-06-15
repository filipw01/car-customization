import React from "react";
import CarComponentButton from "./CarComponentButton";
import CarColorButton from "./CarColorButton";
import PropTypes from "prop-types";

const CarComponent = ({
  type = "component",
  parts,
  partName,
  className,
  activePartId,
  getMissingDependencies,
  changePart,
  side,
}) => {
  return (
    <div className={`inline-block ${className}`}>
      <p
        className={`mb-1 text-xs uppercase ${
          side === "left" ? "text-right" : ""
        }`}
      >
        {partName}
      </p>
      <div className="flex pt-3 space-x-2 border-t border-white">
        {parts?.map((part) => {
          let buttonState = part.state;
          if (activePartId && activePartId === part.id) {
            buttonState = "active";
          }
          if (type === "color") {
            return (
              <CarColorButton
                key={part.id}
                clickHandler={() => changePart(part)}
                tooltipText={getMissingDependencies(part.dependencies)}
                color={part.hexValue}
                state={buttonState}
              />
            );
          } else if (type === "component") {
            return (
              <CarComponentButton
                key={part.id}
                clickHandler={() => changePart(part)}
                tooltipText={getMissingDependencies(part.dependencies)}
                name={part.name}
                state={buttonState}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

CarComponent.propTypes = {
  type: PropTypes.oneOf(["component", "color"]),
  parts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string,
      hex: PropTypes.string,
    }).isRequired
  ),
  partName: PropTypes.string.isRequired,
  side: PropTypes.oneOf(["left", "right"]),
  className: PropTypes.string,
  activePartId: PropTypes.number,
  changePart: PropTypes.func,
};

export default CarComponent;
