import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../../../Assets/Styles/Colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = const styles = {
    btn: {
        flex: 1,
        borderRadius: 5,
        // borderWidth: 1,
        // borderColor: colors.ligh_txt,
        backgroundColor: colors.green,
        elevation: 2
    },
    btn_view: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    btn_view_txt: {
        fontSize: 14,
        color: colors.white,
        fontFamily: 'iranyekanwebregular(fanum)'
    },
    btn_view_img: {
        width: 35,
        height: 35,
        resizeMode: 'contain',
        tintColor: colors.white
    },
};;
export default styles;