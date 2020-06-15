import getMissingDependencies from "../../utils/getMissingDependencies";

// Actions
const CHANGE_PART = "car-customization/car/CHANGE_PART";
const CHANGE_AVAILABLE_PARTS = "car-customization/car/CHANGE_AVAILABLE_PARTS";

// Reducer
const defaultState = {
  availableParts: [],
  activeParts: [],
};

export default function reducer(state = defaultState, action = {}) {
  switch (action.type) {
    case CHANGE_PART:
      let disabledActive = true;
      let availableParts = state.availableParts;
      let activeParts = [
        ...state.activeParts.filter(
          (part) => part.type !== action.payload.type
        ),
        action.payload,
      ];
      while (disabledActive) {
        disabledActive = false;
        availableParts = availableParts.map((part) => {
          const dependencies = part.dependencies;
          const dependenciesSatisfied =
            getMissingDependencies(
              dependencies,
              activeParts,
              state.availableParts
            ).length === 0;
          if (dependenciesSatisfied === false) {
            activeParts = activeParts.filter((activePart) => {
              if (activePart.id === part.id) {
                disabledActive = true;
                return false;
              }
              return true;
            });
            return { ...part, state: "disabled" };
          } else {
            return { ...part, state: "inactive" };
          }
        });
      }
      return {
        ...state,
        availableParts,
        activeParts,
      };

    case CHANGE_AVAILABLE_PARTS:
      return {
        ...state,
        availableParts: action.payload.map((part) => ({
          ...part,
          state: "inactive",
        })),
      };

    default:
      return state;
  }
}

// Action Creators
export function changePart(part) {
  return { type: CHANGE_PART, payload: part };
}

export function changeAvailableParts(parts) {
  return { type: CHANGE_AVAILABLE_PARTS, payload: parts };
}

// Side effects
export function getParts() {
  return (dispatch) =>
    fetch("/api/carComponents")
      .then((data) => data.json())
      .then((data) => dispatch(changeAvailableParts(data)));
}
