import React from "react";
import CarComponentButton from "./CarComponentButton";
import CarColorButton from "./CarColorButton";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import missingDependenciesString from "../utils/missingDependenciesString";
import { changePart } from "../redux/modules/car";

const CarComponent = ({
  type,
  className = "",
  side = "right",
  activeParts,
  availableParts,
  changePart,
  lineAngle,
  lineWidth = "6",
}) => {
  const dependenciesToString = (dependencies) => {
    return missingDependenciesString(dependencies, activeParts, availableParts);
  };
  const parts = availableParts.filter((part) => part.type === type);
  const activePartId = activeParts.find((part) => part.type === type)?.id;
  const reverseSide = side === "left" ? "right" : "left";
  return (
    <div className={`relative lg:my-0 my-2 ${className}`}>
      <div
        className={`hidden lg:block h-px origin-${reverseSide} bg-white justify-self-end absolute ${side}-0 top-0`}
        style={{
          width: `${lineWidth}rem`,
          transform: `translate(${
            side === "left" ? "-100%" : "100%"
          }, 1.375rem) rotate(${lineAngle}deg)`,
        }}
      >
        <div
          className={`w-8 h-8 transform -translate-y-1/2 bg-white rounded-full ${
            side === "right" ? "lg:ml-auto" : ""
          }`}
        ></div>
      </div>
      <p
        className={`mb-1 text-xs uppercase font-display tracking-wider ${
          side === "left" ? "lg:text-right" : ""
        }`}
      >
        {type}
      </p>
      <div
        role="listbox"
        className={`flex flex-wrap pt-2 border-t border-white ${
          side === "left" ? "lg:justify-end" : ""
        }`}
      >
        {parts?.map((part) => {
          let buttonState = part.state;
          if (activePartId === part.id) {
            buttonState = "active";
          }
          if (type === "color") {
            return (
              <CarColorButton
                key={part.id}
                clickHandler={() => changePart(part)}
                tooltipText={dependenciesToString(part.dependencies)}
                color={part.hexValue}
                state={buttonState}
              />
            );
          } else {
            return (
              <CarComponentButton
                key={part.id}
                clickHandler={() => changePart(part)}
                tooltipText={dependenciesToString(part.dependencies)}
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
  type: PropTypes.oneOf(["engine", "model", "gearbox", "color"]).isRequired,
  availableParts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      hexValue: PropTypes.string,
      price: PropTypes.number.isRequired,
    }).isRequired
  ),
  side: PropTypes.oneOf(["left", "right"]),
  className: PropTypes.string,
  activeParts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      hexValue: PropTypes.string,
      price: PropTypes.number.isRequired,
    }).isRequired
  ),
  changePart: PropTypes.func,
  lineAngle: PropTypes.number.isRequired,
  lineWidth: PropTypes.number,
};

const mapStateToProps = (state) => {
  return {
    availableParts: state.car.availableParts,
    activeParts: state.car.activeParts,
  };
};
const mapDispatchToProps = (dispatch) => ({
  changePart: (part) => {
    return dispatch(changePart(part));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CarComponent);
