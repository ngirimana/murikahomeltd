import {
    GET_FEATURED_HOUSES,
    GET_FEATURED_HOUSES_FAILED,
    INITIATE_GET_FEATURED_HOUSES
} from '../../actions/actionTypes';

const initialState = {
    houses: [],
    loading: false,
    error: null
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case INITIATE_GET_FEATURED_HOUSES:
            return { ...state, loading: true, error: null }
        case GET_FEATURED_HOUSES:
            return { ...state, houses: payload.data, loading: false }
        case GET_FEATURED_HOUSES_FAILED:
            return {
                ...state, loading: false, error: payload.error
            }
        default:
            return state;
    }
};