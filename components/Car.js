import React, { useEffect } from "react";
import CarComponent from "../components/CarComponent";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getParts } from "../redux/modules/car";
import CarImage from "./CarImage";

const Car = ({ fetchParts, activeModel, activeColor }) => {
  useEffect(() => {
    fetchParts();
  }, []);

  return (
    <div className="col-gap-8 car-grid">
      <CarComponent
        className="col-start-1 row-start-2 justify-self-end"
        type="model"
      />
      <CarComponent
        className="col-start-3 row-start-1"
        type="gearbox"
        side="left"
      />
      <CarComponent className="col-start-1 row-start-3" type="engine" />
      <CarComponent
        className="col-start-3 row-start-4"
        type="color"
        side="left"
      />
      <div className="flex items-center w-full h-full col-start-2 row-start-1 row-end-4 text-4xl text-center">
        <CarImage model={activeModel} color={activeColor} />
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
  activeColor: PropTypes.string,
  activeModel: PropTypes.string,
  fetchParts: PropTypes.func,
};

const mapStateToProps = (state) => ({
  activeColor: state.car.activeParts.find((part) => part.type === "color")
    ?.hexValue,
  activeModel: state.car.activeParts.find((part) => part.type === "model")
    ?.name,
});

const mapDispatchToProps = (dispatch) => ({
  fetchParts: () => {
    return dispatch(getParts());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Car);
