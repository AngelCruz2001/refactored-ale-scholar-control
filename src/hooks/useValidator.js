import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { uiSetCorrect } from '../actions/ui'

export const useValidator = () => {
    const [correct, setCorrect] = useState(null)
    const dispatch = useDispatch()
    const validateData = (regex = "", value = "") => {
        const regexValidator = new RegExp(regex);
        let currentCorrect = regexValidator.test(value) ? true : false;
        dispatch(uiSetCorrect(currentCorrect));
        return currentCorrect;
    }

    return [validateData, correct, setCorrect]
}
