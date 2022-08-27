import React from 'react'

export const PaySubmit = ({ handleSubmit }) => {
    return (
        <div className="makeAPay__body__container__pay">
            <button type='submit' className='btn btn-bluePay' onClick={handleSubmit}>Pagar</button>
        </div>
    )
}
