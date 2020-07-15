import * as types from "./actionTypes";

const initialState = {
  todos: [
    {
      content: "",
      isCompleted: false,
      isArchived: false,
      position: 0,
    },
  ],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_TODOS:
      return { ...state, todos: action.payload };

    default:
      return state;
  }
};

export default reducer;
