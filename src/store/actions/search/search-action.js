import {
  INITIATE_SEARCH_HOUSES,
  SEARCH_HOUSES,
  SEARCH_HOUSES_FAILED,
} from "../actionTypes";
import axios from "../../../custom-axios";

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
    dispatch(searchHousesComplete(data));
  } catch (error) {
    dispatch(searchHousesFailed(error));
  }
};


export const filterHouses = () => dispatch => {
  try {

  } catch (error) {

  }
}