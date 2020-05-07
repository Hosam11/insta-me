import React, { Component } from "react";
import { Text,TextInput, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';

import { styles } from '../style/MyStyle'
import { ScrollView } from "react-native-gesture-handler";
import { Actions } from "react-native-router-flux";

import AsyncStorage from '@react-native-community/async-storage';


export default class UploadPost extends Component {

	state = {
		data: [
	//    	name: "ali",
	//    	id: "uID",
	//		imageURi: "",
	// 		desc: null
		],
		imageURi: null,
		desc: null,
		name: "hossam",
		user: ""
	};

	componentDidMount = () => {
		console.log('UploadPost -- from componentDidMount()')
		this.getData()
		this.getUserData()
	}

	pick = () => {
		ImagePicker.showImagePicker((response) => {
			if (response.didCancel) {
				console.log("User cancelled image picker");
			} else if (response.error) {
				console.log("ImagePicker Error: ", response.error);
			} else if (response.customButton) {
				console.log("User tapped custom button: ", response.customButton);
			} else { // 
				const source = response.uri
				this.setState({
					imageURi: source,
				});
			}
		});
	};


	onClickSubmit = () => {
		// 1- get all in db and recive it in array ##  in componentDidMount func
		// 2- push the new value to that array 
		// 3- save that array in db 
		if (this.state.imageURi == null ||
			this.state.desc == null) {
			// console.log('uri is null')
			Alert.alert("Please enter all fields");
		} else {
			// id for
			let key = Math.random()
				.toString(36)
				.substring(2, 15)
				+ Math.random()
					.toString(36).substring(2, 15);

			let items = this.state.data;
			items.push({
				id: key,
				name: this.state.user.username,
				imageURi: this.state.imageURi,
				desc: this.state.desc,
				isFav: false,				
			});

			this.setState({ data: items })

			this.storeData(this.state.data)

			Alert.alert('Success');
			// Actions.pop();
			Actions.home();
		}
	}


	storeData = async (data) => {
		let posts = JSON.stringify(data)
		console.log('UploadPost --  storeData() posts >>', posts)
		try {
			await AsyncStorage.setItem('posts', posts)
		} catch (e) {
			// saving error
		}
	}

	getData = async () => {
		console.log('UploadPost --  getData() ')

		try {
			const value = await AsyncStorage.getItem('posts')
			if (value !== null) {
				console.log('value >> ', value)
				let posts = JSON.parse(value)
				this.setState({ data: posts })
				console.log('data >> ', this.state.data)
			}
		} catch (e) {
			// error reading value
		}
	}


	getUserData = async () => {
		console.log('UploadPost -- getUserData() ')
		try {
		  const value = await AsyncStorage.getItem('user')
		  if (value !== null) {
			console.log('value >> ', value)
			let user = JSON.parse(value)
			this.setState({  user })
			console.log('data >> ', this.state.user)
		  }
		} catch (e) {
		  // error reading value
		}
	  }



	render() {
		console.log('UploadPost -- render() desc >> ', this.state.desc)
		return (

			<ScrollView style={{ marginLeft: 50, marginRight: 50 }}>
				<Image
					source={{ uri: this.state.imageURi }}
					style={{
						width: "100%",
						height: 200,
					}}
				/>

				<TouchableOpacity style={styles.loginBtn}
					onPress={() => this.pick()} title="Take Picture">
					<Text style={styles.loginText} > Take Photo</Text>
				</TouchableOpacity>

				<TextInput
					style={uploadStyle.input}
					placeholder="description..."
					multiline={true}
					onChangeText={desc => this.setState({ desc })} />


				<TouchableOpacity style={styles.loginBtn}
					onPress={this.onClickSubmit}
				>
					<Text style={styles.loginText} >Submit</Text>
				</TouchableOpacity>

				

			</ScrollView>
		);
	}
}

const uploadStyle = StyleSheet.create({

	input: {
		// width: "80%",
		marginTop: 10,
		marginBottom: 10,
		borderBottomColor: 'red',
		borderBottomWidth: 1,
	},

})