import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../../../Assets/Styles/Colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = const styles = {
    bottom_view: {
        width: '93%',
        height: '100%',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.green
    },
    bottom_view_border: {
        width: '98%',
        height: '90%',
        borderRadius: 5,
        backgroundColor: colors.green,
        borderColor: colors.white,
        borderWidth: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        borderStyle: 'dotted'
    },
    bottom_view_border_flex: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottom_view_border_txt: {
        fontSize: 14,
        color: colors.white,
    },
    bottom_view_border_ic: {
        width: 45,
        height: 45,
        resizeMode: 'contain'
    },
};;
export default styles;