import { put, takeEvery } from "redux-saga/effects";

function* fetchExperiences() {
  try {
    const response = yield fetch("/api/experience");
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    const experiences = yield response.json();
    console.log('experiences: ', experiences)
    yield put({ type: "SET_EXPERIENCES", payload: experiences });
  } catch (error) {
    console.log("Experience get request failed", error);
  }
}

function* experienceSaga() {
  yield takeEvery("FETCH_USER_EXPERIENCE", fetchExperiences);
}

export default experienceSaga;
