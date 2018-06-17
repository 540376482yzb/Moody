import React from "react"
import {Button, Text, View, FlatList} from "react-native"
import ListEntry from "./ListEntry"
import {connect} from "react-redux"

export class DetailScreen extends React.Component {
	static navigationOptions = ({navigation}) => {
		const {params} = navigation.state
		return {
			title: params ? params.artist || params.albumTitle : ""
		}
	}
	_renderItem = ({item}) => (
		<ListEntry
			entry={item}
			active={this.props.currentId !== null && this.props.currentId === item.index}
		/>
	)
	_keyExtractor = (item, index) => index.toString()
	populatingPlayLest = playList => {
		return playList.map((list, index) => ({
			...list,
			index
		}))
	}
	render() {
		const {params} = this.props.navigation.state

		if (!params) {
			return (
				<View>
					<Text>Loading ...</Text>
				</View>
			)
		}
		return (
			<FlatList
				data={this.populatingPlayLest(params.playLists)}
				keyExtractor={this._keyExtractor}
				renderItem={this._renderItem}
			/>
		)
	}
}

const mapStateToProps = state => ({
	currentId: state.playReducer.index
})
export default connect(mapStateToProps)(DetailScreen)
