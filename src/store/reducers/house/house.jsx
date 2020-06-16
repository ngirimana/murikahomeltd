import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../../shared/utility';

const initialState = {
	houses: [],
	loading: false,
	error: false

};

const addHouseStart = (state, action) => {
	return updateObject(state, { loading: true });

}
const addHouseSuccess = (state, action) => {
	return updateObject(state, { houses: action.houseData })
}

const addHouseFail = (state, action) => {
	return updateObject(state, { loading: false });
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_HOUSE_START: return addHouseStart(state, action);
		case actionTypes.ADD_HOUSE_SUCCESS: return addHouseSuccess(state, action);
		case actionTypes.ADD_HOUSE_FAIL: return addHouseFail(state, action);
		default: return state

	}
}
export default reducer
