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
//UPDATE HOUSE
export const getHouseInfosStart = () => {
  return {
    type: actionTypes.GET_HOUSE_INFOS_START,
  };
};
export const getHouseInfosFail = (error) => {
  return {
    type: actionTypes.GET_HOUSE_INFOS_FAIL,
    error: error,
  };
};
export const getHouseInfosSuccess = (houseData) => {
  return {
    type: actionTypes.GET_HOUSE_INFOS_SUCCESS,
    houseData: houseData,
  };
};

export const getHouseInfos = (houseData) => {
  return {
    type: actionTypes.GET_HOUSE_INFOS,
    houseData: houseData,
  };
};
