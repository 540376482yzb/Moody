import React from "react"
import {Text, View, Image, TouchableOpacity, Animated, Easing} from "react-native"
import {Icon} from "react-native-elements"
import {connect} from "react-redux"
import {Audio} from "expo"
import {saveProgress} from "../actions/play"
export class Play extends React.Component {
	static navigationOptions = {
		title: "Play"
		/* No more header config here! */
	}

	constructor(props) {
		super(props)
		this._onPress = this._onPress.bind(this)
		this.handleVolumeControl = this.handleVolumeControl.bind(this)
		this.isSeeking = false
		this.spinValue = new Animated.Value(0)
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
			return {
				isPlaying: !prevState.isPlaying
			}
		})
	}
	async _audioPause() {
		await this.sound.pauseAsync()
	}
	async _audioResume() {
		if (!this.sound) {
			await _loadNewPlaybackInstance()
		} else {
			await this.sound.playAsync()
		}
		this.startAnimation()
	}

	_onPlaybackStatusUpdate = status => {
		if (status.isLoaded) {
			this.setState({
				playbackInstancePosition: status.positionMillis,
				playbackInstanceDuration: status.durationMillis,
				shouldPlay: status.shouldPlay,
				isBuffering: status.isBuffering,
				muted: status.isMuted,
				volume: status.volume,
				loopingType: status.isLooping ? 1 : 0
			})
			//   if (status.didJustFinish && !status.isLooping) {
			//     this._advanceIndex(true);
			//     this._updatePlaybackInstanceForIndex(true);
			//   }
			// } else {
			//   if (status.error) {
			//     console.log(`FATAL PLAYER ERROR: ${status.error}`);
			//   }
		}
	}
	async _unloadPlayback() {
		await this.sound.unloadAsync()
		this.sound.setOnPlaybackStatusUpdate(null)
		this.sound = null
	}

	getDuration() {
		const {playbackInstancePosition, playbackInstanceDuration} = this.state
		const timeLeft = playbackInstanceDuration - playbackInstancePosition
		return this._convertMisToMinutes(timeLeft)
	}
	_convertMisToMinutes(ms = 0) {
		const totalSeconds = Number(ms) / 1000
		const minutes = Math.round(totalSeconds / 60)
		const second = Math.round(totalSeconds % 60).toString()
		const paddedSecond = second.length === 1 ? `0${second}` : second
		return `${minutes}:${paddedSecond}`
	}

	_onSeekingPosition() {
		if (this.sound) {
			console.log("I am seeking")
			this.isSeeking = true
			this._audioPause()
		}
	}
	handleSliderDragCompleted = data => {
		this.isSeeking = false
		const {playbackInstanceDuration} = this.state
		this._updatePlayPosition(Math.round((data / 100) * playbackInstanceDuration))
		this._audioResume()
	}

	async handleVolumeControl(value) {
		await this.sound.setVolumeAsync(value)
	}

	async _updatePlayPosition(position) {
		await this.sound.setPositionAsync(position)
	}

	startAnimation = () => {
		if (!this.state.isPlaying) {
			this.spinValue.setValue(1)
			return
		}
		this.spinValue.setValue(0)
		Animated.timing(this.spinValue, {
			toValue: 1,
			duration: 15000,
			easing: Easing.linear,
			useNativeDriver: true
		}).start(() => this.startAnimation())
	}

	async _loadNewPlaybackInstance() {
		try {
			if (this.sound) {
				this._unloadPlayback()
			}
			const source = {
				uri:
					"https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Podington_Bear_-_Rubber_Robot.mp3"
			}
			const initialStatus = {
				shouldPlay: true,
				volume: this.state.volume,
				isMuted: this.state.muted,
				isLooping: this.state.loopingType
			}
			const {sound} = await Audio.Sound.create(
				require("../assets/music1.mp3"),
				initialStatus,
				this._onPlaybackStatusUpdate
			)
		} catch (err) {
			console.log(err)
		}
	}

	componentDidUpdate(prevProps, prevState) {
		const {isPlaying} = this.state
		if (this.sound) {
			if (prevState.isPlaying && !isPlaying) {
				console.log("pause")
				this._audioPause()
			}
			if (!prevState.isPlaying && isPlaying) {
				this._audioResume()
			}
		}
	}

	componentWillUnmount() {
		console.log("unmounting")
		this._unloadPlayback()
		const {dispatch} = this.props
		dispatch(saveProgress(this.state))
	}

	componentDidMount() {
		Audio.setAudioModeAsync({
			allowsRecordingIOS: false,
			interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
			playsInSilentModeIOS: true,
			shouldDuckAndroid: true,
			interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX
		})
		this._loadNewPlaybackInstance()
	}

	render() {
		const {artist, title, albumTitle, albumCover} = this.props.info
		const {isPlaying} = this.state
		return (
			<View style={styles.playArea}>
				<Icon name="rotate-left" type="font-awesome" size={24} color="white" />
				<Icon name="step-backward" type="font-awesome" size={28} color="white" />
				{isPlaying && (
					<TouchableOpacity onPress={this._onPress}>
						<Icon name="pause" type="font-awesome" size={36} color="white" />
					</TouchableOpacity>
				)}
				{!isPlaying && (
					<TouchableOpacity onPress={this._onPress}>
						<Icon name="play" type="font-awesome" size={36} color="white" />
					</TouchableOpacity>
				)}

				<Icon name="step-forward" type="font-awesome" size={28} color="white" />
				<Icon name="shuffle" type="foundation" size={24} color="white" />
			</View>
		)
	}
}
const mapStateToProps = state => {
	return {
		info: state.playReducer
	}
}
export default connect(mapStateToProps)(Play)
const styles = {
	playArea: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		padding: 10,
		backgroundColor: "tomato"
	}
}
