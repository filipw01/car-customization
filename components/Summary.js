import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { connect } from "react-redux";
import { contrast } from "chroma-js";
import { motion } from "framer-motion";

export const Summary = ({ activeParts, className = "" }) => {
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
    <div
      className={`max-w-md px-8 py-6 pb-20 rounded bg-light-gray bottom-tear ${className}`}
    >
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
        className="pb-24 mt-4 text-sm text-center"
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
      <style jsx>{`
        .bottom-tear {
          clip-path: polygon(
            4% 73%,
            0% 66%,
            0% 0%,
            100% 0%,
            100% 69%,
            97% 74%,
            95% 69%,
            92% 73%,
            90% 69%,
            87% 74%,
            85% 69%,
            85% 75%,
            81% 71%,
            79% 73%,
            77% 68%,
            74% 74%,
            71% 70%,
            70% 73%,
            67% 68%,
            63% 73%,
            58% 68%,
            57% 73%,
            56% 71%,
            53% 73%,
            52% 68%,
            46% 75%,
            44% 66%,
            42% 71%,
            41% 68%,
            38% 71%,
            34% 66%,
            31% 74%,
            24% 68%,
            22% 73%,
            16% 69%,
            13% 72%,
            11% 70%,
            8% 73%,
            6% 67%
          );
        }
      `}</style>
    </div>
  );
};

Summary.propTypes = {
  activeParts: PropTypes.array,
  className: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    activeParts: state.car.activeParts,
  };
};

export default connect(mapStateToProps, null)(Summary);
