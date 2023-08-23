import { put, takeEvery } from "redux-saga/effects";

// function that handles fetching all experiences
function* fetchAllExperiences() {
  try {
    const response = yield fetch("/api/experience/all");
    if (!response.ok) {
      throw new Error("Network response for GET was not OK");
    }
    const experiences = yield response.json();
    yield put({ type: "SET_ALL_EXPERIENCES", payload: experiences });
  } catch (error) {
    console.log("Experience get request failed", error);
  }
}

// function that handles the fetching and cleaning of tags.
// first queries the '/all' route, then reduces the array to those
// that are defined, then flattens it, then creates a new set to remove
// duplicates.
function* fetchAllTags() {
  try {
    const response = yield fetch("/api/experience/all");
    if (!response.ok) {
      throw new Error("Network response for GET was not OK");
    }
    const experiences = yield response.json();
    const initialTags = yield experiences.reduce((tags, experience) => {
      if (experience.tags !== null && experience.tags !== undefined) {
        tags.push(...experience.tags);
      }
      return tags;
    }, []);
    const flatTags = yield initialTags.flat();
    const finalTags = yield [...new Set(flatTags)];
    yield put({ type: "SET_FINAL_TAGS", payload: finalTags });
  } catch (error) {
    console.log(error);
  }
}

function* searchSaga() {
  yield takeEvery("FETCH_ALL_EXPERIENCES", fetchAllExperiences);
  yield takeEvery("FETCH_AND_SET_TAGS", fetchAllTags);
}

export default searchSaga;
