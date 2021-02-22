import {combineReducers} from 'redux'
import { calendarReducer } from './calendarReducer'
import { uiReducer } from './uiReducer'


// la combinación de todos los reducers
export const rootReducer = combineReducers({
    ui: uiReducer, 
    calendar: calendarReducer
    
    // TODO: authReducer
})