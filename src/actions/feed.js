import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";
import { uiFinishLoading, uiStartLoading } from "./ui";

export const feedStartGetData = (endpoint, name, nameId) => {
    return async (dispatch) => {
        dispatch(uiStartLoading());
        dispatch(feedSetActiveNameId(nameId));
        try {
            console.log(endpoint, name, nameId)
            const res = await fetchConToken(endpoint)
            const body = await res.json()
            if (body.ok) {
                if(endpoint == 'scholarships'){
                    console.log(body)
                }
                // console.log(body)
                dispatch(feedSetData(body[name]))
            } else {
                // console.log(body)
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



export const feedStartDeleteData = (endpoint, id) => {
    return async (dispatch) => {
        dispatch(uiStartLoading());
        try {
            const res = await fetchConToken(`${endpoint}/${id}`, {}, 'DELETE')
            const body = await res.json()
            if (body.ok) {
                console.log(body.result)
               
                dispatch(feedDeleteData(id))
                Swal.fire({
                    title: '¡Eliminado!',
                    text: 'El registro se ha eliminado correctamente',
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
        }
        dispatch(uiFinishLoading());
    }
}

export const feedStartGetSelectsData = (endpoints) => { //endpoints = ["nameEndpoint", "nameEndpoint2"]
    return async (dispatch) => {
        dispatch(feedStartLoadingSelect());
        let data = {}
        try {
            for (let endpoint of endpoints) {
                const res = await fetchConToken(endpoint)
                const body = await res.json()
                // console.log(res)
                if (body.ok) {
                    data[endpoint] = body[endpoint]
                    // console.log(body)
                } else {
                    console.log(body)
                    Swal.fire({
                        title: '¡Oops!',
                        text: body.msg,
                        icon: 'question',
                    })
                }
            }
            dispatch(feedSetSelectData(data))
            // console.log(data)
        } catch (error) {
            console.log(error)
            Swal.fire('Error', 'Hablar con el administrador', 'error')
        }
        dispatch(feedFinishLoadingSelects());
    }
}

export const feedStartPostData = (endpoint, data) => {
    return async (dispatch) => {
        try {
            // data["group_chief"] = 0;
            
            data['edu_level'] && (data['edu_level'] = parseInt(data['edu_level']))
            data['group_chief'] && (data['group_chief'] = data['group_chief'] ? 1 : 0)
            const res = await fetchConToken(endpoint, data, 'POST')
            const body = await res.json()

            if (body.ok) {
                Swal.fire({
                    title: '¡Guardado!',
                    text: 'El registro se ha guardado correctamente',
                    icon: 'success',
                })
                console.log(body.result)
                dispatch(feedPost(body.result))
                dispatch(feedSetIsAdding(false))
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
    }
}



export const feedStartEditData = (endpoint, data) => {
    return async (dispatch, getState) => {
        console.log("data chida", data)
        const { feed } = getState();

        try {
            const res = await fetchConToken(`${endpoint}/${feed.active[feed.activeIdName]}`, data, 'PUT')
            const body = await res.json()

            if (body.ok) {
                Swal.fire({
                    title: '¡Guardado!',
                    text: 'El registro se ha actualizado correctamente',
                    icon: 'success',
                })

                console.log(body.result)
                dispatch(feedPut(body.result))
                dispatch(feedSetIsAdding(false))
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
    }
}



export const feedSetActiveGroup = (id) => ({
    type: types.feedSetActiveNameById,
    payload: id
})


export const feedSetActive = (id) => ({
    type: types.feedSetActive,
    payload: id
})
export const feedClearActive = () => ({
    type: types.feedClearActive,
})

export const feedSetActiveNameId = (nameId) => ({
    type: types.feedSetActiveNameId,
    payload: nameId
})

export const feedDeleteData = (id) => ({
    type: types.feedDeleteData,
    payload: id
})

export const feedSetIsAdding = (isAdding) => ({
    type: types.feedSetIsAdding,
    payload: isAdding
})

const feedSetData = (data) => ({
    type: types.feedGetData,
    payload: data
})

const feedSetSelectData = (data) => ({
    type: types.feedSetSelectsData,
    payload: data
})

const feedStartLoadingSelect = () => ({
    type: types.feedStartLoadingSelect
})
const feedFinishLoadingSelects = () => ({
    type: types.feedFinishLoadingSelect
})

const feedPut = (data) => ({
    type: types.feedPut,
    payload: data
})

const feedPost = (data) => ({
    type: types.feedPost,
    payload: data
})
