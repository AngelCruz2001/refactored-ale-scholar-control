
import { types } from '../types/types';


const initialState = {
    data: [],
    active: null
};

export const requestsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.requestSetRequests:
            return {
                ...state,
                data: action.payload,
            };

        case types.requestDeleteRequest:
            return {
                ...state,
                data: state.data.filter(request => request.id_request !== action.payload),
            };
        case types.requestSetActiveRequest:
            return {
                ...state,
                active:action.payload

            }

        default:
            return state;
    }
}