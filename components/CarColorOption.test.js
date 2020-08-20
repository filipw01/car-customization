import React from "react";
import { describe, test } from "@jest/globals";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CarColorOption from "./CarColorOption";

describe("CarColorOption", () => {
  test("render correct colors", () => {
    const color = "rgb(255,255,255)";
    render(<CarColorOption color={color}/>);
    const button = screen.getByRole("option");
    expect(button).toHaveStyle(`background-color: ${color}`);
  });

  test("pick contrast color for white", () => {
    const white = "#ffffff";
    const whiteContrastColor = "black";
    render(
      <CarColorOption color={white} state="active"/>
    );
    const button = screen.getByRole("option");
    expect(button).toHaveStyle(`border-color: ${whiteContrastColor}`);
  });

  test("pick contrast color for black", () => {
    const black = "rgb(0,0,0)";
    const blackContrastColor = "white";
    render(
      <CarColorOption color={black} state="active"/>
    );
    const button = screen.getByRole("option");
    expect(button).toHaveStyle(`border-color: ${blackContrastColor}`);
  });

  test("render disabled", () => {
    render(
      <CarColorOption color="#fff" state="disabled"/>
    );
    const button = screen.getByRole("option");
    expect(button).toBeDisabled();
  });
});
