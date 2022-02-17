import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { panelSetData } from "../actions/panel"

export const usePanel = (data, name, id, type) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(panelSetData({ data, name, id, type }))
    }, [])
}
