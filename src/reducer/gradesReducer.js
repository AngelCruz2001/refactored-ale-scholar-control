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
        case types.gradesModifyGrade:
            // Action.payload = { id, credits }
            console.log(action.payload)
            return {
                ...state,
                activeStudentGrade: [...state.activeStudentGrade.map(grade => {
                    if (grade.id_grade === action.payload.id) {
                        grade.grade = action.payload.grade
                    }
                    console.log(grade)
                    return grade
                })]
            }

        default:
            return state;
    }

}
