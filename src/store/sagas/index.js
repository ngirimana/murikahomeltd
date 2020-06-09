import { takeEvery } from "redux-saga/effects";
import * as actionTypes from '../actions/actionTypes'
import { signupUserSaga } from './signup';

export function* watchSignup() {
	
	yield takeEvery(actionTypes.SIGNUP_USER, signupUserSaga)
	
}

