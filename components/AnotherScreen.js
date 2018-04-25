import React from 'react'
import { Button, Text, View } from 'react-native'
import { StackNavigator, TabNavigator, TabBarTop } from 'react-navigation' // Version can be specified in package.json

export default class AnotherScreen extends React.Component {
	static navigationOptions = {
		title: 'Another'
		/* No more header config here! */
	}
	render() {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text>Details!</Text>
			</View>
		)
	}
}
