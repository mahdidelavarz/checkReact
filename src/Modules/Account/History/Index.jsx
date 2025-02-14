import React, { Component } from 'react';
import { StatusBar, Dimensions, BackHandler, ActivityIndicator, Alert } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import NetInfo from '@react-native-community/netinfo';
import moment from 'moment-jalaali';

import CustomText from '../../../Components/CustomText/CustomText';
import { statusHandle } from '../../../Factories/HttpHandler';
import Loading from '../../../Components/Loading/Loading';
import EmptyList from './Components/EmptyList/EmptyList';
import language from '../../../Assets/i18n/i18n';
import Storage from '../../../Factories/Storage';
import Header from './Components/Header/Header';
import Chart from './Components/Chart/Chart';
import { Url } from '../../../Configs/Urls';
import List from './Components/List/List';

const width = Dimensions.get('window').width;
let storage = new Storage();
class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActiveAnalysis: false,
            isResultSearch: false,
            isLoading: false,
            index: 0,
            routes: [
                { key: 'history', title: language('historys_list') },
                { key: 'chart', title: language('chart') },
            ],
            searchValue: '',
            data: [],
        };
        this.filterData = [];
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        this.setState({ isLoading: true });
        storage.get('Token', (token) => {
            NetInfo.fetch().then(state => {
                if (state.isConnected) {
                    this.getResults(token);
                } else {
                    Alert.alert("عدم دسترسی به اینترنت", "لطفا اتصال به اینترنت را چک کنید.",
                        [{ text: "متوجه شدم" }],
                        { cancelable: false }
                    );
                }
            });
        });
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = () => {
        this.props.history.push('/tabBar');
        return true;
    };

    async getResults(token) {
        try {
            const response = await fetch(`${Url.serverUrl}Analysis/results/`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'token ' + token,
                },
            });
            statusHandle(response.status, this.props.history);
            const responseJson = await response.json();
            let sortedCars1 = responseJson.sort((a, b) => new Date(...b.analysis.register_date.substring(0, 10).split('/').reverse()) - 
                new Date(...a.analysis.register_date.substring(0, 10).split('/').reverse()));
            this.setState({
                data: sortedCars1,
                isLoading: false,
            }, () => {
                this.filterData = responseJson;
            });
        } catch (error) {
            this.setState({ isLoading: false });
        }
    }

    handleIndexChange = (index) => {
        this.setState({ index });
    };

    renderTabBar = (props) => (
        <TabBar
            {...props}
            indicatorStyle="bg-dark-green h-px"
            getLabelText={({ route }) => route.title}
            style="bg-green"
            tabStyle="py-2"
            labelStyle="text-white text-xs font-bold"
        />
    );

    searchData(text) {
        if (text.length > 1) {
            this.setState({ isResultSearch: true });
            const newData = this.filterData.filter((item) => {
                const itemData = item.analysis.title ? item.analysis.title.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            this.setState({ data: newData });
        } else {
            this.setState({ isResultSearch: false });
        }
    }

    renderScene = ({ route }) => {
        switch (route.key) {
            case 'history':
                return (
                    <div className="flex-1">
                        {this.state.isActiveAnalysis ? <DoingAnalysis /> : null}
                        {!this.state.isResultSearch ?
                            <div
                                data={this.state.data}
                                className="mb-10"
                                ListEmptyComponent={<EmptyList />}
                                keyExtractor={(index) => index.toString()}
                                renderItem={({ item, index }) => (
                                    <List item={item} route={this.props} />
                                )}
                            />
                            :
                            <div
                                data={this.state.data}
                                className="mb-10"
                                ListEmptyComponent={<EmptyList />}
                                keyExtractor={(index) => index.toString()}
                                renderItem={({ item, index }) => (
                                    <List item={item} route={this.props} />
                                )}
                            />
                        }
                    </div>
                );
            case 'chart':
                var progs = [];
                var nprogs = [];
                var immotiles = [];
                this.state.data.forEach(item => {
                    const prog = { x: item.analysis.register_date.substring(0, 10), y: Math.round(item.result.prog) }
                    const nprog = { x: item.analysis.register_date.substring(0, 10), y: Math.round(item.result.nprog) }
                    const immotile = { x: item.analysis.register_date.substring(0, 10), y: Math.round(item.result.immotile) }
                    progs.push(prog);
                    nprogs.push(nprog);
                    immotiles.push(immotile);
                });
                const data = JSON.stringify({
                    'prog': progs,
                    'nprogs': nprogs,
                    'immotiles': immotiles,
                })
                return <Chart data={data} />;
        }
    }

    render() {
        return (
            <div className="flex-1 bg-white">
                <StatusBar
                    backgroundColor="dark-green"
                    barStyle="light-content"
                />
                <Header
                    func_back={() => this.props.history.push('/tabBar')}
                    event={(text) => this.searchData(text)}
                />
                {!this.state.isLoading ? 
                    <TabView
                        navigationState={this.state}
                        renderScene={this.renderScene}
                        renderTabBar={this.renderTabBar}
                        onIndexChange={this.handleIndexChange}
                        swipeEnabled={false}
                        lazy={true}
                        initialLayout={width}
                    />
                    : <Loading />
                }
            </div>
        );
    }
};
export default History;

function DoingAnalysis() {
    return (
        <div className="w-11/12 self-center flex items-center border border-violet rounded-sm h-15 my-2.5">
            <ActivityIndicator
                className="w-7.5 h-7.5"
                size="small"
                color="green"
            />
            <CustomText className="text-dark-txt text-center text-sm">
                شما یک آنالیز درحال انجام دارید لطفا منتظر بمانید...
            </CustomText>
        </div>
    );
}
