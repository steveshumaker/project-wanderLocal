import { put, takeEvery } from "redux-saga/effects";

// general fetching and setting of experiences
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

// saga to handle adding an experience.
// it also handles dispatching the put call for updating
// the experience with data from yelp
function* addExperience(action) {
  try {
    const response = yield fetch("/api/experience", {
      method: "POST",
      body: JSON.stringify(action.payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const newExpId = yield response.json();
    if (!response.ok) {
      throw new Error("Network response for POST was not OK");
    }
    // -------------- COMMENT TO LIMIT YELP API FETCHES ---------------
    yield put({
      type: "FETCH_EXTERNAL_DATA",
      payload: {
        name: action.payload.exp_name,
        location_desc: action.payload.location_desc,
        id: newExpId.id,
      },
    });
    yield put({ type: "FETCH_USER_EXPERIENCE" });
  } catch (error) {
    console.log("Experience post failed: ", error);
  }
}

// more general put route to handle updates
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

// function to handle toggling the external data display switch
function* toggleExternal(action) {
  console.log("IN TOGGLING");
  try {
    const response = yield fetch(`/api/experience/toggleExternal`, {
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

// function that handles deleting
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
  yield takeEvery("FETCH_USER_EXPERIENCE", fetchExperiences);
  yield takeEvery("ADD_USER_EXPERIENCE", addExperience);
  yield takeEvery("UPDATE_EXPERIENCE", updateExperience);
  yield takeEvery("DELETE_EXPERIENCE", deleteExperience);
  yield takeEvery("SHOW_EXTERNAL_UPDATE", toggleExternal);
}

export default experienceSaga;
