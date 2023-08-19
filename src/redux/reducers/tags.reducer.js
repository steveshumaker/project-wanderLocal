const tagsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_FINAL_TAGS":
      return action.payload;
    default:
      return state;
  }
};

export default tagsReducer;
