import React from "react";
import { describe, test } from "@jest/globals";
import { screen, render } from "../utils/testUtils";
import "@testing-library/jest-dom/extend-expect";
import CarComponent from "./CarComponent";
import userEvent from "@testing-library/user-event";

describe("CarComponent", () => {
  test("display options from redux store", () => {
    const componentType = "model";
    render(<CarComponent type={componentType} lineAngle={45}/>, {
      initialState: {
        car: {
          availableParts: [
            { "id": 1, "name": "PRO RS3", "price": 20.99, "type": "model" },
            { "id": 2, "name": "UBER RS2", "price": 19.99, "type": "model" },
            { "id": 3, "name": "STANDARD", "price": 19.99, "type": "model" }
          ],
          activeParts: []
        }
      }
    });
    const options = screen.getAllByRole("option");
    expect(options.length).toBeGreaterThan(0);
  });
  test("select option when clicked", () => {
    const componentType = "model";
    render(<CarComponent type={componentType} lineAngle={45}/>, {
      initialState: {
        car: {
          availableParts: [
            { "id": 1, "name": "PRO RS3", "price": 20.99, "type": "model" },
            { "id": 2, "name": "UBER RS2", "price": 19.99, "type": "model" },
            { "id": 3, "name": "STANDARD", "price": 19.99, "type": "model" }
          ],
          activeParts: []
        }
      }
    });
    const standardOption = screen.getByText(/STANDARD/i);
    expect(standardOption.getAttribute("aria-selected")).toBe("false");
    userEvent.click(standardOption);
    expect(standardOption.getAttribute("aria-selected")).toBe("true");
  });
  test("render no options with empty redux data", () => {
    const componentType = "model";

    render(<CarComponent type={componentType} lineAngle={45}/>);
    const button = screen.queryByRole("option");
    expect(button).not.toBeInTheDocument();
  });
});