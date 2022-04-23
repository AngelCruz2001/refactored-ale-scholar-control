import { Field } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { documentStartGetDocuments } from '../../actions/document';
import { payStartGetPrice } from '../../actions/pay';
import { isACoincidenceAssing } from '../../helpers/isACoincidence';

export const ItemsToPay = ({ payment_type, search, thingToPay, matricula }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        payment_type == 'Documento' && dispatch(documentStartGetDocuments(matricula));
        // TODO: Charge the result that is in the state to the map below. 
        // TODO: Manage the months too. 
        // TODO: Create submit action.

    }, [])

    const [dataExample, setDataExample] = useState(
        [
            { name: 'Enero', value: '0' },
            { name: 'Febrero', value: '1' },
            { name: 'Marzo', value: '2' },
            { name: 'Abril', value: '3' },
            { name: 'Mayo', value: '4' },
            { name: 'Junio', value: '5' },
            { name: 'Julio', value: '6' },
            { name: 'Agosto', value: '7' },
            { name: 'Septiembre', value: '8' },
            { name: 'Octubre', value: '9' },
            { name: 'Noviembre', value: '10' },
            { name: 'Diciembre', value: '11' },
        ]
    );

    useEffect(() => {
        if (payment_type !== null) {
            if (thingToPay !== null || payment_type === 'Inscripción') {
                dispatch(payStartGetPrice(payment_type, thingToPay));
            }
        }
    }, [payment_type, thingToPay]);


    return (
        <>
            {
                payment_type !== null && payment_type !== 'Inscripción' && thingToPay === null &&
                <div className='makeAPay__body__container__cosaAPagar'>
                    <label className='makeAPay__body__container__cosaAPagar__searchBar'>
                        <Field
                            className='makeAPay__body__container__cosaAPagar__searchBar__input'
                            type="text"
                            placeholder="Buscar"
                            name="search"
                        />
                        <i className="fa-solid fa-search" />
                    </label>

                    <div className='makeAPay__body__container__cosaAPagar__items'>
                        {
                            dataExample.filter(item => isACoincidenceAssing(item, search)).map((item, index) => (
                                <label
                                    key={item.value}
                                    className={`makeAPay__body__container__cosaAPagar__items__item ${thingToPay == item.value ? 'selected' : ''}`}>
                                    <Field type="radio" name="thingToPay" value={item.value} />
                                    {item.name}
                                </label>
                            ))
                        }
                    </div>
                </div>
            }
        </>
    )
}
