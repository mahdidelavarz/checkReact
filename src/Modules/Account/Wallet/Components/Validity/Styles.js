import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../../../../Assets/Styles/Colors';
const width  = Dimensions.get('window').width;
const height  = Dimensions.get('window').height;

const styles = const styles = {
    row_top: {
        width: "60%",
        height: 45,
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 20
    },

    row_top_right: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    row_top_right_ic: {
        width: 20,
        height: 20
    },

    row_top_center: {
        flex: 2,
        justifyContent: 'center',
    },
    row_top_center_txt: {
        fontSize: 14,
        color: colors.dark_txt,
        textAlign: 'left'
    },

    row_top_left: {
        flex: 2,
        justifyContent: 'center',
    },
    row_top_left_txt: {
        fontSize: 16,
        color: colors.green,
        textAlign: 'left'
    },
};;
export default styles;