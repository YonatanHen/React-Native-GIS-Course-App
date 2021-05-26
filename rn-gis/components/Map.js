import React, { useState } from 'react'
import { getDistance } from 'geolib'
import { StyleSheet, Text, View} from 'react-native'
import MapView, { Marker } from 'react-native-maps'

function Map({ navigation, route }) {
	const [distance, setDistanceText] = useState('Hold & Drag the marker to see distance')
	const [x, setX] = useState(route.params.location)

	const distanceTextHandler = (markerLocation) => {
		setX(markerLocation)

		var dis = getDistance(
            {latitude: route.params.location.latitude, longitude: route.params.location.longitude},
            {latitude: x.latitude, longitude: x.longitude}
          )

		setDistanceText(`The distance is ${dis} meters`)
	}

	return (
		<View style={styles.container}>
			<MapView
				initialRegion={route.params.location}
				showsUserLocation={true}
				showsCompass={true}
				rotateEnabled={false}
				style={styles.map}
				customMapStyle={route.params.mapStyle}
			>
				<Marker
					draggable
					coordinate={{latitude: x.latitude, longitude: x.longitude}}
					onDrag={(e) => distanceTextHandler(e.nativeEvent.coordinate)}
				/>
				<View style={styles.distanceBox}><Text style={styles.distanceText}>{distance}</Text></View>
				
			</MapView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		...StyleSheet.absoluteFillObject,
	},
	map: {
		flex: 1,
	},
	distanceText: {
		fontWeight: 'bold',
		borderWidth: 3,
		color: 'black',
		fontSize: 16,
		paddingHorizontal: 20,
		paddingTop: 2,
		borderRadius: 10,
		backgroundColor: 'white',
		opacity: 0.75
	},
	distanceBox: {
	flex: 1,
    justifyContent: 'center',
	position: 'absolute',
	alignItems: 'center',
    bottom: '5%',
	width: '100%',	
	}
})

export default Map
