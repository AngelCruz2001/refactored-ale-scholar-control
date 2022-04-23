import { types } from "../types/types";

const initialState = {
    data: [],
    activeGroup: [],
    activeCourse: null,
    activeCourseData: null,
    courses: [], 
    coursesByGroup: null,
}

export const groupsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.groupsSetGroups:
            return {
                ...state,
                data: action.payload
            }

        case types.groupsSetCourses:
            return {
                ...state,
                courses: action.payload
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

        case types.gradesModifyGradeGroup:
            return {
                ...state,
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

        case types.groupsSetCoursesTaken:
            return {
                ...state,
                coursesByGroup: action.payload
            }

        case types.groupsClearActiveGroup:
            return {
                ...state,
                activeGroup: [],
                activeCourse: null,
                activeCourseData: null
            }

        default:
            return state;
    }

}
