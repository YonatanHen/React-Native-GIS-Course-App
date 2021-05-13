import 'react-native-gesture-handler'
import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Homepage from './components/Homepage'
import * as Location from 'expo-location'

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
			<Stack.Navigator initialRouteName='Home'>
				<Stack.Screen
					name='Home'
					component={Homepage}
					options={{ title: 'GIS Course React-Native App' }}
					initialParams={{ location: location }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}
