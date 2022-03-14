import { types } from "../types/types";

const initialState = {
    data: [],
    activeMajor: [],
    groupsData:[],
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

        case types.majorsSetMajorsGroups:
            return {
                ...state,
                groupsData: action.payload
            }
     

        default:
            return state;
    }

}
