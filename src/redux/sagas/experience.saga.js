import { put, takeEvery } from "redux-saga/effects";

function* fetchExperiences() {
  try {
    const response = yield fetch("/api/experience");
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    const experiences = yield response.json();
    yield put({ type: "SET_EXPERIENCES", payload: experiences });
  } catch (error) {
    console.log("Experience get request failed", error);
  }
}

function* addExperience(action) {
  try {
    const response = yield fetch("/api/experience", {
      method: "POST",
      body: JSON.stringify(action.payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    yield put({ type: "FETCH_USER_EXPERIENCE" });
  } catch (error) {
    console.log("Experience post failed: ", error);
  }
}

function* experienceSaga() {
  yield takeEvery("FETCH_USER_EXPERIENCE", fetchExperiences),
    yield takeEvery("ADD_USER_EXPERIENCE", addExperience);
}

export default experienceSaga;
