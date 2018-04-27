import React from 'react'
import { Button, Text, View, FlatList } from 'react-native'
import ListEntry from './ListEntry'

export default class DetailScreen extends React.Component {
	static navigationOptions = ({ navigation }) => {
		const { params } = navigation.state
		return {
			title: params ? params.artist || params.albumTitle : ''
		}
	}
	_renderItem = ({ item }) => <ListEntry entry={item} />
	_keyExtractor = (item, index) => index.toString()

	render() {
		const { params } = this.props.navigation.state
		if (!params) {
			return (
				<View>
					<Text>Loading ...</Text>
				</View>
			)
		}
		return (
			<FlatList
				data={params.playLists}
				keyExtractor={this._keyExtractor}
				renderItem={this._renderItem}
			/>
		)
	}
}
