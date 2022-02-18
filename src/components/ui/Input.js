import { ErrorMessage, Field, useField } from 'formik';
import { useEffect, useState } from 'react';


export const Input = ({ label, styles, ...props }) => {

    const [field, meta] = useField(props)
    const [elementInput, setElementInput] = useState(<h1></h1>);

    // const inputElement = () => {
    //     if ([
    //         'text',
    //         'input',
    //         'email',
    //         'password',
    //         'number',
    //         'date',
    //     ].includes(props.type)) {
    //         setElementInput(
    //             <input {...field} {...props} />
    //         )
    //     }


    //     if ('radio' === props.type) {
    //         setElementInput(
    //             <div>
    //                 <Field type="radio" name={props.name} value={props.options[0].value} />
    //                 <Field type="radio" name={props.name} value={props.options[1].value} />
    //             </div>
    //         )
    //     }
    // }


    return (

        <div
            className={`form__container__body__section__row__inputContainer ${(meta.touched && meta.error ? 'error' : '')}`}
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
                ].includes(props.type) && <input {...field} {...props} />
            }

            {
                'radio' === props.type && <>
                    {
                        props.options.map(({ value }, index) => (
                            <Field type="radio" name={props.name} value={value} />
                        ))
                    }
                </>

            }

            {
                'select' === props.type && <Field {...field} {...props} as={props.type} >
                    <option value="1"></option>
                    <option value="2"></option>
                    <option value="3"></option>
                </Field>
            }




            {meta.touched && meta.error && <span>{meta.error}</span>}
        </div >
    )
}
