import React from 'react'
import { Button, Text, View, FlatList } from 'react-native'
import AlbumEntry from './AlbumEntry'
import data from '../albumdata.json'
export default class Albums extends React.Component {
	_keyExtractor(item, index) {
		return index.toString()
	}
	_renderItem({ item }) {
		return (
			<AlbumEntry
				artist={item.artist}
				albumTitle={item.albumTitle}
				albumCover={item.albumCover}
				playLists={item.playLists}
			/>
		)
	}

	render() {
		return (
			<View style={styles.container}>
				<FlatList data={data} keyExtractor={this._keyExtractor} renderItem={this._renderItem} />
			</View>
		)
	}
}
const styles = {
	container: {
		padding: 20
	}
}
