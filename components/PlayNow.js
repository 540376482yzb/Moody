import React from "react"
import {Text, View, Image, Animated, Easing} from "react-native"
import {Icon} from "react-native-elements"
import {Slider} from "react-native-elements"
import {connect} from "react-redux"
import {changeSetting} from "../actions/play"
export class PlayScreen extends React.Component {
	static navigationOptions = {
		title: "Play"
		/* No more header config here! */
	}
	constructor(props) {
		super(props)
		this.isSeeking = false
		this.spinValue = new Animated.Value(0)
	}
	getDuration(currentPosition, duration) {
		const timeLeft = duration - currentPosition
		return this._convertMisToMinutes(timeLeft)
	}
	_convertMisToMinutes(ms = 0) {
		const totalSeconds = Number(ms) / 1000
		const minutes = Math.round(totalSeconds / 60)
		const second = Math.round(totalSeconds % 60).toString()
		const paddedSecond = second.length === 1 ? `0${second}` : second
		return `${minutes}:${paddedSecond}`
	}

	handleSliderDragCompleted = data => {
		this.isSeeking = false
		console.log("drag completed")
		const {duration} = this.props
		this._updatePlayPosition(Math.round((data / 100) * duration))
	}

	handleVolumeControl = value => {
		const {dispatch} = this.props
		console.log("volume control", value)
		dispatch(changeSetting("volume", value))
	}

	async _updatePlayPosition(position) {
		const {dispatch} = this.props
		dispatch(changeSetting("positionMillis", position))
	}

	startAnimation = () => {
		this.spinValue.setValue(0)
		Animated.timing(this.spinValue, {
			toValue: 1,
			duration: 15000,
			easing: Easing.linear,
			useNativeDriver: true
		}).start(() => this.startAnimation())
	}
	componentDidMount() {
		this.startAnimation()
	}

	render() {
		const {artist, title, albumTitle, albumCover} = this.props.currentSong
		const {volume = 1, currentPosition = 0, duration = 1} = this.props
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
							value={volume}
							thumbStyle={{width: 10, height: 10}}
							minimumTrackTintColor="white"
							maximumTrackTintColor="grey"
							onSlidingComplete={this.handleVolumeControl}
							step={0.01}
							thumbStyle={{width: 12, height: 12, backgroundColor: "tomato"}}
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
							value={Math.round((currentPosition / duration) * 100) || 0}
							minimumTrackTintColor="red"
							thumbStyle={{width: 10, height: 10, backgroundColor: "white"}}
							maximumValue={100}
							onSlidingComplete={this.handleSliderDragCompleted}
						/>
					</View>
					<View style={styles.duration}>
						<Text style={{color: "white"}}>{this.getDuration(currentPosition, duration)}</Text>
					</View>
				</View>
			</View>
		)
	}
}

const mapStateToProps = state => {
	const {currentSong, playStatus} = state.playReducer
	return {
		currentSong: currentSong,
		currentPosition: playStatus.playbackInstancePosition,
		duration: playStatus.playbackInstanceDuration,
		volume: playStatus.volume
	}
}
export default connect(mapStateToProps)(PlayScreen)

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
