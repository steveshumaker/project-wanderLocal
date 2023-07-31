import { put, takeEvery } from "redux-saga/effects";

function* fetchData(action) {
  try {
    const response = yield fetch(`/api/rating/${action.payload.name}`);
    if (!response.ok) {
      throw new Error("Network response getting business details not OK");
    }
    // const data = JSON.stringify(response.body);
    const data = yield response.json();
    console.log('PARSED DATA --> ', data);
  } catch (error) {
    console.log("Error fetching business details");
  }
}

function* ratingSaga() {
  yield takeEvery("FETCH_EXTERNAL_DATA", fetchData);
}

export default ratingSaga;
