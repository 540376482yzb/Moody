import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'

export default class ListEntry extends React.Component {
	_onPressButton() {
		Alert.alert('You tapped the button!')
	}

	_onLongPressButton() {
		Alert.alert('You long-pressed the button!')
	}
	render() {
		const { title, artist, duration } = this.props.entry
		return (
			<TouchableOpacity onPress={() => this._onPressButton()}>
				<View style={styles.entry}>
					<View style={styles.body}>
						<View>
							<Text>{title}</Text>
						</View>
						<View>
							<Text style={{ color: 'grey' }}>{artist ? ` - ${artist}` : ''}</Text>
						</View>
					</View>
					<View style={styles.length}>
						<Text> {duration}</Text>
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
		justifyContent: 'space-between',
		borderBottomWidth: 0.25,
		borderTopWidth: 0.25,
		borderColor: 'grey',
		paddingTop: 15,
		paddingBottom: 15
	},
	body: {
		flexDirection: 'row',
		justifyContent: 'flex-start'
	},
	sub: {
		color: 'grey'
	},
	length: {
		marginRight: 20
	}
}
