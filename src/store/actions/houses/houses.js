import axios from "../../../custom-axios";

import {
  GET_FEATURED_HOUSES,
  GET_FEATURED_HOUSES_FAILED,
  INITIATE_GET_FEATURED_HOUSES,
} from "../actionTypes";

import {
  INITIATE_SEARCH_HOUSES,
  SEARCH_HOUSES,
  SEARCH_HOUSES_FAILED,
} from "../actionTypes";


const initiateSeachHouses = () => ({
  type: INITIATE_SEARCH_HOUSES,
});

const searchHousesComplete = (data) => ({
  type: SEARCH_HOUSES,
  payload: {
    data
  },
});

const searchHousesFailed = (error) => ({
  type: SEARCH_HOUSES_FAILED,
  payload: {
    error
  },
});

export const searchHouses = (keyword) => async (dispatch) => {
  try {
    dispatch(initiateSeachHouses());
    const {
      data
    } = await axios.get(`/houses/search-result/${keyword}`);
    dispatch(searchHousesComplete(data.data));
  } catch (error) {
    dispatch(searchHousesFailed(error));
  }
};
const initiateGetFeaturedHouses = () => ({
  type: INITIATE_GET_FEATURED_HOUSES,
});

const getFeaturedHousesDone = (data) => ({
  type: GET_FEATURED_HOUSES,
  payload: {
    data: data.data
  },
});

const getFeaturedHousesFailed = (error) => ({
  type: GET_FEATURED_HOUSES_FAILED,
  payload: {
    error
  },
});

export const getFeaturedHouses = () => async (dispatch) => {
  try {
    dispatch(initiateGetFeaturedHouses());
    const {
      data
    } = await axios.get("/houses");
    dispatch(getFeaturedHousesDone(data));
  } catch (error) {
    dispatch(getFeaturedHousesFailed(error));
  }
};