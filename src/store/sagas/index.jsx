import { takeEvery } from "redux-saga/effects";
import * as actionTypes from '../actions/actionTypes'
import { signupUserSaga, signupCheckStateSaga } from './auth/signup.jsx';
import { loginUserSaga, logoutSaga, checkAuthTimeoutSaga, authCheckStateSaga } from './auth/login.jsx';

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

