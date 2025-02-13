import {StyleSheet, Dimensions, I18nManager} from 'react-native';
import colors from '../../../../../Assets/Styles/Colors';
const width  = Dimensions.get('window').width;
const height  = Dimensions.get('window').height;

const styles = StyleSheet.create({
    keyboard_row: {
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
        flexWrap: 'wrap',
        width: '100%',
    },
    keyboard_row_view: {
        width: width / 3,
        height: 50,
        marginTop: 5,
        // borderWidth: 0.2,
        justifyContent: 'center',
    },
    keyboard_row_view_number: {
        textAlign: 'center',
        color: colors.green,
        fontSize: 20,
        fontWeight: 'bold'
    },
    keyboard_row_view_number_clear: {
        textAlign: 'center',
        color: colors.red,
        fontSize: 30
    },
});
export default styles;