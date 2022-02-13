import React from 'react'

export const RadioButtonList = ({
    items,
    onChangeValueDocument,
    activeClassName,
    idValue,
    text
}) => {

    return (
        <div className={"radioButtonList son ".concat(activeClassName)}>
            <p className="general__titleSection">{text}</p>
            <div className={"radioButtonList__container son"} onChange={onChangeValueDocument}>
                {items.map((item, index) => (
                    <div className="pretty-radio" key={index}>
                        <input type="radio" className="radio" name="document" id={index} checked={idValue == index} onChange={onChangeValueDocument} />
                        <span className="radio-look"></span>
                        <span>{item}</span>
                    </div>
                ))
                }
            </div>
        </div>
    )
}
