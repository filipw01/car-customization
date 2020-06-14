import React, { useEffect, useState } from "react";
import CarPart from "../components/CarPart";

export default function Car({ color = "#DE4339" }) {
  const [carComponents, setCarComponents] = useState({
    models: [],
    gearboxes: [],
    engines: [],
    colors: [],
  });
  useEffect(() => {
    fetch("/api/carComponents")
      .then((data) => data.json())
      .then((data) => setCarComponents(data));
  }, []);
  return (
    <div className="car-grid">
      <CarPart
        className="col-start-1 row-start-2 justify-self-end"
        partName="Model"
        options={carComponents.models}
      />
      <CarPart
        className="col-start-3 row-start-1"
        partName="Gearbox"
        options={carComponents.gearboxes}
      />
      <CarPart
        className="col-start-1 row-start-3"
        partName="Engine"
        options={carComponents.engines}
      />
      <CarPart
        className="col-start-3 row-start-4"
        type="color"
        partName="Color"
        options={carComponents.colors}
      />
      <div className="col-start-2 justify-self-center">
        <svg
          width="407"
          height="339"
          viewBox="0 0 407 339"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M72.8062 0L47.0397 107.422H0V138.472H16.1352V339H62.4548V306.174H344.545V339H390.84V138.472H407V107.422H359.96L334.193 0H72.8062V0ZM86.5336 20.8867H320.461L341.214 107.424H65.7759L86.5282 20.8867H86.5336ZM29.5373 164.737L94.1283 188.615V219.641L29.5373 195.763V164.737V164.737ZM377.431 164.737V195.763L312.866 219.641V188.59L377.431 164.737ZM141.037 245.902H265.915V276.928H141.037V245.902Z"
            fill={color}
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
      `}</style>
    </div>
  );
}
