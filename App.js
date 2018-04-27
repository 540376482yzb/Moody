import React from 'react'
import App from './components/UI'
import store from './store'
import { Provider } from 'react-redux'
export default () => (
	<Provider store={store}>
		<App />
	</Provider>
)
