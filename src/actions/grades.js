import Swal from "sweetalert2"
import { fetchConToken } from "../helpers/fetch"
import { types } from "../types/types"
import { uiFinishLoading, uiStartLoading } from "./ui"

export const gradesStartGetGrades = () => {
    return async (dispatch) => {
        try {
            dispatch(uiStartLoading())

            const res = await fetchConToken(`grades/all`)
            const body = await res.json()
            if (body.ok) {
                dispatch(gradesSetGrades(body.grades))
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
export const gradesStartGetGradesByMatricula = (matricula) => {
    return async (dispatch) => {
        try {
            dispatch(uiStartLoading())

            const res = await fetchConToken(`grades/students/${matricula}`)
            const body = await res.json()
            if (body.ok) {
                console.log(body)
                dispatch(gradesSetSpecificGrades(body.grades))
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



const gradesSetGrades = (grades) => ({ type: types.gradesSetGrades, payload: grades })
const gradesSetSpecificGrades = (grades) => ({ type: types.gradesSetSpecificGrades, payload: grades })