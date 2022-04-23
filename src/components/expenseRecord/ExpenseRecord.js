import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { expenseSetTypeExpense, expensesStartGetExpenses, expenseStartCreateRequest, expenseStartUpdateexpense } from '../../actions/expenses'
import { uiSetShowHistory } from '../../actions/ui'
import { typesExpenses } from '../../types/types'
import { Date } from '../ui/Date'
import * as Yup from 'yup';
import { Quantity } from '../ui/Quantity'
import { RadioButtonList } from '../ui/RadioButtonList'
import { HistoryExpenses } from './HistoryExpenses'

export const ExpenseRecord = () => {
    const { expenses: { idExpenseType, expenses, activeExpense }, ui: { isShowHistoryOpen, isModalOpenExpenses } } = useSelector(state => state);
    // console.log(activeExpense != null ? true : false)
    const dispatch = useDispatch();
    //
    // jeje cruz si estas aqui, no le sabes a este formik we, no le muevas paro, ya funka
    // Pues ya le entendí, voy a ver si puedo ponerlo en payments. 
    const { handleSubmit, errors, touched, getFieldProps, resetForm, handleChange } = useFormik({
        initialValues: activeExpense === null
            ? {
                observation: '',
                amount: '',
                expense_type: null
            }
            : {
                observation: activeExpense.observation,
                amount: activeExpense.amount,
                expense_type: activeExpense.expense_type
            },
        enableReinitialize: true,
        onSubmit: (values) => {
            //aqui faltaria el dispatch pero tengo que ver que pez con retana porque no funka
            // Pa agregar, no funciona porque la petición se queda pendiente, lo que me hizo pensar que nos falta un loading 
            // pa cuando una petición se esta ejecutando

            console.log(values)
            dispatch(expenseStartCreateRequest(values))
            resetForm()
        },
        validationSchema: Yup.object({
            expense_type: Yup.number('Introduzca los datos correspondientes.').typeError('Introduzca los datos correspondientes.').required('Introduzca los datos correspondientes.'),
            observation: Yup.string().required('Introduzca los datos correspondientes.'),
            amount: Yup.number().typeError('Introduzca solo numeros.').required('Introduzca los datos correspondientes.'),
        })
    });



    const handleOpenShowHistory = () => {
        dispatch(uiSetShowHistory(true))
    }

    useEffect(() => {
        dispatch(expensesStartGetExpenses());
    }, [])

    return (
        <div className="exp__container">
            {
                isShowHistoryOpen ?
                    <HistoryExpenses
                        expenses={expenses}
                        isModalOpenExpenses={isModalOpenExpenses}
                    />
                    :
                    <>
                        <div className="exp__container__header">
                            <Date />
                        </div>

                        <form onSubmit={handleSubmit} >
                            <div className="exp__container__body">

                                <RadioButtonList
                                    touched={touched}
                                    errors={errors}
                                    items={typesExpenses}
                                    text="Razón de gasto"
                                    getFieldProps={getFieldProps}
                                    handleChange={handleChange}
                                />

                                <div className="exp__container__body__quantity">

                                    <div className="quan__container inputContainer">
                                        <p className="general__titleSection quantity">Cantidad</p>
                                        <input className={`styledInput ${errors.amount && touched.amount && 'error'}`} placeholder='Cantidad' type="number" {...getFieldProps('amount')} />
                                        {touched.amount && errors.amount && <span className='errorMessage'>{errors.amount}</span>}
                                    </div>

                                    <div className='inputContainer descriptionContainer'>
                                        <p className="general__titleSection description">Descripción</p>
                                        <textarea
                                            className={`styledInput ${errors.observation && touched.observation && 'error'}`}
                                            name="observation"
                                            type="text"
                                            rows={5}
                                            cols={5}
                                            wrap="hard"
                                            {...getFieldProps('observation')}
                                            placeholder="Escriba una breve descripción. Ej:&#10;Pago de transporte a la secretaria María Valenzuela."
                                        />
                                        {touched.observation && errors.observation && <span className='errorMessage'>{errors.observation}</span>}

                                    </div>
                                </div>
                            </div>
                            <div className="exp__container__footer">
                                <button className="btn req__footer__checkHistory active" onClick={handleOpenShowHistory}><i className="fas fa-history"></i><span>Ver Historial</span></button>
                                <button className="btn btn-primary active btn-expenses" type='submit'>Guardar</button>
                            </div>
                        </form>
                    </>
            }
        </div>

    )
}
