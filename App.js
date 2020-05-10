import * as React from 'react';
import { Router, Stack, Scene, Actions, ActionConst } from 'react-native-router-flux';

import Login from './insta-me/login/Login'
import SignUp from './insta-me/sign-up/SingUp'
import Home from './insta-me/home/Home'

import UploadPost from './insta-me/posts/UploadPost'

import AsyncStorage from '@react-native-community/async-storage';
import Posts from './insta-me/posts/post';


export default class App extends React.Component {


  constructor() {
    super();
    // var post = Posts()
    // var clearAllFunc = post.postsClearAll
  }
  clearAll = async () => {
    try {
      await AsyncStorage.removeItem("posts");
      Actions.home()
    } catch (e) {
      console.log(e)
    }
    console.log('Done.')
  }

  render() {
    console.log('App >> class')
    return (
      <Router navigationBarStyle={{ backgroundColor: global.primaryColor }} >
        <Stack key="root"  >
          <Scene key="login"  initial={true} type={ActionConst.RESET} component={Login} hideNavBar={true} />
          <Scene key="signUp" component={SignUp} hideNavBar={true} />
          <Scene key="home"  type={ActionConst.RESET} component={Home}  title="Posts"
            onRight={this.clearAll} rightTitle="delete all posts" />
          <Scene key="uploadPost" component={UploadPost} title="Upload Post"
          />
        </Stack>
      </Router>
    );
  }

}
