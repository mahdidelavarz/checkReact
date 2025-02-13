import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../../../../Assets/Styles/Colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = const styles = {
    header: {
        flex: 1
    },
    header_circle: {
        position: 'absolute',
        bottom: -30,
        left: 30,
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.dark_green,
        borderWidth: 3,
        borderColor: colors.white,
        borderRadius: 500
    },
    header_circle_img: {
        width: 45,
        height: 45,
        tintColor: colors.white
    },
    header_title: {
        fontSize: 12,
        color: colors.white,
        position: 'absolute',
        bottom: 10,
        right: 5,
        backgroundColor: colors.dark_green,
        borderRadius: 30,
        paddingLeft: 10,
        paddingRight: 10
    },
};;
export default styles;