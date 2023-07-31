import { put, takeEvery } from "redux-saga/effects";

function* fetchData(action) {
  try {
    const response = yield fetch(`/api/rating/${action.payload.name}`);
    if (!response.ok) {
      throw new Error("Network response getting business details not OK");
    }
    const data = yield response.json();
    console.log("PARSED DATA --> ", data);
    yield put({
      type: "UPDATE_EXPERIENCE",
      payload: {
        stars: data.businesses[0].rating,
        reviews: data.businesses[0].review_count,
        web_path: data.businesses[0].url,
        dataId: action.payload.id,
      },
    });
  } catch (error) {
    console.log("Error fetching business details", error);
  }
}

function* ratingSaga() {
  yield takeEvery("FETCH_EXTERNAL_DATA", fetchData);
}

export default ratingSaga;
