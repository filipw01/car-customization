import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { motion } from "framer-motion";
import CarComponent from "../components/CarComponent";
import { getParts } from "../redux/modules/car";
import CarImage from "./CarImage";

const Car = ({ fetchParts, activeModel, activeColor }) => {
  useEffect(() => {
    fetchParts();
  }, []);
  return (
    <div className="flex flex-col col-gap-4 xl:col-gap-8 car-grid">
      <CarImage key={activeModel} model={activeModel} color={activeColor} />

      <motion.div
        className="col-start-1 row-start-2 justify-self-end"
        animate={{ scale: 1, opacity: 1, x: 0 }}
        initial={{ scale: 0.5, opacity: 0, x: -100 }}
      >
        <CarComponent type="model" lineAngle={30} />
      </motion.div>

      <motion.div
        className="col-start-3 row-start-1"
        animate={{ scale: 1, opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        initial={{ scale: 0.5, opacity: 0, x: 100 }}
      >
        <CarComponent
          type="gearbox"
          side="left"
          lineAngle={-25}
          lineWidth={16}
        />
      </motion.div>

      <motion.div
        className="col-start-1 row-start-3"
        animate={{ scale: 1, opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        initial={{ scale: 0.5, opacity: 0, x: -100 }}
      >
        <CarComponent type="engine" lineAngle={10} lineWidth={16} />
      </motion.div>

      <motion.div
        className="col-start-3 row-start-4"
        animate={{ scale: 1, opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        initial={{ scale: 0.5, opacity: 0, x: 100 }}
      >
        <CarComponent type="color" side="left" lineAngle={30} />
      </motion.div>

      <style jsx>{`
        @media (min-width: 1024px) {
          .car-grid {
            display: grid;
            justify-items: start;
            grid-template-columns: 24rem 1fr 14rem;
            grid-template-rows: 4rem 8rem 8rem 8rem;
          }
        }
        @media (min-width: 1280px) {
          .car-grid {
            grid-template-columns: 34rem 1fr 14rem;
          }
        }
      `}</style>
      <style jsx global="true">{`
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
