import { StyleSheet, Dimensions } from 'react-native';

import colors from '../../../../Assets/Styles/Colors';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        width: '95%',
        height: 50,
    },

    row_right: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    row_right_ic: {
        width: 22,
        height: 22,
        tintColor: colors.green
    },

    row_center: {
        flex: 9,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    row_center_title: {
        fontSize: 14,
        color: colors.black
    },

    row_left: {
        // flex: 3.5,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    ic_star: {
        width: 20,
        height: 20,
        marginLeft: 1,
    },
});
export default styles;