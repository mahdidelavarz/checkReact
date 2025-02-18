import React, { Component } from 'react';
import { BackHandler } from 'react-native';

import SimpleHeader from '../../Components/CustomHeader/SimpleHeader/SimpleHeader';
import LoadingModal from '../../Components/CustomModal/LoadingModal/LoadingModal';
import CustomText from '../../Components/CustomText/CustomText';
import { empty_image } from '../../Components/Images/Images';
import Loading from '../../Components/Loading/Loading';
import language from '../../Assets/i18n/i18n';
import Storage from '../../Factories/Storage';
import { CDN_Url } from '../../Configs/Urls';

let storage = new Storage();

class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoadingBtn: false,
            isLoading: false,
            data: []
        };
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        this.getCategories();
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = () => {
        this.props.history.push("/tabBar");
        return true;
    }

    getCategories() {
        this.setState({ isLoading: true });
        storage.get("categories.json", data => {
            this.setState({
                data: JSON.parse(data),
                isLoading: false
            });
        });
    }

    onPressItem(short_name) {
        this.setState({ isLoadingBtn: true });
        storage.get("centers.json", data => {
            let temp = JSON.parse(data);
            let _data = temp.filter(item => item.category === short_name);
            storage.set("Select_Centers", JSON.stringify(_data));
            this.setState({ isLoadingBtn: false });
            this.props.history.push(`/treatmentCenters/${short_name}`);
        });
    }

    render() {
        return (
            <div className="flex flex-col h-full bg-white">
                <SimpleHeader
                    func={() => this.props.history.push('/tabBar')}
                    title={language('categories')}
                />
                {!this.state.isLoading ? (
                    <div className="flex-1 overflow-auto">
                        {this.state.data.map((item, index) => (
                            <button
                                key={index}
                                className="mx-1 mt-2 h-[50vw] flex flex-col items-center mb-1 rounded-md"
                                onClick={() => this.onPressItem(item.short_name)}
                            >
                                {item.logo_image ? (
                                    <img
                                        className="w-full h-full rounded-md object-cover"
                                        src={`${CDN_Url.serverUrl + CDN_Url.categoryLogoDirUrl + item.logo_image}`}
                                        alt={item.title}
                                    />
                                ) : (
                                    <img className="w-[170px] h-[170px] rounded-md object-cover" src={empty_image} alt="Empty" />
                                )}
                                <div className="bg-black/40 absolute bottom-0 left-0 right-0 h-10 flex items-center justify-center rounded-b-md">
                                    <CustomText className="text-white text-sm text-center font-bold">
                                        {item.title}
                                    </CustomText>
                                </div>
                            </button>
                        ))}
                    </div>
                ) : (
                    <Loading />
                )}
                <LoadingModal isVisible={this.state.isLoadingBtn} />
            </div>
        );
    }
}

export default Categories;
