import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { expenseSetTypeExpense, expensesStartGetExpenses, expenseStartCreateRequest, expenseStartUpdateexpense } from '../../actions/expenses'
import { uiSetShowHistory } from '../../actions/ui'
import { typesExpenses } from '../../types/types'
import { Date } from '../ui/Date'
import { Quantity } from '../ui/Quantity'
import { RadioButtonList } from '../ui/RadioButtonList'
import { HistoryExpenses } from './HistoryExpenses'

export const ExpenseRecord = () => {
    const { idExpenseType, expenses, dataInputs, activeExpense } = useSelector(state => state.expenses);
    const { isShowHistoryOpen } = useSelector(state => state.ui)
    const dispatch = useDispatch();
    const [dataForm, setDataForm] = useState(dataInputs);
    // const isAnActiveExpense = activeExpense !== {};

    useEffect(() => {
        setDataForm(dataInputs);
    }, [dataInputs])
    const onChangeValueDocument = ({ target }) => {
        dispatch(expenseSetTypeExpense(parseInt(target.id)));
    }

    const handleQuantityChange = (amount) => {
        setDataForm({ ...dataForm, amount: amount });
    }

    const handleInputChangeTextArea = ({ target }) => {
        setDataForm({ ...dataForm, observation: target.value });
        // dispatch(expensesSetDataInputs({ ...dataForm, observation: target.value }));
    }

    const handleSubmitSave = () => {
        activeExpense.id_expense ? dispatch(expenseStartUpdateexpense(activeExpense.id_expense, dataForm)) : dispatch(expenseStartCreateRequest(dataForm));
        setDataForm(dataInputs);
    }

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
                        <div className="exp__header">
                            <Date />
                        </div>

                        <div className="exp__body">
                            <RadioButtonList
                                onChangeValueDocument={onChangeValueDocument}
                                items={typesExpenses}
                                text="Razón de gasto"
                                idValue={idExpenseType}
                            />
                            <div className="exp__body__quantity">
                                <Quantity
                                    handleQuantityChange={handleQuantityChange}
                                    startQuantity={dataForm.amount}
                                />
                                <p className="general__titleSection description">Descripción</p>
                                <textarea
                                    className="styledInput"
                                    name="description"
                                    value={dataForm.observation}
                                    placeholder="Escriba una breve descripción. Ej:&#10;Pago de transporte a la secretaria María Valenzuela."
                                    onChange={handleInputChangeTextArea}
                                    rows={5}
                                    cols={5}
                                    wrap="hard"
                                />
                            </div>
                        </div>
                        <div className="exp__footer">
                            <button className="btn req__footer__checkHistory active" onClick={handleOpenShowHistory}><i className="fas fa-history"></i><span>Ver Historial</span></button>
                            <button className="btn btn-primary active" onClick={handleSubmitSave}>Guardar</button>
                        </div>
                    </>

            }



        </div>

    )
}
