import React from 'react'

export const Input = ({ inputData }) => {

    const {
        name,
        label,
        type,
        placeholder,
        value,
        styles
    } = inputData

    console.log(styles)
    return (
        <>
            <label>{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={() => { }}
            />
            
        </>
    )
}
