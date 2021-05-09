import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import * as Location from 'expo-location'
import MapView from 'react-native-maps'

function NearestCities({ route }) {
	const { radius } = route.params

	return (
		<View>
			<Text>{radius}</Text>
		</View>
	)
}

const styles = StyleSheet.create({})

export default NearestCities
