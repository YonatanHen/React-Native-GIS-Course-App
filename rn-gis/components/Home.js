import React, { useEffect } from 'react'
import { Button, View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { StyleSheet } from 'react-native'
import Orientation from 'react-native-orientation';

function Home({ navigation }) {

	return (
		<View style={{ flex: 1, alignItems: 'center', marginVertical: '10%' }}>
			<Text style={Object.assign( {fontSize: 28}, styles.text)}>React-Native GIS</Text>
			<Text style={Object.assign({fontSize: 20}, styles.text)}>Show distance from current location:</Text>
			<View style={styles.button}>
				<Button
					title='With Default Map'
					onPress={() => navigation.navigate('Default Map')}
                    color = 'grey'
					
				/>
			</View>
			<View style={styles.button}>
				<Button
					title='With Dark Map'
					onPress={() => navigation.navigate('Dark')}
					color= 'black'
				/>
			</View>
			<Text style={Object.assign({fontSize: 20, marginTop: '20%'}, styles.text)}>Bonus - Draw Polygon:</Text>
			<View style={styles.button}>
				<Button
					title='Draw!'
					onPress={() => navigation.navigate('Default Map')}
                    color = '#D3D3D3'
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	button: {
		marginVertical: '2%',
		fontFamily: 'Helvetica',
	},
	text: {
		color: 'white',
		fontWeight: 'bold',
		textShadowColor: 'black',
		textShadowRadius: 20
	}
})

export default Home
