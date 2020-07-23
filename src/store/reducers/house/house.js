import * as actionTypes from "../../actions/actionTypes";
import { updateObject } from "../../../shared/utility";

const initialState = {
  houses: [],
  rentedHouseData: [],
  loading: false,
  error: "",
};

const addHouseStart = (state, action) => {
  return updateObject(state, { loading: true });
};
const addHouseSuccess = (state, action) => {
  return updateObject(state, { houses: action.houseData, loading: false });
};

const addHouseFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};
// update
const updateHouseStart = (state, action) => {
  return updateObject(state, { loading: true });
};
const updateHouseSuccess = (state, action) => {
  return updateObject(state, {
    rentedHouseData: action.rentedHouseData,
    loading: false,
  });
};
const updateHouseFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_HOUSE_START:
      return addHouseStart(state, action);
    case actionTypes.ADD_HOUSE_SUCCESS:
      return addHouseSuccess(state, action);
    case actionTypes.ADD_HOUSE_FAIL:
      return addHouseFail(state, action);
    case actionTypes.UPDATE_HOUSE_START:
      return updateHouseStart(state, action);
    case actionTypes.UPDATE_HOUSE_SUCCESS:
      return updateHouseSuccess(state, action);
    case actionTypes.UPDATE_HOUSE_FAIL:
      return updateHouseFail(state, action);
    default:
      return state;
  }
};
export default reducer;
