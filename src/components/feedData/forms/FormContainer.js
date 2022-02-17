import React, { Fragment } from 'react'
import { Input } from './Input'

export const FormContainer = ({ handleIsAdding, dataForm }) => {

    console.log(dataForm)
    console.log(Object.values(dataForm))
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
                {Object.values(dataForm).map((data, index) => (
                    // Section container
                    <div key={index} className="form__container__body__section">

                        {/* Section title */}
                        <span className='form__container__body__section__title' >
                            {/* DataBuildForm = {title: {}, title2: {} } */}
                            {Object.keys(dataForm)[index]}
                        </span>

                        {/* Section content, line of inputs*/}
                        {data.map((row, index) => (
                            <div className='form__container__body__section__row'>

                                {row.map((input, index) => (
                                    <div key={index} className='form__container__body__section__row__inputContainer' style={input.styles} >
                                        <Input inputData={input} />
                                    </div>
                                ))}


                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}
