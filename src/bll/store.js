import {legacy_createStore as createStore, applyMiddleware, combineReducers} from 'redux'
import {appReducer} from './reducer'
import thunk from 'redux-thunk'

const rootReducer = combineReducers(
	{appReducer}
)
export const store = createStore(rootReducer, applyMiddleware(thunk))

window.store = store
