import { types } from "../types/types";

const initialValue = {
    id_student: '',
    matricula: '',
    student_fullname: '',
    name_group: '',
    id_group: null,
    campus_name: '',
    major_name: '',
    ins_date: '',
    course_name: '',
    irregularStudents: {
        data: [],
        active: null,
        availableTests: [],
    }, 

}

export const studentReducer = (state = initialValue, action) => {
    switch (action.type) {
        case types.studentSetActive:
            return {
                ...state,
                ...action.payload
            }
        case types.studentClearData:
            return initialValue

        case types.studentSetIrregularStudents:
            return {
                ...state,
                irregularStudents: { ...state.irregularStudents, data: [...action.payload] }
            }
        case types.studentSetIrregularActive:
            return {
                ...state,
                irregularStudents: { ...state.irregularStudents, active: action.payload }
            }
        case types.studentClearIrregularActive:
            return {
                ...state,
                irregularStudents: { ...state.irregularStudents, active: null }
            }
        
        case types.studentSetTestIrregular:
            return {
                ...state,
                irregularStudents: { ...state.irregularStudents, availableTests: [...action.payload] }
            }


        default:
            return state;
    }
}
