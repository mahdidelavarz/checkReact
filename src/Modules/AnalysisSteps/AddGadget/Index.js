import React, { Component } from 'react';
import { div, img, button, BackHandler } from 'react-native';

import SimpleHeader from '../../../Components/CustomHeader/SimpleHeader/SimpleHeader';
import { ic_scan, gadgetScan } from '../../../Components/Images/Images';
import CustomText from '../../../Components/CustomText/CustomText';
import styles from './Styles';

class AddGadget extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = () => {
        this.props.history.goBack();
        return true;
    }

    render() {
        return (
            <div style={styles.container}>
                <SimpleHeader
                    func={() => this.props.history.push('/secondStep')}
                    title={'اضافه کردن گجت'}
                />
                <div style={styles.content}>
                    <div style={styles.top}>
                        <img style={styles.top_img} source={gadgetScan} />
                        <CustomText style={styles.top_txt}>

                        </CustomText>
                    </div>
                    <div style={styles.bottom}>
                        <button activeOpacity={0.7} style={styles.bottom_btn} onPress={() => this.props.history.push('/qRCodeScan')}>
                            <CustomText style={styles.bottom_btn_txt}>
                                اسکن
                            </CustomText>
                            <img style={styles.bottom_btn_ic} source={ic_scan} />
                        </button>
                    </div>
                </div>
            </div>
        );
    }
};
export default AddGadget;