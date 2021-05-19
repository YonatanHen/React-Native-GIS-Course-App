import * as React from 'react'
import { Button, View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { StyleSheet } from 'react-native'
import { color } from 'react-native-reanimated'

function Home({ navigation }) {
	return (
		<View style={{ flex: 1, alignItems: 'center', marginVertical: '10%' }}>
			<Text>Select a map:</Text>
			<View style={styles.button}>
				<Button
					title='Google Map'
					onPress={() => navigation.navigate('Default Map')}
                    color = '#D3D3D3'
				/>
			</View>
			<View style={styles.button}>
				<Button
					title='Dark Map'
					onPress={() => navigation.navigate('Dark')}
					color= 'black'
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
})

export default Home
