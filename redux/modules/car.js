import getMissingDependencies from "../../utils/getMissingDependencies";
import produce from "immer";

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
      return produce(state, (draftState) => {
        // Remove parts of the same type and add new part
        draftState.activeParts = [
          ...draftState.activeParts.filter(
            (part) => part.type !== action.payload.type
          ),
          action.payload,
        ];

        let disabledActivePart = true;
        // When previously active part gets disabled check requirements again
        while (disabledActivePart) {
          disabledActivePart = false;
          // Disable parts, that don't satisfy requirements and enable these that do
          draftState.availableParts = draftState.availableParts.map(
            (currentPart) => {
              const dependencies = currentPart.dependencies;
              const hasMissingDependencies =
                getMissingDependencies(
                  dependencies,
                  draftState.activeParts,
                  draftState.availableParts
                ).length !== 0;
              if (hasMissingDependencies === true) {
                // Remove disabled part from active parts
                draftState.activeParts = draftState.activeParts.filter(
                  (activePart) => {
                    if (activePart.id === currentPart.id) {
                      // Repeat because active part got disabled
                      disabledActivePart = true;
                      return false;
                    }
                    return true;
                  }
                );
                return { ...currentPart, state: "disabled" };
              } else {
                return { ...currentPart, state: "inactive" };
              }
            }
          );
        }
      });

    case CHANGE_AVAILABLE_PARTS:
      return produce(state, (draftState) => {
        draftState.availableParts = action.payload.map((part) => ({
          ...part,
          state: "inactive",
        }));
      });

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
      .then((data) => {
        dispatch(changeAvailableParts(data.parts));
        // Set default options
        data.default.forEach((defaultPartId) => {
          const part = data.parts.find((part) => defaultPartId === part.id);
          dispatch(changePart(part));
        });
      });
}
