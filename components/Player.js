import React from "react"
import {Text, View, Image, TouchableOpacity, Animated, Easing} from "react-native"
import {Icon} from "react-native-elements"
import {connect} from "react-redux"
import {Audio} from "expo"
import {playStatusUpdate} from "../actions/play"

const updateInitialStatus = playStatus => playStatus

export class Play extends React.Component {
	static navigationOptions = {
		title: "Play"
		/* No more header config here! */
	}
	constructor(props) {
		super(props)
		this.sound = null
		this._onPress = this._onPress.bind(this)

		this.state = {
			shouldPlay: true,
			isPlaying: true,
			isBuffering: false,
			playbackInstancePosition: 0,
			playbackInstanceDuration: 0,
			muted: null,
			volume: null,
			loopingType: 0
		}
	}
	_onPress() {
		this.setState(prevState => {
			if (prevState.isPlaying) this._audioPause()
			else this._audioResume()
			return {
				isPlaying: !prevState.isPlaying
			}
		})
	}
	async _audioPause() {
		if (this.sound) await this.sound.pauseAsync()
	}
	async _audioResume() {
		if (this.sound) {
			await this.sound.playAsync()
		}
	}

	_onPlaybackStatusUpdate = status => {
		const {dispatch} = this.props
		if (status.isLoaded) {
			dispatch(playStatusUpdate(status))
		}
	}
	async _unloadPlayback() {
		await this.sound.unloadAsync()
		this.sound.setOnPlaybackStatusUpdate(null)
		this.sound = null
	}
	async _changeSetting(name, value) {
		await this.sound.setStatusAsync({[name]: value})
	}
	async _loadNewPlaybackInstance(currentSong, status) {
		try {
			if (this.sound) {
				this._unloadPlayback()
			}
			const source = {
				uri:
					"https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Podington_Bear_-_Rubber_Robot.mp3"
			}
			const initialStatus = updateInitialStatus(status)
			const {sound} = await Audio.Sound.create(source, initialStatus, this._onPlaybackStatusUpdate)
			this.sound = sound
			await this.sound.playAsync()
			this.setState({isPlaying: true})
		} catch (err) {
			console.log(err)
		}
	}
	changeSong = (currentIndex, playList, forward) => {
		const nextIndex = (currentIndex + (forward ? 1 : -1)) % playList.length
		return playList[nextIndex]
	}

	backward = () => {
		const {currentSong, playList} = this.props
		const nextSong = this.changeSong(currentSong.index, playList, false)
		console.log(nextSong)
	}
	forward = () => {
		const {currentSong, playList} = this.props
		const nextSong = this.changeSong(currentSong.index, playList, true)
		console.log(nextSong)
	}

	componentDidUpdate(prevProps) {
		const {currentSong, changeSetting: currentSetting = {}, playStatus} = this.props
		const {currentSong: prevSong = {}, changeSetting: prevSetting = {}} = prevProps
		const initialized = currentSong.index && !prevSong
		const changeSong = prevSong.index !== currentSong.index

		if (initialized || changeSong) {
			this._loadNewPlaybackInstance(currentSong, playStatus)
		}

		if (currentSetting && prevSetting.optionValue !== currentSetting.optionValue) {
			this._changeSetting(currentSetting.optionName, currentSetting.optionValue)
		}
	}

	componentWillUnmount() {
		this._unloadPlayback()
	}

	componentDidMount() {
		Audio.setAudioModeAsync({
			allowsRecordingIOS: false,
			interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
			playsInSilentModeIOS: true,
			shouldDuckAndroid: true,
			interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX
		})
	}

	render() {
		const {currentSong} = this.props
		const {isPlaying} = this.state
		if (!currentSong.artist) return <View />
		return (
			<View style={styles.playArea}>
				<Image source={{uri: currentSong.albumCover}} style={styles.image} />
				<Icon name="rotate-left" type="font-awesome" size={18} color="white" />
				<TouchableOpacity onPress={this.backward}>
					<Icon name="step-backward" type="font-awesome" size={20} color="white" />
				</TouchableOpacity>
				{isPlaying && (
					<TouchableOpacity onPress={this._onPress}>
						<Icon name="pause" type="font-awesome" size={25} color="white" />
					</TouchableOpacity>
				)}
				{!isPlaying && (
					<TouchableOpacity onPress={this._onPress}>
						<Icon name="play" type="font-awesome" size={25} color="white" />
					</TouchableOpacity>
				)}
				<TouchableOpacity onPress={this.forward}>
					<Icon name="step-forward" type="font-awesome" size={20} color="white" />
				</TouchableOpacity>
				<Icon name="shuffle" type="foundation" size={18} color="white" />
			</View>
		)
	}
}
const mapStateToProps = state => {
	return {
		currentSong: state.playReducer.currentSong,
		changeSetting: state.playReducer.changeSetting,
		playStatus: state.playReducer.playStatus,
		playList: state.playReducer.playList
	}
}
export default connect(mapStateToProps)(Play)

// const initialStatus = {
// 	shouldPlay: true,
// 	isBuffering: false,
// 	muted: false,
// 	volume: 1,
// 	loopingType: 0
// }

const styles = {
	playArea: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		padding: 10,
		backgroundColor: "tomato"
	},
	image: {
		width: 50,
		height: 50,
		borderRadius: 5
	}
}
