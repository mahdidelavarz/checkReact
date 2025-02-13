import React, { useState } from 'react';
import { Modal, div, button, img } from 'react-native';
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';
import moment from 'moment-jalaali';

import { ic_close } from '../../../../../Components/Images/Images';
import colors from '../../../../../Assets/Styles/Colors';
import styles from './Styles';

let _date;
function DateModal(props) {
    const { isVisible, date, onClose, defaultDate } = props;
    const [onDate, setOnDate] = useState('');

    const onChangeDate = (e) => {
        _date = JSON.stringify(e);
        let d = _date.substring(1, 11);
        date(moment(d, 'jYYYY/jM/jD').format('YYYY-M-D'));
    }

    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="fade"
        >
            <div style={styles.container}>
                <div style={styles.content}>
                    <DatePicker
                        isGregorian={false}
                        onDateChange={(data) => onChangeDate(data)}
                        options={options}
                        selected={getFormatedDate(new Date(), 'jYYYY/jMM/jDD')}
                    />
                </div>
                <button style={styles.btn_close} onPress={onClose}>
                    <img style={styles.btn_close_ic} source={ic_close} />
                </button>
            </div>
        </Modal>
    );
};
export default DateModal;

const options = {
    defaultFont: 'iranyekanwebregular(fanum)',
    headerFont: 'iranyekanwebbold(fanum)',
    selectedTextColor: colors.white,
    textFontSize: 11,
    textHeaderFontSize: 14,
    mainColor: colors.green,
    textHeaderColor: colors.black
};