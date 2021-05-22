import * as React from 'react'
import { Button, View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { StyleSheet } from 'react-native'
import { color } from 'react-native-reanimated'

function Home({ navigation }) {
	return (
		<View styles={styles.menu}>
			<View>
				<Text style={styles.logo}>GIS App</Text>
			</View>
			<Text style={styles.text}>Select a map:</Text>
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
	menu: {
		flex: 1, 
		alignItems: 'center', 
		marginVertical: '2%',
	},
	logo: {
		fontSize: 38,
		fontFamily: 'monospace',
		marginTop: '26%',
		marginRight: '30%',
	},
	button: {
		marginVertical: '2%',
		fontFamily: 'Helvetica',
		width: '30%',
		marginLeft: '35%'
	},
	text: {
		color:'blue',
		fontSize: 20,
		marginRight: '32%',
	}
})

export default Home
