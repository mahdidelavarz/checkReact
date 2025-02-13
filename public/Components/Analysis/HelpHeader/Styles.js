import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../../Assets/Styles/Colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    header: {
        width: width,
        height: 55,
        backgroundColor: colors.white,
        borderBottomColor: colors.ligh_txt,
        borderBottomWidth: 0.7,
        flexDirection: 'row',
    },

    header_right: {
        flex: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header_right_ic: {
        width: 30,
        height: 30,
        tintColor: colors.ligh_txt
    },

    header_center: {
        flex: 7,
        justifyContent: 'center',
    },
    header_center_txt: {
        fontSize: 16,
        color: colors.dark_txt,
        textAlign: 'center'
    },

    header_left: {
        flex: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header_left_ic: {
        width: 25,
        height: 25,
        tintColor: colors.green
    },
});
export default styles;