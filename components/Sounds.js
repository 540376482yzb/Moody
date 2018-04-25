import React from 'react'
import { Text, View, TouchableOpacity, Alert, FlatList } from 'react-native'
import ListEntry from './ListEntry'
import soundList from '../soundlist.json'
export default class SoundsScreen extends React.Component {
	_flattenList(soundList) {
		const arr = []
		soundList.forEach(item => {
			const artist = item.artist
			item.lists.forEach(sound => {
				arr.push({ artist, title: sound.title, url: sound.url, duration: sound.duration })
			})
		})
		return arr
	}
	_renderItem = ({ item }) => <ListEntry entry={item} />
	_keyExtractor = (item, index) => index.toString()
	render() {
		this.myList = this._flattenList(soundList)
		if (!this.myList) {
			return (
				<View>
					<Text>Loading</Text>
				</View>
			)
		}
		return (
			<FlatList
				data={this.myList}
				keyExtractor={this._keyExtractor}
				renderItem={this._renderItem}
			/>
		)
	}
}
