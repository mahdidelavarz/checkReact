import { StyleSheet, Dimensions, I18nManager } from 'react-native';
import colors from '../../../Assets/Styles/Colors';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    top: {
        flex: 2.5,
    },
    center: {
        flex: 6,
        flexDirection: 'column'
    },
    center_top: {
        flex: 1,
        justifyContent: 'center',
    },
    center_top_title: {
        fontSize: 16,
        color: colors.green,
        marginStart: 40,
    },
    center_bottom: {
        flex: 9,
        alignItems: 'center',
        justifyContent: 'center',
    },
    center_bottom_view: {
        width: '70%'
    },
    center_bottom_view_input: {
        width: '100%',
        height: 35,
        borderRadius: 30,
        // fontFamily: 'iranyekanwebregular(fanum)',
        fontSize: 12,
        textAlign: !I18nManager.isRTL ? 'left' : 'right',
        padding: 10,
        backgroundColor: colors.white,
        borderWidth: 1,
        marginTop: 10,
        borderColor: colors.ligh_txt
    },
    btn: {
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.ligh_txt,
        marginVertical: 15
    },
    btn_txt: {
        fontSize: 14,
        color: colors.green,
    },
    bottom: {
        flex: 1.5,
    },
});
export default styles;