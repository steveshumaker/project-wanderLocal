import { put, takeEvery } from "redux-saga/effects";

function* fetchExperiences() {
  try {
    const response = yield fetch("/api/experience");
    if (!response.ok) {
      throw new Error("Network response for GET was not OK");
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
      throw new Error("Network response for POST was not OK");
    }
    // -------------- COMMENTED OUT FOR LIMITING RATE LIMIT ERRORS ---------------
    const externalResponse = yield put({
      type: "FETCH_EXTERNAL_DATA",
      payload: { name: action.payload.exp_name, location_desc: action.payload.location_desc },
    });
    console.log(externalResponse);
    yield put({ type: "FETCH_USER_EXPERIENCE" });
  } catch (error) {
    console.log("Experience post failed: ", error);
  }
}

function* updateExperience(action) {
  try {
    const response = yield fetch("/api/experience", {
      method: "PUT",
      body: JSON.stringify(action.payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response for PUT was not OK");
    }
    yield put({ type: "FETCH_USER_EXPERIENCE" });
  } catch (error) {
    console.log("Experience update failed: ", error);
  }
}

function* deleteExperience(action) {
  try {
    const response = yield fetch("/api/experience", {
      method: "DELETE",
      body: JSON.stringify(action.payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response for delete was not OK");
    }
    yield put({ type: "FETCH_USER_EXPERIENCE" });
  } catch (error) {
    console.log("Experience delete failed: ", error);
  }
}

function* experienceSaga() {
  yield takeEvery("FETCH_USER_EXPERIENCE", fetchExperiences),
    yield takeEvery("ADD_USER_EXPERIENCE", addExperience),
    yield takeEvery("UPDATE_EXPERIENCE", updateExperience),
    yield takeEvery("DELETE_EXPERIENCE", deleteExperience);
}

export default experienceSaga;
