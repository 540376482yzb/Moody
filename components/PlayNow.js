import React from 'react'
import { Button, Text, View } from 'react-native'
import { StackNavigator, TabNavigator, TabBarTop } from 'react-navigation' // Version can be specified in package.json

export default class PlayScreen extends React.Component {
	static navigationOptions = {
		title: 'Play'
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
