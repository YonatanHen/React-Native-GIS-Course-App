import 'react-native-gesture-handler'
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Homepage from './components/Homepage'
import NearestCities from './components/NearestCities'

export default function App() {
	const Stack = createStackNavigator()

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName='Home'>
				<Stack.Screen name='Home' component={Homepage} />
				<Stack.Screen name="NearestCities" component={NearestCities} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}
