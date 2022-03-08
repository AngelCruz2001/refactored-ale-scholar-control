import Swal from "sweetalert2"
import { fetchConToken } from "../helpers/fetch"
import { types } from "../types/types"
import { uiFinishLoading, uiStartLoading } from "./ui"

export const majorsStartGetMajors = () => {
    return async (dispatch) => {
        try {
            dispatch(uiStartLoading())

            const res = await fetchConToken(`majors`)
            const body = await res.json()
            if (body.ok) {
                dispatch(majorsSetMajors(body.majors))
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






const majorsSetMajors = (majors) => ({ type: types.majorsSetMajors, payload: majors })
export const majorsSetSpecificMajor = (majors) => ({ type: types.majorsSetSpecificMajor, payload: majors })
