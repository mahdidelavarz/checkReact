import { StyleSheet, Dimensions, I18nManager } from 'react-native';
import colors from '../../../../Assets/Styles/Colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = const styles = {
    // mode default
    header: {
        width: width,
        height: 60,
        backgroundColor: colors.white,
        flexDirection: 'row',
        borderBottomColor: colors.ligh_txt,
        borderBottomWidth: StyleSheet.hairlineWidth
    },

    header_right: {
        flex: 1.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header_right_ic: {
        width: 25,
        height: 25,
        tintColor: colors.dark_txt
    },

    header_center: {
        flex: 7,
        justifyContent: 'center',
    },
    header_center_input: {
        width: '100%',
        height: 40,
        borderRadius: 30,
        fontFamily: 'iranyekanwebregular(fanum)',
        fontSize: 11,
        color: colors.dark_txt,
        backgroundColor: '#F2F8FD',
        borderColor: colors.dark_txt,
        borderWidth: 0.5,
        paddingLeft: 10,
        textAlign: !I18nManager.isRTL ? 'left' : 'right',
        paddingTop: 10
    },
    header_center_ic: {
        width: 20,
        height: 20,
        tintColor: colors.dark_txt
    },

    header_left: {
        flex: 1.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header_left_ic: {
        width: 20,
        height: 20,
        tintColor: colors.dark_txt
    },

    // mode search
    header_search: {
        width: width,
        height: 60,
        justifyContent: 'center',
        backgroundColor: colors.white,
        borderBottomColor: colors.ligh_txt,
        borderBottomWidth: StyleSheet.hairlineWidth
    },

    header_search_btn_close: {
        position: 'absolute',
        width: 40,
        height: 45,
        left: 10,
        zIndex: 1,
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header_search_btn_close_ic: {
        width: 15,
        height: 15,
        tintColor: colors.dark_txt
    },
    header_search_btn_search: {
        position: 'absolute',
        right: 25,
        zIndex: 1
    }

};;
export default styles;