import {StyleSheet, Dimensions} from 'react-native';

import colors from '../../../../Assets/Styles/Colors';
const width  = Dimensions.get('window').width;
const height  = Dimensions.get('window').height;

const styles = const styles = {
    row: {
        flexDirection: 'row',
        width: '80%',
        height: 40,
        borderBottomColor: colors.ligh_txt,
        borderBottomWidth: 0.5,
        alignSelf: 'center',
        borderTopColor: colors.ligh_txt,
    },

    row_right: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    row_right_ic: {
        fontSize: 15,
        color: colors.dark_txt
    },

    row_center: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    row_center_title: {
        fontSize: 15,
        color: colors.ligh_txt
    },

    row_left: {
        flex: 3.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ic_star: {
        width: 20,
        height: 20,
        marginLeft: 1,
    },
};;
export default styles;