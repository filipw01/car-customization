import React, { useEffect } from "react";
import CarComponent from "../components/CarComponent";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getParts, changePart } from "../redux/modules/car";
import getMissingDependenciesIds from "../utils/getMissingDependencies";
import getPartsById from "../utils/getPartsById";

const Car = ({
  color = "#DE4339",
  fetchParts,
  availableParts,
  activeParts,
  changePart,
}) => {
  useEffect(() => {
    fetchParts();
  }, []);
  const getMissingDependencies = (dependencies) => {
    const missingDependenciesIds = getMissingDependenciesIds(
      dependencies,
      activeParts
    );
    const missingParts = getPartsById(missingDependenciesIds, availableParts);
    const missingPartsString = missingParts
      .map((part) => {
        if (Array.isArray(part)) {
          return part
            .map((eitherPart) => {
              return `"${eitherPart.name}"`;
            })
            .join(" or ");
        }
        return `"${part.name}"`;
      })
      .join(" and ");
    return `Requires ${missingPartsString}`;
  };
  return (
    <div className="col-gap-8 car-grid">
      <CarComponent
        className="col-start-1 row-start-2 justify-self-end"
        partName="Model"
        changePart={(part) => changePart("model", part)}
        parts={availableParts.model}
        getMissingDependencies={getMissingDependencies}
        activePartId={activeParts.model}
      />
      <CarComponent
        className="col-start-3 row-start-1"
        partName="Gearbox"
        changePart={(part) => changePart("gearbox", part)}
        getMissingDependencies={getMissingDependencies}
        parts={availableParts.gearbox}
        activePartId={activeParts.gearbox}
        side="left"
      />
      <CarComponent
        className="col-start-1 row-start-3"
        partName="Engine"
        changePart={(part) => changePart("engine", part)}
        getMissingDependencies={getMissingDependencies}
        parts={availableParts.engine}
        activePartId={activeParts.engine}
      />
      <CarComponent
        className="col-start-3 row-start-4"
        type="color"
        partName="Color"
        changePart={(part) => changePart("color", part)}
        getMissingDependencies={getMissingDependencies}
        parts={availableParts.color}
        activePartId={activeParts.color}
        side="left"
      />
      <div className="w-full col-start-2 justify-self-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 407 339"
        >
          <path
            fill={color}
            d="M72.8 0L47 107.4H0v31h16.1V339h46.4v-32.8h282V339h46.3V138.5H407v-31h-47L334.2 0H72.8zm13.7 20.9h234l20.7 86.5H65.8L86.5 21zm-57 143.8l64.6 24v31l-64.6-24v-31zm348 0v31l-64.6 24v-31.1l64.5-23.9zM141 246h125v31H141v-31z"
          />
        </svg>
      </div>
      <style jsx>{`
        .car-grid {
          display: grid;
          justify-items: start;
          grid-template-columns: 36rem 1fr 12rem;
          grid-template-rows: 4rem 8rem 8rem 8rem;
        }
      `}</style>
      <style jsx global>{`
        .justify-self-center {
          justify-self: center;
        }
        .justify-self-end {
          justify-self: end;
        }
        .mx-between-2 + .mx-between-2 {
          margin-left: 1rem;
        }
      `}</style>
    </div>
  );
};

Car.propTypes = {
  colors: PropTypes.string,
  fetchParts: PropTypes.func,
  changePart: PropTypes.func,
  availableParts: PropTypes.object,
  activeParts: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    availableParts: state.car.availableParts,
    activeParts: state.car.activeParts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchParts: () => {
      return dispatch(getParts());
    },
    changePart: (type, id) => {
      return dispatch(changePart(type, id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Car);
