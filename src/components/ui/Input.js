import { ErrorMessage, Field, useField } from 'formik';
import { useEffect, useState } from 'react';
import { Timetable } from './Timetable';
import dataStates from '../../helpers/resources/dataStates.json';


export const Input = ({ label, styles, values, dataSelects, setFieldValue, active, activeIdName, ...props }) => {

    const [field, meta] = useField(props);
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
                        dataSelects && dataSelects.map((elementData, index) =>
                            active ?
                                activeIdName !== props.dataName[1] && <option key={index} value={elementData[props.dataName[1]]} label={elementData[props.dataName[2]]} />
                                :
                                <option key={index} value={elementData[props.dataName[1]]} label={elementData[props.dataName[2]]} />
                        )
                    }
                </Field>
            }
            {
                props.type === 'selectState' && <Field {...field} as='select' name={props.name}>
                    <option hidden defaultValue>Seleccione una opción</option>
                    {
                        dataStates.states.map((elementData, index) => (
                            <option key={props.dataName + index} value={elementData[props.dataName]} label={elementData[props.dataName]} />
                        ))
                    }

                </Field>
            }

            {
                props.type === 'selectMunicipality' && <Field {...field} as='select' name={props.name} disabled={values.state === ''}>
                    <option hidden defaultValue>Seleccione una opción</option>
                    {
                        values.state !== '' &&
                        dataStates.states.find(e => e.state === values.state).municipalities.map((municipality, index) => (
                            <option key={municipality} value={municipality} label={municipality} />
                        ))
                    }
                </Field>

            }
            {
                props.type === 'timetable' && <>
                    <Field name={props.name} component={Timetable} meta={meta} />
                </>
            }


            {props.type !== 'timetable' && meta.touched && meta.error && <span>{meta.error}</span>}
        </div >
    )
}
