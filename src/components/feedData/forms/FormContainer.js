import React from 'react'
import { Formik, Form } from 'formik'
import { Input } from '../../ui/Input'
// import { MySelect } from '../../../helpers/MySelect';
import { validationsInputs } from '../../../helpers/validationsInputs';
import { feedClearActive, feedStartPostData } from '../../../actions/feed';
import { useDispatch } from 'react-redux';

export const FormContainer = ({ handleIsAdding, dataForm, active, dataSelects, dataSection }) => {

    const [initialValues, validationSchema] = validationsInputs(dataForm, active);
    const dispatch = useDispatch();
    const handleBack = () => {
        handleIsAdding()
        dispatch(feedClearActive())
    }

    const handleSubmit = (values) => {
        console.log(values)
        dispatch(feedStartPostData(dataSection.endpoint, values))
    }
    return (
        //General Container
        <div className='form__container'>

            {/* Headers */}
            <div className='form__container__header'>
                <div className='form__container__header__backButton'>
                    <button className="btn btn__back" onClick={handleBack}>
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
                    enableReinitialize={true}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >

                    {({ handleReset, values }) => (
                        <Form>
                            {Object.values(dataForm).map((data, index) => (
                                // Section container
                                <div
                                    key={index}
                                    className="form__container__body__section"
                                    styles={
                                        !Object.values(dataForm).length > 1 ?
                                            {
                                                height: '100%',
                                            }
                                            :
                                            ''
                                    }
                                >


                                    {/* Section title */}
                                    <span className='form__container__body__section__title' >
                                        {/* DataBuildForm = {title: {}, title2: {} } */}
                                        {Object.keys(dataForm)[index]}
                                    </span>

                                    {data.map((row, index) => (
                                        <div key={index} className='form__container__body__section__row'>
                                            {row.map((item, index) => (
                                                <Input
                                                    key={item.name}
                                                    values={values}
                                                    dataSelects={item.dataName ? dataSelects[item.dataName[0]] : null}
                                                    {...item}
                                                />
                                            ))}
                                        </div>
                                    ))}

                                    {
                                        index === Object.values(dataForm).length - 1 &&
                                        <div className='btnFeedContainer'>
                                            <button className='btn btnCleanFeed' onClick={handleReset} >Reiniciar</button>
                                            <button className='btn btnSubmitFeed' type='submit'>Guardar</button>
                                        </div>
                                    }

                                </div>
                            ))}
                        </Form>
                    )}
                </Formik>
            </div>
        </div >
    )
}
