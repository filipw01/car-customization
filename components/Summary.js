import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { connect } from "react-redux";
import { contrast } from "chroma-js";
import { motion } from "framer-motion";

export const Summary = ({ activeParts }) => {
  const [contrastColor, setContrastColor] = useState("black");
  const [color, setColor] = useState({ name: null, hexValue: null });
  const activeColor = activeParts.find((part) => part.type === "color");
  const isComplete = activeParts.length >= 4;
  useEffect(() => {
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
  }, [activeColor]);

  const sum =
    Math.round(activeParts.reduce((acc, curr) => acc + curr.price, 0) * 100) /
    100;

  return (
    <div className="max-w-md px-8 py-6 pb-20 rounded bg-light-gray bottom-tear">
      <h2 className="mb-2 text-4xl font-display">Summary</h2>
      <div className="flex justify-between py-1 text-sm border-b border-dark-gray">
        <div>Model</div>
        <div className="font-medium">
          {activeParts.find((part) => part.type === "model")?.name}
        </div>
      </div>
      <div className="flex justify-between py-1 text-sm border-b border-dark-gray">
        <div>Gearbox</div>
        <div className="font-medium">
          {activeParts.find((part) => part.type === "gearbox")?.name}
        </div>
      </div>
      <div className="flex justify-between py-1 text-sm border-b border-dark-gray">
        <div>Engine</div>
        <div className="font-medium">
          {activeParts.find((part) => part.type === "engine")?.name}
        </div>
      </div>
      <div className="flex justify-between py-1 text-sm">
        <div>Color</div>
        {color?.hexValue && (
          <div className="flex items-center font-medium">
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
      <motion.div
        whileHover={{ y: isComplete ? -2 : 0 }}
        whileTap={{ y: 0, scale: 1.05 }}
        className="mt-4 text-sm text-center"
      >
        {isComplete ? (
          <Link href="/success/">
            <a
              className={`block w-4/5 px-6 py-3 mx-auto rounded ${
                !isComplete ? "bg-transparent" : "bg-black"
              }`}
            >
              Order your awesome car for ${sum}
            </a>
          </Link>
        ) : (
          <p className="py-3 cursor-default">Your car is incomplete</p>
        )}
      </motion.div>
      <svg
        width="0"
        height="0"
        viewBox="0 0 451 339"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id="tearDown">
            <path d="M16.5 327L0 295.5V0L450.5 3.5V310.5L437.5 332.5L426.5 312L416 327L405 312L393.5 332.5L381 312V338.5L366.5 318.5L355 327L348 307L331.5 332.5L319 314.5L313 327L300 307L285.5 327L261 303.5L256 327L251 318.5L238.5 327L235 303.5L209 338.5L200 295.5L190 318.5L183.5 303.5L172 318.5L153.5 295.5L139.5 332.5L110 307L97 327L74.5 310.5L59 324.5L51 314.5L37.5 327L25.5 300L16.5 327Z" />
          </clipPath>
        </defs>
      </svg>

      <style jsx>{`
        .bottom-tear {
          clip-path: url(#tearDown);
        }
      `}</style>
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

export default connect(mapStateToProps, null)(Summary);
