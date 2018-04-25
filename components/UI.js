import React from 'react'
import { Button, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons' // Version can be specified in package.json
import { StackNavigator, TabNavigator, TabBarTop } from 'react-navigation' // Version can be specified in package.json
import Collections from './Collections'
import PlayScreen from './PlayNow'
import DetailScreen from './DetailScreen'

export default StackNavigator(
	{
		Home: { screen: Collections },
		Play: { screen: PlayScreen },
		Detail: { screen: DetailScreen }
	},
	{
		navigationOptions: {
			title: 'Moody',
			headerStyle: {
				backgroundColor: '#f4511e'
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
				fontWeight: 'bold'
			}
		}
	}
)
