import React from 'react'
import { Button, Text, View, Image, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { Slider } from 'react-native-elements'
import { Player, MediaStates } from 'react-native-audio-toolkit'
export default class PlayScreen extends React.Component {
	static navigationOptions = {
		title: 'Play'
		/* No more header config here! */
	}

	constructor(props) {
		super(props)
		this._onPress = this._onPress.bind(this)

		this.state = {
			TotalTime: null,
			IsPlaying: false
		}
	}
	_onPress() {
		this.player = new Player(
			'https://drive.google.com/uc?export=download&id=1a-UD-WKvM_faKA5cG1noNGBqpq7A050G'
		)
		new Promise(resolve => {
			return resolve(this.player)
		}).then(() => {
			this.player.prepare(err => {
				this.player.play()
			})
		})
		// this.player.prepare(err => {
		// 	let seconds = this.player.duration / 1000 //duration is in milliseconds
		// })
		// this.player.play(() => {
		// 	console.log('hello')
		// })
	}
	render() {
		const { params } = this.props.navigation.state
		if (!params) {
			return (
				<View>
					<Text>Loading</Text>
				</View>
			)
		}
		const { artist, title } = params
		const albumCover = 'https://reactjs.org/logo-og.png'

		return (
			<View style={styles.container}>
				{/* background image */}
				<Image source={{ uri: albumCover }} style={styles.background} blurRadius={2} />
				{/* speaker control */}
				<View style={styles.speaker}>
					<Icon name="ios-volume-up" type="ionicon" size={24} color="white" />
					<View style={styles.slide}>
						<Slider thumbStyle={{ width: 10, height: 10 }} />
					</View>
				</View>
				{/* center record */}
				<View style={styles.record}>
					<Image
						source={{ uri: 'https://facebook.github.io/react/logo-og.png' }}
						style={styles.recordImg}
					/>
					<View style={styles.recordCenter} />
				</View>
				{/* display title */}
				<View style={styles.text}>
					<Text style={styles.primary}>Like the way you lie</Text>
					<View style={styles.subText}>
						<Text style={styles.second}>Album Name</Text>
						<Text style={styles.second}> - Eminem</Text>
					</View>
				</View>
				{/* progress control  */}
				<View style={styles.progress}>
					<View style={styles.control}>
						<Slider
							minimumTrackTintColor="red"
							thumbStyle={{ width: 10, height: 10, backgroundColor: 'white' }}
						/>
					</View>
					<View style={styles.duration}>
						<Text style={{ color: 'white' }}>03:56</Text>
					</View>
				</View>
				<View style={styles.playArea}>
					<Icon name="rotate-left" type="font-awesome" size={36} color="white" />
					<Icon name="step-backward" type="font-awesome" size={36} color="white" />
					<TouchableOpacity onPress={this._onPress}>
						<Icon name="play" type="font-awesome" size={36} color="white" />
					</TouchableOpacity>
					<Icon name="step-forward" type="font-awesome" size={36} color="white" />
					<Icon name="shuffle" type="foundation" size={36} color="white" />
				</View>
			</View>
		)
	}
}

const styles = {
	container: {
		flex: 1
	},
	background: {
		flex: 1,
		position: 'absolute',
		width: '100%',
		height: '100%'
	},
	speaker: {
		padding: 10,
		flexDirection: 'row'
	},
	slide: { flex: 1, justifyContent: 'center', padding: 5, alignItems: 'stretch' },
	record: {
		alignSelf: 'center',
		borderRadius: 200,
		borderWidth: 5,
		borderColor: 'grey',
		overflow: 'hidden',
		width: 200,
		height: 200,
		justifyContent: 'center',
		alignItems: 'center'
	},
	recordImg: {
		flex: 1,
		position: 'absolute',
		width: 200,
		height: 200
	},
	recordCenter: {
		width: 50,
		height: 50,
		backgroundColor: 'black',
		borderRadius: 200
	},
	progress: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 20,
		paddingRight: 20,
		marginTop: 20,
		marginBottom: 20
	},
	control: {
		height: 10,
		width: 250,
		alignItems: 'stretch',
		justifyContent: 'center'
	},
	duration: {
		height: 10,
		width: 50,
		justifyContent: 'center',
		alignItems: 'center'
	},
	text: {
		padding: 5,
		paddingLeft: 100
	},
	primary: {
		color: 'white',
		fontWeight: 'bold'
	},
	second: {
		color: 'white'
	},
	subText: {
		flexDirection: 'row',
		justifyContent: 'flex-start'
	},
	playArea: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		padding: 10,

		paddingTop: 20
	}
}
