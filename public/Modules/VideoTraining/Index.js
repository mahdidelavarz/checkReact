import React, { useState, useEffect } from 'react';
import { View, Dimensions, BackHandler } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import Video from 'react-native-video';

import SimpleHeader from '../../Components/CustomHeader/SimpleHeader/SimpleHeader';
import languages from '../../Assets/i18n/i18n';
import styles from './Styles';

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

    const renderTabBar = (props: SceneRendererProps & { navigationState: State }) => (
        <TabBar
            {...props}
            indicatorStyle={styles.indicator}
            getLabelText={({ route }) => route.title}
            style={styles.tabbar}
            tabStyle={styles.tab}
            labelStyle={styles.label}
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
        }
    };

    return (
        <View style={styles.scene}>
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
                initialLayout={width}
            />
        </View>
    );
};
export default VideoTraining;

function Screen1() {
    return (
        <View style={[styles.scene, { backgroundColor: 'green' }]}>
        </View>
    )
}

function Screen2() {
    return (
        <View style={[styles.scene, { backgroundColor: 'blue' }]}>
        </View>
    )
}

function Screen3() {
    return (
        <View style={[styles.scene, { backgroundColor: 'orange' }]}>
        </View>
    )
}

function VideoPlayer() {
    return (
        <Video
            // source={require('../../../video.mp4')}
            style={styles.player}
            controls={true}
            resizeMode='stretch'
        />
    )
}