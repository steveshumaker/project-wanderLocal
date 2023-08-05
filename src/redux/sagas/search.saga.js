import { put, takeEvery } from "redux-saga/effects";

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

function* searchSaga() {
  yield takeEvery("FETCH_ALL_EXPERIENCES", fetchAllExperiences);
}

export default searchSaga;
