import React from "react"
import {Text, View, Image, Animated} from "react-native"
import {Icon} from "react-native-elements"
import {Slider} from "react-native-elements"
import {connect} from "react-redux"
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
	getDuration() {
		// const {playbackInstancePosition, playbackInstanceDuration} = this.state
		// const timeLeft = playbackInstanceDuration - playbackInstancePosition
		// return this._convertMisToMinutes(timeLeft)
	}
	_convertMisToMinutes(ms = 0) {
		// const totalSeconds = Number(ms) / 1000
		// const minutes = Math.round(totalSeconds / 60)
		// const second = Math.round(totalSeconds % 60).toString()
		// const paddedSecond = second.length === 1 ? `0${second}` : second
		// return `${minutes}:${paddedSecond}`
	}

	_onSeekingPosition() {
		// if (this.sound) {
		// 	console.log("I am seeking")
		// 	this.isSeeking = true
		// }
	}
	handleSliderDragCompleted = data => {
		// this.isSeeking = false
		// const {playbackInstanceDuration} = this.state
		// this._updatePlayPosition(Math.round((data / 100) * playbackInstanceDuration))
		// this._audioResume()
	}

	// async handleVolumeControl(value) {
	// 	await this.sound.setVolumeAsync(value)
	// }

	// async _updatePlayPosition(position) {
	// 	await this.sound.setPositionAsync(position)
	// }

	render() {
		const {artist, title, albumTitle, albumCover} = this.props.info

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
							value={0}
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
							value={Math.round((0 / 100) * 100) || 0}
							minimumTrackTintColor="red"
							thumbStyle={{width: 10, height: 10, backgroundColor: "white"}}
							maximumValue={100}
							onValueChange={() => this._onSeekingPosition()}
							onSlidingComplete={this.handleSliderDragCompleted}
						/>
					</View>
					<View style={styles.duration}>
						<Text style={{color: "white"}}>...</Text>
					</View>
				</View>
			</View>
		)
	}
}

const mapStateToProps = state => {
	return {
		info: state.playReducer
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
