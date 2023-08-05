const searchReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_ALL_EXPERIENCES":
      return action.payload;
    default:
      return state;
  }
};

export default searchReducer;
