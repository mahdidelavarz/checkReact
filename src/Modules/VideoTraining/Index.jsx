import React, { useState, useEffect } from 'react';
import { Dimensions, BackHandler, View, Text } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import Video from 'react-native-video';

import SimpleHeader from '../../Components/CustomHeader/SimpleHeader/SimpleHeader';
import languages from '../../Assets/i18n/i18n';

const width = Dimensions.get('window').width;

function VideoTraining(props) {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: '1', title: languages('shopping_training') },
        { key: '2', title: languages('analysis_training') },
        { key: '3', title: languages('training_payment') },
    ]);

    useEffect(() => {
        const backAction = () => {
            props.history.goBack();
            return true;
        };
        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
        return () => backHandler.remove();
    }, []);

    const renderTabBar = (props) => (
        <TabBar
            {...props}
            indicatorStyle="bg-green-500 h-0.5"
            getLabelText={({ route }) => route.title}
            style="bg-white"
            tabStyle="py-2"
            labelStyle="text-green-500 text-sm font-bold"
        />
    );

    const renderScene = ({ route }) => {
        switch (route.key) {
            case '1':
                return <Screen1 />;
            case '2':
                return <Screen2 />;
            case '3':
                return <Screen3 />;
            default:
                return null;
        }
    };

    return (
        <View className="flex-1">
            <SimpleHeader
                func={() => props.history.push('/tabBar')}
                title={languages('video_training')}
            />
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                renderTabBar={renderTabBar}
                onIndexChange={setIndex}
                swipeEnabled={false}
                lazy={true}
                initialLayout={{ width }}
            />
        </View>
    );
}
export default VideoTraining;

function Screen1() {
    return (
        <View className="flex-1 bg-green-500">
            <Text className="text-white">Screen 1 Content</Text>
        </View>
    );
}

function Screen2() {
    return (
        <View className="flex-1 bg-blue-500">
            <Text className="text-white">Screen 2 Content</Text>
        </View>
    );
}

function Screen3() {
    return (
        <View className="flex-1 bg-orange-500">
            <Text className="text-white">Screen 3 Content</Text>
        </View>
    );
}

function VideoPlayer() {
    return (
        <Video
            // source={require('../../../video.mp4')}
            className="absolute inset-0"
            controls={true}
            resizeMode='stretch'
        />
    );
}
