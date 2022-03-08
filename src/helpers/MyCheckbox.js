import { ErrorMessage, useField } from 'formik';




export const MyCheckbox = ({ label, ...props } ) => {

    const [ field ] = useField({ ...props, type: 'checkbox' });

    return (
        <>
            <label>
                <input type="checkbox" { ...field } { ...props } />
                { label }            
            </label>
            <ErrorMessage name={ props.name } component="span" />
        </>
    )
}
