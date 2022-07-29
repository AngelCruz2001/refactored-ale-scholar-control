import { Field } from 'formik';
import React, {useState, useEffect} from 'react'
import { isACoincidenceAssing } from '../../helpers/isACoincidence';

export const DataList = ({data, valueSearchFilter, type, nameDataList}) => {

    console.log('first', data);
    return (
        <>
            {
                data && data.length > 0
                    ? data.map(item => (
                        isACoincidenceAssing(item.label, valueSearchFilter.searchWord.trim()) &&
                        <div className='assign__container__content__list__item' key={item.value}>
                            {type === 'radio' ?
                                <>
                                    {/* <input onChange={handleInputChange} type='radio' name={nameDataList} id={item.value} value={item.value} /> */}
                                    <Field
                                        name={nameDataList}
                                        type='radio'
                                        value={`${item.value}`}
                                    />
                                    <label htmlFor={nameDataList}>{item.label}</label>
                                </>
                                :
                                <>
                                    {/* <input type='checkbox' name={nameDataList} id={item.value} value={item.value} /> */}
                                    <Field
                                        name={nameDataList}
                                        type='checkbox'
                                        value={item.value}
                                    />
                                    <label htmlFor={nameDataList}>{item.label}</label>
                                </>
                            }
                        </div>
                    ))
                    : <div className='assign__container__content__list__item'>No hay resultados</div>
            }
        </>
    )
}
