import React, { Component } from "react";

import TabViewScenes from '../nav-bar/nav'
import AsyncStorage from '@react-native-community/async-storage';



export default class Home extends Component {

    constructor(props) {
        super();
        console.log('Home -- user >> ', props.user)
       this.storeUserData(props.user)
    }

    storeUserData = async (data) => {
		let user = JSON.stringify(data)
		console.log('Home -- storeUserData() posts >>', user)
		try {
			await AsyncStorage.setItem('user', user)
		} catch (e) {
		}
	}

    render() {
        console.log('Home --  render()')
        return (
            <TabViewScenes></TabViewScenes>
        )
    }
}