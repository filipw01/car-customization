import getMissingDependencies from "../../utils/getMissingDependencies";

// Actions
const CHANGE_PART = "car-customization/car/CHANGE_PART";
const CHANGE_AVAILABLE_PARTS = "car-customization/car/CHANGE_AVAILABLE_PARTS";

// Reducer
const defaultState = {
  availableParts: { model: [], gearbox: [], engine: [], color: [] },
  activeParts: { model: null, gearbox: null, engine: null, color: null },
};

export default function reducer(state = defaultState, action = {}) {
  switch (action.type) {
    case CHANGE_PART:
      if (
        ["model", "gearbox", "engine", "color"].includes(action.payload.type)
      ) {
        let updatedStatePartsEntries;
        let disabledActive = true;
        const activeParts = {
          ...state.activeParts,
          [action.payload.type]: action.payload.id,
        };
        let activePartsEntries = Object.entries(activeParts);
        while (disabledActive) {
          disabledActive = false;
          updatedStatePartsEntries = Object.entries(state.availableParts).map(
            ([componentName, parts]) => {
              return [
                componentName,
                parts.map((part) => {
                  const dependencies = part.dependencies;
                  const dependenciesSatisfied =
                    getMissingDependencies(
                      dependencies,
                      Object.fromEntries(activePartsEntries)
                    ).length === 0;
                  if (dependenciesSatisfied === false) {
                    activePartsEntries = activePartsEntries.filter(
                      ([_key, value]) => {
                        if (value === part.id) {
                          console.log(value);
                          disabledActive = true;
                        }
                        return value !== part.id;
                      }
                    );
                    return { ...part, state: "disabled" };
                  } else {
                    return { ...part, state: "inactive" };
                  }
                }),
              ];
            }
          );
        }

        const updatedActiveParts = Object.fromEntries(activePartsEntries);
        const updatedStateParts = Object.fromEntries(updatedStatePartsEntries);
        return {
          ...state,
          availableParts: updatedStateParts,
          activeParts: updatedActiveParts,
        };
      }
      throw new Error("Wrong car part type");

    case CHANGE_AVAILABLE_PARTS:
      return { ...state, availableParts: action.payload };

    default:
      return state;
  }
}

// Action Creators
export function changePart(type, id) {
  return { type: CHANGE_PART, payload: { type, id } };
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
