import {createStore, applyMiddleware, combineReducers, compose} from "redux"
import thunk from "redux-thunk"
import playReducer from "./reducers/play"
import {composeWithDevTools} from "remote-redux-devtools"

export const store = createStore(
	combineReducers({playReducer}),
	composeWithDevTools(applyMiddleware(thunk))
)
export default store
