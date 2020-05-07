import React, { Component } from "react";
import { View} from 'react-native';
import PostList from '../posts/PostList'

import AsyncStorage from '@react-native-community/async-storage';
import { Actions } from "react-native-router-flux";



export default class Favourite extends Component {

	constructor(props) {
		super()

		console.log('#Favourite#  props',  props )
		this.state = {
			data: [
				//    name: "ali",
				//    id: "uID",
				//		imageURi: "",
				// 		desc: null,
				// isFav: false,
				//		colorHeat: "#FFFFFF"
			],
			favPost: [

			],
		}
	}

	componentDidMount() {
		console.log('Favourite -- componentDidMount()')
		this.getData()
	}

	getFavPost() {
		var favPost = []
		this.state.data.map((post) => {
			if (post.isFav == true) {
				console.log('[Favourite] -- getFavPost() IF postIsFav is >> ', post.isFav)
				favPost.push(post)
			}
		})

		this.setState({ favPost })
		console.log('[Favourite]  after finshed >> ', this.state.favPost)

	}

	getData = async () => {
		console.log('Favourite -- from getData()')
		try {
			const value = await AsyncStorage.getItem('posts')
			if (value !== null) {
				let posts = JSON.parse(value)
				this.setState({ data: posts })
			}
			this.getFavPost()
		} catch (e) {
			console.log(e)
		}
	}

	storeData = async (data) => {
		let posts = JSON.stringify(data)
		try {
			await AsyncStorage.setItem('posts', posts)
		} catch (e) {
			
		}
	}

	updateDataWithFav = (postsArr, postId, isFav) => {
	}

	updateDataWithFav = (postsArr, postId, isFav) => {
		console.log('Favourite -- updateDataWithFav()')

		var data = this.state.data

		let postIndex = data.findIndex((obj => obj.id == postId));

		data[postIndex].isFav = isFav
		this.setState({ data })

		this.storeData(this.state.data)
		Actions.home()
	}

	render() {
		console.log('Favourite -- render() favPost >>', this.state.favPost)
		return (
			<View style={{ flex: 1 }} >
				<PostList
					compData={this.state.favPost}
					updatePost={this.updateDataWithFav}
				/>
			</View>
		);
	}

}