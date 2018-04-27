import React from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import { withNavigation } from 'react-navigation'

export class AlbumEntry extends React.Component {
	constructor(props) {
		super(props)
		this._onPress = this._onPress.bind(this)
	}
	_onPress() {
		const { playLists } = this.props
		this.props.navigation.navigate('Detail', {
			playLists
		})
	}
	render() {
		const { artist, albumTitle, playLists, albumCover } = this.props
		return (
			<TouchableOpacity onPress={this._onPress}>
				<View style={styles.container}>
					<View style={styles.imgContainer}>
						<Image source={{ uri: albumCover }} style={styles.image} />
					</View>
					<View style={styles.text}>
						<View>
							<Text>{albumTitle}</Text>
						</View>
						<View>
							<Text style={styles.sub}>{artist}</Text>
						</View>
					</View>
				</View>
			</TouchableOpacity>
		)
	}
}

const styles = {
	container: {
		flex: 1,
		borderRadius: 5,
		borderWidth: 0.5,
		borderColor: '#d6d7da',
		padding: 5,
		marginBottom: 10
	},
	imgContainer: {
		alignItems: 'center'
	},
	image: {
		borderRadius: 5,
		width: 300,
		height: 300
	},
	text: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		padding: 20
	},
	sub: {
		color: 'grey'
	}
}

export default withNavigation(AlbumEntry)
