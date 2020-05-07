import React, { Component } from "react";
import { View, Image, InteractionManager, Text, StyleSheet, FlatList } from 'react-native';
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import PostList from './PostList'

import AsyncStorage from '@react-native-community/async-storage';
import { FloatingAction } from "react-native-floating-action";
import { Actions } from "react-native-router-flux";



const actions = [
	{
		text: "Upload Post",
		icon: require("../assets/upload.png"),
		name: "upload post",
		position: 2
	},
]

export default class Posts extends Component {

	constructor(props) {
		super();

		//console.log('Posts -- cons() props >>  ' , props)
		this.state = {
			data: [
				//    name: "ali",
				//    id: "uID",
				//		imageURi: "",
				// 		desc: null,
				// isFav: false,
				//		colorHeat: "#FFFFFF"
			],
			value: "",
		}
	}

	componentDidMount() {
		console.log('Posts -- from componentDidMount()')
		this.getData();
	}



	componentDidUpdate(prevProps, prevState, snapshot) {
		console.log('Posts -- componentDidUpdate()')
	}

	UNSAFE_componentWillUpdate(nextProps, nextState) {
		console.log('Posts -- UNSAFE_componentWillUpdate()')
	}

	forceUpdateHandler() {
		console.log('Posts -- forceUpdateHandler()')
		this.forceUpdate();
	};

	getData = async () => {
		console.log('Posts -- from getData()')
		try {
			const value = await AsyncStorage.getItem('posts')
			if (value !== null) {
				console.log('Posts -- getData() value >> ', value)
				let posts = JSON.parse(value)
				this.setState({ data: posts })
				console.log('Posts -- getData() data >> ', this.state.data)
			}
		} catch (e) {
			// error reading value
		}
	}

	storeData = async (data) => {
		let posts = JSON.stringify(data)
		try {
			await AsyncStorage.setItem('posts', posts)
		} catch (e) {
			// saving error
		}
	}

	// id: to get a post from data -- value of is fav
	updateDataWithFav = (postsArr, postId, isFav) => {
		console.log('updateDataWithFav() isFav >> ', isFav)

		var data = this.state.data

		let postIndex = data.findIndex((obj => obj.id == postId));

		data[postIndex].isFav = isFav

		// this.setState({ clicked: true })
		this.setState({ data })

		this.storeData(this.state.data)
		// this for when i click the heart button then after go to favourite tab 
		// i can see the list of favourites post
		// if that line dose not exist will be empty in favourits tab
		Actions.home()
	}

	clickUpload = () => {
		console.log('Post -- clickUpload()')
		Actions.uploadPost();
	}

	render() {
		return (
			<View style={{ flex: 1 }} >
				<PostList compData={this.state.data}
					updatePost={this.updateDataWithFav}
				/>
				<FloatingAction
					color={global.primaryColor}
					style={{ flex: 1 }}
					actions={actions}
					onPressItem={this.clickUpload}
				/>
			</View>
		);
	}
}