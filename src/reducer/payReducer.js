import { types } from "../types/types";

const initialState = {
    active: null,
    concept: null,
    method: "",
    thingToPay: { name: "", id: null },
    totalPayMoney: "",
    amountToPay: "",
    activeAccount: null,
    idPayment: "",
    payments: [],
    students: [],
    fertilizers: [],
    cards: [{ id_card: "", bank: "", owner: "" }],
}

export const payReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.paySetActive:
            return {
                ...state,
                active: action.payload,
            }
        case types.paySetCards:
            return {
                ...state,
                cards: action.payload,
            }
        case types.paySetCards:
            return {
                ...state,
                cards: action.payload,
            }
        case types.paySetPrice:
            return {
                ...state,
                totalPayMoney: action.payload
            }
        case types.paySetActiveAccount:
            return {
                ...state,
                activeAccount: action.payload
            }
        case types.payAmountToPay:
            return {
                ...state,
                amountToPay: action.payload
            }
        case types.payClearActive:
            return {
                ...state,
                active: null,
            }
        case types.payConceptPay://
            return {
                ...state,
                concept: action.payload
            }
        case types.payMethodPay://
            return {
                ...state,
                method: action.payload
            }
        case types.payThingToPay://
            return {
                ...state,
                thingToPay: action.payload
            }
        case types.paySetFertilizers:
            return {
                ...state,
                fertilizers: action.payload
            }
        case types.paySetIdPayment:
            return {
                ...state,
                idPayment: action.payload
            }
        case types.paySetPayments:
            return {
                ...state,
                payments: action.payload
            }
        case types.paySetStudents:
            return {
                ...state,
                students: action.payload
            }
        case types.payClearModalData:
            return {
                ...state,
                concept: null,
                thingToPay: { name: "", id: null },
                totalPayMoney: "",
                amountToPay: "",
                activeAccount: null,
                idPayment: "",
                fertilizers: [],
                payments: [],
                students: [],
                method: ""
            }
        default:
            return state;
    }

}
