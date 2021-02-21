import { createStore, compose, applyMiddleware } from 'redux'
import { rootReducer } from '../reducers/rootReducers'
import thunk from 'redux-thunk'
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunk),
  );
export const store = createStore(
    rootReducer,
    enhancer
)