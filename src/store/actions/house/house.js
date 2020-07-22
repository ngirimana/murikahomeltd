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
//UPDATE HOUSE
export const updateHouseStart = () => {
  return {
    type: actionTypes.UPDATE_HOUSE_START,
  };
};
export const updateHouseFaiil = (error) => {
  return {
    type: actionTypes.UPDATE_HOUSE_FAIL,
    error: error,
  };
};
export const updateHouseSuccess = (updateHouseData) => {
  return {
    type: actionTypes.UPDATE_HOUSE_SUCCESS,
    houseData: updateHouseData,
  };
};

export const updateHouse = (updateHouseData) => {
  return {
    type: actionTypes.UPDATE_HOUSE,
    houseData: updateHouseData,
  };
};
