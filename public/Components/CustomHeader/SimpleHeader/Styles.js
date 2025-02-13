import { StyleSheet, Dimensions, I18nManager } from 'react-native';

import colors from '../../../Assets/Styles/Colors';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    header: {
        width: width,
        height: 60,
        backgroundColor: colors.green,
        borderBottomColor: colors.ligh_txt,
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: 'row'
    },
    header_right: {
        flex: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header_right_ic: {
        width: 25,
        height: 25,
        tintColor: colors.light_gray
    },
    header_center: {
        flex: 8.5,
        justifyContent: 'center'
    },
    header_center_title: {
        fontSize: 16,
        color: colors.white,
        textAlign: 'left',
        marginBottom: 7
    },
});
export default styles;