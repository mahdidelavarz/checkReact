import {StyleSheet, Dimensions, I18nManager} from 'react-native';
import colors from '../../../Assets/Styles/Colors';
const width  = Dimensions.get('window').width;
const height  = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    content: {
        flex: 1,
        flexDirection: 'column'
    },

    top: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    top_title: {
        fontSize: 14,
        textAlign: 'center',
    },
    top_row: {
        flexDirection: I18nManager.isRTL ?  'row-reverse' : 'row',
        marginTop: 15
    },

    keyboard: {
        flex: 7,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 5
    },

    bottom: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
export default styles;