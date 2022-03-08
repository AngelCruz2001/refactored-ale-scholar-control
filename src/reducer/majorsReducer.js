import { types } from "../types/types";

const initialState = {
    data: [],
    activeMajor: [],
}

export const majorsReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.majorsSetMajors:
            return {
                ...state,
                data: action.payload
            }
        case types.majorsSetSpecificMajor:
            return {
                ...state,
                activeMajor: action.payload
            }
     

        default:
            return state;
    }

}
