import axios from 'axios';
import { put } from 'redux-saga/effects';
import *  as actions from '../../actions/index';

export function* loginUserSaga(action) {
	yield put(actions.loginStart());
	const loginData = {
		userName: action.userName,
		password: action.password
	};
	const url = 'https://murika.herokuapp.com/api/v1/auth/signin';
	try {
		const response = yield axios.post(url, loginData);
		console.log(response.data)
		// yield localStorage.setItem('expirationDate', exp);
		yield localStorage.setItem('token', response.data.token);
		yield localStorage.setItem('userId', response.data.data.id);
		yield put(actions.loginSuccess(response.data.token, response.data.data.id));
	} catch (error) {
		yield put(actions.loginSuccess(error.message));
	}
}


