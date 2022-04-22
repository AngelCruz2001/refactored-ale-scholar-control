import { Field } from 'formik'
import React from 'react'

export const ButtonMakeAPay = ({ payment_type, name, onClickFunction, icon }) => {

    return (
        <label onClick={onClickFunction} className={`btn btn-makeAPay ${payment_type == name ? 'active' : ''}`}>
            <Field type="radio" name="payment_type" value={name} />
            {name}
            {icon && <i className="fa-solid fa-circle-chevron-right" />}
        </label>
    )
}
