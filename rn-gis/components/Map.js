import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import MapView, { ProviderPropType } from 'react-native-maps'


function Map({ navigation, route }) {
	const [radiusText, setRadiusText] = useState('0')

	const radiusTextHandler = (radiusText) => {
		setRadiusText(radiusText)
	}

	return (
		<View style={styles.container}>
			<View style={styles.top}>
				{/* TODO: Add some text here via the routing */}
				<Text>{route.params.title}</Text>
			</View>
			<MapView
				initialRegion={route.params.location}
				showsUserLocation={true}
				showsCompass={true}
				rotateEnabled={false}
				style={styles.map}
				customMapStyle={route.params.mapStyle}
			></MapView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		...StyleSheet.absoluteFillObject,
	},
	top: {
		flex: 0.5,
		alignItems: 'center',
		marginTop: '5%',
	},
	map: {
		flex: 3,
	},
	input: {
		textAlign: 'center',
		borderWidth: 1,
		padding: 2,
	},
})

export default Map
