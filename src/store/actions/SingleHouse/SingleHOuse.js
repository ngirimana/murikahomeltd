import * as actionTypes from "../actionTypes";

export const fetchSingleHouse = (houseId) => {
  return {
    type: actionTypes.FETCH_SINGLE_HOUSE,
    houseId: houseId,
  };
};
export const fetchSingleHouseStart = () => {
  return {
    type: actionTypes.FETCH_SINGLE_HOUSE_START,
    loading: true,
  };
};
export const fetchSingleHouseSuccess = (houseData) => {
  return {
    type: actionTypes.FETCH_SINGLE_HOUSE_SUCCESS,
    loading: false,
    houseData: houseData,
  };
};
export const fetchSingleHouseFail = (error) => {
  return {
    type: actionTypes.FETCH_SINGLE_HOUSE_FAIL,
    loading: false,
    error: error,
  };
};
