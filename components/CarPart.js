import React, { useState } from "react";
import CarComponentButton from "../components/CarComponentButton";
import CarColorButton from "../components/CarColorButton";

export default function CarPart({
  type = "component",
  options,
  partName,
  className,
  side,
}) {
  const [activeOptionId, setActiveOptionId] = useState(null);
  return (
    <div className={`inline-block ${className}`}>
      <p
        className={`mb-1 text-xs uppercase ${
          side === "left" ? "text-right" : ""
        }`}
      >
        {partName}
      </p>
      <div className="flex pt-3 border-t border-white">
        {options.map((option) => {
          let buttonState = "inactive";
          if (activeOptionId === option.id) {
            buttonState = "active";
          }
          if (type === "color") {
            return (
              <CarColorButton
                key={option.id}
                clickHandler={() => setActiveOptionId(option.id)}
                color={option.hexValue}
                state={buttonState}
              />
            );
          } else if (type === "component") {
            return (
              <CarComponentButton
                key={option.id}
                clickHandler={() => setActiveOptionId(option.id)}
                name={option.name}
                state={buttonState}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
