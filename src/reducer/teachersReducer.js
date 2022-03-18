import { types } from "../types/types";

const initialValue = {

    teachers: [],
    active: []
}

export const teachersReducer = (state = initialValue, action) => {
    switch (action.type) {
        case types.teacherSetActive:
            return {
                ...state,
                active: action.payload
            }
        case types.teacherClearData:
            return initialValue

        case types.teacherSetData:
            return {
                ...state,
                teachers: action.payload
            }


        default:
            return state;
    }
}
