import React from "react";

export default function CarComponentButton({ name, state, clickHandler }) {
  return (
    <button
      className={`uppercase py-2 px-4 border border-white rounded-md part-button text-sm mx-between-2 ${
        state === "active" ? "bg-white text-black" : ""
      }`}
      onClick={clickHandler}
    >
      {name}
    </button>
  );
}
