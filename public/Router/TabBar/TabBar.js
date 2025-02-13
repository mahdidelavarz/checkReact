import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, Image, BackHandler } from 'react-native';
import { TabView, SceneRendererProps } from 'react-native-tab-view';
import Animated from 'react-native-reanimated';
import { observer } from 'mobx-react';

// screens
import Profile from '../../Modules/Account/Profile/Index';
import Home from '../../Modules/Home/Index';

import SimpleModal from '../../Components/CustomModal/SimpleModal/SimpleModal';
import { ic_user, ic_home, ic_exit_app } from '../../Components/Images/Images';
import CustomText from '../../Components/CustomText/CustomText';
import language from '../../Assets/i18n/i18n';
import Store from '../../Store/Store';
import styles from './Styles';

class TabBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: Store.tabBarIndex,
            routes: [
                { key: 'home', title: language('home'), icon: ic_home },
                { key: 'account', title: language('profile'), icon: ic_user },
            ],
            isModalExit: false
        };
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = () => {
        if (this.state.index == 0) {
            this.setState({ isModalExit: true });
        } else {
            this.setState({ index: 0 });
            Store.decrementTabBar();
        }
        return true;
    }

    handleIndexChange = (index: number) => {
        this.setState({ index });
        if (index == 0) {
            Store.decrementTabBar();
        } else {
            Store.incrementTabBar();
        }
    }

    renderItem = ({ navigationState, position, }: { navigationState: State; position: Animated.Node<number>; }) => ({ route, index }:
        { route: Route; index: number }) => {
        const inputRange = navigationState.routes.map((_, i) => i);
        const activeOpacity = Animated.interpolate(position, { inputRange, outputRange: inputRange.map((i: number) => (i === index ? 1 : 0)) });
        const inactiveOpacity = Animated.interpolate(position, { inputRange, outputRange: inputRange.map((i: number) => (i === index ? 0 : 1)) });
        return (
            <View style={styles.tab}>
                <Animated.View style={[styles.item, { opacity: inactiveOpacity }]}>
                    <Image source={route.icon} style={[styles.icon, styles.inactive]} />
                    <CustomText style={[styles.label, styles.inactiveLabel]}>
                        {route.title}
                    </CustomText>
                </Animated.View>
                <Animated.View style={[styles.item, styles.activeItem, { opacity: activeOpacity }]}>
                    <Image source={route.icon} style={[styles.icon, styles.active]} />
                    <CustomText style={[styles.label, styles.activeLabel]}>
                        {route.title}
                    </CustomText>
                </Animated.View>
            </View>
        );
    };

    renderTabBar = (props: SceneRendererProps & { navigationState: State }) => (
        <View style={styles.tabbar}>
            {props.navigationState.routes.map((route: Route, index: number) => {
                return (
                    <TouchableWithoutFeedback key={route.key} onPress={() => props.jumpTo(route.key)}>
                        {this.renderItem(props)({ route, index })}
                    </TouchableWithoutFeedback>
                );
            })}
        </View>
    );

    renderScene = ({ route }) => {
        switch (route.key) {
            case 'home':
                return <Home route={this.props} />;
            case 'account':
                return <Profile route={this.props} />;
            default:
                return null;
        }
    };

    onPressExitToApp = () => {
        this.setState({ isModalExit: false });
        BackHandler.exitApp();
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <TabView
                    navigationState={this.state}
                    renderScene={this.renderScene}
                    renderTabBar={this.renderTabBar}
                    tabBarPosition="bottom"
                    onIndexChange={this.handleIndexChange}
                    swipeEnabled={false}
                    lazy={true}
                />
                <SimpleModal
                    isVisible={this.state.isModalExit}
                    img={ic_exit_app}
                    title={'خروج'}
                    description={'آیا مایلید از برنامه خارج شوید؟'}
                    right_func={this.onPressExitToApp}
                    left_func={() => this.setState({ isModalExit: false })}
                />
            </View>
        );
    }
};
export default TabBar;