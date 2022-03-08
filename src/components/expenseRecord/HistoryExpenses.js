import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { expensesClearData, expensesSetActiveExpense, expensesStartDeleteExpense, expensesStartGetExpenses } from '../../actions/expenses';
import { uiSetModalOpen, uiSetShowHistory } from '../../actions/ui';
import { buildDataExpenses } from '../../helpers/buildDataTables';
import { Table } from '../ui/Table';

export const HistoryExpenses = ({
    setShowHistory,
    expenses = [],
}) => {
    const dispatch = useDispatch()
    const [dataShow, setDataShow] = useState([]);
    const headers = [{
        title: "    Tipo de gasto",
        textAlign: 'left'
    },
    {
        title: "Fecha de registro",
        textAlign: 'center'
    },
    {
        title: "",
        textAlign: 'center'
    },
    {
        title: "",
        textAlign: 'center'
    },
    {
        title: "",
        textAlign: 'center'
    }];

    useEffect(() => {
        dispatch(expensesClearData())
        dispatch(expensesStartGetExpenses());
    }, [])
    const handleClickSee = (id) => {
        dispatch(uiSetModalOpen(true))
        dispatch(expensesSetActiveExpense(expenses.filter(expense => expense.id_expense === id)[0]))

    }

    const handleCloseShowHistory = () => {
        dispatch(uiSetShowHistory(false))
    }
    const handleClickEdit = (id) => {
        dispatch(expensesSetActiveExpense(expenses.filter(expense => expense.id_expense === id)[0]))
        console.log(expenses.filter(expense => expense.id_expense === id)[0])
        handleCloseShowHistory();
    }
    const handleClickDelete = (id) => {
        dispatch(expensesStartDeleteExpense(id))
    }
    const generateData = () => {
        const data = []
        expenses.map(({ id_expense, expenses_type, date }, index) => (data.push(buildDataExpenses(id_expense, expenses_type, date, handleClickSee, handleClickEdit, handleClickDelete))));
        return data;
    }
    useEffect(() => {
        setDataShow(generateData())
    }, [expenses])

    return (
        <>
            <div className="history__container">
                <div className="history__container__header">
                    <button className="btn btn__back" onClick={handleCloseShowHistory}>
                        <i className="fas fa-arrow-left"></i>
                    </button>
                    <h4>Historial de registro de gastos</h4>
                </div>
                <Table
                    headers={headers}
                    data={dataShow}
                    sizesColumns={[35, 35, 10, 10, 10]}
                />
            </div>
        </>
    )
}
