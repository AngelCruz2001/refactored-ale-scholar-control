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
    const { idExpenseType, expenses,  } = useSelector(state => state.expenses);
    const { isShowHistoryOpen } = useSelector(state => state.ui)

    const dispatch = useDispatch();
    //
    // jeje cruz si estas aqui, no le sabes a este formik we, no le muevas paro, ya funka
    const { handleSubmit, errors, touched, getFieldProps, resetForm, handleChange } = useFormik({
        initialValues: {
            observation: '',
            amount: '',
            expense_type: ''
        },

        onSubmit: (values) => {
            //aqui faltaria el dispatch pero tengo que ver que pez con retana porque no funka
            resetForm()
        },
        validationSchema: Yup.object({
            observation: Yup.string()
                .required('Requerido'),
            amount: Yup.number('La cantidad tienen que ser numeros.')
                .required('Requerido'),
            expense_type: Yup.number()
                .required('Requerido')
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
                                    handleChange={handleChange}
                                />

                                <div className="exp__container__body__quantity">
                                    <div className="quan__container ">
                                        <p className="general__titleSection quantity">Cantidad</p>
                                        <input className="styledInput" placeholder='Cantidad' type="text" {...getFieldProps('amount')} />
                                        {touched.amount && errors.amount && <span>{errors.amount}</span>}
                                    </div>
                                    <p className="general__titleSection description">Descripción</p>
                                    <textarea
                                        className="styledInput"
                                        name="observation"
                                        type="text"
                                        rows={5}
                                        cols={5}
                                        wrap="hard"
                                        {...getFieldProps('observation')}
                                        placeholder="Escriba una breve descripción. Ej:&#10;Pago de transporte a la secretaria María Valenzuela."
                                    
                                    />
                                    {touched.observation && errors.observation && <span>{errors.observation}</span>}
                                </div>
                            </div>
                            <div className="exp__container__footer">
                                <button className="btn req__footer__checkHistory active" onClick={handleOpenShowHistory}><i className="fas fa-history"></i><span>Ver Historial</span></button>
                                <button className="btn btn-primary active" type='submit'>Guardar</button>
                            </div>
                        </form>
                    </>

            }



        </div>

    )
}
