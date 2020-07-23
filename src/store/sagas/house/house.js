import axios from "../../../custom-axios";
import { put } from "redux-saga/effects";
import * as actions from "../../actions/index";

export function* addHouseSaga(action) {
  yield put(actions.addHouseStart());
  try {
    const response = yield axios.post("/house", action.houseData);
    yield put(actions.addHouseSuccess(response.data.data));
  } catch (error) {
    yield put(actions.addHouseFail(error));
  }
}
