import React, { useEffect } from 'react'
import { ButtonMakeAPay } from './ButtonMakeAPay'

export const ConceptPay = ({ payment_type, setFieldValue }) => {


    const handeClick = (value) => {
        setFieldValue('thingToPay', null);
    }
    return (
        <>

            <div className="makeAPay__body__container__concept">
                <p className='payTitle'>Concepto de pago</p>
                <div className='makeAPay__body__container__concept__buttons'>
                    {['Inscripción', 'Materia', 'Documento', 'Extra',].map((name, index) => (
                        <ButtonMakeAPay
                            key={index}
                            icon={index != 0 ? true : false}
                            payment_type={payment_type}
                            name={name}
                            onClickFunction={handeClick}
                        />
                    ))}
                </div>
            </div>

            <div className="makeAPay__body__container__conceptToPay">
                <p className='payTitle'>Concepto a pagar</p>
                <span>{payment_type}</span>
            </div>
        </>
    )
}
