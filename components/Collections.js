import React from 'react'
import { Button, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons' // Version can be specified in package.json
import { StackNavigator, TabNavigator, TabBarTop } from 'react-navigation' // Version can be specified in package.json
import Sounds from './Sounds'
import Artists from './Artists'
import Albums from './Albums'
import PlayScreen from './PlayNow'

export default (Collections = TabNavigator(
	{
		Sounds: { screen: Sounds },
		Artists: { screen: Artists },
		Albums: { screen: Albums }
	},
	{
		navigationOptions: ({ navigation }) => ({
			tabBarIcon: ({ focused, tintColor }) => {
				const { routeName } = navigation.state
				let iconName
				if (routeName === 'Home') {
					iconName = `ios-information-circle${focused ? '' : '-outline'}`
				} else if (routeName === 'Settings') {
					iconName = `ios-options${focused ? '' : '-outline'}`
				}

				// You can return any component that you like here! We usually use an
				// icon component from react-native-vector-icons
				return <Ionicons name={iconName} size={25} color={tintColor} />
			}
		}),
		tabBarOptions: {
			tabBarComponent: TabBarTop,
			tabBarPosition: 'top',
			activeTintColor: 'white',
			inactiveTintColor: 'gray'
		},
		animationEnabled: true,
		swipeEnabled: true
	}
))
