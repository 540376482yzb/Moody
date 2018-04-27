import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import playReducer from './reducers/play'
export const store = createStore(playReducer, applyMiddleware(thunk))
export default store
