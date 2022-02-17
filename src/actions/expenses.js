import Swal from "sweetalert2"
import { fetchConToken } from "../helpers/fetch"
import { types } from "../types/types"

export const expenseStartCreateRequest = (dataForm) => {
    return async (dispatch, getState) => {
        const { expenses } = getState();
        console.log({
            observation: dataForm.observation,
            amount: dataForm.amount,
            expense_type: expenses.idExpenseType,
            id_user: getState().auth.user.id_user
        })
        try {
            const res = await fetchConToken(`expenses`,
                {
                    observation: dataForm.observation,
                    amount: dataForm.amount,
                    expense_type: expenses.idExpenseType,
                    id_user: getState().auth.user.id_user
                }, 'POST'
            )
            const body = await res.json()

            if (body.ok) {
                console.log(body)
                Swal.fire({
                    title: "Solicitudes",
                    text: body.msg,
                    icon: 'success',
                })
            } else {
                console.log(body)
                Swal.fire({
                    title: '¡Oops!',
                    text: body.msg,
                    icon: 'question',
                })
            }

            dispatch(expensesClearData())
        } catch (error) {
            console.log(error)
            console.log("Error de backend")
            Swal.fire('Error', 'Hablar con el administrador', 'error')
        }
    }
}


export const expensesStartGetExpenses = (filter = "all") => {
    return async (dispatch, getState) => {
        try {

            const res = await fetchConToken(`expenses/?${filter}`, 'GET')
            const body = await res.json()
            if (body.ok) {
                console.log(body)
                dispatch(expensesSetExpenses(body.expenses))
            } else {
                console.log(body)
                Swal.fire({
                    title: '¡Oops!',
                    text: body.msg,
                    icon: 'question',
                })
            }
        } catch (error) {
            console.log("Error de backend")
            console.log(error)
            Swal.fire('Error', 'Hablar con el administrador', 'error')
        }
    }
}

export const expensesStartDeleteExpense = (id_expense) => {
    return async (dispatch) => {
        try {

            const res = await fetchConToken(`expenses/${id_expense}`, {}, 'DELETE')
            const body = await res.json()
            if (body.ok) {
                console.log(body)
                dispatch(expensesDeleteExpense(id_expense))
                Swal.fire({
                    title: "Gastos",
                    text: body.msg,
                    icon: 'success',
                })
            } else {
                console.log(body)
                Swal.fire({
                    title: '¡Oops!',
                    text: body.msg,
                    icon: 'question',
                })
            }
        } catch (error) {
            console.log("Error de backend")
            console.log(error)
            Swal.fire('Error', 'Hablar con el administrador', 'error')
        }
    }
}

export const expenseStartUpdateexpense = (id_expense, dataForm) => {
    return async (dispatch, getState) => {
        const { expenses } = getState();

        try {
            const res = await fetchConToken(`expenses/${id_expense}`,
                {
                    observation: dataForm.observation,
                    amount: dataForm.amount,
                    expense_type: expenses.idExpenseType
                }, 'PUT'
            )
            const body = await res.json()

            if (body.ok) {
                console.log(body)
                Swal.fire({
                    title: "Solicitudes",
                    text: body.msg,
                    icon: 'success',
                })
            } else {
                console.log(body)
                Swal.fire({
                    title: '¡Oops!',
                    text: body.msg,
                    icon: 'question',
                })
            }

            dispatch(expensesClearData())
        } catch (error) {
            console.log(error)
            console.log("Error de backend")
            Swal.fire('Error', 'Hablar con el administrador', 'error')
        }
    }
}
export const expensesSetDataInputs = (data) => ({ type: types.expensesSetDataInputs, payload: data })
export const expenseSetTypeExpense = (idExpense) => ({ type: types.expenseSetTypeExpenses, payload: idExpense })
export const expensesSetExpenses = (expenses) => ({ type: types.expensesSetExpenses, payload: expenses })
export const expensesSetActiveExpense = (expenses) => ({ type: types.expensesSetActive, payload: expenses })
const expensesDeleteExpense = (id_expense) => ({ type: types.expensesDeleteExpense, payload: id_expense })
export const expensesClearData = () => ({ type: types.expensesClearData })