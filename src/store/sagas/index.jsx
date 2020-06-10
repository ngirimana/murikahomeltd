import { takeEvery } from "redux-saga/effects";
import * as actionTypes from '../actions/actionTypes'
import { signupUserSaga } from './auth/signup.jsx';
import {loginUserSaga} from './auth/login.jsx';

export function* watchSignup() {
	yield takeEvery(actionTypes.SIGNUP_USER, signupUserSaga);
}
export function* watchLogin(){
	yield takeEvery(actionTypes.LOGIN_USER,loginUserSaga);
}

