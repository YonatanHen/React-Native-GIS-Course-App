import React, { useEffect } from 'react'
import { Button, View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { StyleSheet, Dimensions } from 'react-native'
import Orientation from 'react-native-orientation';
import FitImage from 'react-native-fit-image';

const { width, height } = Dimensions.get('screen')
const image = { uri: 'https://previews.123rf.com/images/mooltfilm/mooltfilm1808/mooltfilm180800024/112002439-vector-map-of-rome-in-black-and-white-city-map-simple-style.jpg' }

function Home({ navigation }) {

	return (
		<View style={{ flex: 1, alignItems: 'center', marginVertical: '10%' }}>
			<FitImage source={image} style={{ width , height, position: 'absolute' }} />
			<Text style={[{fontSize: 28}, styles.text]}>React-Native GIS</Text>
			<Text style={[{fontSize: 20}, styles.text]}>Show distance from current location:</Text>
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
			<Text style={Object.assign({fontSize: 20, marginTop: '20%'}, styles.text)}>Non-Location Feature - Draw Polygon:</Text>
			<View style={styles.button}>
				<Button
					title='Draw!'
					onPress={() => navigation.navigate('Polygon')}
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
