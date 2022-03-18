import React, { useState } from 'react'
import { Searchbar } from '../ui/Searchbar'
import { BackButton } from '../ui/BackButton'
import { DataList } from './DataList'
export const Assign = ({ handleBack, dataSelects, data, type = 'radio', title = "ASIGNAR GRUPO" }) => {
    // const dataList = Array(100).fill({}).map((_, i) => ({ value: i + 1, label: 'Nombre del grupo' }));
    const [valueSearchFilter, setValueSearchFilter] = useState({ searchWord: '' })
    console.log(valueSearchFilter.searchWord)

    const [selectsData, setSelectsData] = useState(dataSelects)


    return (
        <div className='assign__container'>

            <div className='assign__container__header'>
                <BackButton handleBack={handleBack} />
                <h2 className='assign__container__header__title'>{title}</h2>
            </div>

            <div className='assign__container__content'>
                <Searchbar placeholder="Buscar" setValueSearchFilter={setValueSearchFilter} valueSearchFilter={valueSearchFilter} />

                <div className='assign__container__content__list scroll'>
                    <DataList
                        data={data}
                        dataSelects={selectsData}
                        type={type}
                        valueSearchFilter={valueSearchFilter}
                    />
                </div>

                <div className='assign__container__content__submit'>
                    <select>
                        <option></option>
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
