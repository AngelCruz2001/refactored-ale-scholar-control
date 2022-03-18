import React from 'react'
import { isACoincidenceAssing } from '../../helpers/isACoincidence';

export const DataList = ({ data = [], valueSearchFilter, type }) => {
    return (
        <>
            {
                data.map(item => (
                    isACoincidenceAssing(item.label, valueSearchFilter.searchWord.trim()) &&
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
        </>
    )
}
