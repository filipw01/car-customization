import React from "react";
import CarComponentButton from "./CarComponentButton";
import CarColorButton from "./CarColorButton";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import missingDependenciesString from "../utils/missingDependenciesString";
import { changePart } from "../redux/modules/car";

const CarComponent = ({
  type,
  className,
  side,
  activeParts,
  availableParts,
  changePart,
}) => {
  const dependenciesToString = (dependencies) => {
    return missingDependenciesString(dependencies, activeParts, availableParts);
  };
  const parts = availableParts.filter((part) => part.type === type);
  const activePartId = activeParts.find((part) => part.type === type)?.id;

  return (
    <div className={`inline-block ${className}`}>
      <p
        className={`mb-1 text-xs uppercase font-display tracking-wider ${
          side === "left" ? "text-right" : ""
        }`}
      >
        {type}
      </p>
      <div className="flex pt-3 space-x-2 border-t border-white">
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
