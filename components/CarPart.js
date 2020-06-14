import React from "react";

export default function CarPart({
  type = "component",
  options,
  activeOptionId,
  partName,
  className,
}) {
  return (
    <div className={`inline-block ${className}`}>
      <p className="text-xs">{partName}</p>
      <div className="flex pt-3 border-t border-white">
        {options.map((option) => (
          <button
            style={{ backgroundColor: type === "color" && option.value }}
            className={`uppercase py-2 px-4 border border-white rounded-md part-button ${
              activeOptionId === option.id ? "bg-white" : ""
            }`}
            key={option.id}
          >
            {type === "component" && option.name}
          </button>
        ))}
      </div>
      <style jsx>{`
        .part-button {
          min-width: 3rem;
          min-height: 2rem;
        }
        .part-button + .part-button {
          margin-left: 0.5rem;
        }
      `}</style>
    </div>
  );
}
