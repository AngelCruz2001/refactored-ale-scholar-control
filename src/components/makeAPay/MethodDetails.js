import { Field } from 'formik'
import React from 'react'

export const MethodDetails = ({ payment_method, cards }) => {
    return (
        <>
            {
                payment_method === "Depósito" && 
                <div className="makeAPay__body__container__deposit">
                    <Field as="select" name="id_card" >
                        {
                            cards.map(card => (
                                <option key={card.card_number} value={card.id_card}>{card.card_number}</option>
                            ))
                        }
                    </Field>
                </div>
            }

            {
                payment_method === "Tarjeta" && <div className="makeAPay__body__container__card">
                    <p className='title'>Información bancaria</p>
                    <p>xxxxxxxxxxxxxxxxxxxx</p>
                    <p>xxxxxxxxxxxxxxxxxxxxx</p>
                    <p>xxxxxxxxxxxxxxxxxxxxxx</p>
                </div>
            }

        </>
    )
}
