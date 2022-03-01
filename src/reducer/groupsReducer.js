import { types } from "../types/types";

const initialState = {
    data: [],
    activeGroup: [],
    activeCourse: {},
    activeCourseData: null,
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
        case types.groupsSetActiveCourse:
            return {
                ...state,
                activeCourse: action.payload
            }
        case types.groupsUpdateGrade:
            return {
                ...state,
                activeCourse: action.payload
            }
        case types.groupsSetStudentsAndGrades:
            return {
                ...state,
                activeCourseData: action.payload
            }
        case types.groupsClearActiveGroup:
            return {
                ...state,
                activeGroup: [],
                activeCourse: {},
                activeCourseData: null
            }

        default:
            return state;
    }

}
