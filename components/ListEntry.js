import React from "react"
import {Text, View, TouchableOpacity} from "react-native"
import {Icon} from "react-native-elements"
import {withNavigation} from "react-navigation"
import {connect} from "react-redux"
import {setCurrentSong} from "../actions/play"
export class ListEntry extends React.Component {
	_onPressButton() {
		this.props.dispatch(setCurrentSong(this.props.entry))
		this.props.navigation.navigate("Play")
	}

	render() {
		const {title, artist} = this.props.entry
		const {active} = this.props
		return (
			<TouchableOpacity onPress={() => this._onPressButton()}>
				<View style={styles.entry}>
					<View style={styles.body}>
						{active && <Icon name="play" type="font-awesome" size={12} color="black" />}

						<View style={styles.title}>
							<Text>{title}</Text>
						</View>
						<View>
							<Text style={{color: "grey"}}>{artist ? ` - ${artist}` : ""}</Text>
						</View>
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
		flexDirection: "row",
		justifyContent: "space-between",
		borderBottomWidth: 0.25,
		borderTopWidth: 0.25,
		borderColor: "grey",
		paddingTop: 15,
		paddingBottom: 15
	},
	body: {
		flexDirection: "row",
		justifyContent: "flex-start"
	},
	title: {
		paddingLeft: 5
	},
	sub: {
		color: "grey"
	},
	length: {
		marginRight: 20
	}
}

export default withNavigation(connect()(ListEntry))
