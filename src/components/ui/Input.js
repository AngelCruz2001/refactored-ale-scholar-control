import { ErrorMessage, Field, useField } from 'formik';
import { useEffect, useState } from 'react';
import { Timetable } from './Timetable';


export const Input = ({ label, styles, values, dataSelects, ...props }) => {

    const [field, meta] = useField(props);
    console.log(field)
    return (
        <div
            className={`form__container__body__section__row__inputContainer ${['radio', 'checkbox'].includes(props.type) ? 'radioContainer' : ''} ${(meta.touched && meta.error ? 'error' : '')}`}
            style={styles}
        >
            <label htmlFor={props.name}>{label}</label>
            {
                [
                    'text',
                    'input',
                    'email',
                    'password',
                    'number',
                    'date',
                ].includes(props.type) &&
                <Field
                    className={`${props.disabled ? 'disabled' : ''}`}
                    name={props.name}
                    type={props.type}
                    placeholder={props.placeholder}
                    disabled={props.disabled}
                    maxLength={props.maxlength}
                    {...field}
                />
            }

            {
                props.type === 'radio' && <>
                    {
                        props.options.map(({ value, label }, index) => (
                            <label key={index} className='radioContainer__radioLabel'>
                                <Field key={value} type={props.type} name={props.name} value={value} />
                                {label}
                            </label>
                        ))
                    }
                </>
            }

            {
                props.type === 'checkbox' && <>
                    {
                        props.options.map(({ value, label }, index) => (
                            <label key={index} className='radioContainer__radioLabel'>
                                <Field key={value} type={props.type} name={props.name} value={value} />
                                {label[+!values[props.name]]}
                            </label>
                        ))
                    }
                </>
            }
            {
                props.type === 'select' && <Field {...field} as={props.type} name={props.name}>
                    <option hidden defaultValue>Seleccione una opción</option>
                    {
                        props.options !== undefined &&
                        props.options.map(({ value, text }) => <option key={value} value={value} label={text} />)
                    }
                    {
                        dataSelects && dataSelects.map((elementData, index) => (
                            <option key={index} value={elementData[props.dataName[1]]} label={elementData[props.dataName[2]]} />
                        ))
                    }
                </Field>
            }

            {
                props.type === 'timetable' && <Timetable />
            }


            {meta.touched && meta.error && <span>{meta.error}</span>}
        </div >
    )
}
