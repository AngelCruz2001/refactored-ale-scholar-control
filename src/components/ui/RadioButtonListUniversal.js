import React from 'react'

export const RadioButtonListUniversal = ({
    items,
    touched,
    errors,
    activeClassName,
    handleChange,
    getFieldProps,
    text
}) => {
    return (
        <div className={"radioButtonList son ".concat(activeClassName)}>
            <p className="general__titleSection">{text}</p>
            <div className={`radioButtonList__container son ${touched.document_type && errors.expense_type && 'error'}`} >
                {items.map((item, index) => (
                    <div className="pretty-radio" key={index}>
                        <input
                            type="radio"
                            className="radio"
                            name="document_type"
                            id={item.id}
                            onChange={handleChange}
                            value={item.id}
                            checked={getFieldProps('document_type').value == item.id}
                        />

                        <span className="radio-look"></span>
                        {/* // checked={idValue == index} onChange={onChangeValueDocument} /> */}
                        <span>{item.name}</span>
                    </div>
                ))
                }
                {touched.document_type && errors.document_type && <span className='errorMessage'>{errors.document_type}</span>}
            </div>
        </div>
    )
}