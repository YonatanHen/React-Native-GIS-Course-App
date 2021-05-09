import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import * as Location from 'expo-location'
import MapView from 'react-native-maps'

function Homepage() {
	const [location, setLocation] = useState(null)
	const [errorMsg, setErrorMsg] = useState(null)
	const [citiesNearLocationMode, setCitiesNearLocationMode] = useState(false)

	useEffect(() => {
		;(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync()
			if (status !== 'granted') {
				setErrorMsg('Permission to access location was denied')
				return
			}

			let location = await Location.getCurrentPositionAsync({})
			setLocation({
				latitude: location.coords.latitude,
				longitude: location.coords.longitude,
				latitudeDelta: 0.922,
				longitudeDelta: 0.0421,
			})
		})()
	}, [])

	let text = 'Waiting..'
	if (errorMsg) {
		text = errorMsg
	} else if (location) {
		text = JSON.stringify(location)
	}

	return (
		<View style={styles.container}>
			<View style={styles.top}>
				<Text style={styles.header}>
					GIS Course App - Check nearest locations
				</Text>
				<TextInput
					placeholder='Select radius in meters'
					keyboardType='decimal-pad'
				/>
			</View>
			<MapView
				initialRegion={location}
				showsUserLocation={true}
				showsCompass={true}
				rotateEnabled={false}
				style={styles.map}
			/>
			<View style={styles.bottom}>
				<Button
					title='Check for cities near location'
					// onPress={() => setCitiesNearLocationMode(true)}
				/>
				<Button title='something else?' />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	top: {
		flex: 0.5,
		alignItems: 'center',
		marginTop: '5%',
	},
	bottom: {
		flex: 1,
	},
	header: {
		textAlign: 'center',
	},
	map: {
		flex: 4,
	},
})

export default Homepage