import { Field } from 'formik'
import React from 'react'

export const PayQuantity = ({ total, amount }) => {
    return (
        <div className={`makeAPay__body__container__money`}>
            <div>
                <label htmlFor="quantity">Cantidad</label>
                <Field className='input' type="number" placeholder="$0.00" name='amount' />
            </div>

            <div>
                <label htmlFor="change">Restante</label>
                <span className='input'>$ {total - amount}</span>
            </div>
        </div>
    )
}
