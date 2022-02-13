import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";
import { uiFinishLoading, uiStartLoading } from "./ui";

export const feedStartGetData = (endpoint, name) => {
    return async (dispatch) => {
        dispatch(uiStartLoading());

        try {
            const res = await fetchConToken(endpoint)
            const body = await res.json()
            if (body.ok) {
                console.log(body)
                dispatch(feedSetData(body[name]))
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

        dispatch(uiFinishLoading());

    }
}

const feedSetData = (data) => ({
    type: types.feedGetData,
    payload: data
})
