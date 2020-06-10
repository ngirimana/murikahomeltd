import * as actionTypes from '../actionTypes';

export const loginStart=()=>{
	return{
		type:actionTypes.LOGIN_START
	}
}
export const loginSuccess=(token,userId)=>{
	return{
		type:actionTypes.LOGIN_SUCCESS,
		token:token,
		userId:userId
	}
}
export const loginFail=(error)=>{
	return{
		type:actionTypes.LOGIN_FAIL,
		error:error
	}
}
export const login = (userName, password) => {
	return {
		type: actionTypes.LOGIN_USER,
		userName: userName,
		password: password
	}
}