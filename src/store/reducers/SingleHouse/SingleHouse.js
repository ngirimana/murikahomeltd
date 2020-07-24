import * as actionTypes from "../../actions/actionTypes";
import { updateObject } from "../../../shared/utility";

const initialState = {
  houseData: null,
  rentedHouseData: [],
  loading: false,
  error: "",
};

const fetchSingleHouseStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchSingleHouseSuccess = (state, action) => {
  return updateObject(state, {
    houseData: action.houseData,
    loading: false,
  });
};
const fetchSingleHouseFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
  });
};
//house infos
const getHouseInfosStart = (state, action) => {
  return updateObject(state, { loading: true });
};
const getHouseInfosSuccess = (state, action) => {
  return updateObject(state, {
    rentedHouseData: action.rentedHouseData,
    loading: false,
  });
};
const getHouseInfosFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SINGLE_HOUSE_START:
      return fetchSingleHouseStart(state, action);
    case actionTypes.FETCH_SINGLE_HOUSE_SUCCESS:
      return fetchSingleHouseSuccess(state, action);
    case actionTypes.FETCH_SINGLE_HOUSE_FAIL:
      return fetchSingleHouseFail(state, action);
    case actionTypes.GET_HOUSE_INFOS_START:
      return getHouseInfosStart(state, action);
    case actionTypes.GET_HOUSE_INFOS_SUCCESS:
      return getHouseInfosSuccess(state, action);
    case actionTypes.GET_HOUSE_INFOS_FAIL:
      return getHouseInfosFail(state, action);
    default:
      return state;
  }
};

export default reducer;
