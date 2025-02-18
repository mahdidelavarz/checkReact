import React from 'react';
import { Modal, Image, TouchableOpacity } from 'react-native';

import CustomText from '../../../../Components/CustomText/CustomText';
import language from '../../../../Assets/i18n/i18n';

function RulesModal(props) {
    const { isVisible, closeFunc } = props;
    return (
        <Modal
            visible={isVisible}
            animationType="fade"
            transparent={true}
        >
            <div className="flex-1 items-center justify-center bg-black bg-opacity-50">
                <div className="w-11/12 h-2/3 rounded-md border-2 border-white border-dotted items-center justify-center">
                    <div className="w-11/12 h-11/12 bg-white rounded-md">
                        <div className="px-4 py-4">
                            <CustomText className="text-center text-black text-xs leading-8">
                                {message}
                            </CustomText>
                        </div>
                    </div>
                </div>
                <TouchableOpacity 
                    onPress={closeFunc} 
                    className="absolute bottom-5 w-16 h-9 bg-green-500 rounded-full border-2 border-green-600 flex items-center justify-center"
                >
                    <CustomText className="text-white text-sm">قبول</CustomText>
                </TouchableOpacity>
            </div>
        </Modal>
    );
};

export default RulesModal;

let message = `${language('term')}نمونه گیری از اسپرم حتما بایستی به صورت غیر مستقیم و توسط همسر شرعی صورت پذیرد . معمولا این کار در حضور همسر در محیط های آزمایشگاهی بسیار سخت و ناراحت کننده است. یکی از اهداف مهم طراحی و استفاده از این پکیج شخصی سازی کردن این آزمایش و دوری از محیط های آزمایشگاهی می-باشد. بنابراین از کاندوم، روان کننده و یا از نمونه مربوط به رابطه جنسی مستقیم استفاده نکنید و به کمک همسر شرعی خود نمونه گیری را انجام دهید. نمونه را در ظرف مخصوص نمونه گیری موجود در کیت ریخته و 5 تا 15 دقیقه صبر نمایید تا مایع منی (سیمن) بصورت مایع درآید. جهت انجام صحیح آزمایش نمونه بایستی همگن باشد برای این کار لازم است تا با استفاده از سرنگ موجود در کیت با پر و خالی کردن آن نمونه را بصورت مایع روان و یکدست بدون وجود لخته ای در بیاورید. برای اندازه گیری حجم نمونه کافی است تا تنها یکبار سرنگ را بطور کامل با مایع منی پر نمایید و میزان حجم پر شده در سرنگ را مشاهده نمایید. هم چنین رنگ نمونه را در نظر داشته باشید زیرا حجم و رنگ نمونه در روند انجام آزمایش از شما پرسیده می شود.`;
