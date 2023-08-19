// tagsReducer handles the setting of the final tag array
// after it is flattened and reduced in the saga
const tagsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_FINAL_TAGS":
      return action.payload;
    default:
      return state;
  }
};

export default tagsReducer;
