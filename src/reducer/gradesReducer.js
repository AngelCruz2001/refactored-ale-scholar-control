import { types } from "../types/types";

const initialState = {
    data: [],
    activeStudentGrade: [],
}

export const gradesReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.gradesSetGrades:
            return {
                ...state,
                data: action.payload
            }
        case types.gradesSetSpecificGrades:
            return {
                ...state,
                activeStudentGrade: action.payload
            }
        default:
            return state;
    }

}
