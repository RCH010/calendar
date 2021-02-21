import {combineReducers} from 'redux'
import { uiReducer } from './uiReducer'


// la combinación de todos los reducers
export const rootReducer = combineReducers({
    ui: uiReducer,
    // TODO: authReducer
    // TODO: CalendarReducer
})