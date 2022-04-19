import React from 'react'

export const RadioButtonList = ({
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
            <div className={"radioButtonList__container son"} >
                {items.map((item, index) => (
                    <div className="pretty-radio" key={index}>
                        <input
                            type="radio"
                            className="radio"
                            name="expense_type"
                            id={index}
                            onChange={handleChange}
                            value={index}
                            checked={getFieldProps('expense_type').value == index}
                        />

                        <span className="radio-look"></span>
                        {/* // checked={idValue == index} onChange={onChangeValueDocument} /> */}
                        <span>{item}</span>
                    </div>
                ))
                }
            </div>
            {touched.expense_type && errors.expense_type && <span>{errors.expense_type}</span>}
        </div>
    )
}
