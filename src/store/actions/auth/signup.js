import * as actionTypes from '../actionTypes';

export const signupStart = () => {
	return {
		type: actionTypes.SIGNUP_START
	};
};
export const signupSuccess = (token, userId) => {
	return {
		type: actionTypes.SIGNUP_SUCCESS,
	};
};
export const signupFail = (error) => {
	return {
		type: actionTypes.SIGNUP_FAIL,
		error: error
	};
};

export const signup = (firstName, lastName, phoneNumber, email, password, userType) => {
	return {
		type: actionTypes.SIGNUP_USER,
		firstName: firstName,
		lastName: lastName,
		phoneNumber: phoneNumber,
		email: email,
		password: password,
		userType: userType,
	}
};

