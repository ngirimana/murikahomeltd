import axios from 'axios'
import { put } from 'redux-saga/effects';
import decode from 'jwt-decode';
import * as actions from '../actions/index'
export function* signupUserSaga(action) {
	yield put(actions.signupStart());
	const signupData = {
		firstName: action.firstName,
		lastName: action.lastName,
		phoneNumber: action.phoneNumber,
		email: action.email,
		password: action.password,
	};
	const url = 'https://murika.herokuapp.com/api/v1/auth/signup';
	try {
		const response = yield axios.post(url, signupData)
		const { exp } = decode(response.data.token);
		yield localStorage.setItem('expirationDate', exp);
		yield localStorage.setItem('token', response.data.token);
		yield localStorage.setItem('userId', response.data.data.id);
		yield put(actions.signupSuccess(response.data.token, response.data.data.id));
		
	} catch (error) {
		yield put(actions.signupFail(error.message));
	}
}
