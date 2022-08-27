import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { expensesClearActive, expensesSetActiveExpense, expensesStartDeleteExpense } from '../../actions/expenses'
import { uiSetModalCloseExpenses, uiSetShowHistory } from '../../actions/ui'
import { numberToText } from '../../helpers/numberToText'
import { InformationModal } from '../expenseRecord/InformationModal'
import { ButtonTable } from './table/ButtonTable'

export const ModalExpenses = () => {
    const dispatch = useDispatch();
    const { activeExpense } = useSelector(state => state.expenses)
    const { id_expense, date, amount, observation, expenses_type } = activeExpense;
    const handleCloseModal = () => {
        dispatch(expensesClearActive())
        dispatch(uiSetModalCloseExpenses());
    }
    const handleClickDelete = (id) => {
        dispatch(expensesStartDeleteExpense(id))
        handleCloseModal()
    }

    const handleClickEdit = (id) => {
        handleCloseModal()
        dispatch(expensesSetActiveExpense(id))
        dispatch(uiSetShowHistory(false))
    }

    return (
        <div className="modalExpense">
            <div className="modalExpense__content">
                <div className="modalExpense__content__title">
                    <button className="btn btn__back" onClick={handleCloseModal}>
                        <i className="fas fa-arrow-left"></i>
                    </button>
                </div>
                <div className="modalExpense__content__body">
                    <InformationModal title="Fecha" text={date} />
                    <InformationModal title="Tipo de gasto" text={expenses_type} />
                    <InformationModal title="Cantidad" text={`$${amount}.00 (${amount === '1' ? 'un peso' : `${numberToText(amount)} pesos`})`} />
                    <InformationModal title="Descripción" text={observation} />
                </div>
                <div className="modalExpense__content__footer">
                    <ButtonTable type={1} title="Editar" onClick={() => handleClickEdit(id_expense)} />
                    <ButtonTable type={2} title="Borrar" onClick={() => handleClickDelete(id_expense)} />
                </div>


            </div>
        </div>
    )
}
