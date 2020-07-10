import * as actionTypes from "../../actions/actionTypes";
import { updateObject } from "../../../shared/utility";

const initialState = {
  houseData: null,
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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SINGLE_HOUSE_START:
      return fetchSingleHouseStart(state, action);
    case actionTypes.FETCH_SINGLE_HOUSE_SUCCESS:
      return fetchSingleHouseSuccess(state, action);
    case actionTypes.FETCH_SINGLE_HOUSE_FAIL:
      return fetchSingleHouseFail(state, action);
    default:
      return state;
  }
};

export default reducer;
