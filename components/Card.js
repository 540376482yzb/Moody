import React from 'react'
import { Button, Text, View } from 'react-native'

export default function Card(props) {
	return <View style={styles.container}>{props.children}</View>
}

const styles = {
	container: {
		flex: 1,
		padding: 5
	}
}
