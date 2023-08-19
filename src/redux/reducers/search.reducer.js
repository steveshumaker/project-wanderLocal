// search reducer sets the list of experiences for the search page
const searchReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_ALL_EXPERIENCES":
      return action.payload;
    default:
      return state;
  }
};

export default searchReducer;
