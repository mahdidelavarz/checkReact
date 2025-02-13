import { StyleSheet, Dimensions, I18nManager } from 'react-native';
import colors from '../../../../../Assets/Styles/Colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = const styles = {
    container: {
        flex: 1,
        backgroundColor: colors.white
    },

    row: {
        width: '95%',
        alignSelf: 'center',
        height: 80,
        // marginTop: 10,
        flexDirection: 'row',
        borderBottomColor: colors.ligh_txt,
        borderBottomWidth: StyleSheet.hairlineWidth,
        // backgroundColor: 'red'
        justifyContent: 'center',
    },
    row_right: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    row_right_ic: {
        width: 20,
        height: 20,
        tintColor: colors.green
    },

    row_center: {
        flex: 2.5,
        justifyContent: 'center',
    },
    row_center_txt: {
        fontSize: 12,
        color: colors.gray,
        marginStart: 3
    },

    row_left: {
        flex: 6.5,
        justifyContent: 'center',
    },
    row_left_btn: {
        borderRadius: 30,
        padding: 10,
        width: '100%',
        height: '50%',
        borderWidth: 1,
        borderColor: colors.green,
        // borderStyle: "dotted"
    },
    row_left_btn_txt: {
        fontSize: 12,
        color: colors.black,
        textAlign: 'center'
    },
    row_left_input: {
        width: '100%',
        height: '50%',
        fontFamily: 'iranyekanwebbold(fanum)',
        fontSize: 12,
        borderWidth: 1,
        borderColor: colors.green,
        color: colors.gray,
        borderRadius: 30,
        padding: 10,
        textAlign: 'center',
        // borderStyle: "dotted"
    },
};;
export default styles;