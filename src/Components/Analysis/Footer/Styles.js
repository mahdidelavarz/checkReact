import {StyleSheet, Dimensions, I18nManager} from 'react-native';
import colors from '../../../Assets/Styles/Colors';

const width  = Dimensions.get('window').width;
const height  = Dimensions.get('window').height;

const styles = const styles = {
    footer: {
        width: width,
        height: 70,
        flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
        backgroundColor: colors.light_gray,
    },

    footer_right: {
        flex: 2.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footer_right_btn: {
        width: '80%',
        height: 35,
        borderRadius: 30,
        borderColor: colors.ligh_txt,
        borderWidth: 1,
        flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse'
    },
    footer_right_btn_right: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footer_right_btn_right_ic: {
        width: 10,
        height: 10,
        resizeMode: 'center',
        tintColor: colors.green,
        transform: [{ rotate: '180deg'}]
    },
    footer_right_btn_left: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footer_right_btn_left_txt: {
        fontSize: 10,
        color: colors.dark_txt
    },


    footer_center: {
        flex: 6,
        flexDirection: 'column'
    },
    footer_center_top: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    footer_center_top_txt: {
        color: colors.dark_txt,
        fontSize: 14
    },
    footer_center_bottom: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 5,
    },
    footer_center_bottom_progras: {
        width: "90%",   
        backgroundColor: colors.ligh_txt,
        borderRadius: 30,  
        justifyContent: "center",
        alignItems: I18nManager.isRTL ? 'flex-end' : 'flex-start'
    },
    footer_center_bottom_progras_line: { 
        height: 18,  
        borderRadius: 30,  
        backgroundColor: colors.green,  
    },


    footer_left: {
        flex: 2.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footer_left_btn: {
        width: '80%',
        height: 35,
        borderRadius: 30,
        borderColor: colors.ligh_txt,
        borderWidth: 1,
        flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse'
    },
    footer_left_btn_right: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footer_left_btn_right_ic: {
        width: 10,
        height: 10,
        resizeMode: 'center',
        tintColor: colors.green,
    },
    footer_left_btn_left: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footer_left_btn_left_txt: {
        fontSize: 10,
        color: colors.dark_txt,
    },
};;
export default styles;