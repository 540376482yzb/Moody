import React from "react"
import {Text, View, FlatList} from "react-native"
import ListEntry from "./ListEntry"
import soundList from "../soundlist.json"
import {setPlayList} from "../actions/play"
import {connect} from "react-redux"
export class SoundsScreen extends React.Component {
	_flattenList(soundList) {
		this.playList = []
		soundList.forEach(artist => {
			this.playList = this.playList.concat(artist.lists.map(song => ({...song})))
		})
		this.playList = this.playList.map((song, index) => {
			return {...song, index}
		})
		return this.playList
	}
	_renderItem = ({item}) => {
		console.log(item.index)
		return (
			<ListEntry
				entry={item}
				active={this.props.index !== null && this.props.index === item.index}
			/>
		)
	}

	_keyExtractor = (item, index) => index.toString()

	componentDidMount() {
		const {dispatch} = this.props
		dispatch(setPlayList(this.playList))
	}

	render() {
		console.log(this.props.index)
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

const mapStateToProps = state => {
	return {
		index: state.playReducer.index,
		playList: state.playReducer.playList || []
	}
}

export default connect(mapStateToProps)(SoundsScreen)
