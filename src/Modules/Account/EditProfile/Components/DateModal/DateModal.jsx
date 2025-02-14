import React, { useState } from 'react';
import { Modal } from 'react-native';
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';
import moment from 'moment-jalaali';
import { ic_close } from '../../../../../Components/Images/Images';

function DateModal({ isVisible, date, onClose, defaultDate }) {
    const [onDate, setOnDate] = useState('');

    const onChangeDate = (e) => {
        let formattedDate = moment(e, 'jYYYY/jM/jD').format('YYYY-M-D');
        date(formattedDate);
    };

    return (
        <Modal visible={isVisible} transparent={true} animationType="fade">
            <div className="flex items-center justify-center h-full bg-black/50">
                <div className="w-full h-1/2 bg-white flex justify-center rounded-xl p-4">
                    <DatePicker
                        isGregorian={false}
                        onDateChange={onChangeDate}
                        options={options}
                        selected={getFormatedDate(new Date(), 'jYYYY/jMM/jDD')}
                    />
                </div>
                <button
                    className="absolute bottom-8 w-12 h-12 rounded-full border border-white flex items-center justify-center"
                    onClick={onClose}
                >
                    <img className="w-8 h-8 text-red-500" src={ic_close} alt="Close" />
                </button>
            </div>
        </Modal>
    );
};
export default DateModal;

const options = {
    defaultFont: 'iranyekanwebregular(fanum)',
    headerFont: 'iranyekanwebbold(fanum)',
    selectedTextColor: '#FFFFFF',
    textFontSize: 11,
    textHeaderFontSize: 14,
    mainColor: '#28a745', // Assuming colors.green is this
    textHeaderColor: '#000000',
};
