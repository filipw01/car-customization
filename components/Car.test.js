import React from "react";
import { describe, test } from "@jest/globals";
import { screen, render } from "../utils/testUtils";
import "@testing-library/jest-dom/extend-expect";
import Car from "./Car";
import data from "../data.json";
import userEvent from "@testing-library/user-event";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(data)
  })
);

beforeEach(() => {
  fetch.mockClear();
});

describe("Car", () => {
  test("load dependencies from API", async () => {
    render(<Car/>);
    const model = await screen.findByRole("option", { name: /PRO RS3/i });
    expect(model).toBeInTheDocument();
    const gearbox = screen.getByRole("option", { name: /AUTOMATIC/i });
    expect(gearbox).toBeInTheDocument();
    const engine = screen.getByRole("option", { name: /4.2L 443BHP/i });
    expect(engine).toBeInTheDocument();
    const color = screen.getByLabelText(/white/i);
    expect(color).toBeInTheDocument();
  });
  test("load default parts", async () => {
    render(<Car/>);
    const model = await screen.findByRole("option", { name: /PRO RS3/i });
    expect(model.getAttribute("aria-selected")).toBe("true");
    const color = screen.getByLabelText(/red/i);
    expect(color.getAttribute("aria-selected")).toBe("true");
  });
  test("unselect when conflicting dependency", async () => {
    render(<Car/>);
    const withDependencies = await screen.findByRole("option", { name: /AUTOMATIC/i });
    userEvent.click(withDependencies);
    expect(withDependencies.getAttribute("aria-selected")).toBe("true");
    const conflictingDependency = screen.getByRole("option", { name: /WK/i });
    userEvent.click(conflictingDependency);
    expect(conflictingDependency.getAttribute("aria-selected")).toBe("true");
    expect(withDependencies.getAttribute("aria-selected")).toBe("false");
  });
  test("show missing dependencies on hover", async () => {
    render(<Car/>);
    const conflictingDependency = await screen.findByRole("option", { name: /WK/i });
    userEvent.click(conflictingDependency);
    const withDependencies = screen.getByRole("option", { name: /AUTOMATIC/i });
    userEvent.hover(withDependencies.parentElement);
    const info = await screen.findAllByText(`Requires "PRO RS3" or "UBER RS2" or "STANDARD"`);
    expect(info.length).toBeGreaterThan(0);
  });
});