import { StyleSheet, Dimensions, I18nManager } from 'react-native';
import colors from '../../../../../Assets/Styles/Colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = const styles = {
    header: {
        width: width,
        height: 60,
        backgroundColor: colors.green,
        flexDirection: 'row',
        borderBottomColor: colors.dark_green,
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
        tintColor: colors.white
    },

    header_center: {
        flex: 7,
        justifyContent: 'center'
    },
    header_center_title: {
        fontSize: 16,
        color: colors.white,
        textAlign: 'center'
    },

    header_left: {
        flex: 1.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header_left_ic: {
        width: 20,
        height: 20,
        tintColor: colors.white
    },

    // mode search
    header_search: {
        width: width,
        height: 60,
        justifyContent: 'center',
        backgroundColor: colors.green,
        borderBottomColor: colors.dark_green,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    input: {
        width: '95%',
        alignSelf: 'center',
        height: 45,
        borderRadius: 30,
        fontFamily: 'iranyekanwebregular(fanum)',
        fontSize: 12,
        color: colors.dark_txt,
        backgroundColor: colors.white,
        borderColor: colors.dark_txt,
        borderWidth: 0.5,
        paddingLeft: 45,
        textAlign: !I18nManager.isRTL ? 'left' : 'right',
        paddingTop: 10
    },
    header_search_btn_close: {
        position: 'absolute',
        left: 10,
        zIndex: 1,
        width: 40,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header_search_btn_close_ic: {
        width: 30,
        height: 30,
        tintColor: colors.ligh_txt
    },
    header_search_btn_search: {
        position: 'absolute',
        right: 25,
        zIndex: 1
    }
};;
export default styles;