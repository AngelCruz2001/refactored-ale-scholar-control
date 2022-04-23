import React from 'react'
import { Formik, Form } from 'formik'
import { Input } from '../../ui/Input'
// import { MySelect } from '../../../helpers/MySelect';
import { validationsInputs } from '../../../helpers/validationsInputs';
import { feedClearActive, feedStartEditData, feedStartPostData } from '../../../actions/feed';
import { useDispatch } from 'react-redux';

export const FormContainer = ({ handleIsAdding, dataForm, active, dataSelects, dataSection, activeIdName }) => {

    const [initialValues, validationSchema] = validationsInputs(dataForm, active);

    const dispatch = useDispatch();

    const handleBack = () => {
        handleIsAdding()
        dispatch(feedClearActive())
    }

    const handleSubmit = (values, resetForm) => {
        console.log("🚀 ~ file: FormContainer.js ~ line 19 ~ handleSubmit ~ values", values)
        if (active) {
            dispatch(feedStartEditData(dataSection.endpoint, values))
        } else {
            dispatch(feedStartPostData(dataSection.endpoint, values))
        }
        // resetForm();
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
                <p className='form__container__header__title'>{`${dataSection.titleForm}`}</p>
            </div>

            {/* Body */}
            <div className='form__container__body'>
                {/* Form */}
                <Formik
                    initialValues={initialValues}
                    enableReinitialize={true}
                    validationSchema={validationSchema}
                    onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
                >

                    {({ handleReset, values, setFieldValue }) => (
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
                                                    activeIdName={activeIdName}
                                                    key={item.name}
                                                    values={values}
                                                    dataSelects={item.dataName ? dataSelects[item.dataName[0]] : null}
                                                    active={active}
                                                    setFieldValue={setFieldValue}
                                                    {...item}
                                                />
                                            ))}
                                        </div>
                                    ))}

                                    {
                                        index === Object.values(dataForm).length - 1 &&
                                        <div className='btnFeedContainer'>
                                            <button className='btn btnSubmitFeed' type='submit'>Guardar</button>
                                            <button className='btn btnCleanFeed' onClick={handleReset} >Reiniciar</button>
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
