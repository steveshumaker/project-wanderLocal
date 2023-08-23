import { put, takeEvery } from "redux-saga/effects";

// saga to query yelp api and send put request
// to update experiences with the yelp data
function* fetchData(action) {
  try {
    const response = yield fetch(
      `/api/rating/${action.payload.name}/${action.payload.location_desc}`
    );
    if (!response.ok) {
      throw new Error("Network response getting business details not OK");
    }
    const data = yield response.json();
    yield put({
      type: "UPDATE_EXPERIENCE",
      payload: {
        stars: data.businesses[0].rating,
        reviews: data.businesses[0].review_count,
        web_path: data.businesses[0].url,
        yelp_path: data.businesses[0].image_url,
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
