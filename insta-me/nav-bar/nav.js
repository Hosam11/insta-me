import * as React from 'react';
import { View, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import Profile from '../profile/Profile'
import Posts from '../posts/post'
import Favourite from '../favourite/Favourite'


const initialLayout = { width: Dimensions.get('window').width };

const renderTabBar = props => (
	<TabBar
		{...props}
		indicatorStyle={{ backgroundColor: global.secColor }}
		style={{ backgroundColor: global.primaryColor }}
	/>
);

export default function TabViewScenes() {

	// state = {
	// 	index: 0,
	// 	routes: [
	// 		{ key: 'post', title: 'Posts' },
	// 		{ key: 'fav', title: "Favourite" },
	// 		{ key: 'profile', title: 'Profile' }
	// 	]
	// };

	const [index, setIndex] = React.useState(0);

	const [routes] = React.useState([
		{ key: 'post', title: 'Posts' },
		{ key: 'fav', title: "Favourite" },
		{ key: 'profile', title: 'Profile' }

	]);

	const renderScene = SceneMap({
		post: Posts,
		fav: Favourite,
		profile: Profile
	});

	const renderScene2 = ({ route, jumpTo }) => {
		switch (route.key) {
			case 'post':
				return <Posts focused={jumpTo} />;
			case 'fav':
				return <Favourite focused={jumpTo} />;
			case 'profile':
				return <Profile />;
			default:
				return null;
		}
	};

	return (
		<TabView
			// indicatorStyle={{ backgroundColor: 'yellow', height: 2 }}
			navigationState={{ index, routes }}
			// navigationState={this.state}
			renderScene={renderScene2}
			onIndexChange={setIndex}
			initialLayout={initialLayout}
			renderTabBar={renderTabBar}
		>
		</TabView>
	);
}


const styles = StyleSheet.create({
	scene: {
		flex: 1,
	},
});