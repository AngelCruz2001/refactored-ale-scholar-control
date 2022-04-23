import React, { useState } from 'react'
import { Searchbar } from '../ui/Searchbar'
import { BackButton } from '../ui/BackButton'
import { DataList } from './DataList'

export const Assign = ({
    handleBack,
    type,
    title,
    dataList,
    ExtraCampus,
    handleInputChange,
    nameDataList
}) => {
    const [valueSearchFilter, setValueSearchFilter] = useState({ searchWord: '' })


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
                        handleInputChange={handleInputChange}
                        data={dataList}
                        type={type}
                        valueSearchFilter={valueSearchFilter}
                        nameDataList={nameDataList}
                    />
                </div>

                <div className='assign__container__content__submit'>

                    <ExtraCampus />

                </div>
            </div>
        </div>
    )
}
