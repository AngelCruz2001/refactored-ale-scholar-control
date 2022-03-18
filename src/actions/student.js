import Swal from 'sweetalert2';
import { fetchConToken } from '../helpers/fetch';
import { types } from '../types/types';
import { documentStartGetDocuments } from './document';
import { uiFinishLoading, uiStartLoading } from './ui';

export const studentStartGetStudentByMatricula = (matricula) => {
    return async (dispatch) => {
        dispatch(uiStartLoading())
        try {
            const res = await fetchConToken(`students/${matricula}`, 'GET')
            const body = await res.json()
            dispatch(documentStartGetDocuments(matricula));
            if (body.ok) {
                console.log(body)
                dispatch(studentSetActive(body.student));
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


export const studentStartMoveStudentGroup = (matricula, id_group) => {
    return async (dispatch) => {
        dispatch(uiStartLoading())
        try {
            const res = await fetchConToken(`students/${matricula}/groups/${id_group}`, 'PUT')
            const body = await res.json()
            if (body.ok) {
                console.log(body)
                Swal.fire({
                    title: "Estudiantes",
                    text: "Alumno actualizado correctamente" + '.',
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
            dispatch(uiFinishLoading())
        } catch (error) {
            console.log(error)
            Swal.fire('Error', 'Hablar con el administrador', 'error')
        }
    }
}



export const studentStartGetIrregularStudents = () => {
    return async (dispatch) => {
        dispatch(uiStartLoading())
        try {
            const res = await fetchConToken(`students?regular=false`, 'GET')
            const body = await res.json()

            if (body.ok) {
                dispatch(studentIrregularSetStudents(body.students));
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



const studentIrregularSetStudents = students => ({ type: types.studentSetIrregularStudents, payload: students })
const studentSetActive = data => ({ type: types.studentSetActive, payload: data })
export const studentClearData = () => ({ type: types.studentClearData })
