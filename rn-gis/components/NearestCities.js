import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import axios from 'axios'

function NearestCities({ route }) {
	const { radius } = route.params
	const data = undefined

	useEffect(() => {
	})

	return (
		<View>
			<Text>{radius}</Text>
		</View>
	)
}

const styles = StyleSheet.create({})

export default NearestCities
