import { types, typesExpenses } from "../types/types";

const initialState = {
    idExpenseType: null,
    expenses: [],
    dataInputs: {
        observation: '',
        amount: 0,
    },
    activeExpense: {},
};


export const expensesReducer = (state = initialState, action) => {


    switch (action.type) {
        case types.expenseSetTypeExpenses:
            return {
                ...state,
                idExpenseType: action.payload
            };

        case types.expensesSetExpenses:
            return {
                ...state,
                expenses: action.payload
            };
        case types.expensesSetDataInputs:
            return {
                ...state,
                dataInputs: action.payload
            };
        case types.expensesClearData:
            return initialState;

        case types.expensesSetActive:
            return {
                ...state,
                activeExpense: action.payload,
                dataInputs: {
                    observation: action.payload.observation,
                    amount: action.payload.amount,
                },
                idExpenseType: typesExpenses.indexOf(action.payload.expenses_type),
            };

        case types.expensesDeleteExpense:
            return {
                ...state,
                expenses: state.expenses.filter(expense => expense.id_expense !== action.payload)
            };

        default:
            return state;
    }
}

