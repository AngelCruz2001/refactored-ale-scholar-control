import { Field } from 'formik'
import React from 'react'

export const PayMethod = ({ payment_method }) => {



    return (
        <div className='makeAPay__body__container__concept'>
            <p className="payTitle">Método de pago</p>
            <div className="makeAPay__body__container__concept__buttons method">

                <label className={`btn btn-makeAPay ${payment_method == 'Efectivo' ? 'active' : ''}`}>
                    <Field type="radio" value={'Efectivo'} name='payment_method' />
                    Efectivo
                </label>
                <label className={`btn btn-makeAPay ${payment_method == 'Depósito' ? 'active' : ''}`}>
                    <Field type="radio" value={'Depósito'} name='payment_method' />
                    Depósito
                </label>
                <label className={`btn btn-makeAPay ${payment_method == 'Tarjeta' ? 'active' : ''}`}>
                    <Field type="radio" value={'Tarjeta'} name='payment_method' />
                    Tarjeta
                </label>
            </div>
        </div>
    )
}
