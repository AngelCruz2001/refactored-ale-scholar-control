import { types } from "../types/types";

const initialState = {
    data: [],
    activeGroup: [],
}

export const groupsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.groupsSetGroups:
            return {
                ...state,
                data: action.payload
            }
        case types.groupsSetSpecificCourses:
            return {
                ...state,
                activeGroup: action.payload
            }
        default:
            return state;
    }

}
