import React from 'react'

export const ButtonMakeAPay = ({ text, hasIcon = false }) => {
    return (
        <button className='btn btn-makeAPay'>
            <span>
                {text}
            </span>
            {hasIcon && <i className="fa-solid fa-circle-chevron-right" />}
        </button>
    )
}
