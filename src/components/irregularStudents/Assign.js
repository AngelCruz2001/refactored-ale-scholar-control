import React, { useState } from 'react'
import { isACoincidenceAssing } from '../../helpers/isACoincidence';
import { Searchbar } from '../ui/Searchbar'

export const Assign = ({ handleBack, dataSelects, data, type = 'radio', title = "ASIGNAR GRUPO" }) => {
    const dataList = Array(100).fill({}).map((_, i) => ({ value: i + 1, label: 'Nombre del grupo' }));
    const [valueSearchFilter, setValueSearchFilter] = useState({ searchWord: '' })
    console.log(valueSearchFilter.searchWord)

    const [selectsData, setSelectsData] = useState(dataSelects)

    
    return (
        <div className='assign__container'>

            <div className='assign__container__header'>
                <div className='assign__container__header__button'>

                    <button className="btn btn__back" onClick={handleBack}>
                        <i className="fas fa-arrow-left"></i>
                    </button>
                </div>
                <h2 className='assign__container__header__title'>{title}</h2>
            </div>

            <div className='assign__container__content'>
                <Searchbar placeholder="Buscar" setValueSearchFilter={setValueSearchFilter} valueSearchFilter={valueSearchFilter} />

                <div className='assign__container__content__list scroll'>
                    {
                        dataList.map(item => (
                            isACoincidenceAssing(item.label, valueSearchFilter.searchWord.trim()) && <div className='assign__container__content__list__item' key={item.value}>
                                {type === 'radio' ?
                                    <>
                                        <input type='radio' name='group' id={item.value} />
                                        <label htmlFor={item.value}>{item.label}</label>
                                    </>
                                    :
                                    <>
                                        <input type='checkbox' name='group' id={item.value} />
                                        <label htmlFor={item.value}>{item.label}</label>
                                    </>
                                }
                            </div>
                        ))
                    }

                </div>

                <div className='assign__container__content__submit'>
                    <select>
                        <option ></option>
                         {/* {
                            dataSelects.map(item => (
                                <option key={item.value} value={item.value}>{item.label}</option>
                            ))
                        } */}
                    </select>
                    <button className='btn btnAssignGroup'>Aceptar</button>
                </div>
            </div>
        </div>
    )
}
