// import { getUser } from "../helpers/getUser";
import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";

export const authStartLogin = (id, password) => {
    return async (dispatch) => {
        console.log(id, password)
        dispatch(authCheckingStart());
        try {
            const res = await fetchSinToken('auth/login', { id, password }, 'POST')
            const body = await res.json()
            console.log(res)
            console.log(body);
            dispatch(authCheckingFinish())
            if (body.ok) {
                localStorage.setItem('token', body.token);
                localStorage.setItem('token-init-date', new Date().getTime());
                console.log(body)
                dispatch(authLogin(body))
            } else {
                Swal.fire({
                    title: '¡Oops!',
                    text: body.msg,
                    icon: 'question',
                    confirmButtonText: 'Tratar de nuevo'
                })
            }
        } catch (error) {
            console.log(error)
            dispatch(authCheckingFinish())
            Swal.fire('Error', 'Hablar con el administrador', 'error')
        }
    }
}

export const authStartChecking = () => {
    return async (dispatch) => {
        if (localStorage.getItem('token')) {
            console.log(localStorage.getItem('token'))
            dispatch(authCheckingStart())
            const res = await fetchConToken('auth/renew')
            const body = await res.json()
            if (body.ok) {
                localStorage.setItem('token', body.token);
                localStorage.setItem('token-init-date', new Date().getTime());
                dispatch(authLogin(body))
                dispatch(authCheckingFinish())
            } else {
                dispatch(authCheckingFinish())
                Swal.fire({
                    title: '¡Oops!',
                    text: "Parece que tu sesión ha expirado",
                    icon: 'question',
                })
                dispatch(authLogout())
            }
        }
    }
}


export const authStartLogout = () => {
    return (dispatch) => {
        localStorage.clear()
        dispatch(authLogout())

    }
}


const authLogin = (userData) => ({
    type: types.authLogin,
    payload: userData,
})


const authLogout = () => ({
    type: types.authLogout
})


const authCheckingStart = () => ({ type: types.authCheckingStart })
const authCheckingFinish = () => ({ type: types.authCheckingFinish })
