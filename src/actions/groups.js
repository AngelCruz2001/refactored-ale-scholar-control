import Swal from "sweetalert2"
import { fetchConToken } from "../helpers/fetch"
import { types } from "../types/types"
import { uiFinishLoading, uiStartLoading } from "./ui"

export const groupsStartGetAllGroups = () => {
    return async (dispatch) => {
        dispatch(uiStartLoading())
        try {
            const res = await fetchConToken("groups", 'GET')
            const body = await res.json()
            if (body.ok) {
                console.log(body)
                dispatch(groupsSetGroups(body.groups));
            } else {
                console.log(body)
                Swal.fire({
                    title: '¡Oops!',
                    text: body.msg,
                    icon: 'question',
                })
            }
            dispatch(uiFinishLoading())
        } catch (error) {
            console.log(error)
            Swal.fire('Error', 'Hablar con el administrador', 'error')
        }
    }
}



export const groupsStartGetCoursesCouldTakeByGroup = (id_group) => {
    return async (dispatch) => {
        try {
            dispatch(uiStartLoading())

            const res = await fetchConToken(`groups/${id_group}/courses`)
            const body = await res.json()
            if (body.ok) {
                console.log("materias que puede tomar el grupo", body)
                dispatch(groupsSetCourses(body.courses))
            } else {
                console.log(body)
                Swal.fire({
                    title: '¡Oops!',
                    text: body.msg,
                    icon: 'question',
                })
            }
        } catch (error) {
            console.log(error)
            Swal.fire('Error', 'Hablar con el administrador', 'error')
        }
        dispatch(uiFinishLoading())

    }
}
export const groupsStartGetCoursesByGroup = (id_group) => {
    return async (dispatch) => {
        try {
            dispatch(uiStartLoading())

            const res = await fetchConToken(`groups/${id_group}/courses/taken`)
            const body = await res.json()
            if (body.ok) {
                console.log("materias que ha tomado", body.group.courses_taken)
                dispatch(groupsSetCourses(body.group.courses_taken))
            } else {
                console.log(body)
                Swal.fire({
                    title: '¡Oops!',
                    text: body.msg,
                    icon: 'question',
                })
            }
        } catch (error) {
            console.log(error)
            Swal.fire('Error', 'Hablar con el administrador', 'error')
        }
        dispatch(uiFinishLoading())

    }
}

export const groupsStartGetCoursesAGroupHasTaken = (id_group) => {
    return async (dispatch) => {
        try {
            dispatch(uiStartLoading())
            const res = await fetchConToken(`groups/${id_group}/courses/taken`)
            const body = await res.json()
            if (body.ok) {
                console.log(body)
                dispatch(groupsSetCoursesTaken(body.courses))
            } else {
                console.log(body)
                Swal.fire({
                    title: '¡Oops!',
                    text: body.msg,
                    icon: 'question',
                })
            }
        } catch (error) {
            console.log(error)
            Swal.fire('Error', 'Hablar con el administrador', 'error')
        }
        dispatch(uiFinishLoading())
    }
}



export const groupsStartUpdateGrade = (id, credits, type = 'regular') => {
    return async (dispatch) => {
        try {
            dispatch(uiStartLoading())

            const res = await fetchConToken(`grades/${type}/${id}`, { grade: credits }, 'PUT')
            const body = await res.json()
            if (body.ok) {
                console.log(body)
                dispatch(groupsUpdateGrade(id, credits))
            } else {
                console.log(body)
                Swal.fire({
                    title: '¡Oops!',
                    text: body.msg,
                    icon: 'question',
                })
            }
        } catch (error) {
            console.log(error)
            Swal.fire('Error', 'Hablar con el administrador', 'error')
        }
        dispatch(uiFinishLoading())

    }
}

export const groupsStartRelateGroupCourse = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch(uiStartLoading())
            data.id_course = parseInt(data.id_course)
            const res = await fetchConToken(`groups/${getState().groups.activeCourse}/courses/${data.id_course}`, data, 'POST')
            const body = await res.json()

            if (body.ok) {
                console.log(body)
                dispatch(groupsClearActiveCourse())
                Swal.fire({
                    title: "Grupos",
                    text: "Curso asignado correctamente" + '.',
                    icon: 'success',
                })
            } else {
                console.log(body)
                Swal.fire({
                    title: '¡Oops!',
                    text: body.msg,
                    icon: 'question',
                })
            }
        } catch (error) {
            console.log(error)
            Swal.fire('Error', 'Hablar con el administrador', 'error')
        }
        dispatch(uiFinishLoading())
    }

}

export const groupsGetStudentAndGradesGroup = (id_course, id_group) => {
    return async (dispatch) => {
        try {
            dispatch(uiStartLoading())
            const res = await fetchConToken(`grades/regular/${id_course}/groups/${id_group}`)
            const body = await res.json()

            if (body.ok) {
                console.log(body)
                dispatch(groupsSetActiveCourse(body))
            } else {
                console.log(body)
                Swal.fire({
                    title: '¡Oops!',
                    text: body.msg,
                    icon: 'question',
                })
            }
        } catch (error) {
            console.log(error)
            Swal.fire('Error', 'Hablar con el administrador', 'error')
        }
        dispatch(uiFinishLoading())
    }
}




const groupsSetCourses = (courses) => ({ type: types.groupsSetCourses, payload: courses})

export const groupsSetActiveCourse = (course) => ({ type: types.groupsSetActiveCourse, payload: course })

export const groupsClearActiveCourse = () => ({ type: types.groupsSetActiveCourse })

export const groupsClearActiveGroup = () => ({ type: types.groupsClearActiveGroup })

const groupsSetGroups = data => ({ type: types.groupsSetGroups, payload: data })

const groupsSetSpecificCourses = (courses) => ({ type: types.groupsSetSpecificCourses, payload: courses })

const groupsUpdateGrade = (id, grade) => ({ type: types.groupsUpdateGrade, payload: { id, grade } })

const groupsSetStudentsAndGrades = (students, grades) => ({ type: types.groupsSetStudentsAndGrades, payload: { students, grades } })

const groupsSetCoursesTaken = (courses) => ({ type: types.groupsSetCoursesTaken, payload: courses })
