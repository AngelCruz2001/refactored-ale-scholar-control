import Swal from "sweetalert2"
import { fetchConToken } from "../helpers/fetch"
import { types } from "../types/types"
import { documentClearData } from "./document"
import { studentClearData } from "./student"
import { uiFinishLoading, uiSetCurrent, uiStartLoading } from "./ui"

export const requestStartRequestDocument = () => {
    return async (dispatch, getState) => {
        try {
            const res = await fetchConToken(`requests`, {
                matricula: getState().student.matricula,
                document_type: getState().document.idDocument
            }, 'POST')
            const body = await res.json()
            if (body.ok) {
                console.log(body)
                Swal.fire({
                    title: "Solicitudes",
                    text: body.msg,
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
            dispatch(studentClearData())
            dispatch(documentClearData())
            dispatch(uiSetCurrent(0))

        } catch (error) {
            console.log(error)
            Swal.fire('Error', 'Hablar con el administrador', 'error')
        }
    }
}

export const requestStartGetRequests = () => {
    return async (dispatch) => {
        try {
            dispatch(uiStartLoading())
            const res = await fetchConToken(`requests/?date=all`);
            const body = await res.json();
            if (body.ok) {
                dispatch(requestSetRequests(body.requests))
            } else {
                Swal.fire({
                    title: '¡Oops!',
                    text: body.msg,
                    icon: 'question',
                })
            }
            console.log(body)
        } catch (error) {
            console.log(error)
            Swal.fire('Error', 'Hablar con el administrador', 'error')
        }
        dispatch(uiFinishLoading())
    }
}

export const requestStartDeleteRequests = (id) => {
    return async (dispatch) => {
        try {
            console.log(id)
            const res = await fetchConToken(`requests/${id}`, {}, 'DELETE');
            const body = await res.json();
            if (body.ok) {
                dispatch(requestDeleteRequest(id))
                // Swal.fire({
                //     title: 'Todo bien',
                //     text: body.msg,
                //     icon: 'success',
                // })
            } else {
                Swal.fire({
                    title: '¡Oops!',
                    text: body.msg,
                    icon: 'question',
                })
            }
            console.log(body)
        } catch (error) {
            console.log(error)
            Swal.fire('Error', 'Hablar con el administrador', 'error')
        }

    }
}
const requestSetRequests = (requests) => ({ type: types.requestSetRequests, payload: requests })
const requestDeleteRequest = (id) => ({ type: types.requestDeleteRequest, payload: id })