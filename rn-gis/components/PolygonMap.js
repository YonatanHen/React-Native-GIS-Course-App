import React, { Component } from 'react'
import {
	StyleSheet,
	View,
	Text,
	Dimensions,
	TouchableOpacity,
} from 'react-native'

import MapView, {
	MAP_TYPES,
	Polygon,
	ProviderPropType,
	PROVIDER_GOOGLE,
} from 'react-native-maps'

const { width, height } = Dimensions.get('window')

const ASPECT_RATIO = width / height
const LATITUDE = 31.801447
const LONGITUDE = 34.643497
const LATITUDE_DELTA = 0.922
const LONGITUDE_DELTA = 0.0421
let id = 0

class PolygonMap extends Component {
	constructor(props) {
		super(props)
		this.state = {
			region: {
				latitude: LATITUDE,
				longitude: LONGITUDE,
				latitudeDelta: LATITUDE_DELTA,
				longitudeDelta: LONGITUDE_DELTA,
			},
			polygons: [],
			editing: null,
			creatingHole: false,
		}
	}

	finish() {
		const { polygons, editing } = this.state
		this.setState({
			polygons: [...polygons, editing],
			editing: null,
			creatingHole: false,
		})
	}

	clear = () => {
		this.setState({
			polygons: [],
			editing: null,
			creatingHole: false,
		})
	}

	createHole() {
		const { editing, creatingHole } = this.state
		if (!creatingHole) {
			this.setState({
				creatingHole: true,
				editing: {
					...editing,
					holes: [...editing.holes, []],
				},
			})
		} else {
			const holes = [...editing.holes]
			if (holes[holes.length - 1].length === 0) {
				holes.pop()
				this.setState({
					editing: {
						...editing,
						holes,
					},
				})
			}
			this.setState({ creatingHole: false })
		}
	}

	onPress(e) {
		const { editing, creatingHole } = this.state
		if (!editing) {
			this.setState({
				editing: {
					id: id++,
					coordinates: [e.nativeEvent.coordinate],
					holes: [],
				},
			})
		} else if (!creatingHole) {
			this.setState({
				editing: {
					...editing,
					coordinates: [...editing.coordinates, e.nativeEvent.coordinate],
				},
			})
		} else {
			const holes = [...editing.holes]
			holes[holes.length - 1] = [
				...holes[holes.length - 1],
				e.nativeEvent.coordinate,
			]
			this.setState({
				editing: {
					...editing,
					id: id++, // keep incrementing id to trigger display refresh
					coordinates: [...editing.coordinates],
					holes,
				},
			})
		}
	}

	render() {
		const mapOptions = {
			scrollEnabled: true,
		}

		if (this.state.editing) {
			mapOptions.scrollEnabled = false
			mapOptions.onPanDrag = (e) => this.onPress(e)
		}

		return (
			<View style={styles.container}>
				<MapView
					provider={PROVIDER_GOOGLE}
					style={styles.map}
					mapType={MAP_TYPES.STANDARD}
					initialRegion={this.state.region}
					onPress={(e) => this.onPress(e)}
					{...mapOptions}
				>
					{this.state.polygons.map((polygon) => (
						<Polygon
							key={polygon.id}
							coordinates={polygon.coordinates}
							holes={polygon.holes}
							strokeColor='#F00'
							fillColor='rgba(255,0,0,0.5)'
							strokeWidth={1}
						/>
					))}
					{this.state.editing && (
						<Polygon
							key={this.state.editing.id}
							coordinates={this.state.editing.coordinates}
							holes={this.state.editing.holes}
							strokeColor='#000'
							fillColor='rgba(255,0,0,0.5)'
							strokeWidth={1}
						/>
					)}
				</MapView>

				<View style={styles.buttonContainer}>
					{this.state.editing && (
						<TouchableOpacity
							onPress={() => this.createHole()}
							style={[styles.bubble, styles.button]}
						>
							<Text>
								{this.state.creatingHole ? 'Finish Hole' : 'Create Hole'}
							</Text>
						</TouchableOpacity>
					)}
					{this.state.editing && (
						<TouchableOpacity
							onPress={() => this.finish()}
							style={[styles.bubble, styles.button]}
						>
							<Text>Finish</Text>
						</TouchableOpacity>
					)}
				</View>
        {this.state.editing && (
				<TouchableOpacity
					onPress={() => this.clear()}
					style={[styles.bubble, styles.button]}
				>
					<Text>Clear</Text>
				</TouchableOpacity>)}

				<View>
					<Text style={styles.instructionsText}>
						Instructions:{'\n'}Tap on the screen to start, then drag the finger / tap
						again to draw polygon
					</Text>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		...StyleSheet.absoluteFillObject,
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	map: {
		...StyleSheet.absoluteFillObject,
	},
	bubble: {
		backgroundColor: 'rgba(255,255,255,0.7)',
		paddingHorizontal: 18,
		paddingVertical: 12,
		borderRadius: 20,
	},
	latlng: {
		width: 200,
		alignItems: 'stretch',
	},
	button: {
		width: 80,
		paddingHorizontal: 12,
		alignItems: 'center',
		marginHorizontal: 10,
	},
	buttonContainer: {
		flexDirection: 'row',
		marginVertical: 20,
		backgroundColor: 'transparent',
	},
  instructionsText: {
  fontWeight: 'bold',
  borderWidth: 3,
  color: 'black',
  fontSize: 16,
  paddingHorizontal: 20,
  paddingTop: 2,
  borderRadius: 10,
  backgroundColor: 'white',
  opacity: 0.75,
  marginTop: '2%'
},
})

export default PolygonMap
