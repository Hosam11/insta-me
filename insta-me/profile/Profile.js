import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ProgressBarAndroid
} from 'react-native';

import ImagePicker from 'react-native-image-picker';

import AsyncStorage from '@react-native-community/async-storage';

import { styles } from '../style/MyStyle'
import { Actions } from 'react-native-router-flux';
import { ScrollView } from 'react-native-gesture-handler';


export default class Profile extends Component {

  state = { imageURi: null, user: "" };

  pick = () => {
    ImagePicker.showImagePicker((response) => {

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else { // 
        // object of image :  { uri: response.uri }
        const source = response.uri
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          imageURi: source,
        });
        this.storeProfileImageData(this.state.imageURi)
      }
    });
  };

  componentDidMount() {
    this.getUserData()
    this.getProfileImageData()
  }

  // get user details to display it
  getUserData = async () => {
    console.log('Profile -- getData ()posts ')

    try {
      const value = await AsyncStorage.getItem('user')
      if (value !== null) {
        console.log('value >> ', value)
        let user = JSON.parse(value)
        this.setState({ user })
        console.log('data >> ', this.state.user)
      }
    } catch (e) {
      console.log(e)
    }
  }

  storeProfileImageData = async (data) => {
    let userImage = JSON.stringify(data)
    console.log('Profile -- storeProfileImageData() userImage >>', userImage)
    try {
      await AsyncStorage.setItem('userImg', userImage)
    } catch (e) {
      console.log(e)
    }
  }

  getProfileImageData = async () => {
    console.log('Profile -- >> getProfileImageData () ')

    try {
      const value = await AsyncStorage.getItem('userImg')
      if (value !== null) {
        console.log('value >> ', value)
        let imageURi = JSON.parse(value)
        this.setState({ imageURi })
        console.log('data >> ', this.state.imageURi)
      }
    } catch (e) {
      console.log(e)
    }
  }

  onClickLogout = () => {
    Actions.login()
  }

  render() {
    return (
      // style={{ marginLeft: 50, marginRight: 50 }}
      <ScrollView >

        <View style={profileStyles.container}>
          <View style={profileStyles.header}></View>
          <TouchableOpacity
            style={profileStyles.image}
            onPress={() => this.pick()} >

            <Image
              style={profileStyles.avatar}
              source={{ uri: this.state.imageURi }}
            >
            </Image>
          </TouchableOpacity>

          <View style={profileStyles.body}>
            <View style={profileStyles.bodyContent}>
              <Text style={profileStyles.name}>{this.state.user.username}</Text>
              <Text style={profileStyles.info}>{this.state.user.email}</Text>
              <Text style={profileStyles.gender}>{this.state.user.gender}</Text>
              <TouchableOpacity style={profileStyles.logout}
                onPress={this.onClickLogout}
              >
                <Text style={styles.loginText} >Log out</Text>
              </TouchableOpacity>

            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const profileStyles = StyleSheet.create({
  header: {
    backgroundColor: global.primaryColor,
    height: 110,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 25,
    marginTop: 55,

  },
  image: {
    alignSelf: 'center',
    position: 'absolute',
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600"
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10
  },
  gender: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  },

  logout: {
    width: "40%",
    backgroundColor: global.secColor,
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  }

});
