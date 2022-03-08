import { combineReducers } from "redux"
import { authReducer } from "./authReducer"
import { documentReducer } from "./documentReducer"
import { expensesReducer } from "./expensesReducer"
import { feedReducer } from "./feedReducer"
import { gradesReducer } from "./gradesReducer"
import { groupsReducer } from "./groupsReducer"
import { payReducer } from "./payReducer"
import { requestsReducer } from "./requestsReducer"
import { studentReducer } from "./studentReducer"
import { uiReducer } from "./uiReducer"
import { majorsReducer } from "./majorsReducer"

export const rootReducer = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    student: studentReducer,
    pay: payReducer,
    document: documentReducer,
    requests: requestsReducer,
    
    grades: gradesReducer,
    expenses: expensesReducer,
    feed: feedReducer, 
    groups: groupsReducer,
    majors: majorsReducer,
})