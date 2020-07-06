import axios from "../../../custom-axios";
import { put, call, delay } from "redux-saga/effects";
import * as actions from "../../actions/index";
import decode from "jwt-decode";

export function* logoutSaga(action) {
  yield call([localStorage, "removeItem"], "token");
  yield call([localStorage, "removeItem"], "expirationDate");
  yield put(actions.logoutSucceed());
}
export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}

export function* loginUserSaga(action) {
  yield put(actions.loginStart());
  const loginData = {
    userName: action.userName,
    password: action.password,
  };
  try {
    const response = yield axios.post("/auth/signin", loginData);
    const { exp } = decode(response.data.token);
    yield localStorage.setItem("expirationDate", exp);
    yield localStorage.setItem("token", response.data.token);
    yield put(actions.loginSuccess(response.data.token, response.data.data.id));
    yield put(actions.checkAuthTimeout(exp - new Date().getTime() / 1000));
  } catch (error) {
    yield put(actions.loginFail(error.message));
  }
}

export function* authCheckStateSaga(action) {
  const token = yield localStorage.getItem("token");
  if (!token) {
    yield put(actions.logout());
  } else {
		const expirationDate = localStorage.getItem("expirationDate");
		console.log(Date.now(),'=============',expirationDate * 1000,'==========',Date.now() >= expirationDate * 1000,'=========',expirationDate*1000 - new Date().getTime() )
    if (Date.now() >= expirationDate * 1000) {
      yield put(actions.logout());
    } else {
      yield put(actions.loginSuccess(token));
      yield put(
        actions.checkAuthTimeout(expirationDate*1000 - new Date().getTime() )
      );
    }
  }
}
