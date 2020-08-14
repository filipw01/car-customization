import React from "react";
import CarColorButton from "./CarColorButton";
import { render } from "../utils/testUtils";

describe("Car test", () => {
  test("should render correct colors", () => {
    const color = "rgb(255, 255, 255)";
    const { getByRole } = render(<CarColorButton color={color} />);
    const button = getByRole("option");
    expect(button.style.backgroundColor).toBe(color);
  });

  test("should pick contrast color for white", () => {
    const white = "#fff";
    const whiteContrastColor = "black";
    const { getByRole } = render(
      <CarColorButton color={white} state="active" />
    );
    const button = getByRole("option");
    expect(button.classList).toContain(`border-${whiteContrastColor}`);
  });

  test("should pick contrast color for black", () => {
    const black = "#000";
    const blackContrastColor = "white";
    const { getByRole } = render(
      <CarColorButton color={black} state="active" />
    );
    const button = getByRole("option");
    expect(button.classList).toContain(`border-${blackContrastColor}`);
  });

  test("should render disabled", () => {
    const { getByRole } = render(
      <CarColorButton color="#fff" state="disabled" />
    );
    const button = getByRole("option");
    expect(button.disabled).toBeDefined();
  });
});
