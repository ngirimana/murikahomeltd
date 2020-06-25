import axios from "../../../custom-axios";

import {
  GET_FEATURED_HOUSES,
  GET_FEATURED_HOUSES_FAILED,
  INITIATE_GET_FEATURED_HOUSES,
} from "../actionTypes";

const initiateGetFeaturedHouses = () => ({
  type: INITIATE_GET_FEATURED_HOUSES,
});

const getFeaturedHousesDone = (data) => ({
  type: GET_FEATURED_HOUSES,
  payload: { data: data.data },
});

const getFeaturedHousesFailed = (error) => ({
  type: GET_FEATURED_HOUSES_FAILED,
  payload: { error },
});

export const getFeaturedHouses = () => async (dispatch) => {
  try {
    dispatch(initiateGetFeaturedHouses());
    const { data } = await axios.get("/houses");
    console.log(data);
    dispatch(getFeaturedHousesDone(data));
  } catch (error) {
    dispatch(getFeaturedHousesFailed(error));
  }
};
