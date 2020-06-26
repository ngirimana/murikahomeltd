import { takeEvery } from "redux-saga/effects";
import * as actionTypes from '../actions/actionTypes'
import { signupUserSaga, signupCheckStateSaga } from './auth/signup.js';
import { loginUserSaga, logoutSaga, checkAuthTimeoutSaga, authCheckStateSaga } from './auth/login.js';
import { addHouseSaga } from './house/house.js'

export function* watchSignup() {
	yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
	yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
	yield takeEvery(actionTypes.SIGNUP_USER, signupUserSaga);
	yield takeEvery(actionTypes.AUTH_CHECK_STATE, signupCheckStateSaga);

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

