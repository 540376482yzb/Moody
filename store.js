import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import playReducer from './reducers/play'
export const store = createStore(playReducer, composeWithDevTools(applyMiddleware(thunk)))
export default store
