import React from "react";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import { describe, test } from "@jest/globals";
import CarOption from "./CarOption";

describe("CarOption", () => {
  test("shows and hides tooltip when disabled", async () => {
    render(<CarOption tooltipText="test text" state="disabled"/>);
    const tooltipWrapper = screen.queryByRole("option").parentElement;
    expect(screen.queryByText("test text")).not.toBeInTheDocument();
    userEvent.hover(tooltipWrapper);
    expect(screen.getByText("test text")).toBeVisible();
    userEvent.unhover(tooltipWrapper);
    expect(screen.getByText("test text")).not.toBeVisible();
    userEvent.hover(tooltipWrapper);
    expect(screen.getByText("test text")).toBeVisible();
  });

  test("doesn't show tooltip when enabled", async () => {
    const { rerender } = render(<CarOption tooltipText="test text" state="active"/>);
    const tooltipWrapper = screen.queryByRole("option").parentElement;
    expect(screen.queryByText("test text")).not.toBeInTheDocument();
    userEvent.hover(tooltipWrapper);
    expect(screen.getByText("test text")).not.toBeVisible();

    rerender(<CarOption tooltipText="test text" state="inactive"/>);
    expect(screen.getByText("test text")).not.toBeVisible();
    userEvent.hover(tooltipWrapper);
    expect(screen.getByText("test text")).not.toBeVisible();
  });

  test("handles click when enabled", () => {
    const clickHandler = jest.fn();
    const {rerender} = render(<CarOption state="inactive" clickHandler={clickHandler}/>);
    expect(clickHandler).not.toHaveBeenCalled();
    userEvent.click(screen.getByRole("option"));
    expect(clickHandler).toHaveBeenCalledTimes(1);

    clickHandler.mockReset()
    rerender(<CarOption state="active" clickHandler={clickHandler}/> )
    expect(clickHandler).not.toHaveBeenCalled();
    userEvent.click(screen.getByRole("option"));
    expect(clickHandler).toHaveBeenCalledTimes(1);
  });

  test("ignores click when disabled", () => {
    const clickHandler = jest.fn();
    render(<CarOption state="disabled" clickHandler={clickHandler}/>);
    expect(clickHandler).not.toHaveBeenCalled();
    userEvent.click(screen.getByRole("option"));
    expect(clickHandler).not.toHaveBeenCalled();
  });

  test("renders children", ()=>{
    render(<CarOption>Hello from the inside</CarOption>)
    const button = screen.getByRole("option")
    expect(button).toHaveTextContent("Hello from the inside")
  })
});
