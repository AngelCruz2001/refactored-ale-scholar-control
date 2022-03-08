import { ErrorMessage, useField } from 'formik';




export const MySelect = ( { label, ...props } ) => {

    const [ field ] = useField(props)

    return (
        <>
            <label htmlFor={ props.id || props.name }>{ label }</label>
            <select { ...field } { ...props } />
            <ErrorMessage name={ props.name } component="span" />
        </>
    )
}
