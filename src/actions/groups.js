import Swal from "sweetalert2"
import { fetchConToken } from "../helpers/fetch"
import { types } from "../types/types"
import { uiFinishLoading, uiStartLoading } from "./ui"





export const groupsStartGetAllGroups = (matricula) => {
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


export const groupsStartGetCoursesByGroup = (id_group) => {
    return async (dispatch) => {
        try {
            dispatch(uiStartLoading())

            const res = await fetchConToken(`groups/${6}/courses`)
            const body = await res.json()
            if (body.ok) {
                console.log(body)
                dispatch(groupsSetSpecificCourses(body.group))
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


const groupsSetGroups = data => ({ type: types.groupsSetGroups, payload: data })
const groupsSetSpecificCourses = (courses) => ({ type: types.groupsSetSpecificCourses, payload: courses })