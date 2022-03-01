import { types } from "../types/types";

const initialState = {
    data: [],
    active: null,
    activeIdName: '',
    dataSelects: {},
    selectsLoading: false,
}

export const feedReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.feedGetData:
            return {
                ...state,
                data: action.payload
            }
        case types.feedSetActiveNameId:
            return {
                ...state,
                activeIdName: action.payload
            }

        case types.feedDeleteData:
            // action.payload == id
            return {
                ...state,
                data: state.data.filter(element => element[state.activeIdName] !== action.payload)
            }

        case types.feedSetActive:
            // action.payload == id
            return {
                ...state,
                active: state.data.find(element => element[state.activeIdName] === action.payload)
            }

        case types.feedClearActive:
            return {
                ...state,
                active: null
            }
        case types.feedSetSelectsData:
            return {
                ...state,
                dataSelects: action.payload
            }
        case types.feedStartLoadingSelect:
            return {
                ...state,
                selectsLoading: true
            }
        case types.feedFinishLoadingSelect:
            return {
                ...state,
                selectsLoading: false
            }
        case types.feedSetIsAdding:
            return {
                ...state,
                isAdding: action.payload
            }

        default:
            return state;
    }

}
