import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup';
import { MyTextInput } from '../../../helpers/MyTextInput'
import { MySelect } from '../../../helpers/MySelect';

export const FormContainer = ({ handleIsAdding, dataForm }) => {


    // TODO: MIRA MI CRUZ AQUI VALIO UN POQUITO MADRE PORQUE YA ES TARDE Y TENGO SUENO so paro hagalo mas bonito
    const initialValues = {};
    const requiredFields = [];
    Object.values(dataForm).forEach((data) => {

        data.forEach((row) => {
            row.map(({ name, value, validations }) => {

                initialValues[name] = value;

                if (validations) {

                    let schema = Yup.object()

                    for (const rule of validations) {
                        if (rule.type === 'required') {
                            schema = schema.required('Este campo es requerido')
                        }
                    }

                    requiredFields[name] = schema;
                }

            })
        })
    })

    // TODO: FALTARIA EL CSS PARA QUE SE VEA NICE Y TODO PORQUE COMO PUEDES OBERSVAR ESTA SHIT SO GOD NO?
    // YA ESTA LISTO PARA VALIDACIONES Y SELECTS AHORITA TODOS TIENEN REQUIRED SI GUSTAS PUEDES QUITARLE A LOS QUE NO TENGAN VALIDACION EN SU JSON LA PROPIEDAD VALIDATIONS Y BOOM BOOM LISTO CALISTO MAQUINA
    // LO DEJO PORQUE COMO PUEDE OBSERVAR YA ES NIGHT Y NO ME PAGAN HORAS EXTRAS Y POS YA
    // SALUDOS GG

    const validationSchema = Yup.object({ ...requiredFields });




    return (
        //General Container
        <div className='form__container'>

            {/* Headers */}
            <div className='form__container__header'>
                <div className='form__container__header__backButton'>
                    <button className="btn btn__back" onClick={handleIsAdding}>
                        <i className="fas fa-arrow-left"></i>
                    </button>
                </div>
                <p className='form__container__header__title'>Capturar nuevo estudiante</p>
            </div>

            {/* Body */}
            <div className='form__container__body'>
                {/* Form */}
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        console.log(values)
                    }}
                >

                    {(formik) => (
                        <Form>
                            {Object.values(dataForm).map((data, index) => (
                                // Section container
                                <div key={index} className="form__container__body__section">

                                    {/* Section title */}
                                    <span className='form__container__body__section__title' >
                                        {/* DataBuildForm = {title: {}, title2: {} } */}
                                        {Object.keys(dataForm)[index]}
                                    </span>

                                    {data.map((row, index) => (
                                        <div key={index} className='form__container__body__section__row'>

                                            {row.map(({ type, name, placeholder, label, styles, options }, index) => {
                                                if (type === 'input' || type === 'password' || type === 'email' || type === 'date' || type === 'number' || type === 'sex') {

                                                    return (
                                                        <div key={index} className='form__container__body__section__row__inputContainer' style={styles} >
                                                            <MyTextInput
                                                                key={name}
                                                                type={type}
                                                                name={name}
                                                                placeholder={placeholder}
                                                                label={label} />
                                                        </div>
                                                    )
                                                }
                                                else if (type === 'select') {
                                                    return (

                                                        <MySelect
                                                            key={name}
                                                            label={label}
                                                            name={name}
                                                        >
                                                            <option value="">Seleccionar una opcion</option>
                                                            {
                                                                options.map((opt) => (
                                                                    <option key={opt} value={opt}>{opt}</option>
                                                                ))
                                                            }
                                                        </MySelect>
                                                    )
                                                }

                                            })}


                                        </div>
                                    ))}

                                    {/* Section content, line of inputs*/}
                                </div>
                            ))}
                        </Form>

                    )}

                </Formik>
            </div>
        </div>
    )
}
