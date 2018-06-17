import {StackNavigator} from "react-navigation" // Version can be specified in package.json
import Collections from "./Collections"
import DetailScreen from "./DetailScreen"
import {View, Text} from "react-native"
import React from "react"
import Player from "./Player"
import PlayScreen from "./PlayNow"

export const Navigator = StackNavigator(
	{
		Home: {screen: Collections},
		Play: {screen: PlayScreen},
		Detail: {screen: DetailScreen}
	},
	{
		navigationOptions: {
			title: "Moody",
			headerStyle: {
				backgroundColor: "#f4511e"
			},
			headerTintColor: "#fff",
			headerTitleStyle: {
				fontWeight: "bold"
			}
		}
	}
)

export default function App(props) {
	return (
		<View style={styles.container}>
			<Navigator />
			<Player style={styles.player} />
		</View>
	)
}

const styles = {
	container: {
		flex: 1
	},

	player: {}
}
