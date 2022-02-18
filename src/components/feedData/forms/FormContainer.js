import React from 'react'
import { Formik, Form } from 'formik'
import { Input } from '../../ui/Input'
// import { MySelect } from '../../../helpers/MySelect';
import { validationsInputs } from '../../../helpers/validationsInputs';

export const FormContainer = ({ handleIsAdding, dataForm }) => {


    const [initialValues, validationSchema] = validationsInputs(dataForm);

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

                                                    return (

                                                        <Input 
                                                            key={name}
                                                            type={type}
                                                            name={name}
                                                            placeholder={placeholder}
                                                            label={label}
                                                            styles={styles}
                                                            options={options}
                                                        />
                                                    )

                                            })}


                                        </div>
                                    ))}
                                </div>
                            ))}
                            <button type='submit'>holkaaaa</button>
                        </Form>

                    )}

                </Formik>
            </div>
        </div>
    )
}
