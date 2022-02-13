import { types } from "../types/types";

const initialState = JSON.parse(localStorage.getItem('user')) || {
    user: {
        roles: []
    },
    logged: false,
    checking: false,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.authLogin:
            console.log(action.payload)
            return {
                ...state,
                user: { ...action.payload },
                logged: true,
            };
        case types.authLogout:
            return {
                ...state,
                user: {},
                logged: false,
            }
        case types.authCheckingStart:
            return {
                ...state,
                checking: true
            }
        case types.authCheckingFinish:
            return {
                ...state,
                checking: false
            }
        default:
            return state;
    }
}