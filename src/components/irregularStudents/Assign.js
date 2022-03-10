import React, { useState } from 'react'
import { Searchbar } from '../ui/Searchbar'

export const Assign = ({ handleBack, data, type = 'radio', title = "ASIGNAR GRUPO" }) => {
    // Generete an array with 10 positions = [{value: "", label: ""}]
    const dataList = Array(100).fill({}).map((_, i) => ({ value: i + 1, label: 'Nombre del grupo' }));
    console.log(dataList)
    const [valueSearchFilter, setValueSearchFilter] = useState({ searchWord: '' })
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
                            <div className='assign__container__content__list__item' key={item.value}>
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
            </div>
        </div>
    )
}
