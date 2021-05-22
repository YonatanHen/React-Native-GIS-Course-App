import 'react-native-gesture-handler'
import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Map from './components/Map'
import Home from './components/Home'
import * as Location from 'expo-location'
import { Image, StyleSheet, Dimensions } from 'react-native'

const DarkStyle = [
	{
		elementType: 'geometry',
		stylers: [
			{
				color: '#242f3e',
			},
		],
	},
	{
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#746855',
			},
		],
	},
	{
		elementType: 'labels.text.stroke',
		stylers: [
			{
				color: '#242f3e',
			},
		],
	},
	{
		featureType: 'administrative.locality',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#d59563',
			},
		],
	},
	{
		featureType: 'poi',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#d59563',
			},
		],
	},
	{
		featureType: 'poi.park',
		elementType: 'geometry',
		stylers: [
			{
				color: '#263c3f',
			},
		],
	},
	{
		featureType: 'poi.park',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#6b9a76',
			},
		],
	},
	{
		featureType: 'road',
		elementType: 'geometry',
		stylers: [
			{
				color: '#38414e',
			},
		],
	},
	{
		featureType: 'road',
		elementType: 'geometry.stroke',
		stylers: [
			{
				color: '#212a37',
			},
		],
	},
	{
		featureType: 'road',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#9ca5b3',
			},
		],
	},
	{
		featureType: 'road.highway',
		elementType: 'geometry',
		stylers: [
			{
				color: '#746855',
			},
		],
	},
	{
		featureType: 'road.highway',
		elementType: 'geometry.stroke',
		stylers: [
			{
				color: '#1f2835',
			},
		],
	},
	{
		featureType: 'road.highway',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#f3d19c',
			},
		],
	},
	{
		featureType: 'transit',
		elementType: 'geometry',
		stylers: [
			{
				color: '#2f3948',
			},
		],
	},
	{
		featureType: 'transit.station',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#d59563',
			},
		],
	},
	{
		featureType: 'water',
		elementType: 'geometry',
		stylers: [
			{
				color: '#17263c',
			},
		],
	},
	{
		featureType: 'water',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#515c6d',
			},
		],
	},
	{
		featureType: 'water',
		elementType: 'labels.text.stroke',
		stylers: [
			{
				color: '#17263c',
			},
		],
	},
]

const image = { uri: 'https://previews.123rf.com/images/mooltfilm/mooltfilm1808/mooltfilm180800024/112002439-vector-map-of-rome-in-black-and-white-city-map-simple-style.jpg' }
const { width, height } = Dimensions.get('screen')

export default function App() {
	const Stack = createStackNavigator()

	const [errorMsg, setErrorMsg] = useState(null)
	const [location, setLocation] = useState(null)

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
		<NavigationContainer>
			<Image source={image} style={styles.imageTag} />
			<Stack.Navigator
				initialRouteName='Home'
				screenOptions={{
					cardStyle: {
						backgroundColor: 'transparent',
					},
				}}
			>
				<Stack.Screen
					name='Home'
					component={Home}
					options={{ title: 'GIS Course React-Native App' }}
					initialParams={{
						location: location,
					}}
				/>
				<Stack.Screen
					name='Default Map'
					component={Map}
					options={{ title: 'Default Google Map' }}
					initialParams={{
						location: location,
						mapStyle: null,
					}}
				/>
				<Stack.Screen
					name='Dark'
					component={Map}
					options={{ title: 'Dark Map' }}
					initialParams={{
						location: location,
						mapStyle: DarkStyle,
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}

const styles = StyleSheet.create({
	body: {
		backgroundColor: 'blue'
	},
	container: {
		flex: 1,
		flexDirection: 'column',
	},
	image: {
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'center',
	},
	imageTag: {
		width , 
		height, 
		position: 'absolute',
		opacity: 0.3
	}
})
