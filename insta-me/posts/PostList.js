import React, { Component } from "react";
import { View, Image, Text, StyleSheet, FlatList } from 'react-native';
import { TouchableOpacity, ScrollView, TouchableHighlight } from "react-native-gesture-handler";
import IconFA from "react-native-vector-icons/FontAwesome";

export default class PostList extends Component {


	constructor(props) {
		super()

		console.log('PostList -- from cons');
		console.log('PostList -- props is >> ', props)
		console.log('type of:  ', typeof props.compData);

	}

	onPressHeart = (item) => {

		var isClicked = item.isFav ? false : true

		console.log('PostList -- Tvar clicked', isClicked)

		this.props.updatePost(this.props.compData, item.id, isClicked)
	}

	forceUpdateHandler() {
		console.log('PostList -- forceUpdateHandler()')
		this.forceUpdate();
	};

	componentDidMount() {
		console.log('PostList -- from componentDidMount()')
	}

	UNSAFE_componentWillUpdate(nextProps, nextState) {
		console.log('PostList -- UNSAFE_componentWillUpdate() propsCopmData >> ', this.props.compData)
	}

	forceUpdateHandler() {
		console.log('Posts -- forceUpdateHandler()')
		this.forceUpdate();
	};

	renderItem = ({ item }) => {
		let heartColor
		if (item.isFav === true) {
			heartColor = global.heartFillColor
		} else {
			heartColor = global.heartEmptyColor
		}
		console.log('PostList -- renderItem() itemIsFav = ', item.isFav)
		return (
			<View
				// contentContainerStyle={{ flexGrow: 1 }}
				style={{
					marginBottom: 25,
					backgroundColor: global.secColor,
					borderRadius: 10,
					overflow: "hidden"
				}}>
				<View style={{
					// padding: 5 ,  
					alignItems: "center",
					justifyContent: "center"
				}} >
					<Image
						style={{
							height: 200,
							width: 400,
						}}
						source={{ uri: item.imageURi }}
					/>
				</View>

				<View style={styles.card_content}>
					<View style={{ marginLeft: 10, width: "70%" }} >
						<Text style={styles.name}>{item.name}</Text>
						<Text style={{ color: "#777", paddingTop: 5 }}>
							{item.desc}
						</Text>
					</View>
					{/* style={{ marginLeft: 100  }} */}
					<TouchableOpacity
						onPress={() => this.onPressHeart(item)}
					>
						<IconFA name="heart" size={50}
							color={heartColor}
						/>
					</TouchableOpacity >
				</View>

			</View>

		)
	}


	render() {
		// console.log('PostList -- render() compData', this.props.compData)
		return (
			<View style={{ flex: 1 }}>
				<FlatList
					data={this.props.compData}
					renderItem={(item) => this.renderItem(item)}
					ItemSeparatorComponent={this.separator}
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: "100%"
	},
	avatar: {
		width: "80%",
		height: "80%",
		// borderRadius: 63,
		// borderWidth: 4,
		borderColor: "white",
		marginBottom: 10,
		marginTop: 60
	},
	name: {
		fontSize: 28,
		color: "#696969",
		fontWeight: "600"
	},
	card_content: {
		width: "100%",
		height: 100,
		marginTop: 30,
		// flex: 1,
		flexDirection: 'row',
		// justifyContent: 'center'
	},
	separator: {
		borderBottomColor: '#d1d0d4',
		borderBottomWidth: 1
	}
})