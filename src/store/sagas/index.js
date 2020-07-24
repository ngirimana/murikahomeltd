import { takeEvery } from "redux-saga/effects";
import * as actionTypes from "../actions/actionTypes";
import { signupUserSaga } from "./auth/signup.js";
import {
  loginUserSaga,
  logoutSaga,
  checkAuthTimeoutSaga,
  authCheckStateSaga,
} from "./auth/login.js";
import { addHouseSaga } from "./house/house.js";
import {
  fetchSingleHouseSaga,
  getHouseInfosSaga,
} from "./SingleHouse/SingleHouse";

export function* watchSignup() {
  yield takeEvery(actionTypes.SIGNUP_USER, signupUserSaga);
}
export function* watchLogin() {
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
  yield takeEvery(actionTypes.LOGIN_USER, loginUserSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga);
}

export function* watchAddHouse() {
  yield takeEvery(actionTypes.ADD_HOUSE, addHouseSaga);
}
export function* watchSingleHouse() {
  yield takeEvery(actionTypes.FETCH_SINGLE_HOUSE, fetchSingleHouseSaga);
}

export function* watchGetHouseInfos() {
  yield takeEvery(actionTypes.GET_HOUSE_INFOS, getHouseInfosSaga);
}
