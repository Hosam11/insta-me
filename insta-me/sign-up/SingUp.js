import React, { Component } from 'react';
import { StyleSheet, Alert, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux'
import { styles } from '../style/MyStyle'
import { Picker } from '@react-native-community/picker'

import ApiRequests from '../api/ApiRequests'

var placeholderColor = "#A2BEBC";

export default class SingUp extends Component {

	constructor() {
		super();
		this.state = {
			username: '',
			email: '',
			password: '',
			gender: 'Male',
		};
	}

	onClickSubmit = () => {
		// Actions.signUp();
		var bodySignUpForm = {
			username: this.state.username,
			email: this.state.email,
			password: this.state.password,
			gender: this.state.gender
		}
		var apiReq = new ApiRequests();

		apiReq.fetchDataSignUp(bodySignUpForm, (res) => {
			console.log('SignUp fetchDataSignUp res >> ', res)
			Alert.alert(res.message);
			Actions.pop();
		},
			(err) => {
				Alert.alert(err);
			});
	}


	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.logo}>InstaMe</Text>
				<View style={styles.inputView} >
					<TextInput
						style={styles.inputText}
						placeholder="Username..."
						placeholderTextColor={placeholderColor}
						onChangeText={text => this.setState({ username: text })} />
				</View>
				<View style={styles.inputView} >
					<TextInput

						style={styles.inputText}
						placeholder="Email..."
						placeholderTextColor={placeholderColor}
						onChangeText={text => this.setState({ email: text })} />
				</View>
				<View style={styles.inputView} >
					<TextInput
						secureTextEntry
						style={styles.inputText}
						placeholder="Password..."
						placeholderTextColor={placeholderColor}
						onChangeText={text => this.setState({ password: text })} />
				</View>

				<Picker
					selectedValue={this.state.gender}
					style={style.picker}
					mode="dropdown"
					onValueChange={(itemValue, itemIndex) =>
						this.setState({ gender: itemValue })
					}>
					<Picker.Item label="Male" value="Male" />
					<Picker.Item label="Female" value="Female" />
				</Picker>

				<TouchableOpacity
				onPress = {this.onClickSubmit}
				 style={styles.loginBtn}>
					<Text style={styles.loginText}>Submit</Text>
				</TouchableOpacity>

			</View>
		);
	}
}

const style = StyleSheet.create({
	inputView: {
		width: "80%",
		backgroundColor: "#465881",
		borderRadius: 25,
		height: 50,
		marginBottom: 20,
		justifyContent: "center",
		padding: 20
	},

	picker: {
		borderRadius: 25,
		justifyContent: "center",
		width: "80%",
		color: 'white',
		justifyContent: 'center',
	}
})