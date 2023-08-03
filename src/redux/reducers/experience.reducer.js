const experienceReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_EXPERIENCES":
      return action.payload;
    case "SET_ALL_EXPERIENCES":
      return action.payload;
    default:
      return state;
  }
};

export default experienceReducer;
