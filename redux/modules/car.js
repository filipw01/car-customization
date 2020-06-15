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
        return {
          ...state,
          activeParts: {
            ...state.activeParts,
            [action.payload.type]: action.payload.id,
          },
        };
      }
      throw "Wrong car part type";

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
