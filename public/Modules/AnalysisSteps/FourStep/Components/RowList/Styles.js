import { StyleSheet, Dimensions, I18nManager } from 'react-native';
import colors from '../../../../../Assets/Styles/Colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    list_row: {
        width: '90%',
        height: 45,
        borderRadius: 5,
        marginTop: 10,
        flexDirection: 'row',
        borderColor: colors.ligh_txt,
        borderWidth: 0.6,
        backgroundColor: colors.white
    },
    list_row_right: {
        flex: 7,
        justifyContent: 'center',
    },
    list_row_right_txt: {
        fontSize: 14,
        color: colors.dark_txt,
        textAlign: 'left',
        marginStart: 5,
    },
    list_row_body: {
        flex: 2,
        justifyContent: 'center',
    },
    list_row_body_input: {
        fontFamily: 'iranyekanwebregular(fanum)',
        fontSize: 12,
        textAlign: 'center',
        paddingTop: 12,
        color: colors.dark_txt,
    },
    list_row_body_txt: {
        fontSize: 12,
        color: colors.dark_txt,
        textAlign: 'center'
    },
    list_left: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    list_left_ic: {
        width: 12,
        height: 12,
        tintColor: colors.green
    },
});
export default styles;