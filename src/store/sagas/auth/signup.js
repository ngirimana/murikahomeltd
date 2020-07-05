import axios from "../../../custom-axios";
import { put } from "redux-saga/effects";
import * as actions from "../../actions/index";

export function* signupUserSaga(action) {
  yield put(actions.signupStart());
  const signupData = {
    firstName: action.firstName,
    lastName: action.lastName,
    phoneNumber: action.phoneNumber,
    email: action.email,
    password: action.password,
    userType: action.userType,
  };

  try {
    const response = yield axios.post("/auth/signup", signupData);
    yield put(
      actions.signupSuccess(response.data.token, response.data.data.id)
    );
  } catch (error) {
    yield put(actions.signupFail(error.message));
  }
}
