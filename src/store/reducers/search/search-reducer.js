import {
  INITIATE_SEARCH_HOUSES,
  SEARCH_HOUSES,
  SEARCH_HOUSES_FAILED,
} from "../../actions/actionTypes";

const initialState = {
  houses: [],
  loading: false,
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case INITIATE_SEARCH_HOUSES:
      return { ...state, loading: true, error: null };
    case SEARCH_HOUSES:
      return { ...state, houses: payload.data, loading: false };

    case SEARCH_HOUSES_FAILED:
      return { ...state, loading: false, error: payload.error };
    default:
      return state;
  }
};
