import Swal from 'sweetalert2';
import { fetchConToken } from '../helpers/fetch';
import { types } from '../types/types';
import { uiFinishLoading, uiStartLoading } from './ui';



export const teachersStartGetTeachers = () => {
    return async (dispatch) => {
        dispatch(uiStartLoading())
        try {
            const res = await fetchConToken(`teachers`, 'GET')
            const body = await res.json()

            if (body.ok) {
                dispatch(setTeachers(body.teachers));
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



export const teacherSetActive = teacher => ({ type: types.teacherSetActive, payload: teacher })
const setTeachers = data => ({ type: types.teacherSetData, payload: data })
export const teacherClearData = () => ({ type: types.teacherClearData })
