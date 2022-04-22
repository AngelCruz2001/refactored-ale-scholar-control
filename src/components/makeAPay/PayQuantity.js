import { Field } from 'formik'
import React from 'react'

export const PayQuantity = ({ total, amount }) => {
    return (
        <div className={`makeAPay__body__container__money`}>
            <div>
                <label htmlFor="quantity">Cantidad</label>
                <Field  type="number" placeholder="$0.00" name='amount' />
            </div>

            <div>
                <label htmlFor="change">Restante</label>
                <input type="text" placeholder="$0.00" value={total - amount}/>
            </div>
        </div>
    )
}
