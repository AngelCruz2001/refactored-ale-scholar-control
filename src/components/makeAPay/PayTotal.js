import React from 'react'

export const PayTotal = ({ total }) => {
    return (
        <div className="makeAPay__body__container__total ">
            <p className="payTitle">Total de pago</p>
            <div className='makeAPay__body__container__total__price'>
                <p>{total}</p>
            </div>
        </div>
    )
}
