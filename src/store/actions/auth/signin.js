import * as actionTypes from '../actionTypes';

export const loginStart=()=>{
	return{
		type:actionTypes.LOGIN_START
	}
}
export const loginSuccess=(token)=>{
	return{
		type:actionTypes.LOGIN_SUCCESS,
		token:token,
		
	}
}
export const loginFail=(error)=>{
	return{
		type:actionTypes.LOGIN_FAIL,
		error:error
	}
}

//logout actions

export const logout = () => {
	return {
			type: actionTypes.AUTH_INITIATE_LOGOUT
	};
};
export const logoutSucceed = () => {
	return {
			type: actionTypes.AUTH_LOGOUT
	}
}
export const checkAuthTimeout = (expirationTime) => {
	return {
			type: actionTypes.AUTH_CHECK_TIMEOUT,
			expirationTime: expirationTime
	}
};
export const login = (userName, password) => {
	return {
		type: actionTypes.LOGIN_USER,
		userName: userName,
		password: password
	}
}

export const setAuthRedirectPath = (path) => {
	return {
			type: actionTypes.SET_AUTH_REDIRECT_PATH,
			path: path
	};
};
export const authCheckState = () => {
	return {
			type: actionTypes.AUTH_CHECK_STATE
	}
};