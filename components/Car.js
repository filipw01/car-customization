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
    <div className="col-gap-8 car-grid">
      <CarPart
        className="col-start-1 row-start-2 justify-self-end"
        partName="Model"
        options={carComponents.models}
      />
      <CarPart
        className="col-start-3 row-start-1"
        partName="Gearbox"
        options={carComponents.gearboxes}
        side="left"
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
        side="left"
      />
      <div className="w-full col-start-2 justify-self-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 407 339"
        >
          <path
            fill={color}
            d="M72.8 0L47 107.4H0v31h16.1V339h46.4v-32.8h282V339h46.3V138.5H407v-31h-47L334.2 0H72.8zm13.7 20.9h234l20.7 86.5H65.8L86.5 21zm-57 143.8l64.6 24v31l-64.6-24v-31zm348 0v31l-64.6 24v-31.1l64.5-23.9zM141 246h125v31H141v-31z"
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
        .mx-between-2 + .mx-between-2 {
          margin-left: 1rem;
        }
      `}</style>
    </div>
  );
}
