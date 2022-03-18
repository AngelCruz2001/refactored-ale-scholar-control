import React from 'react'

export const BackButton = ({ handleBack }) => {
    return (
        <div className='assign__container__header__button'>

            <button className="btn btn__back" onClick={handleBack}>
                <i className="fas fa-arrow-left"></i>
            </button>
        </div>
    )
}
