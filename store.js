import { createStore } from 'redux'
// , applyMiddleware, combineReducers
import thunk from 'redux-thunk'
import playReducer from './reducers/play'

export const store = createStore(playReducer)
export default store
