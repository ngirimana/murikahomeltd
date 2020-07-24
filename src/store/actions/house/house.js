import * as actionTypes from "../actionTypes";

export const addHouseStart = () => {
  return {
    type: actionTypes.ADD_HOUSE_START,
  };
};
export const addHouseFail = (error) => {
  return {
    type: actionTypes.ADD_HOUSE_FAIL,
    error: error,
  };
};
export const addHouseSuccess = (houseData) => {
  return {
    type: actionTypes.ADD_HOUSE_SUCCESS,
    houseData: houseData,
  };
};
export const addHouse = (houseData) => {
  return {
    type: actionTypes.ADD_HOUSE,
    houseData: houseData,
  };
};
