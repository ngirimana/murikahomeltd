import * as actionTypes from './actionTypes';

export const signupStart = () => {
	return {
		type: actionTypes.SIGNUP_START
	};
};
export const signupSuccess = (token, userId) => {
	return {
		type: actionTypes.SIGNUP_SUCCESS,
		token: token,
		userId: userId
	};
};
export const signupFail = (error) => {
	return {
		type: actionTypes.SIGNUP_FAIL,
		error: error
	};
};

export const signup = (firstName, lastName, phoneNumber, email, password, ) => {
	return {
		type: actionTypes.SIGNUP_USER,
		firstName: firstName,
		lastName: lastName,
		phoneNumber: phoneNumber,
		email: email,
		password: password,
	}
};

