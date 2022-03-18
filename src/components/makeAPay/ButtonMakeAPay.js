import React from 'react'

export const ButtonMakeAPay = ({ text, hasIcon = false, name, onClick, value, type }) => {

    switch (type) {
        case 0:
            const handleClick = () => {
                onClick(value)
            }
            break;

        default:
            break;
    }



    return (
        <button className='btn btn-makeAPay' name={name} onClick={onClick} value={value}>
            {text}
            {hasIcon && <i className="fa-solid fa-circle-chevron-right" />}
        </button >
    )
}
