import { StyleSheet, Dimensions } from 'react-native';

import colors from '../../../../Assets/Styles/Colors';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    view_address: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10
    },

    view_address_right: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    view_address_right_ic: {
        width: 22,
        height: 22,
        tintColor: colors.green
    },

    view_address_center: {
        flex: 1.5,
        justifyContent: 'flex-start',
    },
    view_address_center_txt: {
        fontSize: 14,
        color: colors.black
    },

    view_address_left: {
        flex: 7.5,
        justifyContent: 'center'
    },
    view_address_left_txt: {
        fontSize: 14,
        width: '100%',
        color: colors.gray
    }
});
export default styles;