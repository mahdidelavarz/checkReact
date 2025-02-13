import {StyleSheet, Dimensions, I18nManager} from 'react-native';
import colors from '../../Assets/Styles/Colors';

const width  = Dimensions.get('window').width;
const height  = Dimensions.get('window').height;

const styles = StyleSheet.create({
    input: {
        width: '100%',
        height: 35,
        borderRadius: 30,
        fontFamily: 'iranyekanwebregular(fanum)',
        fontSize: 11,
        textAlign: !I18nManager.isRTL ? 'left' : 'right',
        padding: 10,
        backgroundColor: colors.white,
        borderWidth: 1,
        marginTop: 10,
        borderColor: colors.ligh_txt
    },
    btn_visible: {
        position: 'absolute',
        right: 5,
        bottom: 2,
        zIndex: 1,
        width: 25,
        height: 25
    },
    btn_visible_ic: {
        width: 20,
        height: 20,
        tintColor: colors.ligh_txt
    }
});
export default styles;