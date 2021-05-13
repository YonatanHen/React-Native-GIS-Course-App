import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import MapView, { ProviderPropType } from 'react-native-maps'

function Homepage({ navigation, route }) {	
	const [radiusText, setRadiusText] = useState('0')


	const radiusTextHandler = (radiusText) => {
		setRadiusText(radiusText)
	}

	return (
		<View style={styles.container}>
			<View style={styles.top}>
				<Text>Set Circle radius from current location</Text>
				<TextInput
					placeholder='Select radius in meters'
					keyboardType='decimal-pad'
					value={radiusText}
					onChangeText={radiusTextHandler}
					style={styles.input}
				/>
				<Button title='Show circle!' style={{ backgroundColor: 'green' }}/>
			</View>
			<MapView
				initialRegion={route.params.location}
				showsUserLocation={true}
				showsCompass={true}
				rotateEnabled={false}
				style={styles.map}
			>
			</MapView>
			<View style={styles.bottom} />
		</View>
	)
} 

Homepage.propTypes = {
	provider: ProviderPropType,
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
	map: {
		flex: 2,
	},
	input: {
		textAlign: 'center',
		borderWidth: 1,
		padding: 2,
	},
})

export default Homepage
