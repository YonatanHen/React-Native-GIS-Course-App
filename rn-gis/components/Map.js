import React, { useEffect, useState } from 'react'
import { getDistance } from 'geolib'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import MapView, { ProviderPropType, Marker, OverlayComponent } from 'react-native-maps'

function Map({ navigation, route }) {
	const [distance, setDistanceText] = useState('Drag the marker to see distance')
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
					onDragEnd={(e) => distanceTextHandler(e.nativeEvent.coordinate)}
				/>
				<View style={styles.distanceBox}><Text style={styles.distanceText}>{distance}</Text></View>
				
			</MapView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		...StyleSheet.absoluteFillObject,
	},
	map: {
		flex: 1,
	},
	distanceText: {
		fontWeight: 'bold'
	},
	distanceBox: {
	flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36,
	}
})

export default Map
