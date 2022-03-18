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

    irregularStudents: []
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
                irregularStudents: action.payload
            }


        default:
            return state;
    }
}
