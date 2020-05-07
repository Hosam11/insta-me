import React, { Component } from 'react';
import {  Text, View, Alert, TextInput, TouchableOpacity } 
from 'react-native';
import { Actions } from 'react-native-router-flux'

import { styles } from '../style/MyStyle'

import ApiRequests from '../api/ApiRequests'

var placeholderColor = "#A2BEBC";

export default class Login extends Component {


  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
  }

  onClickLogin = () => {
    console.log('from onClickLogin')

    var bodyLoginForm = {
      username: this.state.username,
      password: this.state.password
    }
    var apiReq = new ApiRequests();

    apiReq.fetchDataLogin(bodyLoginForm, (res) => {
      Actions.home({ user: res.user });
    },
      (err) => {
        Alert.alert(err);
      });
  }

  onClickSignUp = () => {
    console.log('Login from onClickSignUp')
    Actions.signUp();
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>InstaMe</Text>
        <View style={styles.inputView} >
          <TextInput
           autoFocus={true} 
            style={styles.inputText}
            placeholder="Username..."
            placeholderTextColor={placeholderColor}
            onChangeText={text => this.setState({ username: text })} />
        </View>

        <View style={styles.inputView} >
          <TextInput
          
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..."
            placeholderTextColor={placeholderColor}
            onChangeText={text => this.setState({ password: text })} />
        </View>

        <TouchableOpacity style={styles.loginBtn}
          onPress={this.onClickLogin}
        >
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>

        <View style={styles.a_row}>
          <Text style={{ color: placeholderColor }} >Not a member?  </Text>
          <TouchableOpacity
            onPress={this.onClickSignUp}>
            <Text style={{ color: global.secColor }} >Join now  </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}



