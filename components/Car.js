import React, { useEffect } from "react";
import CarComponent from "../components/CarComponent";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getParts, changePart } from "../redux/modules/car";
import getMissingDependencies from "../utils/getMissingDependencies";
import CarImage from "./CarImage";

const Car = ({ fetchParts, availableParts, activeParts, changePart }) => {
  useEffect(() => {
    fetchParts();
  }, []);
  const missingDependencies = (dependencies) => {
    const missingParts = getMissingDependencies(
      dependencies,
      activeParts,
      availableParts
    );
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
  const color = activeParts.find((part) => part.type === "color")?.hexValue;
  const model = activeParts.find((part) => part.type === "model")?.name;
  return (
    <div className="col-gap-8 car-grid">
      <CarComponent
        className="col-start-1 row-start-2 justify-self-end"
        partName="Model"
        changePart={changePart}
        parts={availableParts.filter((part) => part.type === "model")}
        getMissingDependencies={missingDependencies}
        activePartId={activeParts.find((part) => part.type === "model")?.id}
      />
      <CarComponent
        className="col-start-3 row-start-1"
        partName="Gearbox"
        changePart={changePart}
        getMissingDependencies={missingDependencies}
        parts={availableParts.filter((part) => part.type === "gearbox")}
        activePartId={activeParts.find((part) => part.type === "gearbox")?.id}
        side="left"
      />
      <CarComponent
        className="col-start-1 row-start-3"
        partName="Engine"
        changePart={changePart}
        getMissingDependencies={missingDependencies}
        parts={availableParts.filter((part) => part.type === "engine")}
        activePartId={activeParts.find((part) => part.type === "engine")?.id}
      />
      <CarComponent
        className="col-start-3 row-start-4"
        type="color"
        partName="Color"
        changePart={changePart}
        getMissingDependencies={missingDependencies}
        parts={availableParts.filter((part) => part.type === "color")}
        activePartId={activeParts.find((part) => part.type === "color")?.id}
        side="left"
      />
      <div className="w-full col-start-2 row-start-1 row-end-5 justify-self-center">
        <CarImage model={model} color={color ?? "transparent"} />
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
      `}</style>
    </div>
  );
};

Car.propTypes = {
  colors: PropTypes.string,
  fetchParts: PropTypes.func,
  changePart: PropTypes.func,
  availableParts: PropTypes.array,
  activeParts: PropTypes.array,
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
    changePart: (part) => {
      return dispatch(changePart(part));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Car);
