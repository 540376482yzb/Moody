import React from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import { withNavigation } from 'react-navigation'

export class ArtistEntry extends React.Component {
	constructor(props) {
		super(props)
		this._onPress = this._onPress.bind(this)
	}
	_onPress() {
		const { artist, playLists } = this.props
		this.props.navigation.navigate('Detail', {
			artist,
			playLists
		})
	}

	render() {
		const { artist, artistImg, playLists } = this.props
		return (
			<TouchableOpacity onPress={this._onPress}>
				<View style={styles.entry}>
					<View style={styles.image}>
						<Image source={{ uri: artistImg }} style={styles.image} />
					</View>
					<View>
						<Text>{artist}</Text>
						<Text style={styles.sub}>{playLists.length} songs</Text>
					</View>
				</View>
			</TouchableOpacity>
		)
	}
}

const styles = {
	entry: {
		marginLeft: 10,
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		borderBottomWidth: 0.25,
		borderTopWidth: 0.25,
		borderColor: 'grey',
		paddingTop: 15,
		paddingBottom: 15
	},
	image: {
		marginRight: 30,
		width: 40,
		height: 40
	},
	sub: {
		color: 'grey'
	},
	length: {
		marginRight: 20
	}
}

export default withNavigation(ArtistEntry)
