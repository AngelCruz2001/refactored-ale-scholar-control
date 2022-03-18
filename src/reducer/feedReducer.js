import { types } from "../types/types";

const initialState = {
    data: [],
    active: null,
    activeIdName: '',
    dataSelects: {},
    activeGroup: '',
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

        case types.feedSetActiveNameById:
            return {
                ...state,
                activeGroup: state.data.find(register => register.id_group === action.payload).group_name
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
        case types.feedPost:
            return {
                ...state,
                data: [...state.data, action.payload]
            }
        case types.feedPut:
            return {
                ...state,
                data: state.data.map((item, i) => (
                    item[state.activeIdName] === action.payload[state.activeIdName] ?
                        action.payload : item
                )),
                active: null

            }
        default:
            return state;
    }

}
