import React from 'react'

export const InformationModal = ({ title, text }) => {
    return (
        <div>
            <p className="title">{title}</p>
            <p className="noTitle">{text}</p>
        </div>
    )
}
