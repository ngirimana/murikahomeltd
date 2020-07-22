import axios from "../../../custom-axios";
import { put } from "redux-saga/effects";
import * as actions from "../../actions/index";

export function* fetchSingleHouseSaga(action) {
  yield put(actions.fetchSingleHouseStart());
  try {
    const response = yield axios.get("/houses/" + action.houseId);
    yield put(actions.fetchSingleHouseSuccess(response.data.data));

    console.log("============================", response.data.data);
  } catch (error) {
    yield put(actions.fetchSingleHouseFail(error));
  }
}
