import React from "react"
import App from "./components/UI"
import store from "./store"
import {Provider} from "react-redux"
import {View, Text} from "react-native"

export default () => {
	return (
		<Provider store={store}>
			<App />
			{/* <View style={{flex: 1}}> */}
			{/* <Text>Hello</Text> */}
			{/* </View> */}
		</Provider>
	)
}
