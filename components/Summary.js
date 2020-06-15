import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { contrast } from "chroma-js";

export const Summary = ({ activeParts }) => {
  const [contrastColor, setContrastColor] = useState("black");
  const [color, setColor] = useState({ name: null, hexValue: null });
  useEffect(() => {
    const activeColor = activeParts.find((part) => part.type === "color");
    setColor({
      name: activeColor?.name,
      hexValue: activeColor?.hexValue,
    });
    if (activeColor?.hexValue) {
      if (
        contrast("#fff", activeColor.hexValue) + 1 >
        contrast("#000", activeColor.hexValue)
      ) {
        setContrastColor("white");
      } else {
        setContrastColor("black");
      }
    }
  }, [activeParts]);

  const sum =
    Math.round(activeParts.reduce((acc, curr) => acc + curr.price, 0) * 100) /
    100;

  return (
    <div className="max-w-md px-8 py-6 bg-light-gray">
      <h2 className="mb-2 text-4xl">Summary</h2>
      <div className="flex justify-between py-1 text-sm border-b border-dark-gray">
        <div>Model</div>
        <div>{activeParts.find((part) => part.type === "model")?.name}</div>
      </div>
      <div className="flex justify-between py-1 text-sm border-b border-dark-gray">
        <div>Gearbox</div>
        <div>{activeParts.find((part) => part.type === "gearbox")?.name}</div>
      </div>
      <div className="flex justify-between py-1 text-sm border-b border-dark-gray">
        <div>Engine</div>
        <div>{activeParts.find((part) => part.type === "engine")?.name}</div>
      </div>
      <div className="flex justify-between py-1 text-sm">
        <div>Color</div>
        {color?.hexValue && (
          <div className="flex items-center">
            <div
              className="w-4 h-4 mr-2 border rounded-full"
              style={{
                borderColor: contrastColor,
                backgroundColor: color.hexValue,
              }}
            ></div>
            <p>{color.name}</p>
          </div>
        )}
      </div>
      <button className="block w-4/5 py-3 mx-auto mt-4 text-sm bg-black rounded">
        Order your awesome car (${sum})
      </button>
    </div>
  );
};

Summary.propTypes = {
  activeParts: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    activeParts: state.car.activeParts,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
