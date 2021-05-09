import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import * as Location from 'expo-location'
import MapView from 'react-native-maps'

function Homepage({ navigation }) {
	const [location, setLocation] = useState(null)
	const [errorMsg, setErrorMsg] = useState(null)
    const [radiusText, setRadiusText] = useState('')

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

    const radiusTextHandler = (radiusText) => {
        setRadiusText(radiusText)
    }

	return (
		<View style={styles.container}>
			<View style={styles.top}>
				<Text style={styles.header}>
					GIS Course App
				</Text>
				<TextInput
					placeholder='Select radius in meters'
					keyboardType='decimal-pad'
                    value={radiusText}
                    onChangeText={radiusTextHandler}
                    style={styles.input}
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
					onPress={() => navigation.navigate('NearestCities', {
                        radius: radiusText
                    })}
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
    input: {
        textAlign: 'center'
    }
})

export default Homepage
