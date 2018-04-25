import React from 'react'
import { Button, Text, View, FlatList } from 'react-native'
import ArtistEntry from './ArtistEntry'
import artistList from '../artistList.json'
export default class Artists extends React.Component {
	_keyExtractor(item, index) {
		return index.toString()
	}
	_renderItem({ item }) {
		return (
			<ArtistEntry artist={item.artist} artistImg={item.artistImg} playLists={item.playLists} />
		)
	}

	render() {
		return (
			<FlatList data={artistList} keyExtractor={this._keyExtractor} renderItem={this._renderItem} />
		)
	}
}
