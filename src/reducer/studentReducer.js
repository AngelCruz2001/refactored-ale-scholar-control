import { types } from "../types/types";

const initialValue = {
  id_student: null,
  matricula: null,
  student_fullname: null,
  name_group: null,
  id_group: null,
  campus_name: null,
  major_name: null,
  ins_date: null,
  course_name: null,
  irregularStudents: {
    data: [],
    active: null,
    availableTests: [],
  },
};

export const studentReducer = (state = initialValue, action) => {
  switch (action.type) {
    case types.studentSetActive:
      return {
        ...state,
        ...action.payload,
      };
    case types.studentClearData:
      return initialValue;

    case types.studentSetIrregularStudents:
      return {
        ...state,
        irregularStudents: {
          ...state.irregularStudents,
          data: [...action.payload],
        },
      };
    case types.studentSetIrregularActive:
      return {
        ...state,
        irregularStudents: {
          ...state.irregularStudents,
          active: action.payload,
        },
      };
    case types.studentClearIrregularActive:
      return {
        ...state,
        irregularStudents: { ...state.irregularStudents, active: null },
      };

    case types.studentSetTestIrregular:
      return {
        ...state,
        irregularStudents: {
          ...state.irregularStudents,
          availableTests: [...action.payload],
        },
      };

    default:
      return state;
  }
};
