import axios from 'axios'
import { put } from 'redux-saga/effects';
import decode from 'jwt-decode';
import * as actions from '../../actions/index';

export function* signupUserSaga(action) {
	yield put(actions.signupStart());
	const signupData = {
		firstName: action.firstName,
		lastName: action.lastName,
		phoneNumber: action.phoneNumber,
		email: action.email,
		password: action.password,
		userType:action.userType,
	};
	const url = 'https://murika.herokuapp.com/api/v1/auth/signup';
	try {
		const response = yield axios.post(url, signupData)
		console.log(response.data);
		const { exp } = decode(response.data.token);
		yield localStorage.setItem('expirationDate', exp);
		yield localStorage.setItem('token', response.data.token);
		yield localStorage.setItem('userId', response.data.data.id);
		yield put(actions.signupSuccess(response.data.token, response.data.data.id));
		yield put(actions.checkAuthTimeout(exp - (new Date().getTime() / 1000)));
	} catch (error) {
		yield put(actions.signupFail(error.message));
	}
}

export function* signupCheckStateSaga(action) {
	const token = yield localStorage.getItem('token');
	if (!token) {
		yield put(actions.logout());
	}
	else {
		const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
		if (Date.now() >= expirationDate * 1000) {
			yield put(actions.logout());
		}
		else {
			const userId = yield localStorage.getItem('userId');
			yield put(actions.signupSuccess(token, userId));
			yield put(actions.checkAuthTimeout(expirationDate - (new Date().getTime() / 1000)));
		}
	}
}
