import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { describe, test } from "@jest/globals";
import { screen, render } from "../utils/testUtils";
import Summary from "./Summary";

describe("Summary", () => {
  test("displays correct on completed car", () => {
    render(<Summary/>, {
      initialState: {
        car: {
          activeParts: [
            {
              id: 10,
              name: "2.0L 166BHP",
              price: 29.99,
              type: "engine",
              state: "inactive"
            },
            {
              id: 12,
              name: "black",
              hexValue: "#322F2F",
              price: 39.99,
              type: "color",
              state: "inactive"
            },
            {
              id: 5,
              name: "MANUAL",
              price: 12.99,
              type: "gearbox",
              state: "inactive"
            },
            {
              id: 2,
              name: "UBER RS2",
              price: 19.99,
              type: "model",
              state: "inactive"
            }
          ]
        }
      }
    });
    expect(screen.getByLabelText(/model/i)).toHaveTextContent("UBER RS2");
    expect(screen.getByLabelText(/gearbox/i)).toHaveTextContent("MANUAL");
    expect(screen.getByLabelText(/engine/i)).toHaveTextContent("2.0L 166BHP");
    expect(screen.getByLabelText(/color/i)).toHaveTextContent("black");
    expect(screen.getByTestId("color-output-sample")).toHaveStyle("background-color: rgb(50,47,47)");
    expect(screen.getByText("Order your awesome car for $102.96")).toBeInTheDocument();
  });

  test("displays correct on uncompleted car", () => {
    render(<Summary/>, {
      initialState: {
        car: {
          activeParts: [
            {
              id: 5,
              name: "MANUAL",
              price: 12.99,
              type: "gearbox",
              state: "inactive"
            },
            {
              id: 2,
              name: "UBER RS2",
              price: 19.99,
              type: "model",
              state: "inactive"
            }
          ]
        }
      }
    });
    expect(screen.getByLabelText(/model/i)).toHaveTextContent("UBER RS2");
    expect(screen.getByLabelText(/gearbox/i)).toHaveTextContent("MANUAL");
    expect(screen.getByLabelText(/engine/i)).toHaveTextContent("");
    expect(screen.getByLabelText(/color/i)).toHaveTextContent("");
    expect(screen.getByText("Your car is incomplete")).toBeInTheDocument();
  });
});
