import React from 'react'
import { Button, Text, View, FlatList } from 'react-native'
import ListEntry from './ListEntry'

export default class DetailScreen extends React.Component {
	static navigationOptions = ({ nagivation }) => {
		const { params } = navigation.state
		return {
			title: params ? params.artist : ''
		}
	}
	_renderItem = ({ item }) => <ListEntry entry={item} />
	_keyExtractor = (item, index) => index.toString()

	render() {
		return (
			<View>
				<Text>Detail</Text>
			</View>
		)
	}
	// render() {
	// 	console.log('hi')
	// 	const { params } = this.props.nagivation.state
	// 	if (!params) {
	// 		return (
	// 			<View>
	// 				<Text>Loading ...</Text>
	// 			</View>
	// 		)
	// 	}
	// 	return (
	// 		<FlatList
	// 			data={params.playLists}
	// 			keyExtractor={this._keyExtractor}
	// 			renderItem={this._renderItem}
	// 		/>
	// 	)
	// }
}
