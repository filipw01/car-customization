import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { describe } from "@jest/globals";
import CarComponentOption from "./CarComponentOption";

describe("CarComponentOption", () => {
  test("Renders with correct name", () => {
    const partName = "V8";
    render(<CarComponentOption name={partName}/>);
    const button = screen.getByRole("option");
    expect(button).toHaveTextContent(partName);
  });
});
