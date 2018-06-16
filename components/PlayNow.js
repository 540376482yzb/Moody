import React from "react"
import {Text, View, Image, TouchableOpacity, Animated, Easing} from "react-native"
import {Icon} from "react-native-elements"
import {Slider} from "react-native-elements"
import {connect} from "react-redux"
import {Audio} from "expo"
export class PlayScreen extends React.Component {
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
			isPlaying: true,
			isBuffering: false,
			playbackInstancePosition: 0,
			playbackInstanceDuration: 0,
			muted: null,
			volume: null
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
				shouldCorrectPitch: this.state.shouldCorrectPitch,
				volume: this.state.volume,
				isMuted: this.state.muted,
				isLooping: this.state.loopingType
			}
			const {sound} = await Audio.Sound.create(
				require("../assets/music1.mp3"),
				initialStatus,
				this._onPlaybackStatusUpdate
			)
			this.sound = sound
			await this.sound.playAsync()
		} catch (err) {
			console.log(err)
		}
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
		if (this.state.isPlaying) {
			this._loadNewPlaybackInstance()
			this.startAnimation()
		}
	}

	render() {
		const {artist, title, albumTitle, albumCover} = this.props.info
		const {
			isPlaying,
			playbackInstanceDuration = 0,
			playbackInstancePosition = 0,
			volume
		} = this.state

		const spin = this.spinValue.interpolate({
			inputRange: [0, 1],
			outputRange: ["0deg", "359deg"]
		})
		const animatedStyle = {
			flex: 1,
			position: "absolute",
			width: 200,
			height: 200,
			transform: [
				{
					rotate: spin
				}
			]
		}
		return (
			<View style={styles.container}>
				{/* 
				=======================================================		
				background image */}
				<Image source={{uri: albumCover}} style={styles.background} blurRadius={2} />
				{/* 
				=======================================================
				speaker control */}
				<View style={styles.speaker}>
					<Icon name="ios-volume-up" type="ionicon" size={24} color="white" />
					<View style={styles.slide}>
						<Slider
							value={volume || 1}
							thumbStyle={{width: 10, height: 10}}
							onValueChange={this.handleVolumeControl}
							step={0.1}
						/>
					</View>
				</View>
				{/* 
				=======================================================
				center record */}
				<View style={styles.record}>
					<Animated.View style={animatedStyle}>
						<Image source={{uri: albumCover}} style={styles.recordImg} />
					</Animated.View>
					<View style={styles.recordCenter} />
				</View>
				{/*
				=======================================================
				 display title */}
				<View style={styles.text}>
					<Text style={styles.primary}>{title}</Text>
					<View style={styles.subText}>
						<Text style={styles.second}>{albumTitle}</Text>
						<Text style={styles.second}> - {artist}</Text>
					</View>
				</View>
				{/* 
				=======================================================
				progress control  */}
				<View style={styles.progress}>
					<View style={styles.control}>
						<Slider
							value={Math.round((playbackInstancePosition / playbackInstanceDuration) * 100) || 0}
							minimumTrackTintColor="red"
							thumbStyle={{width: 10, height: 10, backgroundColor: "white"}}
							maximumValue={100}
							onValueChange={() => this._onSeekingPosition()}
							onSlidingComplete={this.handleSliderDragCompleted}
						/>
					</View>
					<View style={styles.duration}>
						<Text style={{color: "white"}}>{this.getDuration()}</Text>
					</View>
				</View>
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
		position: "absolute",
		width: "100%",
		height: "100%"
	},
	speaker: {
		padding: 10,
		flexDirection: "row"
	},
	slide: {flex: 1, justifyContent: "center", padding: 5, alignItems: "stretch"},
	record: {
		alignSelf: "center",
		borderRadius: 200,
		borderWidth: 5,
		borderColor: "grey",
		overflow: "hidden",
		width: 200,
		height: 200,
		justifyContent: "center",
		alignItems: "center"
	},
	recordImg: {
		flex: 1,
		position: "absolute",
		width: 200,
		height: 200
	},
	recordCenter: {
		width: 50,
		height: 50,
		backgroundColor: "black",
		borderRadius: 200
	},
	progress: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingLeft: 20,
		paddingRight: 20,
		marginTop: 20,
		marginBottom: 20
	},
	control: {
		height: 10,
		width: 250,
		alignItems: "stretch",
		justifyContent: "center"
	},
	duration: {
		height: 10,
		width: 50,
		justifyContent: "center",
		alignItems: "center"
	},
	text: {
		padding: 5,
		alignItems: "center"
	},
	primary: {
		color: "white",
		fontWeight: "bold",
		marginBottom: 10,
		marginTop: 10
	},
	second: {
		color: "#F5F5F5"
	},
	subText: {
		flexDirection: "row",
		justifyContent: "flex-start"
	},
	playArea: {
		flexDirection: "row",
		justifyContent: "space-around",
		padding: 10,

		paddingTop: 20
	}
}
const mapStateToProps = state => {
	return {
		info: state
	}
}
export default connect(mapStateToProps)(PlayScreen)
