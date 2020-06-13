import axios from 'axios';
import { put ,call,delay} from 'redux-saga/effects';
import *  as actions from '../../actions/index' ;
import decode from 'jwt-decode';

export function* logoutSaga(action) {
	yield call([localStorage,'removeItem'],'token')
	yield call([localStorage,'removeItem'],'expirationDate')
	yield call([localStorage,'removeItem'],'userId')
	yield put(actions.logoutSucceed())
}
export function* checkAuthTimeoutSaga(action) {
	yield delay(action.expirationTime * 1000)
	yield put(actions.logout())
}

export function* loginUserSaga(action) {
	yield put(actions.loginStart());
	const loginData = {
		userName: action.userName,
		password: action.password
	};
	const url = 'https://murika.herokuapp.com/api/v1/auth/signin';
	try {
		const response = yield axios.post(url, loginData);
		const { exp } = decode(response.data.token);
		yield localStorage.setItem('expirationDate', exp);
		yield localStorage.setItem('token', response.data.token);
		yield localStorage.setItem('userId', response.data.data.id);
		yield put(actions.loginSuccess(response.data.token, response.data.data.id));
		yield put(actions.checkAuthTimeout(exp - (new Date().getTime() / 1000)));
	} catch (error) {
		yield put(actions.loginFail(error.message));
	}
}

export function* authCheckStateSaga(action) {
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
			yield put(actions.loginSuccess(token, userId));
			yield put(actions.checkAuthTimeout(expirationDate - (new Date().getTime() / 1000)));
		}
	}
}

